// import Logo from "@/components/svg/Logo";
import styled from "@emotion/styled";

const Header = () => {
  return <Container>드림팜</Container>;
};

export default Header;

const Container = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding: 20px 16px;
  height: 57px;
  background-color: #000000;
  z-index: 100;
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  text-align: center;
  letter-spacing: -0.02em;
  line-height: 28px;
`;
