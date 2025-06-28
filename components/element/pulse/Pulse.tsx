"use client";

import { useEffect, useRef } from "react";
import { animate } from "animejs";

interface PulseCircleProps {
  shouldPulse: boolean;
  scale?: number[];
}

function PulseCircle({ shouldPulse, scale = [1, 1.1, 1] }: PulseCircleProps) {
  const circleRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const animationRef = useRef<any>(null);

  useEffect(() => {
    if (!circleRef.current) return;

    if (shouldPulse) {
      animationRef.current = animate(circleRef.current, {
        scale: scale,
        boxShadow: [
          "0 0 0 rgba(107, 235, 115, 0.9)",
          "0 0 100px rgba(107, 235, 115, 0.6)",
          "0 0 0 rgba(107, 235, 115, 0.0)",
        ],
        duration: 1200,
        easing: "easeInOutQuad",
        loop: true,
      });
    } else {
      animationRef.current?.pause?.();
    }

    return () => {
      animationRef.current?.pause?.();
    };
  }, [scale, shouldPulse]);

  return (
    <div
      ref={circleRef}
      style={{
        width: "80px",
        height: "80px",
        borderRadius: "50%",
        margin: "60px auto",
        background:
          "linear-gradient(90deg,rgba(42, 123, 155, 1) 0%, rgba(87, 199, 133, 1) 50%, rgba(237, 221, 83, 1) 100%)",
        boxShadow: "0 0 0 rgba(107, 235, 115, 0.6)",
        transition: "background 0.5s ease",
      }}
    />
  );
}

export default PulseCircle;
