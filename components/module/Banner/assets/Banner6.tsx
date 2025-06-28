import styled from "@emotion/styled";

const Banner2 = () => {
  return <Container></Container>;
};

export default Banner2;

const Container = styled.div`
  width: 128px;
  height: 119px;
  overflow: hidden;
  background: transparent;
  position: relative;
  background-image: url("/images/slides/slide-6.png");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: scale(1.02);
  }
  &:active {
    transform: scale(0.98);
  }
`;
