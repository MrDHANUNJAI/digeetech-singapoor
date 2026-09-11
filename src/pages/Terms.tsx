import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export const Terms: React.FC = () => {
  return (
    <div id="terms-page" className="w-full relative overflow-x-hidden pt-28 pb-20 font-sans text-brand-gray text-sm leading-relaxed max-w-4xl mx-auto px-6 bg-white text-brand-navy">
      <Link id="back-home-terms" to="/" className="inline-flex items-center gap-1 text-xs text-brand-blue hover:underline mb-8">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>
      
      <h1 className="font-display text-3xl md:text-4xl font-bold text-brand-navy mb-6">Terms & Conditions</h1>
      <p className="mb-4 text-brand-gray">Last Updated: August 31, 2026</p>
      
      <p className="mb-6 text-brand-gray">
        Welcome to the official Digee Tech corporate website. By navigating this digital site, accessing services data, or submitting scoping inquiry forms, you agree to comply with the general technical and system terms outlined below.
      </p>

      <h2 className="font-display text-xl font-bold text-brand-navy mt-8 mb-4">1. Use of Website Materials</h2>
      <p className="mb-4 text-brand-gray">
        All typographical scales, grid layouts, brand visual logo marks, abstract illustrations, and data-driven service/project summaries are the intellectual property of Digee Tech. Copying, republishing, or distributing these materials for commercial use without written authorization is strictly prohibited.
      </p>

      <h2 className="font-display text-xl font-bold text-brand-navy mt-8 mb-4">2. Scoping Forms & Technical Blueprint Disclaimer</h2>
      <p className="mb-4 text-brand-gray">
        Submitting our scoping intake forms does not constitute a legal contract or establish a binding software development agreement. All custom budgets, project milestone estimates, and technical roadmaps are initial scoping proposals that require formalized, signed master services agreements (MSAs) before development begins.
      </p>

      <h2 className="font-display text-xl font-bold text-brand-navy mt-8 mb-4">3. Factual Information & Anti-Fabrication Commitment</h2>
      <p className="mb-6 text-brand-gray">
        All service details, capabilities, and case study overviews are written following our strict anti-fabrication guidelines. We avoid fictitious business metrics. Any mock visuals or stylized code terminals displayed are explicitly marked as such to maintain clean customer expectations.
      </p>

      <p className="text-xs text-brand-gray/50 border-t border-brand-navy/10 pt-6 italic">
        * This is a placeholder terms document representing a premium technology solutions company website template. All parameters are configured to support structural UX display.
      </p>
    </div>
  );
};
