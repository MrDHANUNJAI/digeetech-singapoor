import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { Compass } from "lucide-react";

export const NotFound: React.FC = () => {
  return (
    <div id="not-found-page" className="w-full relative overflow-x-hidden min-h-screen pt-40 pb-20 flex flex-col items-center justify-center text-center px-6 bg-white text-brand-navy">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-3xl -z-10" />
      
      <div className="flex flex-col items-center gap-6 max-w-md">
        <div className="w-16 h-16 rounded-2xl bg-brand-blue/10 flex items-center justify-center text-brand-blue mb-2">
          <Compass className="w-8 h-8" />
        </div>
        
        <h1 className="font-display text-7xl font-extrabold text-brand-blue tracking-tighter">
          404
        </h1>
        
        <h2 className="font-display text-2xl font-bold text-brand-navy mt-1">
          Route Not Located
        </h2>
        
        <p className="font-sans text-sm text-brand-gray leading-relaxed">
          The requested system route does not exist. Check the address bar parameters, or use the navigations to return safely to active systems.
        </p>

        <div className="flex flex-wrap gap-4 justify-center mt-4 w-full">
          <Button id="notfound-btn-home" variant="primary" to="/" className="w-full sm:w-auto">
            Return to Home
          </Button>
          <Button id="notfound-btn-services" variant="outline" to="/services" className="w-full sm:w-auto">
            Browse Services
          </Button>
        </div>
      </div>
    </div>
  );
};
