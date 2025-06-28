import { COLORS } from "@/styles/color";
import styled from "@emotion/styled";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { Range } from "react-range";
import { formatToKoreanMoney, mapSliderToAmount } from "@/utils";

type EnterBudgetProps = {
  state: FlowState;
  next: () => void;
  context: FlowContext;
  setContext: (budget: string) => void;
};

const STEP = 1;
const MIN = 0;
const MAX = 100;

const SliderWrapper = styled.div`
  flex: 1;
  width: 100%;
`;

const Track = styled.div`
  height: 6px;
  background: #ddd;
  border-radius: 3px;
`;

const Thumb = styled.div`
  height: 32px;
  width: 32px;
  background-color: #ffffff;
  border-radius: 50%;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.05);
  border: 1px solid #d9d9d9;
`;

const RangeLabel = styled.div`
  width: 100%;
  margin-top: 24px;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TwoThumbSlider = ({
  values,
  setValues,
}: {
  values: number[];
  setValues: (values: number[]) => void;
}) => {
  return (
    <SliderWrapper>
      <Range
        step={STEP}
        min={MIN}
        max={MAX}
        values={values}
        onChange={setValues}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "6px",
              width: "100%",
              background: `linear-gradient(to right, #ddd ${values[0]}%, #008F66 ${values[0]}%, #008F66 ${values[1]}%, #ddd ${values[1]}%)`,
              borderRadius: "3px",
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props, index }) => <Thumb {...props} key={index} />}
      />
      <RangeLabel>
        <div
          style={{
            color: "#B0B0B0",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "20px",
          }}
        >
          {formatToKoreanMoney(mapSliderToAmount(values[0]))}
        </div>
        <div
          style={{
            color: "#B0B0B0",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "20px",
          }}
        >
          {formatToKoreanMoney(mapSliderToAmount(values[1]))}
        </div>
      </RangeLabel>
    </SliderWrapper>
  );
};

const EnterBudget = ({
  state,
  next,
  context,
  setContext,
}: EnterBudgetProps) => {
  const [values, setValues] = useState([MIN, MAX]);
  const [tipToggle, setTipToggle] = useState(false);
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
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "36px",
          }}
        >
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
                readOnly
                value={formatToKoreanMoney(mapSliderToAmount(values[0]))}
                onChange={(e) =>
                  setValues([
                    Number(e.target.value.replace("만원", "")),
                    values[1],
                  ])
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
                readOnly
                value={formatToKoreanMoney(mapSliderToAmount(values[1]))}
                onChange={(e) =>
                  setValues([
                    values[0],
                    Number(e.target.value.replace("만원", "")),
                  ])
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
          <TwoThumbSlider values={values} setValues={setValues} />
        </div>
      </TitleBox>
      <ButtonWrapper>
        <div
          onClick={() => setTipToggle(!tipToggle)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: "6px",
            color: "#008F66",
            fontSize: "14px",
            fontWeight: 500,
            lineHeight: "20px",
            padding: "6px",
          }}
        >
          <svg width="36" height="20" viewBox="0 0 36 20" fill="none">
            <rect width="36" height="20" rx="10" fill="#008F66" />
            <path
              d="M7.92383 6.5918V5.10156H15.8125V6.5918H12.7637V15H10.9863V6.5918H7.92383ZM18.9844 5.10156V15H17.207V5.10156H18.9844ZM20.8301 15V5.10156H24.5488C26.8184 5.10156 28.0352 6.48242 28.0352 8.38281C28.0352 10.2832 26.8047 11.6504 24.5215 11.6504H22.6074V15H20.8301ZM22.6074 10.1875H24.2754C25.6152 10.1875 26.2168 9.43555 26.2168 8.38281C26.2168 7.31641 25.6152 6.5918 24.2754 6.5918H22.6074V10.1875Z"
              fill="white"
            />
          </svg>
          예산은 어떤게 구성될까요?
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            {tipToggle ? (
              <path
                d="M12.9951 9.98633L7.99789 4.9891L3.00066 9.98633"
                stroke="#069143"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : (
              <path
                d="M3.00488 6.01465L8.00211 11.0119L12.9993 6.01465"
                stroke="#069143"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </svg>
        </div>
        {tipToggle && (
          <div
            style={{
              color: "#000000",
              fontSize: "12px",
              fontWeight: 400,
              lineHeight: "12px",
              paddingLeft: "6px",
            }}
          >
            예산 구성은 토지, 주택, 농작물, 농기구, 운영비, 생활비 등을 포함하면
            됩니다.
          </div>
        )}
        <Button
          onClick={() => {
            setContext(`${values[0]} ~ ${values[1]}`);
            next();
          }}
          disabled={values ? false : true}
        >
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
  gap: 10px;
  position: relative;
  overflow: scroll;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, and Opera */
  }
`;

const TitleBox = styled(motion.div)`
  flex: 1;
  width: 100%;
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
  letter-spacing: -2%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 75px;
  overflow: scroll;
  padding-top: 20px;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, and Opera */
  }
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
  position: relative;
  bottom: 20px;
  gap: 12px;
`;
