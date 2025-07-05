import { Link } from "react-router";
import {
  FaFacebook,
  FaInstagram,
  FaLocationDot,
  FaYoutube,
} from "react-icons/fa6";
import { IoMdCall } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { AiFillTwitterCircle } from "react-icons/ai";

export default function Footer() {
  return (
    <footer className="text-base-100 bg-accent">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="grid md:grid-cols-5 gap-4">
          <div className="md:col-span-2 w-[260px]">
            <Link to="/" className="flex items-center gap-1">
              <img src="/logo.png" alt="logo" className="w-48" />
            </Link>
            <p className="text-[#F1F5F9] mt-4 text-sm">
              Experience our new platform & Enjoy exiting deals and offers on
              your day to day
            </p>

            <ul className="mt-4 flex flex-col gap-4 text-sm">
              <li className="flex items-center gap-2">
                <p className="w-8 h-8 rounded-full bg-base-100 text-accent flex items-center justify-center">
                  <FaLocationDot className="text-base" />
                </p>
                <p className="w-[calc(100%-2rem)]">
                  House #64, Road 13, ASA Center, Uttara, Dhaka-1402
                </p>
              </li>

              <li className="flex items-center gap-2">
                <p className="w-8 h-8 rounded-full bg-base-100 text-accent flex items-center justify-center">
                  <IoMdCall className="text-base" />
                </p>
                <p className="w-[calc(100%-2rem)]">01729-1497201</p>
              </li>

              <li className="flex items-center gap-2">
                <p className="w-8 h-8 rounded-full bg-base-100 text-accent flex items-center justify-center">
                  <MdEmail className="text-base" />
                </p>
                <p className="w-[calc(100%-2rem)]">falcon@gmail.com</p>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div>
              <h2 className="mb-3 font-medium text-lg uppercase text-[#94A3B8]">
                ABOUT
              </h2>
              <ul className="flex flex-col gap-2 text-base">
                <li>
                  <Link to="/">Contact Us</Link>
                </li>
                <li>
                  <Link to="/">About Us</Link>
                </li>
                <li>
                  <Link to="/">Careers</Link>
                </li>
                <li>
                  <Link to="/">Press</Link>
                </li>
                <li>
                  <Link to="/">Cancellation & Returns</Link>
                </li>
                <li>
                  <Link to="/">Terms of Use</Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-3 font-medium text-lg uppercase text-[#94A3B8]">
                Help
              </h2>
              <ul className="flex flex-col gap-2 text-base">
                <li>
                  <Link to="/">Payments</Link>
                </li>
                <li>
                  <Link to="/">Shipping</Link>
                </li>
                <li>
                  <Link to="/">My Orders</Link>
                </li>
                <li>
                  <Link to="/">FAQs</Link>
                </li>
                <li>
                  <Link to="/">Terms of Use</Link>
                </li>
                <li>
                  <Link to="/">Security</Link>
                </li>
                <li>
                  <Link to="/">Privacy</Link>
                </li>
              </ul>
            </div>

            <div>
              <div>
                <h2 className="mb-3 font-medium text-lg uppercase text-[#94A3B8]">
                  Need Support?
                </h2>

                <div className="border rounded w-[170px] py-2 border-base-100 flex items-center justify-center gap-2">
                  <p className="text-primary text-[19px] -mt-[3px]">
                    <BiSupport />
                  </p>
                  <p>10724-7814XX</p>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="mb-3 font-medium text-lg uppercase text-[#94A3B8]">
                  DOWNLOAD APP
                </h2>

                <div className="flex flex-col gap-4">
                  <img src="/Google.png" alt="google" className="w-[180px]" />
                  <img src="/apple.png" alt="google" className="w-[180px]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <ul className="flex items-center gap-4">
            <li className="font-medium">Follow us on</li>
            <li>
              <FaFacebook className="text-2xl" />
            </li>
            <li>
              <FaInstagram className="text-3xl" />
            </li>
            <li>
              <AiFillTwitterCircle className="text-3xl" />
            </li>
          </ul>

          <div></div>
        </div>
      </div>
    </footer>
  );
}
