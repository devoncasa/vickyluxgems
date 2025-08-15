import React from 'react';

const SectionDivider: React.FC = () => {
  return (
    <div className="w-24 h-px mx-auto my-6">
      <div className="h-full w-full bg-gradient-to-r from-transparent via-[var(--c-accent-primary)] to-transparent section-divider-inner" />
    </div>
  );
};

export default SectionDivider;