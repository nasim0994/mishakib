import Banner from "@/components/modules/home/Banner";
import Contact from "@/components/modules/home/Contact";
import Services from "@/components/modules/home/Services";
import Skill from "@/components/modules/home/Skill";
import Spinner from "@/components/shared/Spinner";
import type { Route } from "./+types";
import Project from "@/components/modules/home/Project";

export async function loader() {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/about`);
  const about = await res.json();

  const res2 = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/counter/all`
  );
  const counter = await res2.json();

  const res3 = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/service/all`
  );
  const service = await res3.json();

  const res4 = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/skill`);
  const skill = await res4.json();

  const res5 = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/project/category/all`
  );
  const category = await res5.json();

  const res7 = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/contact`);
  const contact = await res7.json();

  const res8 = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/social/all`
  );
  const social = await res8.json();

  return { about, counter, service, skill, category, contact, social };
}

export function HydrateFallback() {
  return <Spinner />;
}

export default function HomePage({ loaderData }: Route.ComponentProps) {
  const { about, counter, service, skill, category, contact, social } =
    loaderData;

  return (
    <>
      <Banner about={about?.data} counters={counter?.data} />
      <Services services={service?.data} />
      <Skill skill={skill?.data} />
      <Project categories={category?.data} about={about?.data} />
      <Contact contact={contact?.data} socials={social?.data} />
    </>
  );
}
