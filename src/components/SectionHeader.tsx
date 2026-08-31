import React from "react";

interface SectionHeaderProps {
  id?: string;
  eyebrow: string;
  title: string;
  description?: string;
  center?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  id,
  eyebrow,
  title,
  description,
  center = false
}) => {
  return (
    <div id={id} className={`flex flex-col gap-3 mb-12 max-w-3xl ${center ? "mx-auto text-center items-center" : ""}`}>
      <span className="font-display text-xs font-bold uppercase tracking-widest text-brand-blue">
        {eyebrow}
      </span>
      <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-brand-navy">
        {title}
      </h2>
      {description && (
        <p className="font-sans text-base md:text-lg text-brand-gray mt-2 leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
};
