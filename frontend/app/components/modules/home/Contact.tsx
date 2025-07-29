import { FaEnvelope, FaPhone } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";
import type { IContact } from "@/interface/contactInterface";
import type { ISocial } from "@/interface/socialInterface";
import { Link } from "react-router";
import ContactForm from "./ContactForm";

export default function Contact({
  contact,
  socials,
}: {
  contact: IContact;
  socials: ISocial[];
}) {
  return (
    <section
      id="contact"
      className="pb-16 bg-primary text-primary-foreground overflow-hidden"
    >
      <div className="container">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 bg-secondary/5 border border-secondary/20 p-8 rounded-xl">
          <div className="flex flex-col" data-aos="zoom-out-right">
            <h2 className="text-3xl font-bold mb-4">{contact?.title}</h2>
            <p className="text-gray-200 mb-6">{contact?.description}</p>

            <ul className="space-y-4 text-gray-300">
              <li className="flex items-center gap-3">
                <FaPhone className="text-secondary" /> {contact?.phone}
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-secondary" /> {contact?.email}
              </li>
              <li className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-secondary" /> {contact?.address}
              </li>
            </ul>

            <div className="mt-8 flex items-center gap-4">
              {socials?.map((social) => (
                <Link to={social?.link} key={social?._id} target="_blank">
                  <img
                    src={social?.icon}
                    alt="social"
                    className="w-6 rounded-full"
                  />
                </Link>
              ))}
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
