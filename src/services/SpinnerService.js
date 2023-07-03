import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { ClipLoader } from "react-spinners";

const SpinnerService = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Escape") {
        setIsLoading(false);
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const showSpinner = () => {
    setIsLoading(true);
  };

  const hideSpinner = () => {
    setIsLoading(false);
  };

  const SpinnerContainer = () => {
    if (!isLoading) return null;

    return createPortal(
      <div className="spinner-overlay">
        <ClipLoader color="#ffffff" loading={true} />
      </div>,
      document.body
    );
  };

  return {
    showSpinner,
    hideSpinner,
    SpinnerContainer,
  };
};

export default SpinnerService;
