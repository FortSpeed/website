import logo from "@/assets/logo.png";
import { contactLinks, innerLinks, socialLinks } from "@/data/footer";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="py-16 pb-4 px-6 border-t border-white/10 bg-black text-gray-300">
      {/* <div className="max-w-7xl mx-auto"> */}
      <div className="grid md:grid-cols-4 max-lg:gap-0 gap-12 mb-12 max-md:text-center max-md:justify-center">
        <div>
          <div className="flex items-center text-white gap-1 mb-4 max-md:justify-center">
            {/* <Zap className="w-7 h-7 text-white" strokeWidth={2} /> */}
            <Image
              src={logo}
              alt="fort-speed logo"
              width={50}
              height={50}
              className="size-7"
            />
            <span className="text-xl font-bold tracking-tight">FortSpeed</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Building the future of the web, one project at a time.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Services</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Web Development
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                UI/UX Design
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Performance Optimization
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Consulting
              </a>
            </li>
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
          <ul className="mt-8 text-sm text-gray-400 flex gap-3 md:gap-2 lg:gap-3 justify-start max-md:justify-center items-center ">
            {socialLinks.map(({ href, node: Node, title }, i) => (
              <li
                key={i}
                className="border rounded-lg p-2 bg-white/5 border-white/15 hover:bg-gray-200 hover:text-gray-600"
                title={title}
              >
                {<Node />}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pt-4 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
        <div>© 2024 APEX Agency. All rights reserved.</div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Terms of Service
          </a>
        </div>
        {/* </div> */}
      </div>
    </footer>
  );
};

export default Footer;
