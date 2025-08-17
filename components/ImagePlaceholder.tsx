import * as React from "react";

export const ImagePlaceholder: React.FC<{label?: string; ratio?: "16:9"|"4:3"|"1:1"|"3:4"|"9:16"}> = ({ label="Image", ratio="16:9" }) => {
  const [w,h] = (() => {
    switch(ratio){
      case "4:3": return [4,3];
      case "1:1": return [1,1];
      case "3:4": return [3,4];
      case "9:16": return [9,16];
      default: return [16,9];
    }
  })();
  const padding = (h/w)*100 + "%";
  return (
    <div className="vlg-img-ph" aria-label={label} role="img" data-ratio={ratio}>
      <div style={{ paddingTop: padding }} />
      <span className="vlg-img-ph__badge">{label} • {ratio}</span>
    </div>
  );
};
