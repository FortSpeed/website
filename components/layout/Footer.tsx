import logo from "@/assets/logo.png";
import { contactLinks, innerLinks, services } from "@/data/footer";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="py-16 pb-4 px-6 border-t border-white/10 bg-black text-gray-300">
      {/* <div className="max-w-7xl mx-auto"> */}
      <div className="grid md:grid-cols-4 max-lg:gap-0 gap-12 mb-12 max-md:text-center max-md:justify-center">
        <div>
          <Link href={"/"} className="flex items-center text-white gap-1 mb-4 max-md:justify-center">
            {/* <Zap className="w-7 h-7 text-white" strokeWidth={2} /> */}
            <Image
              src={logo}
              alt="fort-speed logo"
              width={50}
              height={50}
              className="size-7"
              priority
            />
            <span className="text-xl font-bold tracking-tight">FortSpeed</span>
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed">
            Turning ideas into web experiences people trust and love
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Services</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            {services.map((s, i) => {
              return <li key={i}>
                <a href={s.href} className="hover:text-white transition-colors">
                  {s.title}
                </a>
              </li>
            })}

          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            {innerLinks.map(({ href, label }, i) => (
              <li key={i}>
                <a href={href} className="hover:text-white transition-colors">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Contact</h4>
          <ul className=" text-sm text-gray-400 flex flex-col gap-2">
            {contactLinks.map(({ label }, i) => (
              <li key={i}>{label}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pt-4 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
        <div>© 2025 FortSpeed Web Agency. All rights reserved.</div>
        <div className="flex gap-6 flex-wrap justify-center">
          <a href="/legal/privacy" className="hover:text-white transition-colors">
            Privacy Policy
          </a>
          <a href="/legal/terms" className="hover:text-white transition-colors">
            Terms & Conditions
          </a>
          <a href="/legal/cookies" className="hover:text-white transition-colors">
            Cookie Policy
          </a>
          <a href="/legal/refund" className="hover:text-white transition-colors">
            Refund & Cancellation
          </a>
        </div>
        {/* </div> */}
      </div>
    </footer>
  );
};

export default Footer;
