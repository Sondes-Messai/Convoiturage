import React from "react";

const SpinnerComponent = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-afpa-alert"></div>
    </div>
  );
};

export default SpinnerComponent;
