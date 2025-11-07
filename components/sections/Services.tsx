import { Code, Cloud, Smartphone, Brain, Shield, Zap, Database, Globe } from 'lucide-react';
import Beams from '../Beams';

const services = [
  {
    icon: Code,
    title: 'Custom Software Development',
    description: 'Tailored solutions built with cutting-edge technologies to meet your unique business needs',
    features: ['Full-Stack Development', 'API Integration', 'Legacy Modernization'],
    color: 'cyan',
  },
  {
    icon: Cloud,
    title: 'Cloud Infrastructure',
    description: 'Scalable and secure cloud solutions that grow with your business',
    features: ['Cloud Migration', 'DevOps Automation', 'Infrastructure as Code'],
    color: 'blue',
  },
  {
    icon: Brain,
    title: 'AI & Machine Learning',
    description: 'Intelligent systems that learn, adapt, and drive data-driven decisions',
    features: ['Predictive Analytics', 'Natural Language Processing', 'Computer Vision'],
    color: 'purple',
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile experiences that users love',
    features: ['iOS & Android', 'React Native', 'Progressive Web Apps'],
    color: 'green',
  },
  {
    icon: Shield,
    title: 'Cybersecurity Solutions',
    description: 'Comprehensive security measures to protect your digital assets',
    features: ['Penetration Testing', 'Security Audits', 'Compliance Management'],
    color: 'red',
  },
  {
    icon: Database,
    title: 'Data Engineering',
    description: 'Transform raw data into actionable insights with robust data pipelines',
    features: ['Data Warehousing', 'ETL Pipelines', 'Real-time Processing'],
    color: 'orange',
  },
  {
    icon: Zap,
    title: 'Performance Optimization',
    description: 'Lightning-fast applications with optimized performance and scalability',
    features: ['Code Optimization', 'Load Testing', 'Caching Strategies'],
    color: 'yellow',
  },
  {
    icon: Globe,
    title: 'Digital Transformation',
    description: 'End-to-end transformation strategies for the modern digital landscape',
    features: ['Process Automation', 'Digital Strategy', 'Change Management'],
    color: 'teal',
  },
];

const colorMap: Record<string, { gradient: string; glow: string; border: string }> = {
  cyan: { gradient: 'from-cyan-500 to-blue-600', glow: 'group-hover:shadow-cyan-500/50', border: 'group-hover:border-cyan-500/50' },
  blue: { gradient: 'from-blue-500 to-indigo-600', glow: 'group-hover:shadow-blue-500/50', border: 'group-hover:border-blue-500/50' },
  purple: { gradient: 'from-purple-500 to-pink-600', glow: 'group-hover:shadow-purple-500/50', border: 'group-hover:border-purple-500/50' },
  green: { gradient: 'from-green-500 to-teal-600', glow: 'group-hover:shadow-green-500/50', border: 'group-hover:border-green-500/50' },
  red: { gradient: 'from-red-500 to-orange-600', glow: 'group-hover:shadow-red-500/50', border: 'group-hover:border-red-500/50' },
  orange: { gradient: 'from-orange-500 to-amber-600', glow: 'group-hover:shadow-orange-500/50', border: 'group-hover:border-orange-500/50' },
  yellow: { gradient: 'from-yellow-500 to-orange-500', glow: 'group-hover:shadow-yellow-500/50', border: 'group-hover:border-yellow-500/50' },
  teal: { gradient: 'from-teal-500 to-cyan-600', glow: 'group-hover:shadow-teal-500/50', border: 'group-hover:border-teal-500/50' },
};

export default function Services() {
  return (
    <section id="services" className="relative py-32 px-4 sm:px-6 lg:px-8 bg-black overflow-x-hidden">
        <div className="absolute size-160 rounded-full right-[-10%] top-[25%] bottom-0 overflow-hidden ">
        <Beams rotation={28} speed={0.9} beamWidth={2.5} beamHeight={20} lightColor='#c4c4c4' />
        <div className="size-full bg-[radial-gradient(ellipse_at_center,transparent_35%,black)] absolute inset-0 "/>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
        
          <h2 className=" mb-6 text-4xl sm:text-6xl font-bold ">
            {/* <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"> */}
            {/* </span>{' '} */}
            {/* <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"> */}
              <span className='bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent'>
                Our
                Services
              </span>
            {/* </span> */}
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Comprehensive technology solutions designed to accelerate your business growth
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            const colors = colorMap[service.color];

            return (
              <div
                key={index}
                className={`group relative p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-2xl ${colors.glow} ${colors.border}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>

                <div className="relative z-10">
                  <div className={`inline-flex p-3 bg-gradient-to-br ${"colors.gradient"} bg-gray-400/15 rounded-xl mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-sm text-gray-300">
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${colors.gradient}`}></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* <div className="mt-20 p-8 bg-gradient-to-r from-gray-500/20 to-blue-500/5 border border-cyan-500/20 rounded-3xl backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold text-white mb-4">
                Not Sure Where to Start?
              </h3>
              <p className="text-gray-300 mb-6">
                Let our expert team guide you through the perfect technology solution for your business needs.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-semibold hover:shadow-xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
              >
                Schedule a Consultation
              </a>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="text-3xl font-bold text-cyan-400 mb-2">500+</div>
                <div className="text-gray-400 text-sm">Projects Completed</div>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="text-3xl font-bold text-cyan-400 mb-2">98%</div>
                <div className="text-gray-400 text-sm">Client Satisfaction</div>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="text-3xl font-bold text-cyan-400 mb-2">50+</div>
                <div className="text-gray-400 text-sm">Expert Engineers</div>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="text-3xl font-bold text-cyan-400 mb-2">24/7</div>
                <div className="text-gray-400 text-sm">Support Available</div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}
