import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import "@styles/banner-swiper.css";
import styled from "@emotion/styled";
import { PaginationOptions } from "swiper/types";
import { Banner1, Banner2, Banner3, Banner4 } from "./assets";
import { useRouter } from "next/navigation";
import Banner5 from "./assets/Banner5";
import Banner6 from "./assets/Banner6";

const Banner = () => {
  return (
    <Container>
      <StyledSwiper
        autoplay={{
          delay: 1000,
          disableOnInteraction: true,
        }}
        loop={true}
        modules={[Autoplay, Pagination]}
        spaceBetween={20}
        // 그냥 슬라이드 쭉 보여주기
        slidesPerView={3}
        // 2초 간격으로 슬라이드 변경
      >
        <StyledSwiperSlide>
          <Banner1 />
        </StyledSwiperSlide>
        <StyledSwiperSlide>
          <Banner2 />
        </StyledSwiperSlide>
        <StyledSwiperSlide>
          <Banner3 />
        </StyledSwiperSlide>
        <StyledSwiperSlide>
          <Banner4 />
        </StyledSwiperSlide>
        <StyledSwiperSlide>
          <Banner5 />
        </StyledSwiperSlide>
        <StyledSwiperSlide>
          <Banner6 />
        </StyledSwiperSlide>
      </StyledSwiper>
    </Container>
  );
};

export default Banner;

const Container = styled.div`
  width: 100%;
  height: fit-content;
  padding: 0 16px;
`;

const StyledSwiper = styled(Swiper)`
  width: 100%;
  height: 119px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  .swiper-wrapper {
    height: fit-content;
  }
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  text-align: center;
  font-size: 18px;

  display: flex;
  justify-content: center;
  align-items: center;
`;
