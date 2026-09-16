/* ============================================
   PORTFOLIO DATA — Edit this file to update your site!
   
   HOW TO USE:
   -----------
   • To ADD a new skill:   Copy a skill object, paste it below, and edit.
   • To ADD a new project: Copy a project object, paste it below, and edit.
   • Save this file and refresh your browser — changes appear instantly!
   ============================================ */

const PORTFOLIO_DATA = {

  // =====================
  // SKILL CATEGORIES
  // =====================
  // Each category has:
  //   icon     → Any emoji
  //   title    → Category name
  //   skills   → Array of { name, percent }
  //
  // To add a new category, copy the block below and edit:
  // {
  //   icon: "🔥",
  //   title: "New Category",
  //   skills: [
  //     { name: "Skill Name", percent: 80 },
  //   ]
  // },

  skillCategories: [
    {
      icon: "🛠️",
      title: "Core Technologies",
      skills: [
        { name: "Python", percent: 90 },
        { name: "HTML5", percent: 85 },
        { name: "CSS3", percent: 80 },
      ]
    },
    {
      icon: "🧠",
      title: "AI & Specialized",
      skills: [
        { name: "Prompt Engineering", percent: 95 },
        { name: "Vibe Coding", percent: 90 },
        { name: "AI / ML Concepts", percent: 85 },
      ]
    },

    // ── ADD MORE SKILL CATEGORIES BELOW ──
    // Example:
    // {
    //   icon: "🗄️",
    //   title: "Databases & Tools",
    //   skills: [
    //     { name: "MySQL", percent: 70 },
    //     { name: "Git & GitHub", percent: 80 },
    //   ]
    // },
  ],


  // =====================
  // PROJECTS
  // =====================
  // Each project has:
  //   title       → Project name
  //   description → What the project does
  //   tags        → Array of tech tags
  //   link        → (Optional) URL to live demo or GitHub repo
  //
  // To add a new project, copy the block below and edit:
  // {
  //   title: "Project Name",
  //   description: "What this project does...",
  //   tags: ["Python", "AI"],
  //   link: ""
  // },

  projects: [
    {
      title: "NAVIASSIST",
      description: "An assistive navigation system for visually impaired individuals. Using a camera, the application identifies objects in the user's surroundings and provides real-time audio descriptions of what is in front of them — enabling safer and more confident independent movement.",
      tags: ["Python", "Prompt Engineering", "AI"],
      link: "https://github.com/anveshdulam/Navi-Assistant",
      workflow: ["User points camera at environment", "System detects objects in real-time", "Converts object data to natural language", "Plays audio description to user"]
    },
    {
      title: "FITBIT",
      description: "An intelligent calorie tracking tool built entirely through \"vibe coding\" and advanced prompt engineering. This project showcases the power of AI-assisted development — from concept to a fully functional health application, crafted at the speed of thought.",
      tags: ["HTML5", "CSS", "Python", "AI"],
      link: "",
      workflow: ["User inputs meal or food image", "AI estimates nutritional value and calories", "System logs data to daily tracker", "User reviews health progress"]
    },
    {
      title: "Portfolio Website",
      description: "Portfolio website for Anvesh Dulam, showcasing his skills and projects. This website is a testament to his abilities as a developer and his passion for creating innovative solutions.",
      tags: ["HTML5", "CSS", "JavaScript", "AI"],
      link: "https://github.com/anveshdulam/PORTFOLIO",
      workflow: ["Visitor lands on Hero section", "Explores cinematic full-page scroll", "Reviews project workflows and tech stack", "Connects via Contact section"]
    },
    {
      title: "SAGE",
      description: "An intelligent, multi-modal, and gamified academic super-assistant engineered to eliminate 'blank page syndrome' and passive reading fatigue for high-performing students and researchers.",
      tags: ["Python", "AI", "Assistant"],
      link: "https://github.com/anveshdulam/SAGE",
      workflow: ["Student uploads academic document", "SAGE parses and analyzes text", "Generates interactive quizzes and summaries", "Student learns through gamified UI"]
    },
    {
      title: "Cosmic Aurora",
      description: "An interactive, high-performance 3D Cosmic Atlas built with Next.js and React Three Fiber. Features a cinematic scroll-driven journey from the Sun to the Laniakea Supercluster.",
      tags: ["TypeScript", "Next.js", "React Three Fiber", "3D"],
      link: "https://github.com/anveshdulam/cosmic-aroura",
      workflow: ["User enters the 3D Atlas", "Scrolls to navigate through space", "WebGL renders planetary bodies in real-time", "User discovers the Laniakea Supercluster"]
    },
    {
      title: "Jarvis Local Assistant",
      description: "An event-driven, low-latency local voice assistant architecture utilizing openWakeWord, Silero VAD, Faster-Whisper, Kokoro-82M, and the Gemini API for secure terminal execution.",
      tags: ["Python", "AI", "Voice Assistant", "Gemini API"],
      link: "https://github.com/anveshdulam/jarvis-local-assistant",
      workflow: ["User speaks wake word", "Voice is transcribed locally", "Gemini API determines action", "System executes command & responds via TTS"]
    },
    {
      title: "CAREPATH",
      description: "A web app tackling India's 'Fear of Diagnosis' crisis. Built for DesignVerse 2026, it helps people overcome emotional barriers (denial, stigma, anxiety) delaying medical care.",
      tags: ["TypeScript", "Web App", "Healthcare"],
      link: "https://github.com/anveshdulam/CAREPATH",
      workflow: ["Patient opens app securely", "Navigates anxiety-reduction UX", "System provides gentle diagnostic guidance", "Patient connects with medical care"]
    },
    {
      title: "AI & ML Spam Detection System",
      description: "Terminal-based spam classifier using an ensemble of 5 ML models with TF-IDF vectorization, batch mode, and feedback learning.",
      tags: ["Python", "Machine Learning", "NLP"],
      link: "https://github.com/anveshdulam/FUNDAMENTAL-AI-AND-ML-SPAM-DETECTION-SYSTEM-",
      workflow: ["User inputs text via terminal", "TF-IDF vectorizes the input", "Ensemble of 5 models classifies text", "System outputs Spam/Ham prediction"]
    }
  ],

};
