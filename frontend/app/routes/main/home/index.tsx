import Banner from "@/components/modules/home/Banner";
import Contact from "@/components/modules/home/Contact";
import Gallery from "@/components/modules/home/Gallery";
import Services from "@/components/modules/home/Services";
import Skill from "@/components/modules/home/Skill";

export default function HomePage() {
  return (
    <>
      <Banner />
      <Services />
      <Skill />
      <Gallery />
      <Contact />
    </>
  );
}
