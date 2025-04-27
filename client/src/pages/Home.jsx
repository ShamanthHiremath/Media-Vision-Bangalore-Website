import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

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
      {/* Hero Section */}
      <motion.section
        className="bg-blue-600 text-white py-20"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6"
            variants={fadeInUp}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Welcome to Our Organization
          </motion.h1>
          <motion.p
            className="text-xl mb-8"
            variants={fadeInUp}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Making a difference in our community through education and support
          </motion.p>
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Link
              to="/about"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition duration-300"
            >
              Learn More
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="py-16"
        initial="hidden"
        animate="visible"
        variants={containerStagger}
        transition={{ staggerChildren: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Education",
                desc: "Providing quality education and learning opportunities for all."
              },
              {
                title: "Community Support",
                desc: "Supporting local communities through various initiatives."
              },
              {
                title: "Development",
                desc: "Fostering growth and development in our society."
              }
            ].map((feature, idx) => (
              <motion.div
                key={feature.title}
                className="bg-white p-6 rounded-lg shadow-lg"
                variants={fadeInUp}
                transition={{ duration: 0.7, delay: 0.2 * idx }}
              >
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        className="bg-gray-100 py-16"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Mission</h2>
          <p className="text-xl mb-8">
            Together, we can make a lasting impact in our community.
          </p>
          <Link
            to="/contact"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Get Involved
          </Link>
        </div>
      </motion.section>
    </div>
  );
}

export default Home;
