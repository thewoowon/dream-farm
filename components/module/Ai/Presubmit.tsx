import { COLORS } from "@/styles/color";
import { formatToKoreanMoney, mapSliderToAmount } from "@/utils";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

type PresubmitProps = {
  state: FlowState;
  next: () => void;
  context: FlowContext;
  generateRoadMap: () => Promise<void>;
  setFlowState: (state: FlowState) => void;
};

const Presubmit = ({
  state,
  next,
  context,
  generateRoadMap,
  setFlowState,
}: PresubmitProps) => {
  return (
    <Wrapper>
      <TitleBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        마지막 정리
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <DiplayBox>
            <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
              <div
                style={{
                  color: "#008F66",
                  fontWeight: 600,
                  fontSize: "16px",
                  lineHeight: "24px",
                  letterSpacing: "-2%",
                  width: "84px",
                  textAlign: "left",
                }}
              >
                희망지역
              </div>
              <div
                style={{
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "24px",
                  letterSpacing: "-2%",
                }}
              >
                {context.region || "선택 안함"}
              </div>
            </div>
            <div
              style={{
                color: "#E51414",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "24px",
                letterSpacing: "-2%",
                cursor: "pointer",
              }}
              onClick={() => {
                // 돌아가기
                setFlowState("region");
              }}
            >
              변경
            </div>
          </DiplayBox>
          <DiplayBox>
            <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
              <div
                style={{
                  color: "#008F66",
                  fontWeight: 600,
                  fontSize: "16px",
                  lineHeight: "24px",
                  letterSpacing: "-2%",
                  width: "84px",
                  textAlign: "left",
                }}
              >
                희망작물
              </div>
              <div
                style={{
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "24px",
                  letterSpacing: "-2%",
                }}
              >
                {context.crop || "선택 안함"}
              </div>
            </div>
            <div
              style={{
                color: "#E51414",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "24px",
                letterSpacing: "-2%",
                cursor: "pointer",
              }}
              onClick={() => {
                // 돌아가기
                setFlowState("crop");
              }}
            >
              변경
            </div>
          </DiplayBox>
          <DiplayBox>
            <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
              <div
                style={{
                  color: "#008F66",
                  fontWeight: 600,
                  fontSize: "16px",
                  lineHeight: "24px",
                  letterSpacing: "-2%",
                  width: "84px",
                  textAlign: "left",
                }}
              >
                예산
              </div>
              <div
                style={{
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "24px",
                  letterSpacing: "-2%",
                }}
              >
                {context.budget
                  ? context.budget
                      .split("~")
                      .map((bud) =>
                        formatToKoreanMoney(mapSliderToAmount(Number(bud)))
                      ).join(" ~ ")
                  : "선택 안함"}
              </div>
            </div>
            <div
              style={{
                color: "#E51414",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "24px",
                letterSpacing: "-2%",
                cursor: "pointer",
              }}
              onClick={() => {
                // 돌아가기
                setFlowState("budget");
              }}
            >
              변경
            </div>
          </DiplayBox>
          <DiplayBox>
            <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
              <div
                style={{
                  color: "#008F66",
                  fontWeight: 600,
                  fontSize: "16px",
                  lineHeight: "24px",
                  letterSpacing: "-2%",
                  width: "84px",
                  textAlign: "left",
                }}
              >
                농업 경험
              </div>
              <div
                style={{
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "24px",
                  letterSpacing: "-2%",
                }}
              >
                {context.experience}
              </div>
            </div>
            <div
              style={{
                color: "#E51414",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "24px",
                letterSpacing: "-2%",
                cursor: "pointer",
              }}
              onClick={() => {
                // 돌아가기
                setFlowState("experience");
              }}
            >
              변경
            </div>
          </DiplayBox>
        </div>
      </TitleBox>
      <ButtonWrapper>
        <Button
          onClick={async () => {
            return await generateRoadMap();
          }}
          disabled={context.experience ? false : true}
        >
          귀농 로드맵 만들기
        </Button>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default Presubmit;

const Wrapper = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  padding: 50px 0;
  gap: 35px;
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

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  bottom: 20px;
  gap: 12px;
`;

const DiplayBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 20px 10px;
  transition: all 0.2s ease-in-out;
  border-bottom: 1px solid ${COLORS.grayscale[300]};
`;
