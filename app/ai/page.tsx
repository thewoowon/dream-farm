"use client";

import useBackgroundColorStore from "@/store/useBackgroundColorStore";
import styled from "@emotion/styled";
import { JSX, useEffect, useRef, useState } from "react";
import useFlow from "@hooks/useFlow";
import SelectRegion from "@/components/module/Ai/SelectRegion";
import EnterExperience from "@/components/module/Ai/EnterExperience";
import EnterBudget from "@/components/module/Ai/EnterBudget";
import EnterCrop from "@/components/module/Ai/EnterCrop";
import Presubmit from "@/components/module/Ai/Presubmit";
import GeneratingResults from "@/components/module/Ai/GeneratingResults";
import { COLORS } from "@/styles/color";
import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "@/styles/snap-swiper.css";
import { Mousewheel } from "swiper/modules";
import useWarnOnUnload from "@/hooks/useWarnOnUnload";
import customAxios from "@/lib/axios";
import useHeaderStore from "@/store/useHeaderStore";
import RoadMap from "@/components/module/Ai/RoadMap";

const YEAR_LIST = [
  "의성",
  "영주",
  "상주",
  "문경",
  "예천",
  "봉화",
  "울진",
  "청송",
  "안동",
  "영양",
  "영덕",
  "포항",
  "경주",
  "울릉",
];

const FlowStateIndex = {
  region: 0,
  crop: 1,
  budget: 2,
  experience: 3,
  presubmit: 4,
  roadmap: 5,
};

