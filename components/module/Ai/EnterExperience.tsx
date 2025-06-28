import GaugeBar from "@/components/element/GaugeBar";
import { COLORS } from "@/styles/color";
import { TYPOGRAPHY } from "@/styles/typography";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";

const EXPERIENCE_OPTIONS: {
  level: string;
  description: string;
}[] = [
  { level: "입문", description: "농업, 농사, 농촌 경험이 없어요." },
  { level: "초급", description: "주말농장 정도 약간 경험 있어요." },
  { level: "중급", description: "어떻게 시작할지, 운영할지 알고 있어요." },
  { level: "고급", description: "농업 경력이 있어요." },
];

type EnterExperienceProps = {
  state: FlowState;
  next: () => void;
  context: FlowContext;
  setContext: (subject: string) => void;
};

const EnterExperience = ({
  
  state,
  next,
  context,
  setContext,
}: EnterExperienceProps) => {
  return (
    <Wrapper>
      <TitleBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        농업 경험에 대해서
        <br />
        알려주세요.
        <SubjectBox>
          {EXPERIENCE_OPTIONS.map((experience) => (
            <SubjectItem
              key={experience.level}
              onClick={() => setContext(experience.level)}
              selected={context.experience === experience.level}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    color: "#008f66",
                    fontSize: "16px",
                    fontWeight: 600,
                    lineHeight: "24px",
                    letterSpacing: "-2%",
                  }}
                >
                  {experience.level}
                </div>
                {experience.description && (
                  <span
                    style={{
                      color: "#000000",
                      fontSize: "16px",
                      fontWeight: 400,
                      lineHeight: "24px",
                      letterSpacing: "-2%",
                    }}
                  >
                    {experience.description}
                  </span>
                )}
              </div>
              {context.experience === experience.level && (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_645_5514)">
                    <path
                      d="M19.5 6.5L9.75 17.25L4.5 12.0005"
                      stroke="#008f66"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_645_5514">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              )}
            </SubjectItem>
          ))}
        </SubjectBox>
      </TitleBox>
      <ButtonWrapper>
        <Button onClick={next} disabled={context.experience ? false : true}>
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

export default EnterExperience;

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

const SubjectBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const SubjectItem = styled.div<{
  selected: boolean;
}>`
  width: 100%;
  height: 48px;
  background-color: ${(props) => (props.selected ? "#e6f7f2" : "white")};
  border-width: 0.5px;
  border-radius: 8px;
  border-color: #d0d0d0;
  cursor: pointer;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: -2%;
  transition: all 0.2s ease-in-out;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.05);
`;
