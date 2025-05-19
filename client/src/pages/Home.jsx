import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { FaHandHoldingHeart, FaGraduationCap, FaPeopleCarry, FaSeedling, FaArrowRight } from "react-icons/fa";
import image from '../assets/logo.png';
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
        className="relative bg-gradient-to-r from-blue-600 to-blue-300 text-white py-24 md:py-32"
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
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-900/80"></div>
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
            Empowering society through media, strategy, and community engagement.
          </motion.p>
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/about"
              className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 shadow-lg"
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
              { value: 5000, label: "Lives Touched Through Media & Social Programs", plus: true },
              { value: 10, label: "Community Outreach Events Conducted", plus: true },
              { value: 8, label: "Years of Service in Media, Public Engagement, and Social Impact", plus: true },
              { value: 500, label: "Volunteers and Media Professionals Involved", plus: true }
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                className="p-6"
                variants={fadeInUp}
              >
                <p className="text-4xl font-bold text-blue-900 mb-2">
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
          <h2 className="text-3xl font-bold text-center mb-4 text-blue-900">Our Programs</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Empowering individuals and communities through purpose-driven initiatives
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                title: "Media & Strategic Services",
                desc: "Supporting individuals, campaigns, and organizations with innovative media solutions, branding, and PR.",
                icon: <FaGraduationCap className="text-4xl text-blue-900 mb-4" />
              },
              {
                title: "Awards and Recognition:",
                desc: "Honoring socially contributing people to identify and uplift human welfare and spread awareness.",
                icon: <FaPeopleCarry className="text-4xl text-blue-900 mb-4" />
              },
              {
                title: "Social Welfare & Development",
                desc: "From free health camps, food kit donation and campaigns to women's empowerment programs and student aid – we build resilient communities.",
                icon: <FaSeedling className="text-4xl text-[#C1121F] mb-4" />
              },
              {
                title: "Educational Outreach",
                desc: "Workshops, camps, and recognition programs that promote access to learning and teacher excellence.",
                icon: <FaGraduationCap className="text-4xl text-blue-900 mb-4" />
              }
            ].map((feature, idx) => (
              <motion.div
                key={feature.title}
                className="bg-white p-8 rounded-lg shadow-lg border-t-4 hover:shadow-xl transition-shadow text-center"
                style={{ 
                  borderColor: 
                    idx === 0 ? '#003049' : 
                    idx === 1 ? '#669BBC' : 
                    idx === 2 ? '#C1121F' : 
                    '#003049' 
                }}
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

      {/* Event Highlights Section - Added below Our Programs */}
      <motion.section
        className="py-16 bg-white"
        initial="hidden"
        animate="visible"
        variants={containerStagger}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-blue-900">Event Highlights</h2>
          <p className="text-center text-gray-600 mb-10 max-w-3xl mx-auto">
            A glimpse into our impactful events and initiatives across Bengaluru
          </p>
          
          {/* Featured Event - Large Banner */}
          <motion.div 
            className="mb-10 rounded-xl overflow-hidden shadow-xl relative"
            variants={fadeInUp}
          >
            <img 
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&h=500&q=80" 
              alt="Media Vision Annual Conference" 
              className="w-full h-[300px] md:h-[400px] object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <h3 className="text-2xl font-bold text-white">Annual Media Vision Conference 2024</h3>
              <p className="text-white/80 text-lg">Bringing together media professionals from across South India</p>
            </div>
          </motion.div>
          
          {/* Event Grid - Multiple Images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                img: "https://images.unsplash.com/photo-1560523159-4a9692d222f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                title: "Media Training Workshop",
                date: "June 12, 2024"
              },
              {
                img: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                title: "Excellence in Journalism Awards",
                date: "April 25, 2024"
              },
              {
                img: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                title: "PR Strategy Summit",
                date: "March 18, 2024"
              },
              {
                img: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                title: "Media & Technology Conference",
                date: "February 8, 2024"
              },
              {
                img: "https://images.unsplash.com/photo-1534649643822-e7431de08af6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                title: "Community Radio Workshop",
                date: "January 22, 2024"
              }
            ].map((event, idx) => (
              <motion.div 
                key={idx}
                className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
                variants={fadeInUp}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="h-52 overflow-hidden">
                  <img 
                    src={event.img} 
                    alt={event.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 bg-white">
                  <h3 className="font-semibold text-lg text-blue-900">{event.title}</h3>
                  <p className="text-gray-500 text-sm">{event.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* View All Events Button */}
          <motion.div 
            className="text-center mt-10"
            variants={fadeInUp}
          >
            <Link 
              to="/events" 
              className="inline-flex items-center gap-2 bg-blue-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-[#002030] transition-colors"
            >
              View All Events <FaArrowRight />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Call to Action - Updated with branded colors */}
      <motion.section
        className="bg-gradient-to-r from-blue-900 to-blue-900 text-white py-20"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Mission</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
          <span className='font-bold text-2xl'> Be a changemaker with us.</span><br/>
          Volunteer, partner, sponser or contribute to help amplify voices and transform lives through events, media and social outreach.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 shadow-lg"
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
