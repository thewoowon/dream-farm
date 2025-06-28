"use client";

import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import Image from "next/image";
import BackgroundVideo from "@/components/module/BackgroundVideo";

const Splash = () => {
  const [boarding, setBoarding] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setBoarding(false);
    }, 5000);
  }, []);

  if (!boarding) {
    return null;
  }

  return (
    <Container>
      <BackgroundVideo />
      <div
        style={{
          position: "relative",
          width: "163px",
          height: "59px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          src="/images/common/dreamfarm-logo.png"
          alt="Splash Image"
          fill
          style={{ objectFit: "contain" }}
          priority
          quality={100}
        />
      </div>
    </Container>
  );
};

export default Splash;

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  font-family: "Pretendard Variable", Pretendard, -apple-system, Blink;
  z-index: 200;
  animation: fadeOut 3s ease-in-out 2s forwards;
  font-size: 20px;
  color: #000000;
  background-image: url("/images/common/splash-bg.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;
