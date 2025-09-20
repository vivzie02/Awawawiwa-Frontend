import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useLoading } from "../contexts/LoadingContext";

export default function LoadingScreen({ children }) {
  const { isAuthLoading } = useAuth();
  const [showSpinner, setShowSpinner] = useState(false);
  const { isLoading } = useLoading();

  useEffect(() => {
    setShowSpinner(isLoading);
  }, [isLoading]);

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
