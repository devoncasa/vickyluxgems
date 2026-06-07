import * as React from "react";

type Ratio = "16:9" | "4:3" | "1:1" | "3:4" | "4:5" | "21:9" | "2:1" | "9:16";

export const ImagePlaceholder: React.FC<{ label?: string; size?: string; ratio?: Ratio; className?: string }> = ({
  label = "IMAGE PLACEHOLDER",
  size,
  ratio = "16:9",
  className = "",
}) => {
  return (
    <div className={`img-placeholder ${className}`} aria-label={label} role="img" data-ratio={ratio} data-desc={label}>
      <div className="img-placeholder__inner">
        <span className="img-placeholder__icon">◈</span>
        <span className="img-placeholder__label">{label}</span>
        <span className="img-placeholder__size">{size || `Suggested image · ratio ${ratio}`}</span>
      </div>
    </div>
  );
};

export default ImagePlaceholder;
