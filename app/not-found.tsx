import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "calc(var(--vh, 1vh) * 100)",
      }}
    >
      <div>존재하지 않는 경로에요 🤣</div>
      <Link
        href="/"
        style={{
          marginTop: "16px",
          color: "#0070f3",
          textDecoration: "none",
        }}
      >
        홈으로 가기
      </Link>
    </div>
  );
}
