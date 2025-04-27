import { motion } from 'framer-motion';
import CountUp from 'react-countup';

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
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.section
          className="mb-16"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-4xl font-bold text-center mb-6"
            variants={fadeInUp}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            About Our Organization
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 text-center max-w-3xl mx-auto"
            variants={fadeInUp}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            We are dedicated to making a positive impact in our community through education,
            support, and development initiatives.
          </motion.p>
        </motion.section>

        {/* Mission Section */}
        <motion.section
          className="mb-16"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeInUp} transition={{ duration: 0.7 }}>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-gray-600 mb-4">
                Our mission is to empower individuals and communities through education
                and support programs that create lasting change.
              </p>
              <p className="text-gray-600">
                We believe in the power of education to transform lives and create
                opportunities for a better future.
              </p>
            </motion.div>
            <motion.div
              className="bg-gray-100 p-8 rounded-lg"
              variants={fadeInUp}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <h3 className="text-2xl font-semibold mb-4">Our Values</h3>
              <ul className="space-y-4">
                {[
                  "Commitment to Excellence",
                  "Community Focus",
                  "Sustainable Impact",
                  "Inclusive Approach"
                ].map((value, idx) => (
                  <li className="flex items-start" key={value}>
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>{value}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section
          className="mb-16"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "John Doe", role: "Founder & Director" },
              { name: "Jane Smith", role: "Program Manager" },
              { name: "Mike Johnson", role: "Community Coordinator" }
            ].map((member, idx) => (
              <motion.div
                className="bg-white p-6 rounded-lg shadow-lg text-center"
                key={member.name}
                variants={fadeInUp}
                transition={{ duration: 0.7, delay: 0.2 * idx }}
              >
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Impact Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { value: 1000, label: "Students Supported", suffix: "+" },
              { value: 50, label: "Programs Launched", suffix: "+" },
              { value: 10, label: "Communities Reached", suffix: "+" }
            ].map((impact, idx) => (
              <motion.div
                className="bg-blue-600 text-white p-8 rounded-lg text-center"
                key={impact.label}
                variants={fadeInUp}
                transition={{ duration: 0.7, delay: 0.2 * idx }}
              >
                <h3 className="text-4xl font-bold mb-2">
                  <CountUp
                    end={impact.value}
                    duration={2}
                    enableScrollSpy
                    scrollSpyOnce
                    suffix={impact.suffix}
                  />
                </h3>
                <p>{impact.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}

export default About;
