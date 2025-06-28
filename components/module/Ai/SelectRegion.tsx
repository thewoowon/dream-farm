import { COLORS } from "@/styles/color";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { DEV_CLIENT_PAGES_MANIFEST } from "next/dist/shared/lib/constants";
import { useState } from "react";

const RegionList = ["의성", "청송", "영덕", "울진", "봉화", "울릉도"];

type SelectRegionProps = {
  state: FlowState;
  next: () => void;
  context: FlowContext;
  setContext: (region: string) => void;
  handleOpen: () => void;
  handleClose?: () => void;
  handleToggle: () => void;
  open: boolean;
  setRegion: (region: string) => void;
};

const SelectRegion = ({
  state,
  next,
  context,
  setContext,
  handleOpen,
  handleClose,
  handleToggle,
  open,
  setRegion,
}: SelectRegionProps) => {
  return (
    <Wrapper>
      <TitleBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <div>
          희망하시는 <br />
          지역이 있나요?
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            gap: "42px",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 16px",
              backgroundColor: "white",
              borderRadius: "12px",
              cursor: "pointer",
              boxShadow: "0px 0px 2px 0px rgba(0, 0, 0, 0.05)",
              zIndex: 1,
              border: "0.5px solid #D0D0D0",
            }}
            onClick={handleToggle}
          >
            <div
              style={{
                color: COLORS.grayscale[700],
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: "20px",
                letterSpacing: "-2%",
              }}
            >
              {context.region || "지역을 선택해주세요"}
            </div>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.2441 7.51709L9.9976 13.7636L3.75107 7.51709"
                stroke="#767676"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          {open && (
            <div
              style={{
                position: "absolute",
                top: "40px",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "white",
                borderBottomLeftRadius: "12px",
                borderBottomRightRadius: "12px",
                overflow: "hidden",
              }}
            >
              {RegionList.map((region, index) => (
                <div
                  key={region}
                  onClick={() => {
                    setContext(region);
                    setRegion(region);
                    handleClose?.();
                  }}
                  style={{
                    width: "100%",
                    height: index === 0 ? "56px" : "48px",
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: "16px",
                    backgroundColor:
                      context.region === region ? "#e6f7f2" : "white",
                    color:
                      context.region === region
                        ? "#008f66"
                        : COLORS.grayscale[700],
                    fontSize: "15px",
                    fontWeight: 400,
                    lineHeight: "20px",
                    letterSpacing: "-2%",
                    cursor: "pointer",
                    borderBottom:
                      index === RegionList.length - 1
                        ? "none"
                        : "0.5px solid #CFCFCF",
                    paddingTop: index === 0 ? "8px" : "0",
                  }}
                >
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      backgroundColor:
                        context.region === region
                          ? "#008f66"
                          : COLORS.grayscale[300],
                      marginRight: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {context.region === region && (
                      <div
                        style={{
                          width: "10px",
                          height: "10px",
                          borderRadius: "50%",
                          backgroundColor: "white",
                        }}
                      />
                    )}
                  </div>
                  {region}
                </div>
              ))}
            </div>
          )}
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              gap: "11px",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                padding: "0 16px",
                gap: "3px",
              }}
            >
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: 600,
                  lineHeight: "20px",
                  letterSpacing: "-2%",
                }}
              >
                추천 지역
              </div>
              <svg
                onClick={() => {
                  alert(
                    "오늘 날짜 기준으로 귀농하기 좋은 최적의 장소를 AI가 추천해드려요."
                  );
                }}
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5Z"
                  stroke="#979797"
                  strokeWidth="1.25"
                />
                <path
                  d="M10 13.75V9.21875"
                  stroke="#979797"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                />
                <path
                  d="M9.21875 7.1875C9.21875 6.75603 9.56853 6.40625 10 6.40625C10.4315 6.40625 10.7812 6.75603 10.7812 7.1875C10.7812 7.61897 10.4315 7.96875 10 7.96875C9.56853 7.96875 9.21875 7.61897 9.21875 7.1875Z"
                  fill="#979797"
                />
              </svg>
            </div>
            <div style={{ width: "100%" }}>
              {["경상북도 의성", "충청남도 홍성", "전라북도 임실"].map(
                (region, index) => (
                  <div
                    key={index}
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      fontSize: "16px",
                      fontWeight: 400,
                      lineHeight: "20px",
                      letterSpacing: "-2%",
                      gap: "10px",
                      padding: "16px",
                      borderBottom:
                        index === 2 ? "none" : "0.5px solid #CFCFCF",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        fontSize: "16px",
                        fontWeight: 700,
                        lineHeight: "20px",
                        letterSpacing: "-2%",
                        color: "#008f66",
                      }}
                    >{`${index + 1}`}</div>
                    {region}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </TitleBox>
      <ButtonWrapper>
        <Button onClick={next} disabled={context.region ? false : true}>
          다음
        </Button>
        <HollowButton
          onClick={() => {
            setContext("");
          }}
        >
          잘 모르겠어요
        </HollowButton>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default SelectRegion;

const Wrapper = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  padding-top: 75px;
  gap: 10px;
  position: relative;
`;

const TitleBox = styled(motion.div)`
  width: 100%;
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
  letter-spacing: -2%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 75px;
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

//
const HollowButton = styled.button`
  width: 100%;
  height: 44px;
  cursor: pointer;
  color: #7b7b7b;
  font-size: 15px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: -2%;
  transition: all 0.2s ease-in-out;
`;

const RegionButton = styled.button<{
  selected: boolean;
}>`
  width: 100%;
  height: 44px;
  background-color: white;
  color: ${({ selected }) =>
    selected ? COLORS.primary[600] : COLORS.primary[100]};
  border-radius: 8px;
  border: 1px solid ${COLORS.grayscale[300]};
  cursor: pointer;
  font-size: 15px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: -2%;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${COLORS.grayscale[100]};
    color: ${COLORS.primary[500]};
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
