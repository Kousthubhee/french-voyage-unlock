
import React from "react";

interface PageTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function PageTitle({ children, className = "" }: PageTitleProps) {
  return (
    <h1
      className={`font-calibri font-bold text-xl md:text-2xl text-gray-700 text-center mb-6 ${className}`}
    >
      {children}
    </h1>
  );
}
