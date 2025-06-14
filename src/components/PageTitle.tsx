
import React from "react";

interface PageTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function PageTitle({ children, className = "" }: PageTitleProps) {
  return (
    <h1
      className={
        "font-calibri text-lg md:text-xl font-bold text-gray-700 mb-5 text-center " +
        className
      }
    >
      {children}
    </h1>
  );
}
