import type { IAbout } from "@/interface/aboutInterface";
import type { ICounter } from "@/interface/counterInterface";
import { getShortDescription } from "@/utils/getShortDescription";
import { Link } from "react-router";

export default function Banner({
  about,
  counters,
}: {
  about: IAbout;
  counters: ICounter[];
}) {
  return (
    <section id="about">
      <div className="w-full min-h-screen bg-gradient-to-t from-primary via-accent to-[#141c0d] text-base-100 sm:px-10 pt-10 flex items-center relative overflow-hidden">
        <div className="absolute w-[500px] h-[500px] rounded-full blur-xl bg-secondary/5 -right-[250px] -top-[250px]"></div>

        <div className="pt-20 container">
          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-10">
            <div className="md:w-1/2 w-full flex justify-center md:justify-start relative">
              {/* Green Shadow Layer */}
              <div className="absolute w-[90%] h-full rounded-full blur-xl bg-secondary/10"></div>

              {/* Main Image */}
              <img
                src={about?.image}
                alt="Profile"
                className="w-[75%] mx-auto h-auto rounded-lg relative z-10"
              />
            </div>

            <div className="md:w-1/2 w-full">
              <p className="text-sm text-secondary mb-2">{about?.title}</p>
              <h1 className="text-5xl font-bold mb-4">{about?.subTitle}</h1>
              <p className="text-gray-300 mb-6 leading-relaxed">
                {getShortDescription(about?.description, 500)}
              </p>
              <div>
                <Link
                  to={about?.cv || "#"}
                  target="_blank"
                  className="bg-secondary/90 text-secondary-foreground px-6 py-2 rounded hover:bg-secondary transition"
                >
                  Download CV
                </Link>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="sm:mx-10 grid grid-cols-2 sm:grid-cols-4 gap-6 bg-secondary/5 backdrop-blur-[20px] border border-secondary/10 rounded-xl p-6 shadow-lg">
            {counters?.map((counter) => (
              <div key={counter?._id} className="text-center">
                <h3 className="text-2xl font-bold text-white">
                  {counter?.count}
                </h3>
                <p className="text-sm text-gray-300">{counter?.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
