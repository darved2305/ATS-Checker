import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AtsAnalyzer from "./AtsAnalyzer"; // Assuming same folder
import Modal from "./Modal";



const App = () => {
  const theme = 'dark';
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const closeModal = () => {
    setShowModal(false);
    setModalMessage('');
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: "0px 8px 15px rgba(0,0,0,0.4)" },
    tap: { scale: 0.95 }
  };

  const heroButtonVariants = {
    initial: { boxShadow: "0 0 0px rgba(139, 92, 246, 0.7)" },
    animate: {
      boxShadow: [
        "0 0 5px rgba(139, 92, 246, 0.7)",
        "0 0 15px rgba(139, 92, 246, 0.9)",
        "0 0 5px rgba(139, 92, 246, 0.7)"
      ],
      transition: {
        repeat: Infinity,
        duration: 3,
        ease: "easeInOut"
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 0 25px rgba(139, 92, 246, 1)"
    },
    tap: { scale: 0.95 }
  };

  return (
    <div className={`${theme} min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-orange-950 text-gray-100 font-inter transition-colors duration-500 relative overflow-hidden`}>
      <div className="absolute inset-0 z-0 opacity-50">
        <motion.div
          animate={{
            x: ['-5%', '5%', '-5%'],
            y: ['-5%', '5%', '-5%'],
            rotate: [0, 360],
          }}
          transition={{
            duration: 80,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-cyan-400 to-orange-400 rounded-full mix-blend-screen filter blur-3xl opacity-70"
        ></motion.div>
        <motion.div
          animate={{
            x: ['5%', '-5%', '5%'],
            y: ['5%', '-5%', '5%'],
            rotate: [360, 0],
          }}
          transition={{
            duration: 90,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-tl from-pink-400 to-purple-400 rounded-full mix-blend-screen filter blur-3xl opacity-70"
        ></motion.div>
         <motion.div
          animate={{
            x: ['-15%', '15%', '-15%'],
            y: ['-15%', '15%', '-15%'],
            rotate: [0, 360],
          }}
          transition={{
            duration: 100,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-tr from-blue-400 to-green-400 rounded-full mix-blend-screen filter blur-3xl opacity-60"
        ></motion.div>
      </div>

      <Modal showModal={showModal} message={modalMessage} onClose={closeModal} />

      <header className="py-6 px-4 md:px-8 bg-black/50 backdrop-blur-sm shadow-xl sticky top-0 z-30 border-b border-cyan-700">
        <nav className="container mx-auto flex justify-center">
          <a
            href="#hero"
            className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-orange-400 hover:from-cyan-200 hover:to-orange-200 transition-colors duration-200 tracking-wide drop-shadow-lg"
          >
            AI Agents Platform
          </a>
        </nav>
      </header>

      <main className="container mx-auto p-4 md:p-8 relative z-10">
        <section id="hero" className="min-h-[calc(100vh-160px)] flex flex-col items-center justify-center text-center py-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-4xl"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-orange-400 mb-6 leading-tight drop-shadow-xl">
              Introducing <br />AI Agents
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
              Unlock the power of artificial intelligence with our suite of intelligent agents.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <motion.a
                href="#chat-agents"
                className="inline-block px-8 py-4 text-xl font-semibold rounded-full border-2 border-cyan-500 text-cyan-300 hover:text-white hover:bg-cyan-600 transition-all duration-300 shadow-lg"
                variants={heroButtonVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap="tap"
              >
                Chat Agents
              </motion.a>
              <motion.a
                href="#knowledge-engine"
                className="inline-block px-8 py-4 text-xl font-semibold rounded-full border-2 border-orange-500 text-orange-300 hover:text-white hover:bg-orange-600 transition-all duration-300 shadow-lg"
                variants={heroButtonVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap="tap"
              >
                Knowledge Engine
              </motion.a>
              <motion.a
                href="#ai-inbox"
                className="inline-block px-8 py-4 text-xl font-semibold rounded-full border-2 border-pink-500 text-pink-300 hover:text-white hover:bg-pink-600 transition-all duration-300 shadow-lg"
                variants={heroButtonVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap="tap"
              >
                AI Inbox
              </motion.a>
            </div>
          </motion.div>
        </section>

        <section id="chat-agents" className="py-20">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="bg-gradient-to-br from-gray-900/70 via-gray-800/70 to-gray-900/70 backdrop-blur-md p-8 md:p-12 rounded-2xl shadow-2xl max-w-5xl mx-auto border border-cyan-700 transform hover:scale-[1.005] transition-transform duration-300"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-orange-400 leading-tight">
              Intelligent Chat Agents
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-10 text-center max-w-3xl mx-auto">
              Our AI Chat Agents provide instant, accurate, and personalized responses, enhancing customer support and internal communication.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-lg shadow-inner border border-cyan-800">
                <h3 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 mb-3">24/7 Availability</h3>
                <p className="text-gray-400">Never miss an inquiry. Our chat agents are always on, providing continuous support and information.</p>
              </div>
              <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-lg shadow-inner border border-orange-800">
                <h3 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-red-400 mb-3">Contextual Understanding</h3>
                <p className="text-gray-400">Powered by advanced NLP, agents understand complex queries and maintain conversation context.</p>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="knowledge-engine" className="py-20">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="bg-gradient-to-br from-gray-900/70 via-gray-800/70 to-gray-900/70 backdrop-blur-md p-8 md:p-12 rounded-2xl shadow-2xl max-w-5xl mx-auto border border-orange-700 transform hover:scale-[1.005] transition-transform duration-300"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-400 leading-tight">
              Advanced Knowledge Engine
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-10 text-center max-w-3xl mx-auto">
              Transform raw data into actionable insights. Our Knowledge Engine intelligently processes vast amounts of information.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-lg shadow-inner border border-orange-800">
                <h3 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-3">Intelligent Data Retrieval</h3>
                <p className="text-gray-400">Quickly find the information you need from diverse data sources with smart indexing and search.</p>
              </div>
              <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-lg shadow-inner border border-pink-800">
                <h3 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-yellow-400 mb-3">Insight Generation</h3>
                <p className="text-gray-400">Beyond retrieval, the engine generates summaries, trends, and predictions to aid decision-making.</p>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="ai-inbox" className="py-20">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="bg-gradient-to-br from-gray-900/70 via-gray-800/70 to-gray-900/70 backdrop-blur-md p-8 md:p-12 rounded-2xl shadow-2xl max-w-5xl mx-auto border border-pink-700 transform hover:scale-[1.005] transition-transform duration-300"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-red-400 leading-tight">
              Smart AI Inbox Management
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-10 text-center max-w-3xl mx-auto">
              Streamline your communication with AI-powered inbox features that prioritize, categorize, and draft responses.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-lg shadow-inner border border-pink-800">
                <h3 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-3">Automated Prioritization</h3>
                <p className="text-gray-400">AI intelligently sorts your emails, highlighting urgent messages and filtering out noise.</p>
              </div>
              <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-lg shadow-inner border border-blue-800">
                <h3 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400 mb-3">Smart Drafts & Replies</h3>
                <p className="text-gray-400">Generate quick, context-aware reply suggestions and even full email drafts.</p>
              </div>
            </div>
          </motion.div>
        </section>

        <AtsAnalyzer
          sectionVariants={sectionVariants}
          buttonVariants={buttonVariants}
          setModalMessage={setModalMessage}
          setShowModal={setShowModal}
        />
      </main>

      <footer className="py-8 px-4 md:px-8 bg-black/50 backdrop-blur-sm text-center text-gray-500 border-t border-cyan-700">
        <p>&copy; {new Date().getFullYear()} AI Agents Platform. All rights reserved.</p>
      </footer>

      <style>{`
        @keyframes pulse-border {
          0% { border-color: rgba(6, 182, 212, 0.7); }
          50% { border-color: rgba(6, 182, 212, 1); }
          100% { border-color: rgba(6, 182, 212, 0.7); }
        }
        .animate-pulse-border {
          animation: pulse-border 2s infinite alternate;
        }

        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default App;
