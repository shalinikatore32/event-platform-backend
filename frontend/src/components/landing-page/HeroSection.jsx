import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const HeroSection = () => {
  return (
    <section className="hero bg-cover bg-center h-auto text-black flex flex-col justify-center items-center py-8">
      <div className="w-full max-w-3xl h-64 md:h-80 lg:h-96 relative overflow-hidden">
        <Carousel
          showArrows={false}
          showThumbs={false}
          showStatus={false}
          infiniteLoop
          autoPlay
          interval={3000}
        >
          <div className="relative">
            <img
              src="https://plus.unsplash.com/premium_photo-1664474653221-8412b8dfca3e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZXZlbnR8ZW58MHx8MHx8fDA%3D"
              alt="Event 1"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-70"></div>
            <div className="absolute bottom-0 left-0 p-4 text-left">
              <h2 className="text-2xl font-bold text-white drop-shadow-lg">
                Exciting Event 1
              </h2>
              <p className="text-sm text-white drop-shadow-lg">
                Join us for an unforgettable experience.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXZlbnR8ZW58MHx8MHx8fDA%3D"
              alt="Event 2"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-70"></div>
            <div className="absolute bottom-0 left-0 p-4 text-left">
              <h2 className="text-2xl font-bold text-white drop-shadow-lg">
                Amazing Event 2
              </h2>
              <p className="text-sm text-white drop-shadow-lg">
                Experience the thrill and excitement.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Event 3"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-70"></div>
            <div className="absolute bottom-0 left-0 p-4 text-left">
              <h2 className="text-2xl font-bold text-white drop-shadow-lg">
                Incredible Event 3
              </h2>
              <p className="text-sm text-white drop-shadow-lg">
                Don't miss out on this opportunity.
              </p>
            </div>
          </div>
        </Carousel>
      </div>
      <h1 className="text-5xl font-extrabold mt-8 text-center drop-shadow-lg">
        Transform Your Events with Ease
      </h1>
      <p className="mt-4 text-lg text-center drop-shadow-lg">
        Streamline planning, enhance attendee experience, and boost engagement
        with our all-in-one event management platform.
      </p>
      <a
        href="#"
        className="mt-6 bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
      >
        Start Your Free Trial
      </a>
    </section>
  );
};

export default HeroSection;
