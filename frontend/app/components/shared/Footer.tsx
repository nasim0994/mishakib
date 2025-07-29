import { FaFacebook, FaInstagram } from "react-icons/fa6";
import { AiFillTwitterCircle } from "react-icons/ai";
import { useGetAllSocialQuery } from "@/redux/features/social/socialApi";
import type { ISocial } from "@/interface/socialInterface";
import { Link } from "react-router";

export default function Footer() {
  const { data } = useGetAllSocialQuery({});
  const socials = data?.data || [];

  return (
    <footer className="text-base-100 bg-accent py-4">
      <div className="container">
        <div className="flex flex-col sm:flex-row gap-2 items-center justify-between">
          <div>Copyright ©2025. All rights reserved</div>

          <ul className="flex items-center gap-4">
            <li className="font-medium">Follow us on</li>
            {socials?.map((social: ISocial) => (
              <li key={social?._id}>
                <Link to={social?.link} target="_blank">
                  <img
                    src={social?.icon}
                    alt="social"
                    className="w-6 rounded-full"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
