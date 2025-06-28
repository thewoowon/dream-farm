"use client";

import useHeaderStore from "@/store/useHeaderStore";
import { COLORS } from "@/styles/color";
import styled from "@emotion/styled";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const MENTOR_LIST: {
  id: number;
  name: string;
  image: string;
  description: string;
  category: string;
}[] = [
  {
    id: 1,
    name: "박유천",
    image: "/images/common/mentor-1.png",
    description: "과수 재배",
    category: "농업",
  },
  {
    id: 2,
    name: "이연휘",
    image: "/images/common/mentor-2.png",
    description: "과수 재배",
    category: "농업",
  },
  {
    id: 3,
    name: "석준연",
    image: "/images/common/mentor-3.png",
    description: "과수 재배",
    category: "농업",
  },
  {
    id: 4,
    name: "김상훈",
    image: "/images/common/mentor-4.png",
    description: "과수 재배",
    category: "농업",
  },
  {
    id: 5,
    name: "박기황",
    image: "/images/common/mentor-5.png",
    description: "과수 재배",
    category: "농업",
  },
  {
    id: 6,
    name: "배귀운",
    image: "/images/common/mentor-6.png",
    description: "과수 재배",
    category: "농업",
  },
];

const OpenButton = styled.button`
  position: absolute;
  bottom: 24px;
  right: 24px;
  background-color: #111;
  color: #fff;
  padding: 12px 16px;
  border-radius: 8px;
  z-index: 50;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
`;

const Overlay = styled(motion.div)`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 40;
`;

const SheetContainer = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  padding: 24px;
  z-index: 50;
  box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.15);
`;

const SheetHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const SheetTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
`;

const BottomSheet = ({
  open,
  setOpen,
  mentor,
  setReservationNumber,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mentor: {
    id: number;
    name: string;
    description: string;
    image: string;
    category: string;
  };
  setReservationNumber: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [value, setValue] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  return (
    <AnimatePresence>
      {open && (
        <>
          <Overlay
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <SheetContainer
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <SheetHeader>
              <SheetTitle>예약정보</SheetTitle>
              <button onClick={() => setOpen(false)}>닫기</button>
            </SheetHeader>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  lineHeight: "24px",
                  letterSpacing: "-2%",
                  color: "#000000",
                }}
              >
                <div
                  style={{
                    color: "#008F66",
                  }}
                >
                  {mentor.name} 멘토에게
                </div>
                연락받을 번호를 기재해주세요.
              </div>
              <div style={{ flex: 1, height: "58px" }}>
                <input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  style={{
                    width: "100%",
                    height: "48px",
                    outline: "none",
                    backgroundColor: "white",
                    border: "0.5px solid #d0d0d0",
                    borderRadius: "12px",
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "24px",
                    letterSpacing: "-2%",
                    textAlign: "left",
                    padding: "0 16px",
                  }}
                  placeholder="010-0000-0000"
                />
              </div>

              <div
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  lineHeight: "24px",
                  letterSpacing: "-2%",
                  color: "#000000",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "8px",
                  marginTop: "20px",
                }}
              >
                <svg
                  onClick={() => setTermsAccepted(!termsAccepted)}
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                >
                  <path
                    d="M11 22C17.0751 22 22 17.0751 22 11C22 4.92487 17.0751 0 11 0C4.92487 0 0 4.92487 0 11C0 17.0751 4.92487 22 11 22Z"
                    fill={termsAccepted ? "#008F66" : "#D0D0D0"}
                  />
                  <path
                    d="M8.93748 15.813C8.58686 15.813 8.23623 15.6755 7.96811 15.4074L5.21811 12.6574C4.68186 12.1211 4.68186 11.248 5.21811 10.7118C5.75436 10.1755 6.62748 10.1755 7.16373 10.7118L8.94436 12.4924L14.85 6.58676C15.3862 6.05051 16.2594 6.05051 16.7956 6.58676C17.3319 7.12301 17.3319 7.99613 16.7956 8.53238L9.92061 15.4074C9.65248 15.6755 9.30186 15.813 8.95123 15.813H8.93748Z"
                    fill="white"
                  />
                </svg>
                <div>
                  개인정보 수집 및 제공 동의
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: 400,
                      lineHeight: "20px",
                      letterSpacing: "-2%",
                      color: COLORS.grayscale[600],
                      marginTop: "8px",
                    }}
                  >
                    * 귀농 멘토링을 위한 수집/전달에 대하여 동의합니다.
                    <br />* 개인정보 수집 1년 후 파기
                  </div>
                </div>
              </div>
            </div>

            <Button
              onClick={() => {
                if (!termsAccepted) {
                  alert("개인정보 수집 및 제공 동의에 체크해주세요.");
                  return;
                }
                setOpen(false);
                setReservationNumber(value);
                // 여기서 예약 로직을 추가할 수 있습니다.
              }}
              disabled={!termsAccepted || !value || value.length < 10}
              style={{
                marginTop: "24px",
                width: "100%",
                height: "48px",
                backgroundColor: termsAccepted
                  ? "#008F66"
                  : COLORS.grayscale[200],
                color: termsAccepted ? "white" : COLORS.grayscale[500],
                cursor: termsAccepted ? "pointer" : "not-allowed",
              }}
            >
              예약하기
            </Button>
          </SheetContainer>
        </>
      )}
    </AnimatePresence>
  );
};

