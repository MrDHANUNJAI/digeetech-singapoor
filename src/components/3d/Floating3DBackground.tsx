import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export const Floating3DBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 25;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);

    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // 1. Ambient 3D Particle Constellation
    const particleCount = 180;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 60;
      positions[i + 1] = (Math.random() - 0.5) * 60;
      positions[i + 2] = (Math.random() - 0.5) * 60;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0x0ea5e9,
      size: 0.15,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // 2. Slow floating 3D Wireframe Polyhedrons
    const polyGroup = new THREE.Group();
    scene.add(polyGroup);

    const polyGeo = new THREE.IcosahedronGeometry(12, 1);
    const polyMat = new THREE.MeshBasicMaterial({
      color: 0x0ea5e9,
      wireframe: true,
      transparent: true,
      opacity: 0.08
    });
    const polyMesh = new THREE.Mesh(polyGeo, polyMat);
    polyGroup.add(polyMesh);

    // Mouse tracking & scroll parallax
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      camera.position.y = -scrollY * 0.005;
      polyMesh.rotation.y = scrollY * 0.0005;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      particles.rotation.y = elapsedTime * 0.02;
      particles.rotation.x = elapsedTime * 0.01;

      polyMesh.rotation.x = elapsedTime * 0.03;
      polyMesh.rotation.z = elapsedTime * 0.02;

      camera.position.x += (mouseX * 2 - camera.position.x) * 0.02;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80 transition-opacity duration-1000"
    />
  );
};
