import { COLORS } from "@/styles/color";
import styled from "@emotion/styled";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { Range } from "react-range";

type EnterBudgetProps = {
  state: FlowState;
  next: () => void;
  context: FlowContext;
  setContext: (budget: string) => void;
};

const STEP = 1;
const MIN = 0;
const MAX = 100;

const Track = styled.div`
  height: 6px;
  width: 100%;
  background: #ddd;
  border-radius: 3px;
`;

const TrackHighlight = styled.div`
  height: 6px;
  background: #4caf50;
  border-radius: 3px;
`;

const Thumb = styled.div`
  width: 32px;
  height: 32px;
  background: #ffffff;
  border-radius: 50%;
  border: 1px solid #d0d0d0;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
  cursor: grab;
`;

function DoubleRangeSlider() {
  const [values, setValues] = useState([2000, 8000]);

  return (
    <div style={{ width: "100%" }}>
      <Range
        step={STEP}
        min={MIN}
        max={MAX}
        values={values}
        onChange={(newValues) => setValues(newValues)}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{ height: "36px", display: "flex", width: "100%" }}
          >
            <Track ref={props.ref}>
              <TrackHighlight
                style={{
                  marginLeft: `${(values[0] / MAX) * 100}%`,
                  width: `${((values[1] - values[0]) / MAX) * 100}%`,
                }}
              />
              {children}
            </Track>
          </div>
        )}
        renderThumb={({ props, index }) => (
          <Thumb
            {...props}
            key={index}
            style={{
              ...props.style,
            }}
          />
        )}
      />
    </div>
  );
}

const EnterBudget = ({
  
  state,
  next,
  context,
  setContext,
}: EnterBudgetProps) => {
  const [minValue, setMinValue] = useState(2000);
  const [maxValue, setMaxValue] = useState(8000);
  const min = 20;
  const max = 80;
  return (
    <Wrapper>
      <TitleBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        정착에 사용가능한
        <br />
        예산은 총 얼마인가요?
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            gap: "12px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ flex: 1, height: "58px" }}>
            <input
              value={minValue + "만원"}
              onChange={(e) =>
                setMinValue(Number(e.target.value.replace("만원", "")))
              }
              style={{
                width: "100%",
                height: "100%",
                outline: "none",
                backgroundColor: "white",
                border: "0.5px solid #d0d0d0",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: "24px",
                letterSpacing: "-2%",
                textAlign: "center",
              }}
            />
          </div>
          <div
            style={{
              fontWeight: 400,
            }}
          >
            ~
          </div>
          <div style={{ flex: 1, height: "58px" }}>
            <input
              value={maxValue + "만원"}
              onChange={(e) =>
                setMaxValue(Number(e.target.value.replace("만원", "")))
              }
              style={{
                width: "100%",
                height: "100%",
                outline: "none",
                backgroundColor: "white",
                border: "0.5px solid #d0d0d0",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: "24px",
                letterSpacing: "-2%",
                textAlign: "center",
              }}
            />
          </div>
        </div>
        {/* <RangeSlider
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
        /> */}
        {/* <DoubleRangeSlider /> */}
      </TitleBox>
      <ButtonWrapper>
        <Button onClick={next} disabled={context.budget ? false : true}>
          다음
        </Button>
        <HollowButton
          onClick={() => {
            setContext("");
            next();
          }}
        >
          잘 모르겠어요
        </HollowButton>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default EnterBudget;

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

const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 12px;
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

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  bottom: 20px;
  gap: 12px;
`;

const ScoreBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
`;

const ScoreItem = styled.div<{
  selected: boolean;
}>`
  width: 100%;
  height: 44px;
  background-color: white;
  color: ${({ selected }) => (selected ? COLORS.primary[600] : "#343a40")};
  border-radius: 8px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: -2%;
  transition: all 0.2s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RangeSlider = styled.input`
  -webkit-appearance: none;
  width: 100%;
  height: 6px;
  background: #ddd;
  border-radius: 3px;
  outline: none;
  cursor: pointer;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 32px;
    height: 32px;
    background: #ffffff;
    border-radius: 50%;
    border: 1px solid #d0d0d0;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
    transition: background 0.3s ease;
    cursor: pointer;
  }

  &::-webkit-slider-thumb:hover {
    background: #45a049;
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background: #4caf50;
    border: none;
    border-radius: 50%;
    cursor: pointer;
  }

  &::-moz-range-track {
    background: #ddd;
    height: 6px;
    border-radius: 3px;
  }

  &::-ms-thumb {
    width: 20px;
    height: 20px;
    background: #4caf50;
    border-radius: 50%;
    cursor: pointer;
  }

  &::-ms-track {
    background: transparent;
    border-color: transparent;
    color: transparent;
    height: 6px;
  }
`;
