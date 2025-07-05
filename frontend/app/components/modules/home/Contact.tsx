import {
  FaBehance,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPhone,
} from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function Contact() {
  return (
    <section className="pb-16 bg-primary text-primary-foreground overflow-hidden">
      <div className="container">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 bg-secondary/5 border border-secondary/20 p-8 rounded-xl">
          <div className="flex flex-col">
            <h2 className="text-3xl font-bold mb-4">Contact Information</h2>
            <p className="text-gray-200 mb-6">
              I'm always open to discussing new projects, creative ideas, or
              opportunities to be part of your visions.
            </p>

            <ul className="space-y-4 text-gray-300">
              <li className="flex items-center gap-3">
                <FaPhone className="text-secondary" /> +880 1234 567890
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-secondary" /> example@gmail.com
              </li>
              <li className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-secondary" /> 123, Dhaka,
                Bangladesh
              </li>
            </ul>

            <div className="mt-8 flex items-center gap-4">
              <a
                href="#"
                className="text-gray-200 hover:text-secondary text-xl"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                className="text-gray-200 hover:text-secondary text-xl"
              >
                <FaLinkedin />
              </a>
              <a
                href="#"
                className="text-gray-200 hover:text-secondary text-xl"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="text-gray-200 hover:text-secondary text-xl"
              >
                <FaBehance />
              </a>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
            <form className="space-y-4">
              <div>
                <label className="block mb-1">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                />
              </div>
              <div>
                <label className="block mb-1">Subject</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                />
              </div>
              <div>
                <label className="block mb-1">Message</label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-secondary text-secondary-foreground px-6 py-2 rounded-lg"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
