"use client";

import PulseCircle from "@/components/element/pulse/Pulse";
import React, { useEffect, useRef, useState } from "react";
import customAxios from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import useHeaderStore from "@/store/useHeaderStore";
import styled from "@emotion/styled";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
// 로띠 타입 불러오기
import { DotLottieReactProps } from "@lottiefiles/dotlottie-react";
import { COLORS } from "@/styles/color";
import { keyframes } from "@emotion/react";

type SpeechRecognitionStatus =
  | "onstart"
  | "onspeechstart"
  | "onspeechend"
  | "error"
  | "onend";

const VoicePage = () => {
  const [text, setText] = useState("🎤 마이크를 눌러 말해보세요!");

  const [status, setStatus] = useState<SpeechRecognitionStatus>("onend");
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [shouldPulse, setShouldPulse] = useState(false);
  const [scale, setScale] = useState<number[]>([1, 1.1, 1]);
  const [communicationContext, setCommunicationContext] = useState<
    {
      content: string;
      role: "user" | "assistant";
    }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [gptSpeech, setGptSpeech] = useState(false);

  const router = useRouter();
  const { change } = useHeaderStore();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [lottie, setLottie] = useState<any>(null);

  const { mutate: sendMessage } = useMutation({
    mutationFn: async (message: string) => {
      try {
        const response = await customAxios.post(
          "/chat/chatToAudio",
          {
            text: message,
            userId: "5d8d0894-f643-495d-8a41-273dc25126d3", // 사용자 ID를 하드코딩
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            responseType: "json", // 그대로 둬도 됨
            withCredentials: true,
          }
        );

        return response.data;
      } catch (error) {
        console.error("오디오 요청 실패:", error);
        throw error;
      }
    },
    onSuccess: (data) => {
      const audioData = data as {
        text: string;
        audio: string; // base64 문자열
      };

      // base64를 Blob으로 변환
      const byteString = atob(
        audioData.audio.replace(/^data:audio\/mpeg;base64,/, "")
      );
      const byteArray = new Uint8Array(byteString.length);
      for (let i = 0; i < byteString.length; i++) {
        byteArray[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([byteArray], { type: "audio/mpeg" });

      const audioUrl = URL.createObjectURL(blob);
      const audio = new Audio(audioUrl);
      audio.addEventListener("canplaythrough", () => {
        audio.play();
      });
      setGptSpeech(true); // GPT 음성 재생 상태 업데이트

      console.log("오디오 재생:", audioData.text);
      setCommunicationContext((prev) => [
        ...prev,
        { content: audioData.text, role: "assistant" },
      ]);
      audio.onended = () => {
        setLoading(false); // 오디오 재생이 끝나면 로딩 상태 해제
        setGptSpeech(false); // GPT 음성 재생 상태 해제
      }; // 오디오 재생이 끝나면 로딩 상태 해제
      setText(`🤖 "${audioData.text}"`);
    },
    onError: (error) => {
      console.error("메시지 전송 실패:", error);
      setText("❌ 메시지 전송 실패");
    },
  });

  const startListening = () => {
    if (!recognitionRef.current) return;

    try {
      recognitionRef.current.start();
      setStatus("onstart");
      setText("🎧 듣는 중입니다. 말해보세요!");
    } catch (err) {
      console.error("인식 시작 실패:", err);
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      window.SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("이 브라우저는 음성 인식을 지원하지 않습니다.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "ko-KR";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.continuous = false;

    recognition.onstart = () => {
      // setStatus("🟢 인식 시작됨");
      setStatus("onstart");
      setShouldPulse(true);
    };

    recognition.onspeechstart = () => {
      // setStatus("🗣️ 말하는 중...");
      setStatus("onspeechstart");
      setShouldPulse(true);
      setScale([1, 1.3, 1]); // 말하는 중일 때 크기 증가
    };

    recognition.onspeechend = () => {
      // setStatus("🤫 말 멈춤, 인식 중...");
      setStatus("onspeechend");
      setShouldPulse(false);
      setScale([1, 1.1, 1]); // 말 멈추면 크기 원래대로
      recognition.stop(); // 자동으로 인식 종료
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      // setStatus("✅ 인식 결과 수신됨");
      const transcript = event.results[0][0].transcript;
      const confidence = event.results[0][0].confidence;

      setCommunicationContext((prev) => [
        ...prev,
        { content: transcript, role: "user" },
      ]);
      setText("응답을 기다리고 있습니다.");
      setLoading(true); // 로딩 상태로 변경
      sendMessage(transcript); // 메시지 전송
      recognition.stop(); // 인식 종료
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onerror = (event: any) => {
      // setStatus("🔴 오류 발생");
      setStatus("error");
      setShouldPulse(false);
      setScale([1, 1.1, 1]); // 말 멈추면 크기 원래대로
    };

    recognition.onend = () => {
      // setStatus("🔵 인식 종료됨");
      setStatus("onend");
      setShouldPulse(false);
      setScale([1, 1.1, 1]); // 말 멈추면 크기 원래대로
    };

    recognitionRef.current = recognition;
  }, [sendMessage]);

  useEffect(() => {
    if (shouldPulse) {
      if (lottie) {
        lottie.play();
      }
    } else {
      lottie?.stop();
    }
  }, [lottie, shouldPulse]);

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
          zIndex: 1000,
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
        AI 드리미
        <div></div>
      </div>
      {/* <p>{text}</p> */}
      {/* <p style={{ marginTop: "1rem", fontWeight: "bold" }}>{status}</p> */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          fontSize: "20px",
          fontWeight: 600,
          lineHeight: "28px",
          letterSpacing: "-2%",
          color: "#000000",
          marginTop: "56px",
        }}
      >
        {status == "onstart" || status == "onspeechstart" ? (
          <div>듣고 있어요..</div>
        ) : text ? (
          <span
            style={{
              fontSize: "16px",
              fontWeight: 600,
              lineHeight: "24px",
              letterSpacing: "-2%",
              color: "#000000",
            }}
          >
            {text}
          </span>
        ) : (
          <>
            “안녕하세요. <br />
            저는 AI 귀농 상담사 드리미에요.
            <br />
            궁금하신걸 편하게 물어보세요.”
          </>
        )}
      </div>
      <DotLottieReact
        src="/assets/dreami.lottie"
        loop={true}
        autoplay={false}
        renderConfig={{
          autoResize: true,
          devicePixelRatio: 2,
        }}
        dotLottieRefCallback={(instance) => {
          setLottie(instance);
        }}
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          transformOrigin: "center",
        }}
      />
      {/* <PulseCircle shouldPulse={shouldPulse} scale={scale} /> */}
      <div
        style={{
          marginTop: "1rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <button
          onClick={stopListening}
          style={{
            padding: "0.75rem 1.5rem",
            fontSize: "1rem",
            borderRadius: "8px",
            background: "#888",
            color: "white",
            border: "none",
          }}
        >
          ⏹️ 인식 중지
        </button> */}
      </div>
      <ButtonWrapper>
        {!loading && !(status == "onstart" || status == "onspeechstart") && (
          <Button
            onClick={() => {
              startListening();
            }}
          >
            시작하기
          </Button>
        )}
      </ButtonWrapper>
      {gptSpeech && <InnerShadowWrapper />}
    </Main>
  );
};

export default VoicePage;

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
  padding: 0 16px;
`;

const InnerGlow = styled.div`
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 100%;
  background: radial-gradient(
    ellipse at center,
    rgba(0, 100, 255, 0.3),
    transparent
  );
  filter: blur(12px);
  opacity: 0.6;
`;

const dancingShadow = keyframes`
  0% {
    box-shadow:
      inset 0 0 100px rgba(0, 0, 0, 0.3),
      inset 0 0 50px rgba(38, 255, 0, 0.35),
      inset 0 0 10px rgba(0, 255, 128, 0.45);
  }
  20% {
    box-shadow:
      inset 0 0 120px rgba(0, 0, 0, 0.35),
      inset 0 0 80px rgba(0, 255, 123, 0.3),
      inset 0 0 45px rgba(0, 255, 55, 0.5);
  }
  40% {
    box-shadow:
      inset 0 0 100px rgba(0, 0, 0, 0.3),
      inset 0 0 60px rgba(1, 255, 18, 0.35),
      inset 0 0 20px rgba(0, 255, 136, 0.45);
  }
  60% {
    box-shadow:
      inset 0 0 100px rgba(0, 0, 0, 0.3),
      inset 0 0 50px rgba(0, 255, 170, 0.35),
      inset 0 0 10px rgba(0, 255, 89, 0.45);
  }
  80% {
    box-shadow:
      inset 0 0 120px rgba(0, 0, 0, 0.35),
      inset 0 0 80px rgba(0, 255, 123, 0.4),
      inset 0 0 45px rgba(0, 255, 123, 0.5);
  }
  100% {
    box-shadow:
      inset 0 0 100px rgba(0, 0, 0, 0.2),
      inset 0 0 60px rgba(0, 255, 195, 0.35),
      inset 0 0 20px rgba(0, 255, 98, 0.45);
  }
`;

const InnerShadowWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  // background-color: rgba(255, 255, 255, 1);

  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  animation: ${dancingShadow} 2s ease-in-out infinite alternate;
`;
