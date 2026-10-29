import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/autoplay";
import { IMG_BASE, NO_POSTER_IMG } from "./constants";

export default function HeroSwiper({ movies, page, onSlideChange }) {
  if (!movies.length) return null;

  return (
    <Swiper
      key={`${page}-${movies.length}`}
      effect={"coverflow"}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={"auto"}
      loop={movies.length >= 6}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      coverflowEffect={{
        rotate: 40,
        stretch: 0,
        depth: 120,
        modifier: 1,
        slideShadows: true,
      }}
      modules={[EffectCoverflow, Autoplay]}
      onSlideChange={(swiper) => {
        const realIndex = swiper.realIndex;
        if (movies[realIndex]) {
          onSlideChange(movies[realIndex]);
        }
      }}
      style={{ padding: "28px 0" }}
    >
      {movies.map((movie, index) => (
        <SwiperSlide
          key={movie.id}
          style={{
            width: "200px",
            height: "300px",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow:
              "0 20px 40px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.08)",
          }}
        >
          <Link
            to={`/movie/${movie.id}`}
            style={{ display: "block", height: "100%" }}
          >
            <Box
              component="img"
              src={
                movie.poster_path
                  ? `${IMG_BASE}/w342${movie.poster_path}`
                  : NO_POSTER_IMG
              }
              alt={movie.title}
              width={200}
              height={300}
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.4s ease",
              }}
            />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
