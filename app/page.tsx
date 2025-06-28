"use client";
import { COLORS } from "@/styles/color";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Banner } from "@/components/module";
import BackgroundVideo from "@/components/module/BackgroundVideo";

export default function Home() {
  const router = useRouter();
  return (
    <Wrapper>
      <TitleBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <div
          style={{
            paddingTop: "58px",
            paddingBottom: "44px",
          }}
        >
          <Banner />
        </div>
        <div
          style={{
            marginTop: "44px",
          }}
        >
          지금부터
          <br />
          귀농을 위한
          <br />
          정착 로드맵을
          <br />
          설계해볼까요?
        </div>
      </TitleBox>
      <ButtonWrapper>
        <ButtonBox>
          <Button
            onClick={() => {
              router.push("/ai");
            }}
          >
            다음
          </Button>
        </ButtonBox>
      </ButtonWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  padding-top: 50px;
  gap: 10px;
`;

const TitleBox = styled(motion.div)`
  width: 100%;
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
  letter-spacing: -2%;
`;

const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding-left: 20px;
  padding-right: 20px;
`;

const Button = styled.button`
  width: 100%;
  height: 48px;
  background-color: #008f66;
  color: white;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 15px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: -2%;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #007a5c;
  }

  &:disabled {
    background-color: ${COLORS.grayscale[200]};
    color: ${COLORS.grayscale[500]};
    cursor: not-allowed;
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  bottom: 20px;
  gap: 12px;
`;
