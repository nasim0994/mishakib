import { FaFacebook, FaInstagram } from "react-icons/fa6";
import { AiFillTwitterCircle } from "react-icons/ai";

export default function Footer() {
  return (
    <footer className="text-base-100 bg-accent py-4">
      <div className="container">
        <div className="flex flex-col sm:flex-row gap-2 items-center justify-between">
          <div>Copyright ©2025. All rights reserved</div>

          <ul className="flex items-center gap-4">
            <li className="font-medium">Follow us on</li>
            <li>
              <FaFacebook className="text-xl" />
            </li>
            <li>
              <FaInstagram className="text-2xl" />
            </li>
            <li>
              <AiFillTwitterCircle className="text-2xl" />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
