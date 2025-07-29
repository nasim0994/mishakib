import type { IService } from "@/interface/serviceInterface";
import { getShortDescription } from "@/utils/getShortDescription";
import { useState } from "react";

export default function Services({ services }: { services: IService[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<null | number>(null);
  const getActiveIndex = () => hoveredIndex ?? 1;

  return (
    <section
      id="service"
      className="pt-16 bg-primary text-primary-foreground overflow-hidden"
    >
      <div className="container relative">
        <h2 className="font-medium text-2xl sm:text-3xl text-center">
          Services
        </h2>

        <div
          data-aos="fade-up-right"
          className="pt-10 grid grid-cols-2 md:grid-cols-3 gap-8 md:mx-40"
        >
          {services?.map((service, index) => {
            const isActive = index === getActiveIndex();
            return (
              <div
                key={index}
                className="service_card_wrap relative"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div
                  className={`rotated_bg absolute inset-0 z-0 ${
                    isActive && "show"
                  }`}
                ></div>

                <div className="service_card border border-secondary relative z-10 p-4">
                  <img src={service.icon} alt="service" className="w-10" />
                  <h2 className="text-xl font-medium mt-2">{service?.title}</h2>
                  <p className="text-sm text-gray-300">
                    {getShortDescription(service?.description, 100)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="absolute w-[500px] h-[500px] rounded-full blur-[100px] bg-secondary/10 left-0 top-0"></div>
      </div>
    </section>
  );
}
