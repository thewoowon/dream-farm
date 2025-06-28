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
