"use client";

import Image from "next/image";
import { Carousel } from "react-responsive-carousel";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const heroImages = [
  { imgUrl: "/assets/images/hero-1.svg", alt: "Smart Watch" },

  { imgUrl: "/assets/images/hero-2.svg", alt: "Bag" },

  { imgUrl: "/assets/images/hero-3.svg", alt: "Lamp" },

  { imgUrl: "/assets/images/hero-4.svg", alt: "Air-fryer" },

  { imgUrl: "/assets/images/hero-5.svg", alt: "Lamp" },
];

export const HeroCarousel = () => {
  return (
    <div className="hero-carousel">
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={2000}
        showArrows={false}
        showStatus={false}
        showIndicators={false}
      >
        {heroImages.map((image) => (
          <Image
            key={image.alt}
            src={image.imgUrl}
            alt={image.alt}
            width={484}
            height={484}
            className="object-contain"
          />
        ))}
      </Carousel>
      <Image
        src={"/assets/icons/hand-drawn-arrow.svg"}
        alt="arrow"
        height={175}
        width={175}
        className="absolute -left-[15%] bottom-0 z-0 max-xl:hidden"
      />
    </div>
  );
};
