// import Logo from "@/components/svg/Logo";
import useBackgroundColorStore from "@/store/useBackgroundColorStore";
import styled from "@emotion/styled";
import Image from "next/image";

type HeaderProps = {
  display: "none" | "block";
};

const Header = ({ display }: HeaderProps) => {
  const { backgroundColor } = useBackgroundColorStore();

  if (display === "none") {
    return null;
  }
  return (
    <Container>
      <div
        style={{
          width: "56px",
          height: "20px",
          position: "relative",
        }}
      >
        <Image
          src="/images/common/small-logo.png"
          alt="Unknown Logo"
          fill
          sizes="100vw"
          priority
          quality={100}
          style={{ objectFit: "contain" }}
        />
      </div>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  padding: 20px 16px;
  height: 57px;
  background-color: transparent;
  z-index: 100;
  font-size: 20px;
  font-weight: 500;
  color: #000000;
  font-family: "Pretendard Variable", Pretendard, -apple-system, Blink;
  text-align: center;
  letter-spacing: -0.02em;
  line-height: 28px;
`;
