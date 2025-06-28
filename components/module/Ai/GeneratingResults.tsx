import { useEffect, useState } from "react";
import { TYPOGRAPHY } from "@/styles/typography";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { css } from "@emotion/react";

type GeneratingResultsProps = {
  state: FlowState;
  context: FlowContext;
  loading: boolean;
};

const CircularWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .progress-ring {
    display: block;
    width: 104px;
    height: 104px;
    transform: rotate(-90deg);
  }

  .progress-ring__circle {
    transition: stroke-dashoffset 0.35s;
    transform: rotate(0deg);
    transform-origin: center;
  }

  .center-label {
    position: absolute;
    font-size: 18px;
    font-weight: bold;
    color: #333;
  }

  .svg-container {
    position: relative;
    width: 104px;
    height: 104px;
  }
`;

function CircularGauge({ percentage }: { percentage: number }) {
  const radius = 52;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <CircularWrapper>
      <div className="svg-container">
        <div className="center-label">{percentage}%</div>
        <svg className="progress-ring" width={radius * 2} height={radius * 2}>
          <circle
            stroke="#D9D9D9"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            stroke="#4caf50"
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className="progress-ring__circle"
          />
        </svg>
      </div>
    </CircularWrapper>
  );
}

const GeneratingResults = ({
  state,
  context,
  loading,
}: GeneratingResultsProps) => {
  const [percentage, setPercentage] = useState(1);

  useEffect(() => {
    const duration = 30_000; // 30초
    const steps = 100;
    const interval = duration / steps; // = 300ms

    const timer = setInterval(() => {
      setPercentage((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <Wrapper>
      <TitleBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        지금 귀농을 위한
        <br />
        정착 로드맵을
        <br />
        설계하고 있어요.
        <div>
          <CircularGauge percentage={percentage} />
        </div>
        <div>조금만 기다려주세요</div>
      </TitleBox>
    </Wrapper>
  );
};

export default GeneratingResults;

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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 75px;
`;
