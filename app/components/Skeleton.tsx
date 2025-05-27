import React from "react";

export default function Skeleton({ className = "", style = {} }) {
  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded ${className}`}
      style={style}
    />
  );
}
