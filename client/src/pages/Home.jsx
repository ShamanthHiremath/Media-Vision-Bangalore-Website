import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { FaHandHoldingHeart, FaGraduationCap, FaPeopleCarry, FaSeedling } from "react-icons/fa";
import image from '../assets/logo1.png';
function Home() {
  // Animation variants for reuse
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  };

  const containerStagger = {
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section - Updated with background image and overlay */}
      <motion.section
        className="relative bg-gradient-to-r from-[#003049] to-[#669BBC] text-white py-24 md:py-32"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.8 }}
      >
        {/* Background image with overlay */}
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src={image}
            alt="Bangalore cityscape" 
            className="w-full h-full object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#003049]/90 to-[#669BBC]/80"></div>
        </div>
        
        {/* Content positioned over the background */}
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg"
            variants={fadeInUp}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Welcome to Media Vision Bengaluru
          </motion.h1>
          <motion.p
            className="text-xl mb-10 max-w-3xl mx-auto text-white/90 drop-shadow-md"
            variants={fadeInUp}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Transforming communities through education, support, and empowerment
          </motion.p>
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/about"
              className="bg-white text-[#003049] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 shadow-lg"
            >
              Learn More
            </Link>
            <Link
              to="/donate"
              className="bg-[#C1121F] hover:bg-[#780000] text-white px-8 py-3 rounded-lg font-semibold transition duration-300 shadow-lg flex items-center justify-center gap-2"
            >
              <FaHandHoldingHeart /> Donate Now
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Impact Stats Section - New section */}
      <motion.section
        className="bg-white py-16"
        initial="hidden"
        animate="visible"
        variants={containerStagger}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { value: 2000, label: "People Helped", plus: true },
              { value: 50, label: "Community Programs", plus: true },
              { value: 12, label: "Years of Service", plus: false },
              { value: 100, label: "Volunteers", plus: true }
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                className="p-6"
                variants={fadeInUp}
              >
                <p className="text-4xl font-bold text-[#003049] mb-2">
                  <CountUp end={stat.value} duration={2.5} />
                  {stat.plus && "+"}
                </p>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Programs Section - Updated with icons and new styling */}
      <motion.section
        className="py-16 bg-gray-50"
        initial="hidden"
        animate="visible"
        variants={containerStagger}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-[#003049]">Our Programs</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Empowering individuals and communities through our comprehensive programs
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Education",
                desc: "Providing quality education and learning opportunities for all.",
                icon: <FaGraduationCap className="text-4xl text-[#003049] mb-4" />
              },
              {
                title: "Community Support",
                desc: "Supporting local communities through various initiatives and resources.",
                icon: <FaPeopleCarry className="text-4xl text-[#669BBC] mb-4" />
              },
              {
                title: "Development",
                desc: "Fostering sustainable growth and development in our society.",
                icon: <FaSeedling className="text-4xl text-[#C1121F] mb-4" />
              }
            ].map((feature, idx) => (
              <motion.div
                key={feature.title}
                className="bg-white p-8 rounded-lg shadow-lg border-t-4 hover:shadow-xl transition-shadow text-center"
                style={{ borderColor: idx === 0 ? '#003049' : idx === 1 ? '#669BBC' : '#C1121F' }}
                variants={fadeInUp}
              >
                <div className="flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Call to Action - Updated with branded colors */}
      <motion.section
        className="bg-gradient-to-r from-[#003049] to-[#669BBC] text-white py-20"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Mission</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Together, we can make a lasting impact in our community. Volunteer, donate, or partner with us today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-[#003049] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 shadow-lg"
            >
              Get Involved
            </Link>
            <Link
              to="/events"
              className="bg-[#C1121F] hover:bg-[#780000] text-white px-8 py-3 rounded-lg font-semibold transition duration-300 shadow-lg"
            >
              Upcoming Events
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

export default Home;
