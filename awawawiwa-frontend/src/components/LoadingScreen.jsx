import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function LoadingScreen({ children, minDuration = 1000, isLoading }) {
  const { isAuthLoading } = useAuth();
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    let timer;

    if (!isAuthLoading && !isLoading) {
      // Keep spinner visible for at least minDuration
      timer = setTimeout(() => setShowSpinner(false), minDuration);
    } else {
      setShowSpinner(true);
    }

    return () => clearTimeout(timer);
  }, [isAuthLoading, minDuration, isLoading]);

  return (
    <div className="relative min-h-screen">
      {/* Children render immediately */}
      <div className={showSpinner ? "opacity-50" : ""}>{children}</div>

      {/* Spinner overlay */}
      {showSpinner && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
        </div>
      )}
    </div>
  );
}
