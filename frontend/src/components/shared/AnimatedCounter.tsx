"use client";

import { useEffect, useState } from "react";

interface AnimatedCounterProps {
  value: number | string;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  duration = 1200,
  className = "",
}: AnimatedCounterProps) {
  const numericValue = typeof value === "number" ? value : parseFloat(value.replace(/[^0-9.]/g, "")) || 0;
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = numericValue;
    if (end === 0) {
      setDisplayValue(0);
      return;
    }

    const steps = 40;
    const increment = end / steps;
    const stepTime = duration / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayValue(end);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [numericValue, duration]);

  // Format integer vs float
  const formatted = Number.isInteger(numericValue)
    ? displayValue.toLocaleString()
    : displayValue.toFixed(1);

  return (
    <span className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
