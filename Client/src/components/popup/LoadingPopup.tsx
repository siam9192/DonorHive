import React from "react";
import "@/styles/Popup.css";

function LoadingPopup({ status }: { status: boolean }) {
  if (!status) return null;
  return (
    <div className="absolute inset-0  bg-primary_color bg-opacity-40 flex items-center justify-center z-50">
      <div className="loader"></div>
    </div>
  );
}

export default LoadingPopup;
