import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaUserFriends, FaChartLine, FaHandshake } from 'react-icons/fa';

function About() {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  };
  const stagger = {
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <motion.section
        className="bg-gradient-to-r from-[#003049] to-[#669BBC] text-white py-16"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4"
            variants={fadeInUp}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            About Media Vision Bangalore
          </motion.h1>
          <motion.p
            className="text-xl max-w-3xl mx-auto"
            variants={fadeInUp}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Leading the way in media management and public relations since 2017
          </motion.p>
        </div>
      </motion.section>

      <div className="container mx-auto px-4 py-12">
        {/* About Section */}
        <motion.section
          className="mb-16 bg-white p-8 rounded-lg shadow-lg"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-3xl font-bold mb-6 text-[#003049] border-b-2 border-[#669BBC] pb-2 inline-block"
            variants={fadeInUp}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Our Story
          </motion.h2>
          <motion.div
            className="text-lg text-gray-700 space-y-4"
            variants={fadeInUp}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p>
              <b className="text-[#003049]">Media Vision Bangalore</b> specializes in media management and public relations. As one of the leading media organizations in the state, we are actively involved across the cultural, social, political, and media sectors.
            </p>
            <p>
              Established in 2017, Media Vision Bangalore has provided effective media coordination, management, and strategic advice in selected constituencies. We successfully supported candidates in both the 2023 Assembly and 2024 Lok Sabha elections.
            </p>
            <p>
              Through our reliable programs in media and social initiatives, Media Vision Bangalore strives to be a positive reflection of society. Following the COVID-19 pandemic, we stood in solidarity with friends in the media sector and provided assistance to many families.
            </p>
            <p>
              Media Vision regularly organizes seminars, workshops, and study camps. We are dedicated to recognizing and honoring societal achievers by organizing various award programs and rewarding deserving individuals. Through these initiatives, we aim to identify and highlight those working hard for the betterment of society, thereby inspiring the new generation.
            </p>
            <p>
              Media Vision boasts a team of skilled and experienced journalists, public relations professionals, and digital media experts, offering diverse services on a single platform. We have established a strong presence in the media field by providing unique, innovative, and comprehensive media management services.
            </p>
            <p>
              Our organization is committed to providing reliable services to enhance your visibility and support your growth. We offer complete media management solutions, including media coverage, branding, media composition, strategic advice, and political strategy, tailored for both individuals and organizations seeking to increase their popularity and achieve their development goals.
            </p>
          </motion.div>
        </motion.section>

        {/* Mission Section */}
        <motion.section
          className="mb-16"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div 
              variants={fadeInUp} 
              transition={{ duration: 0.7 }}
              className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-[#003049]"
            >
              <h2 className="text-3xl font-bold mb-6 text-[#003049]">Our Mission</h2>
              <p className="text-gray-700 mb-4">
                Our mission is to empower individuals and communities through education
                and support programs that create lasting change.
              </p>
              <p className="text-gray-700">
                We believe in the power of education to transform lives and create
                opportunities for a better future.
              </p>
            </motion.div>
            <motion.div
              className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-[#669BBC]"
              variants={fadeInUp}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <h3 className="text-2xl font-semibold mb-4 text-[#669BBC]">Our Values</h3>
              <ul className="space-y-4">
                {[
                  "Commitment to Excellence",
                  "Community Focus",
                  "Sustainable Impact",
                  "Inclusive Approach"
                ].map((value, idx) => (
                  <li className="flex items-start" key={value}>
                    <FaCheckCircle className="text-[#669BBC] mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{value}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section
          className="mb-16 bg-gray-50 py-12 px-6 rounded-lg"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <h2 className="text-3xl font-bold text-center mb-2 text-[#003049]">Our Leadership Team</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Meet the dedicated team behind Media Vision Bangalore
          </p>
          <TeamCarousel />
        </motion.section>

        {/* Impact Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="py-8"
        >
          <h2 className="text-3xl font-bold text-center mb-4 text-[#003049]">Our Impact</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Making a difference in our community through dedicated service
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { value: 1000, label: "Students Supported", suffix: "+", icon: <FaUserFriends className="text-5xl mb-4" /> },
              { value: 50, label: "Programs Launched", suffix: "+", icon: <FaChartLine className="text-5xl mb-4" /> },
              { value: 10, label: "Communities Reached", suffix: "+", icon: <FaHandshake className="text-5xl mb-4" /> }
            ].map((impact, idx) => (
              <motion.div
                className="bg-white text-center p-8 rounded-lg shadow-lg border-t-4"
                style={{ borderColor: idx === 0 ? '#003049' : idx === 1 ? '#669BBC' : '#C1121F' }}
                key={impact.label}
                variants={fadeInUp}
                transition={{ duration: 0.7, delay: 0.2 * idx }}
              >
                <div className="flex justify-center text-gray-700">
                  {impact.icon}
                </div>
                <h3 className="text-4xl font-bold mb-2 text-[#003049]">
                  <CountUp
                    end={impact.value}
                    duration={2}
                    enableScrollSpy
                    scrollSpyOnce
                    suffix={impact.suffix}
                  />
                </h3>
                <p className="text-gray-600 font-medium">{impact.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>

      {/* Call to Action */}
      <motion.section
        className="bg-gradient-to-r from-[#003049] to-[#669BBC] text-white py-16"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Be part of our mission to transform communities and create lasting impact.
          </p>
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="/contact"
              className="bg-white text-[#003049] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 shadow-lg"
            >
              Contact Us
            </a>
            <a
              href="/events"
              className="bg-[#C1121F] hover:bg-[#780000] text-white px-8 py-3 rounded-lg font-semibold transition duration-300 shadow-lg"
            >
              Upcoming Events
            </a>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}

// TeamCarousel component
const teamMembers = [
  {
    name: "Rekha M Hiremath",
    role: "Founder and CEO",
    description:""
  },
  {
    name: "Mahantesh S Hiremath",
    role: "Executive Director",
    description: ""
  },
  {
    name: "M.P. Kotresh",
    role: "Managing Committee Member",
    description: ""
  },
  {
    name: "Nanda C. Balehallimath",
    role: "Managing Committee Member",
    description: ""
  },
  {
    name: "Bheemanagouda K",
    role: "Managing Committee Member",
    description: ""
  }
];

function TeamCarousel() {
  const [idx, setIdx] = useState(0);
  const autoPlay = true;
  const [visibleCount, setVisibleCount] = useState(window.innerWidth < 768 ? 1 : 3);

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setIdx((i) => (i + 1) % teamMembers.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [autoPlay]);

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(window.innerWidth < 768 ? 1 : 3);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get the visible members (wrap around)
  const getVisibleMembers = () => {
    const members = [];
    for (let i = 0; i < visibleCount; i++) {
      members.push(teamMembers[(idx + i) % teamMembers.length]);
    }
    return members;
  };
  const visibleMembers = getVisibleMembers();

  return (
    <div className="w-full max-w-[100%] mx-auto bg-white rounded-lg shadow-lg p-8 flex flex-col items-center relative">
      <div className="flex items-center justify-between w-full mb-6">
        <button
          className="text-2xl px-3 py-1 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors text-[#003049]"
          onClick={() => setIdx((idx - 1 + teamMembers.length) % teamMembers.length)}
        >
          &#8592;
        </button>
        <div className="flex gap-2">
          {teamMembers.map((_, i) => (
            <span
              key={i}
              className={`w-3 h-3 rounded-full ${i === idx ? 'bg-[#003049]' : 'bg-gray-300'}`}
              onClick={() => setIdx(i)}
              style={{ cursor: 'pointer' }}
            />
          ))}
        </div>
        <button
          className="text-2xl px-3 py-1 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors text-[#003049]"
          onClick={() => setIdx((idx + 1) % teamMembers.length)}
        >
          &#8594;
        </button>
      </div>
      <div className="w-full flex flex-row gap-8 justify-center items-stretch">
        {visibleMembers.map((member, i) => (
          <div
            key={member.name}
            className="flex-1 min-w-0 bg-white rounded-lg shadow-lg p-6 flex flex-col items-center mx-2 border-t-4"
            style={{ 
              maxWidth: 400,
              borderColor: i === 0 ? '#003049' : i === 1 ? '#669BBC' : '#C1121F'
            }}
          >
            <div className="w-20 h-20 bg-gradient-to-r from-[#003049] to-[#669BBC] rounded-full mx-auto mb-4 flex items-center justify-center text-2xl text-white font-bold">
              {member.name.split(' ').map(n => n[0]).join('').slice(0,2)}
            </div>
            <h3 className="text-lg font-semibold mb-1 text-center text-[#003049]">{member.name}</h3>
            <p className="text-[#669BBC] font-medium mb-2 text-center">{member.role}</p>
            {member.description && <p className="text-gray-600 text-center text-base mt-2">{member.description}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default About;
