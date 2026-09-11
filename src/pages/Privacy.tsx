import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export const Privacy: React.FC = () => {
  return (
    <div id="privacy-page" className="w-full relative overflow-x-hidden pt-28 pb-20 font-sans text-brand-gray text-sm leading-relaxed max-w-4xl mx-auto px-6 bg-white text-brand-navy">
      <Link id="back-home-privacy" to="/" className="inline-flex items-center gap-1 text-xs text-brand-blue hover:underline mb-8">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>
      
      <h1 className="font-display text-3xl md:text-4xl font-bold text-brand-navy mb-6">Privacy Policy</h1>
      <p className="mb-4 text-brand-gray">Last Updated: August 31, 2026</p>
      
      <p className="mb-6 text-brand-gray">
        At Digee Tech ("we", "our", or "us"), protecting your operational and organizational data privacy is a core technical principle. This Privacy Policy outlines the general categories of data we collect, how we coordinate and process that information, and how we protect your digital assets.
      </p>

      <h2 className="font-display text-xl font-bold text-brand-navy mt-8 mb-4">1. Data Collection & Processing</h2>
      <p className="mb-4 text-brand-gray">
        When you submit inquiries through our "Contact" or "Start a Project" scoping forms, we collect basic coordinates (your name, company, email address, phone number, budget range, and project requirements). We process this data strictly to assess your engineering needs and coordinate discovery roadmap timelines.
      </p>
      <p className="mb-4 text-brand-gray">
        We do not collect financial details or payment transaction parameters on this website. If billing services are integrated into your custom applications, they will leverage isolated third-party providers (like Stripe or PayPal) with secure API webhook connections.
      </p>

      <h2 className="font-display text-xl font-bold text-brand-navy mt-8 mb-4">2. Security Parameters & Infrastructure</h2>
      <p className="mb-4 text-brand-gray">
        We implement robust system administrative and technical security measures (such as SSL secure socket layers, row-level database permissions, form parameter sanitization, and isolated cloud bucket storage) to protect against unauthorized document or coordinate disclosures.
      </p>
      
      <h2 className="font-display text-xl font-bold text-brand-navy mt-8 mb-4">3. Data Sharing Restrictions</h2>
      <p className="mb-6 text-brand-gray">
        We do not lease, trade, or distribute your email coordinates or business scoping details to marketing lists or third parties. We only share information when required by legal regulations or to coordinate developer tasks upon your direct instruction.
      </p>

      <p className="text-xs text-brand-gray/50 border-t border-brand-navy/10 pt-6 italic">
        * This is a placeholder privacy document representing a premium technology solutions company website template. All parameters are configured to support structural UX display.
      </p>
    </div>
  );
};