const MentorPage = () => {
  const router = useRouter();
  const { change } = useHeaderStore();
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [selectedMentor, setSelectedMentor] = useState<number | null>(null);
  const [reservationNumber, setReservationNumber] = useState<string>("");

  useEffect(() => {
    if (reservationNumber) {
      // 예약 날짜가 변경되면 모달을 열도록 설정
      setModalOpen(true);
    }
  }, [reservationNumber]);

  return (
    <Main>
      <div
        style={{
          width: "100%",
          height: "57px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "16px",
          fontWeight: 600,
          lineHeight: "24px",
          letterSpacing: "-2%",
          color: "#000000",
          minHeight: "57px",
        }}
      >
        <svg
          onClick={() => {
            router.push("/ai/read");
            change("block");
          }}
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
        >
          <path
            d="M14.998 19.5L7.99805 12.5L14.998 5.5"
            stroke="#1E1E1E"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        멘토 상담 예약
        <div></div>
      </div>
      <TitleBox>
        상담 받을 멘토를
        <br />
        선택해 주세요.
      </TitleBox>
      <GridBox>
        {MENTOR_LIST.map((mentor) => (
          <GridItem
            key={mentor.name}
            onClick={() => {
              setSelectedMentor(mentor.id);
            }}
          >
            <div style={{ width: "fit-content", position: "relative" }}>
              {selectedMentor === mentor.id && (
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  style={{
                    position: "absolute",
                    right: "0",
                    top: "5",
                    zIndex: "1",
                  }}
                >
                  <rect width="26" height="26" rx="13" fill="#008F66" />
                  <path
                    d="M7.5 13L11.5 17.5L18.5 8.5"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50px",
                  overflow: "hidden",
                  position: "relative",
                  border:
                    selectedMentor === mentor.id ? "5px solid #008F66" : "none",
                }}
              >
                <Image
                  src={mentor.image}
                  alt={mentor.name}
                  fill
                  style={{ objectFit: "contain" }}
                  sizes="100px"
                  priority
                />
              </div>
            </div>
            <div>
              <NameBox>{`${mentor.name} 멘토`}</NameBox>
              <DescriptionBox>{mentor.description}</DescriptionBox>
            </div>
          </GridItem>
        ))}
      </GridBox>
      <ButtonWrapper>
        <Button
          onClick={() => {
            if (selectedMentor) {
              setOpen(true);
            } else {
              alert("멘토를 선택해주세요.");
            }
          }}
          disabled={selectedMentor ? false : true}
        >
          예약하기
        </Button>
      </ButtonWrapper>
      <BottomSheet
        open={open}
        setOpen={setOpen}
        mentor={
          MENTOR_LIST.find((mentor) => mentor.id === selectedMentor) || {
            id: 0,
            name: "",
            description: "",
            image: "",
            category: "",
          }
        }
        setReservationNumber={setReservationNumber}
      />
      <Modal open={modalOpen}>
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
            예약성공
          </div>
          <div style={{ fontSize: "16px", textAlign: "center" }}>
            예약이 완료되었어요.
            <br />
            멘토님께서 고객님의 전화번호로
            <br />
            연락드릴게요.
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
                setModalOpen(false);
                router.push("/ai/read");
                change("block");
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

export default MentorPage;

const Main = styled.main`
  width: 100%;
  display: flex;
  height: calc(var(--vh, 1vh) * 100);
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 0px 16px 20px 16px;

  overflow-x: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  --ms-overflow-style: none;
  position: relative;
`;

const GridBox = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 10px;
`;

const GridItem = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px;
  border-radius: 10px;
  font-size: 24px;
  font-weight: 700;
  line-height: 36px;
  letter-spacing: -2%;
  color: #000000;
`;

const NameBox = styled.div`
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: -2%;
`;

const DescriptionBox = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: -2%;
  color: ${COLORS.grayscale[600]};
  text-align: center;
`;

const TitleBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: 600;
  line-height: 36px;
  letter-spacing: -2%;
  color: #000000;
  text-align: center;
  padding: 56px 0;
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
  padding: 0 20px;
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
