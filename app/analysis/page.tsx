"use client";

import styled from "@emotion/styled";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import useHeaderStore from "@/store/useHeaderStore";
import { useQuery } from "@tanstack/react-query";
import customAxios from "@/lib/axios";

const AnalysisPage = () => {
  const router = useRouter();
  const { change } = useHeaderStore();
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("🦄 클립보드에 복사되었습니다!");
    } catch (error) {
      console.error("Error copying to clipboard:", error);
    }
  };

  const { data } = useQuery({
    queryKey: ["analysis"],
    queryFn: async () => {
      try {
        if (!sessionStorage.getItem("userId")) {
          toast.error("로그인이 필요합니다.");
          return null;
        }
        const response = await customAxios.get("/result/getResult", {
          params: {
            userId: sessionStorage.getItem("userId"),
          },
        });
        return response.data;
      } catch (error) {
        console.error("Error fetching analysis data:", error);
        toast.error("분석 데이터를 불러오는 데 실패했습니다.");
        return null; // Return null instead of an empty array
      }
    },
    refetchOnWindowFocus: false,
  });
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
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.998 19.5L7.99805 12.5L14.998 5.5"
            stroke="#1E1E1E"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        종합분석
        <svg
          onClick={() => {
            copyToClipboard("");
          }}
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="7.5"
            y="7.1084"
            width="10.5"
            height="13.3913"
            rx="0.75"
            stroke="#1E1E1E"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5 18.0652V6.75C5 5.50736 6.00736 4.5 7.25 4.5H14.1667"
            stroke="#1E1E1E"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <AnalysisBox>
        <div>{data?.fullReport}</div>
      </AnalysisBox>
    </Main>
  );
};

export default AnalysisPage;

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

  background-image: url("/images/common/dreamfarm-gradient.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-color: transparent;
`;

const AnalysisBox = styled.div`
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
