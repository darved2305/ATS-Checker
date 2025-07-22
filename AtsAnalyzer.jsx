import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { calculateAtsScore } from "./calculateAtsScore"; 


const AtsAnalyzer = ({ sectionVariants, buttonVariants, setModalMessage, setShowModal }) => {
  const [resumeText, setResumeText] = useState('');
  const [jobDescriptionText, setJobDescriptionText] = useState('');
  const [atsResult, setAtsResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setModalMessage("Initiating file scan... (Real-world apps use libraries like pdfjs-dist for actual parsing)");
      setShowModal(true);
      setIsLoading(true);

      setTimeout(() => {
        let dummyContent = '';
        if (file.type === 'application/pdf') {
          dummyContent = `John Doe
          Full Stack Developer
          john.doe@example.com | (123) 456-7890 | LinkedIn: linkedin.com/in/johndoe

          Summary
          Passionate Full Stack Developer with a strong foundation in modern web technologies, seeking to leverage my skills in a dynamic team environment. Experienced in building scalable and user-friendly applications from concept to deployment.

          Education
          Master of Science in Computer Science | University of Technology | 2023
          Specialized in Web Development and Cloud Computing. GPA: 3.9/4.0

          Bachelor of Technology in Information Technology | State University | 2021
          Focused on Software Engineering principles. Dean's List every semester.

          Experience
          Software Engineer | Tech Solutions Inc. | Jan 2023 - Present
          - Developed and maintained robust web applications using React, Node.js, and MongoDB.
          - Implemented RESTful APIs and integrated third-party services.
          - Collaborated with cross-functional teams to deliver high-quality software solutions.

          Junior Developer | Innovate Web Studio | May 2021 - Dec 2022
          - Assisted in the development of client websites using HTML, CSS, and JavaScript.
          - Participated in code reviews and learned best practices in software development.
          - Contributed to front-end UI/UX improvements.

          Projects
          E-commerce Platform
          Built a full-stack e-commerce platform with user authentication, product catalog, shopping cart, and payment integration using MERN stack.
          Technologies: React, Node.js, Express, MongoDB, Stripe

          Task Management App
          A responsive task management application with drag-and-drop functionality and real-time updates, powered by React and Firebase.
          Technologies: React, Firebase, Tailwind CSS

          Skills
          Frontend: JavaScript, React.js, Redux, HTML5, CSS3, Tailwind CSS, Framer Motion
          Backend: Node.js, Express.js, Python, Django, RESTful APIs
          Databases: MongoDB, PostgreSQL, MySQL, Firebase Firestore
          Tools: Git, Docker, Webpack, VS Code, Jira
          Soft Skills: Leadership, Teamwork, Problem Solving, Communication, Adaptability
          `;
        } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
          dummyContent = `John Doe
          Full Stack Developer
          john.doe@example.com | (123) 456-7890 | LinkedIn: linkedin.com/in/johndoe

          Summary
          A dedicated Full Stack Developer with expertise in building robust and scalable web applications. Proven ability to work effectively in team environments and solve complex problems.

          Professional Experience
          Senior Software Engineer | Global Tech Co. | 2024 - Present
          - Led development of critical modules using Python and Django.
          - Optimized database queries for performance.

          Software Developer | Innovate Solutions | 2022 - 2024
          - Developed front-end components with React and Redux.
          - Integrated REST APIs for data fetching.

          Education
          M.S. Computer Science - University of California, Berkeley (2022)
          B.S. Software Engineering - University of Washington (2020)

          Key Projects
          Portfolio Website: React, Tailwind CSS
          Data Analytics Dashboard: Python, Pandas, Matplotlib

          Technical Skills
          Programming Languages: JavaScript, Python, Java
          Frameworks: React, Node.js, Django, Spring Boot
          Databases: PostgreSQL, MySQL
          Tools: Git, Docker, Kubernetes

          Soft Skills
          Communication, Collaboration, Problem-Solving, Analytical Thinking, Adaptability.
          `;
        } else {
          dummyContent = `Please upload a PDF or DOCX file. For demonstration, here's some generic text.
          This is a sample resume text to test the ATS checker. It includes keywords like JavaScript, React, Node.js, Python.
          It also mentions sections like Education, Experience, Projects, and Skills.
          Soft skills such as Leadership and Teamwork are also present.
          The word count is moderate.`;
        }
        setResumeText(dummyContent);
        setShowModal(false);
        setIsLoading(false);
      }, 1500);
    }
  };

  const handleTextChange = (e) => {
    setResumeText(e.target.value);
    setAtsResult(null);
  };

  const handleJobDescriptionChange = (e) => {
    setJobDescriptionText(e.target.value);
    setAtsResult(null);
  };

  const analyzeResume = () => {
    if (resumeText.trim() === '') {
      setModalMessage("Please upload a resume or paste text to analyze.");
      setShowModal(true);
      return;
    }
    setIsLoading(true);
    setAtsResult(null);

    setTimeout(() => {
      const result = calculateAtsScore(resumeText, jobDescriptionText);
      setAtsResult(result);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <section id="ai-resume-analyzer" className="py-20">
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="bg-gradient-to-br from-gray-900/70 via-gray-800/70 to-gray-900/70 backdrop-blur-md p-8 md:p-12 rounded-2xl shadow-2xl max-w-5xl mx-auto w-full border border-cyan-700 transform hover:scale-[1.005] transition-transform duration-300"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-orange-400 leading-tight">
          AI Resume ATS Analyzer
        </h2>
        <p className="text-lg md:text-xl text-gray-300 mb-10 text-center max-w-3xl mx-auto">
          Leverage AI to optimize your resume for Applicant Tracking Systems. Get a compatibility score and actionable suggestions.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <label htmlFor="resume-upload" className="block text-xl font-semibold text-gray-200 mb-3">
              1. Upload Your Resume (PDF/DOCX)
            </label>
            <input
              type="file"
              id="resume-upload"
              accept=".pdf,.doc,.docx"
              onChange={handleFileUpload}
              className="block w-full text-lg text-gray-100
                         file:mr-4 file:py-3 file:px-6
                         file:rounded-full file:border-0
                         file:text-lg file:font-semibold
                         file:bg-gradient-to-r from-cyan-800 to-orange-800 file:text-cyan-200
                         hover:file:from-cyan-700 hover:file:to-orange-700 transition-colors duration-200 cursor-pointer shadow-md"
            />
            <p className="mt-3 text-sm text-gray-400">
              (Note: File content reading is simulated for demonstration.)
            </p>
            <label htmlFor="resume-text" className="block text-xl font-semibold text-gray-200 mb-3 mt-6">
              Or Paste Resume Text
            </label>
            <textarea
              id="resume-text"
              rows="12"
              className="w-full p-4 border border-cyan-700 rounded-lg bg-gray-800 text-gray-100 focus:ring-cyan-500 focus:border-cyan-500 transition-colors duration-200 shadow-inner"
              placeholder="Paste your resume text here (e.g., copied from your PDF/DOCX)..."
              value={resumeText}
              onChange={handleTextChange}
            ></textarea>
          </div>

          <div>
            <label htmlFor="job-description-text" className="block text-xl font-semibold text-gray-200 mb-3">
              2. Paste Job Description (Optional, for targeted analysis)
            </label>
            <textarea
              id="job-description-text"
              rows="12"
              className="w-full p-4 border border-orange-700 rounded-lg bg-gray-800 text-gray-100 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200 shadow-inner"
              placeholder="Paste the job description here for a more precise keyword match..."
              value={jobDescriptionText}
              onChange={handleJobDescriptionChange}
            ></textarea>
            <p className="mt-3 text-sm text-gray-400">
              (Providing a job description helps the AI identify highly relevant keywords.)
            </p>
          </div>
        </div>

        <motion.button
          onClick={analyzeResume}
          className="w-full bg-gradient-to-r from-cyan-600 to-orange-600 hover:from-cyan-700 hover:to-orange-700 text-white font-extrabold py-4 px-8 rounded-full shadow-xl transform transition-all duration-300 text-xl tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing with AI...
            </span>
          ) : (
            'Activate AI Analysis'
          )}
        </motion.button>

        {atsResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mt-12 p-8 bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl border border-cyan-700 shadow-inner-lg"
          >
            <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-orange-400 mb-6 text-center">
              AI Analysis Complete!
            </h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
              <div className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center">
                <motion.svg
                  className="w-full h-full transform -rotate-90"
                  viewBox="0 0 100 100"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    strokeWidth="10"
                    className="stroke-gray-700"
                    fill="transparent"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    strokeWidth="10"
                    strokeDasharray="282.7"
                    strokeDashoffset={282.7 - (atsResult.score / 100) * 282.7}
                    className="stroke-cyan-500"
                    fill="transparent"
                    strokeLinecap="round"
                    initial={{ strokeDashoffset: 282.7 }}
                    animate={{ strokeDashoffset: 282.7 - (atsResult.score / 100) * 282.7 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                </motion.svg>
                <motion.span
                  className="absolute text-4xl md:text-5xl font-extrabold text-cyan-400"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  {atsResult.score}<span className="text-2xl">%</span>
                </motion.span>
              </div>
              <div className="text-center md:text-left">
                <h4 className="text-2xl font-semibold text-gray-200 mb-2">ATS Compatibility Score</h4>
                <p className="text-xl text-gray-300">
                  Your resume achieved a score of <span className="font-bold text-cyan-400">{atsResult.score}%</span>.
                </p>
              </div>
            </div>

            {atsResult.suggestions.length > 0 ? (
              <>
                <h4 className="text-2xl font-semibold text-gray-200 mb-4 border-b pb-2 border-cyan-700">AI-Powered Suggestions:</h4>
                <ul className="list-none space-y-4 text-lg text-gray-300">
                  {atsResult.suggestions.map((suggestion, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      className="flex items-start bg-gradient-to-br from-gray-700 to-gray-600 p-4 rounded-lg shadow-sm border border-cyan-800"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-400 mr-3 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                      </svg>
                      <span>{suggestion}</span>
                    </motion.li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="text-lg text-gray-300 text-center">AI Insight: Your resume is highly optimized for ATS!</p>
            )}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default AtsAnalyzer;
