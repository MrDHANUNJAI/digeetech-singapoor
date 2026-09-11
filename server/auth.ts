import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { db } from "./db";

const JWT_SECRET = process.env.JWT_SECRET || "digeetech_sg_super_secure_jwt_secret_2025";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

export function generateToken(user: { id: string; email: string; name: string; role: string }) {
  return jwt.sign(
    { id: user.id, email: user.email, name: user.name, role: user.role },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized. Authentication token required." });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      email: string;
      name: string;
      role: string;
    };
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired session token. Please log in again." });
  }
}

export async function loginHandler(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    const state = db.get();
    const user = state.users.find(
      (u) => u.email.toLowerCase().trim() === email.toLowerCase().trim()
    );

    if (!user) {
      db.logAudit(email, "Failed Login", `Login attempt failed: user not found`, req.ip || "127.0.0.1");
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      db.logAudit(email, "Failed Login", `Invalid password attempt for ${email}`, req.ip || "127.0.0.1");
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // Update last login
    user.lastLogin = new Date().toISOString();
    db.save();

    db.logAudit(user.email, "Admin Login", `Successful login from IP: ${req.ip || "127.0.0.1"}`, req.ip || "127.0.0.1");

    const token = generateToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    return res.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        lastLogin: user.lastLogin,
      },
    });
  } catch (err: any) {
    console.error("[Auth] Login error:", err);
    return res.status(500).json({ error: "Internal server error during login." });
  }
}

export async function changePasswordHandler(req: AuthRequest, res: Response) {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const userEmail = req.user?.email;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ error: "All password fields are required." });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ error: "New password and confirmation do not match." });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({ error: "New password must be at least 8 characters long." });
    }

    const state = db.get();
    const user = state.users.find((u) => u.email === userEmail);
    if (!user) {
      return res.status(404).json({ error: "User account not found." });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isMatch) {
      db.logAudit(user.email, "Failed Password Change", "Incorrect current password entered", req.ip || "127.0.0.1");
      return res.status(400).json({ error: "Current password verification failed. Please check your password." });
    }

    // Hash new password securely
    const salt = await bcrypt.genSalt(10);
    user.passwordHash = await bcrypt.hash(newPassword, salt);
    db.save();

    db.logAudit(user.email, "Password Changed", "Administrator password successfully updated", req.ip || "127.0.0.1");

    return res.json({
      success: true,
      message: "Password updated successfully. Please use your new password on next login.",
    });
  } catch (err: any) {
    console.error("[Auth] Change password error:", err);
    return res.status(500).json({ error: "Failed to update password." });
  }
}
