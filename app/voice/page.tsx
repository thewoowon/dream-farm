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
      audio.play();

      console.log("오디오 재생:", audioData.text);
      setCommunicationContext((prev) => [
        ...prev,
        { content: audioData.text, role: "assistant" },
      ]);
      audio.onended = () => {
        setLoading(false); // 오디오 재생이 끝나면 로딩 상태 해제
        setText("🎤 마이크를 눌러 말해보세요!");
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
      setText(`📝 "${transcript}" (정확도: ${(confidence * 100).toFixed(1)}%)`);

      setCommunicationContext((prev) => [
        ...prev,
        { content: transcript, role: "user" },
      ]);
      setLoading(true); // 로딩 상태로 변경
      sendMessage(transcript); // 메시지 전송
      recognition.stop(); // 인식 종료
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onerror = (event: any) => {
      setText(`❌ 오류: ${event.error}`);
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
        }}
      >
        <svg
          onClick={() => {
            router.push("/ai/read?id=1");
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
        “안녕하세요. <br />
        저는 AI 귀농 상담사 드리미에요.
        <br />
        궁금하신걸 편하게 물어보세요.”
      </div>
      <DotLottieReact
        src="/assets/dreami.lottie"
        loop={true}
        autoplay={false}
        style={{
          width: "100%",
          maxWidth: "400px",
          height: "auto",
        }}
        dotLottieRefCallback={(instance) => {
          setLottie(instance);
        }}
      />
      {/* <PulseCircle shouldPulse={shouldPulse} scale={scale} /> */}
      {(status == "onstart" || status == "onspeechstart") && (
        <div>듣고 있어요..</div>
      )}
      <div
        style={{
          marginTop: "1rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button
          disabled={loading}
          onClick={startListening}
          style={{
            padding: "0.75rem 1.5rem",
            fontSize: "1rem",
            borderRadius: "8px",
            backgroundColor: loading ? "#888" : "#000000",
            color: "white",
            border: "none",
          }}
        >
          여기를 누르고 말해주세요.
        </button>
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
