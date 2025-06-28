"use client";

import React from "react";

interface GaugeBarProps {
  min: number;
  max: number;
  value: number;
}

const GaugeBar: React.FC<GaugeBarProps> = ({ min, max, value }) => {
  const percent = Math.min(Math.max((value - min) / (max - min), 0), 1) * 100;

  const getBarColor = () => {
    if (value < min || value > max) return "red";
    return "green";
  };

  return (
    <div style={{ width: "100%", maxWidth: 400, margin: "20px 0" }}>
      <div
        style={{
          height: "24px",
          backgroundColor: "#e0e0e0",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${percent}%`,
            backgroundColor: getBarColor(),
            transition: "width 0.3s",
          }}
        />
      </div>
      <div style={{ marginTop: 8, fontSize: 14 }}>
        현재값: {value} (범위: {min} ~ {max})
      </div>
    </div>
  );
};

export default GaugeBar;
