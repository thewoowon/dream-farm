import useHeaderStore from "@/store/useHeaderStore";
import { COLORS } from "@/styles/color";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const RESULTS = `리스크는 OOO, 성공 확률을 높이기 위해서는 XXX에 집중해야 합니다.
            추천 작물인 사과는 의성군의 기후와 토양에 적합하며, 예상 수익률은 약
            X%입니다. 다이내믹한 시장 환경에서 사과 재배는 안정적인 수익을
            제공할 것으로 예상됩니다. 또한, 사과 재배는 지역 경제에 긍정적인
            영향을 미칠 것으로 기대...`;

type RoadMapProps = {
  state: FlowState;
  next: () => void;
  context: FlowContext;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
};

const RoadMap = ({ state, next, context, data }: RoadMapProps) => {
  const router = useRouter();
  const { change } = useHeaderStore();

  function formatKoreanUnit(num: number): string {
    const units = [
      { value: 1_0000_0000_0000, label: "조" },
      { value: 1_0000_0000, label: "억" },
      { value: 1_0000_000, label: "천만" },
      { value: 1_0000_0, label: "백만" },
    ];

    for (const unit of units) {
      if (num >= unit.value) {
        return `${Math.floor(num / unit.value)}${unit.label}`;
      }
    }

    return num.toLocaleString(); // 만약 단위가 작으면 그냥 숫자 표시
  }

  return (
    <Wrapper>
      <GridBox>
        <GridItem>
          <FlexColumnBox>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 8.25C11.278 8.25 8.25 11.278 8.25 15C8.25 18.722 11.278 21.75 15 21.75C18.722 21.75 21.75 18.722 21.75 15C21.75 11.278 18.722 8.25 15 8.25ZM14 14.5H16C16.827 14.5 17.5 15.173 17.5 16C17.5 16.827 16.827 17.5 16 17.5H15.5V18.5C15.5 18.776 15.276 19 15 19C14.724 19 14.5 18.776 14.5 18.5V17.5H13C12.724 17.5 12.5 17.276 12.5 17C12.5 16.724 12.724 16.5 13 16.5H16C16.276 16.5 16.5 16.275 16.5 16C16.5 15.725 16.276 15.5 16 15.5H14C13.173 15.5 12.5 14.827 12.5 14C12.5 13.173 13.173 12.5 14 12.5H14.5V11.5C14.5 11.224 14.724 11 15 11C15.276 11 15.5 11.224 15.5 11.5V12.5H17C17.276 12.5 17.5 12.724 17.5 13C17.5 13.276 17.276 13.5 17 13.5H14C13.724 13.5 13.5 13.725 13.5 14C13.5 14.275 13.724 14.5 14 14.5ZM2 6V4C2 2.9 2.9 2 4 2H14C15.1 2 16 2.9 16 4V6C16 6.28 15.94 6.55 15.84 6.79C15.57 6.76 15.28 6.75 15 6.75C13.78 6.75 12.61 7.02 11.57 7.5H4C3.62 7.5 3.25 7.56 2.91 7.68C2.36 7.32 2 6.7 2 6ZM2 13V11C2 9.9 2.9 9 4 9H9.35C7.75 10.5 6.75 12.64 6.75 15H4C2.9 15 2 14.1 2 13ZM10.64 22H4C2.9 22 2 21.1 2 20V18C2 17.3 2.36 16.68 2.91 16.32C3.25 16.44 3.62 16.5 4 16.5H6.89C7.32 18.82 8.71 20.8 10.64 22Z"
                fill="#008F66"
              />
            </svg>
            예산
          </FlexColumnBox>
          {formatKoreanUnit(Number(data.money || 0))} 원
        </GridItem>
        <GridItem>
          <FlexColumnBox>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M19 4H18V3C18 2.4 17.6 2 17 2C16.4 2 16 2.4 16 3V4H8V3C8 2.4 7.6 2 7 2C6.4 2 6 2.4 6 3V4H5C3.3 4 2 5.3 2 7V8H22V7C22 5.3 20.7 4 19 4ZM2 19C2 20.7 3.3 22 5 22H19C20.7 22 22 20.7 22 19V10H2V19ZM17 12C17.6 12 18 12.4 18 13C18 13.6 17.6 14 17 14C16.4 14 16 13.6 16 13C16 12.4 16.4 12 17 12ZM17 16C17.6 16 18 16.4 18 17C18 17.6 17.6 18 17 18C16.4 18 16 17.6 16 17C16 16.4 16.4 16 17 16ZM12 12C12.6 12 13 12.4 13 13C13 13.6 12.6 14 12 14C11.4 14 11 13.6 11 13C11 12.4 11.4 12 12 12ZM12 16C12.6 16 13 16.4 13 17C13 17.6 12.6 18 12 18C11.4 18 11 17.6 11 17C11 16.4 11.4 16 12 16ZM7 12C7.6 12 8 12.4 8 13C8 13.6 7.6 14 7 14C6.4 14 6 13.6 6 13C6 12.4 6.4 12 7 12ZM7 16C7.6 16 8 16.4 8 17C8 17.6 7.6 18 7 18C6.4 18 6 17.6 6 17C6 16.4 6.4 16 7 16Z"
                fill="#008F66"
              />
            </svg>
            준비 기간
          </FlexColumnBox>
          {data.period || ""} 개월
        </GridItem>
        <GridItem>
          <FlexColumnBox>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M2.91167 2.95996C1.8559 2.95996 1 3.77452 1 4.77934V9.45999C1 13.0499 4.05778 15.96 7.82975 15.96C7.90881 15.96 7.98755 15.9587 8.06597 15.9562C7.73198 15.06 7.55019 14.0953 7.55019 13.0902C7.55019 12.2418 7.67969 11.4222 7.9209 10.6483L6.15246 8.96576C5.83267 8.6615 5.8326 8.16811 6.1523 7.86375C6.472 7.5594 6.99043 7.55932 7.31023 7.8636L8.59254 9.08366C9.55101 7.3615 11.1081 5.98749 13 5.21274C11.7476 3.83307 9.89582 2.95996 7.82975 2.95996H2.91167Z"
                fill="#008F66"
              />
              <path
                d="M10.104 16.9823L7.2354 19.673C6.92137 19.9676 6.92156 20.4449 7.23582 20.7393C7.5501 21.0336 8.05944 21.0335 8.37347 20.739L11.2418 18.0484C12.4802 18.9768 14.051 19.5318 15.7601 19.5318C19.7586 19.5318 23 16.4937 23 12.7459V7.81067C23 6.78855 22.1159 5.95996 21.0254 5.95996H15.7601C11.7615 5.95996 8.52011 8.99813 8.52011 12.7459C8.52011 14.3485 9.1128 15.8213 10.104 16.9823ZM16.3338 13.2722L12.3863 16.972C11.9552 16.6692 11.5719 16.3097 11.249 15.9054L15.1961 12.2059C15.5104 11.9114 16.0196 11.9114 16.3338 12.2059C16.648 12.5003 16.648 12.9777 16.3338 13.2722Z"
                fill="#008F66"
              />
            </svg>
            (추천)작물
          </FlexColumnBox>

          {data.crop}
        </GridItem>
        <GridItem>
          <FlexColumnBox>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M18.364 4.16341C14.8493 0.648655 9.15075 0.648655 5.63603 4.16341C2.12132 7.67816 2.12132 13.3767 5.63603 16.8914L10.6641 21.9195C10.8395 22.0949 11.0478 22.2341 11.277 22.3291C11.5062 22.424 11.7519 22.4729 12 22.4729C12.2481 22.4729 12.4938 22.424 12.723 22.3291C12.9523 22.2341 13.1605 22.0949 13.336 21.9195L18.364 16.8914C21.8787 13.3767 21.8787 7.67816 18.364 4.16341ZM12 13.8001C10.1925 13.8001 8.72726 12.3349 8.72726 10.5274C8.72726 8.71987 10.1925 7.25463 12 7.25463C13.8075 7.25463 15.2727 8.71987 15.2727 10.5274C15.2727 12.3349 13.8075 13.8001 12 13.8001Z"
                fill="#008F66"
              />
            </svg>
            지역
          </FlexColumnBox>
          {data.location || ""}
        </GridItem>
      </GridBox>
      <AnalysisBox>
        <div
          style={{
            fontSize: "20px",
            fontWeight: 600,
            lineHeight: "24px",
            letterSpacing: "-2%",
            color: "#006910",
            textAlign: "center",
          }}
        >
          종합분석
        </div>
        <div>{data.summary.slice(0, 100) + "..."}</div>
        <MoreButton
          onClick={() => {
            router.push("/analysis");
            change("none");
          }}
        >
          더보기
        </MoreButton>
      </AnalysisBox>
      <ButtonWrapper>
        <Button
          onClick={() => {
            change("none");
            router.push("/mentor");
          }}
          disabled={context.region ? false : true}
        >
          멘토 상담 예약
        </Button>
        <Button
          onClick={() => {
            change("none");
            router.push("/voice");
          }}
          disabled={context.region ? false : true}
        >
          AI와 즉시 상담
        </Button>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default RoadMap;

const Wrapper = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  padding: 24px 0 50px 0;
  gap: 35px;
`;

const TitleBox = styled(motion.div)`
  width: 100%;
  text-align: center;
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
  flex-direction: row;
  justify-content: center;
  position: relative;
  bottom: 20px;
  gap: 12px;
`;

const GridBox = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  gap: 10px;
`;

const GridItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 10px;
  border-bottom: 1px solid ${COLORS.grayscale[200]};
  background-color: white;
  opacity: 0.7;
  border-radius: 10px;
  padding: 23px 25px;
  font-size: 24px;
  font-weight: 700;
  line-height: 36px;
  letter-spacing: -2%;
  color: #000000;
`;

const FlexRowBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const FlexColumnBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: -2%;
  gap: 6px;
  color: #008f66;
`;

const AnalysisBox = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 20px;
  background-color: rgba(23, 187, 124, 0.3);
  border-radius: 10px;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: -2%;
  color: #000000;
`;

const AnalysisDetailBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  padding: 20px;
  background-color: rgba(23, 187, 124, 0.3);
  border-radius: 10px;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: -2%;
  color: #000000;
  overflow-y: auto;
  // 스크롤바 숨기기
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  --ms-overflow-style: none;
`;

const MoreButton = styled.div`
  width: 100%;
  border-top: 0.5px solid #5b5b5b;
  padding-top: 16px;
  color: #000000;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -2%;
  cursor: pointer;
  text-align: center;
  margin-top: 10px;
  &:hover {
    text-decoration: underline;
  }
  &:active {
    color: #006910;
  }
`;