const AiPage = () => {
  const { changeBackgroundColor } = useBackgroundColorStore();
  const { change, display } = useHeaderStore();
  const { flowState, ...flowProps } = useFlow();
  const [data, setData] = useState<{
    location: string;
    level: string;
    crop: string;
    money: string;
    period: string;
    summary: string;
    fullReport: string;
    userId: string;
  }>({
    location: "",
    level: "",
    crop: "",
    money: "",
    period: "",
    summary: "",
    fullReport: "",
    userId: "",
  });
  const [generateLoading, setGenerateLoading] = useState(false);
  const [openRegion, setOpenRegion] = useState(false);
  const [openCrop, setOpenCrop] = useState(false);
  const handleOpenRegion = () => setOpenRegion(true);
  const handleCloseRegion = () => setOpenRegion(false);
  const handleOpenCrop = () => setOpenCrop(true);
  const handleCloseCrop = () => setOpenCrop(false);
  const [region, setRegion] = useState("");
  const [crop, setCrop] = useState("");
  const swiperRef = useRef<SwiperRef | null>(null);
  const [universitySearchOpen, setUniversitySearchOpen] = useState(false);
  const [modalContext, setModalContext] = useState({
    title: "",
    content: "",
    confirmText: "확인",
    cancelText: "취소",
    isShow: false,
  });

  useWarnOnUnload();

  const getResult = async () => {
    try {
      setGenerateLoading(true);
      const { region, crop, budget, experience } = flowProps.flowContext;

      const pathname = `/result/step3`;
      const response = await customAxios.get<
        unknown,
        {
          data: {
            location: string;
            level: string;
            crop: string;
            money: string;
            period: string;
            summary: string;
            fullReport: string;
            userId: string;
          };
        }
      >(pathname, {
        params: {
          location: region,
          crop,
          money: budget,
          level: experience,
        },
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log("Response from /result/step3:", response);
      setData(response.data);
      sessionStorage.setItem("userId", response.data.userId);
    } catch (error) {
      console.error(error);
    }
  };

  const getComponent = (flowState: FlowState) => {
    const components: {
      [key: string]: JSX.Element | null;
    } = {
      region: (
        <SelectRegion
          state={flowState}
          next={flowProps.next}
          context={flowProps.flowContext}
          setContext={flowProps.setRegion}
          handleOpen={handleOpenRegion}
          handleClose={handleCloseRegion}
          handleToggle={() => {
            setOpenRegion(!openRegion);
          }}
          open={openRegion}
          setRegion={setRegion}
          setModalContext={setModalContext}
        />
      ),
      crop: (
        <EnterCrop
          state={flowState}
          next={flowProps.next}
          context={flowProps.flowContext}
          setContext={flowProps.setCrop}
          handleOpen={handleOpenCrop}
          handleClose={handleCloseCrop}
          handleToggle={() => {
            setOpenCrop(!openCrop);
          }}
          open={openCrop}
          setCrop={setCrop}
          setModalContext={setModalContext}
        />
      ),
      budget: (
        <EnterBudget
          state={flowState}
          next={flowProps.next}
          context={flowProps.flowContext}
          setContext={flowProps.setBudget}
        />
      ),
      experience: (
        <EnterExperience
          state={flowState}
          next={flowProps.next}
          context={flowProps.flowContext}
          setContext={flowProps.setExperience}
        />
      ),
      presubmit: (
        <Presubmit
          state={flowState}
          next={flowProps.next}
          context={flowProps.flowContext}
          generateRoadMap={async () => {
            setGenerateLoading(true);
            await getResult();
            console.log("Generating load map...");
            flowProps.next();
            setGenerateLoading(false);
          }}
          setFlowState={flowProps.setFlowState}
        />
      ),
      roadmap: (
        <RoadMap
          state={flowState}
          next={flowProps.next}
          context={flowProps.flowContext}
          data={data}
        />
      ),
    };

    return components[flowState] || null;
  };

  useEffect(() => {
    changeBackgroundColor("#b9c5dc");
    change("block");
  }, [changeBackgroundColor, change]);

  if (generateLoading) {
    return (
      <Main flowState={flowState} display={display}>
        <GeneratingResults
          state={flowState}
          context={flowProps.flowContext}
          loading={generateLoading}
        />
      </Main>
    );
  }

  return (
    <Main flowState={flowState} display={display}>
      {flowState !== "roadmap" && (
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: "6px",
            marginBottom: "24px",
          }}
        >
          {["region", "crop", "budget", "experience", "presubmit"].map(
            (step, index) => {
              return (
                <div
                  key={step}
                  style={{
                    flex: 1,
                    borderRadius: "4px",
                    height: "3px",
                    backgroundColor:
                      FlowStateIndex[flowState] >= index
                        ? "#008F66"
                        : "#E9E9E9",
                  }}
                />
              );
            }
          )}
        </div>
      )}
      {flowState !== "region" && flowState !== "roadmap" && (
        <BackButton
          onClick={() => {
            flowProps.back();
          }}
          style={{
            marginTop: "16px",
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M14.998 19L7.99805 12L14.998 5"
              stroke="#008f66"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </BackButton>
      )}
      {getComponent(flowState)}
      <Modal open={modalContext.isShow}>
        <BackgroundLayer />
        <div
          style={{
            width: "324px",
            height: "266px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            backgroundColor: "white",
            borderRadius: "16px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
            <path
              d="M22 41.25C32.6315 41.25 41.25 32.6315 41.25 22C41.25 11.3685 32.6315 2.75 22 2.75C11.3685 2.75 2.75 11.3685 2.75 22C2.75 32.6315 11.3685 41.25 22 41.25Z"
              fill="#D3EBAD"
            />
            <path
              d="M22 33C28.0751 33 33 28.0751 33 22C33 15.9249 28.0751 11 22 11C15.9249 11 11 15.9249 11 22C11 28.0751 15.9249 33 22 33Z"
              fill="#008F66"
            />
            <path
              d="M19.9375 26.813C19.5869 26.813 19.2362 26.6755 18.9681 26.4074L16.2181 23.6574C15.6819 23.1211 15.6819 22.248 16.2181 21.7118C16.7544 21.1755 17.6275 21.1755 18.1637 21.7118L19.9444 23.4924L25.85 17.5868C26.3862 17.0505 27.2594 17.0505 27.7956 17.5868C28.3319 18.123 28.3319 18.9961 27.7956 19.5324L20.9206 26.4074C20.6525 26.6755 20.3019 26.813 19.9512 26.813H19.9375Z"
              fill="white"
            />
          </svg>
          <div
            style={{
              fontSize: "24px",
              fontWeight: 600,
              lineHeight: "36px",
              letterSpacing: "-2%",
              color: "#000000",
              textAlign: "center",
              marginTop: "8px",
            }}
          >
            {modalContext.title || "예약 완료"}
          </div>
          <div
            style={{ fontSize: "16px", textAlign: "center", padding: "0 20px" }}
          >
            {modalContext.content ||
              "예약이 성공적으로 완료되었습니다. 확인 버튼을 눌러주세요."}
          </div>
          <div
            style={{
              position: "relative",
              width: "100%",
              padding: "0 20px",
              marginTop: "20px",
            }}
          >
            <Button
              style={{ backgroundColor: "#D3EBAD", color: "#008F66" }}
              onClick={() => {
                setModalContext({
                  ...modalContext,
                  isShow: false,
                });
              }}
            >
              확인
            </Button>
          </div>
        </div>
      </Modal>
    </Main>
  );
};
export default AiPage;

const Main = styled.main<{ flowState?: FlowState; display: "none" | "block" }>`
  width: 100%;
  display: flex;
  height: calc(var(--vh, 1vh) * 100);
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: ${({ display }) =>
    display === "none" ? "0px 16px 0px 16px" : "57px 16px 0px 16px"};
  overflow-x: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  --ms-overflow-style: none;
  position: relative;

  ${({ flowState }) => {
    if (flowState === "roadmap") {
      return `
  background-image: url("/images/common/dreamfarm-gradient.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-color: transparent;
  `;
    }
  }}
`;

const Modal = styled.div<{ open: boolean }>`
  display: ${({ open }) => (open ? "block" : "none")};
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  padding: 0 16px;
`;

const BackgroundLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.5;
`;

const Button = styled.button<{
  backgroundColor?: string;
  hoverBackgroundColor?: string;
  color?: string;
  hoverColor?: string;
}>`
  width: 100%;
  height: 44px;
  background-color: ${({ backgroundColor }) =>
    backgroundColor || COLORS.primary[500]};
  color: ${({ color }) => color || COLORS.primary[100]};
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 15px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: -2%;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${({ hoverBackgroundColor }) =>
      hoverBackgroundColor || COLORS.primary[600]};
    color: ${({ hoverColor }) => hoverColor || COLORS.primary[100]};
  }

  &:disabled {
    background-color: ${COLORS.grayscale[200]};
    color: ${COLORS.grayscale[500]};
    cursor: not-allowed;
  }
`;

const CancelButton = styled.button`
  width: 100%;
  height: 44px;
  background-color: white;
  color: ${COLORS.primary[600]};
  border-radius: 8px;
  border: 1px solid ${COLORS.primary[200]};
  cursor: pointer;
  font-size: 15px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: -2%;
  transition: border 0.2s ease-in-out;

  &:hover {
    border: 1px solid ${COLORS.primary[600]};
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
  gap: 12px;
`;

const SnapBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 280px;
  overflow: auto;
  border-radius: 8px;
  padding: 8px 11px;
  gap: 9px;
  background-color: white;

  &::-webkit-scrollbar {
    display: none;
  }
  --ms-overflow-style: none;
  scrollbar-width: none;
`;

const SnapSlideItem = styled(SwiperSlide)`
  position: relative;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30px;
  font-size: 20px;
  line-height: 30px;
  font-weight: 600;
  letter-spacing: -2%;
  color: ${COLORS.primary[200]};
  background-color: transparent;
  border-radius: 8px;
  overflow: visible;
  cursor: pointer;
`;

const Highlight = styled.div<{ selected?: boolean }>`
  position: absolute;
  width: 100%;
  height: 46px;
  background-color: ${COLORS.primary[100]};
  border-radius: 8px;
  display: ${({ selected }) => (selected ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -1%;
  color: ${COLORS.primary[600]};
  z-index: 10;
`;

const BackButton = styled.button`
  position: absolute;
  top: 58px;
  left: 16px;
  width: 32px;
  height: 32px;
  cursor: pointer;
  z-index: 100;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  mix-blend-mode: normal;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: scale 0.2s ease-in-out;

  svg {
    width: 24px;
    height: 24px;
  }

  &:hover {
    scale: 1.1;
  }
`;
