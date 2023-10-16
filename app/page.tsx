import Image from "next/image";

import { Searchbar } from "@/components/Searchbar";
import { HeroCarousel } from "@/components/HeroCarousel";

const page = () => {
  return (
    <>
      <section className="px-6 py-24 md:px-20">
        <div className="flex gap-16 max-xl:flex-col">
          <div className="flex flex-col justify-center">
            <p className="small-text">
              Start Shopping Smarter, Here:
              <Image
                src="/assets/icons/arrow-right.svg"
                alt="arrow-right"
                width={16}
                height={16}
              />
            </p>
            <h1 className="head-text">
              Unleash the Power of the
              <span className="text-primary"> Folka-Scraper</span>
            </h1>
            <p className="mt-6">
              Powerful, self-serve product and growth analytics to help you
              convert, engage, and retain more.
            </p>
            <Searchbar />
          </div>
          <HeroCarousel />
        </div>
      </section>
      <section className="trending-section">
        <h2 className="section-text">Trending</h2>
        <div className="flex flex-wrap gap-x-8 gap-y-16">
          {["Apple Iphone", "Book", "Shoes"].map((product) => (
            <div key={product}>{product}</div>
          ))}
        </div>
      </section>
    </>
  );
};

export default page;
