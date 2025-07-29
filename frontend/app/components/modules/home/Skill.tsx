import type { ISkill } from "@/interface/skillInterface";

export default function Skill({ skill }: { skill: ISkill }) {
  return (
    <section id="skill" className="p-16 bg-primary text-primary-foreground">
      <div className="container">
        <h2 className="font-medium text-2xl sm:text-3xl text-center">
          My Skills
        </h2>
        <p className="mt-2 text-sm text-center opacity-80 md:w-3/5 mx-auto">
          {skill?.sectionDescription}
        </p>

        <div
          data-aos="zoom-in-up"
          className="mt-6 flex flex-wrap gap-3 items-center justify-center"
        >
          {skill?.skills?.map((item, index) => (
            <div
              key={index}
              className="w-24 h-24 rounded-xl bg-secondary/5 border border-secondary/15 flex justify-center items-center"
            >
              <img src={item?.logo} alt={item?.title} className="w-[70%]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
