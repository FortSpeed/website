import { description, services, title } from "@/data/services";
import Beams from "../Beams";

export default function Services() {
  return (
    <section
      id="services"
      className="relative py-32 px-4 sm:px-6 lg:px-8 bg-black overflow-x-hidden"
    >
      <div className="absolute size-160 rounded-full right-[-10%] top-[30%] bottom-0 overflow-hidden ">
        <Beams
          rotation={28}
          speed={0.9}
          beamWidth={2.5}
          beamHeight={20}
          lightColor="#969696"
        />
        <div className="size-full bg-[radial-gradient(ellipse_at_center,transparent_35%,black)] absolute inset-0 " />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className=" mb-6 text-4xl sm:text-6xl font-bold ">
            <span className="subtitle-gradient">
              {title}
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <div
                key={index}
                className={`group relative p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-2xl  hover:border-cyan-500 `}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>

                <div className="relative z-10 ">
                  <div
                    className={`inline-flex p-3 bg-gradient-to-br  bg-gray-400/15 rounded-xl mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-6 h-6 text-white group-hover:text-cyan-400" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center gap-2 text-sm text-gray-300"
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-600 ${"colors.gradient"}`}
                        ></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
