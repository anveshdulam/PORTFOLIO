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
      link: ""
    },
    {
      title: "FITBIT",
      description: "An intelligent calorie tracking tool built entirely through \"vibe coding\" and advanced prompt engineering. This project showcases the power of AI-assisted development — from concept to a fully functional health application, crafted at the speed of thought.",
      tags: ["HTML5", "CSS", "Python", "AI"],
      link: ""
    },
    {
      title: "Portfolio Website",
      description: "Portfolio website for Anvesh Dulam, showcasing his skills and projects. This website is a testament to his abilities as a developer and his passion for creating innovative solutions.",
      tags: ["HTML5", "CSS", "JavaScript", "AI"],
      link: ""
    }

    // ── ADD MORE PROJECTS BELOW ──
    // Example:
    // {
    //   title: "Smart Chatbot",
    //   description: "An AI-powered chatbot that answers student queries using NLP.",
    //   tags: ["Python", "NLP", "Flask"],
    //   link: "https://github.com/anveshdulam/chatbot"
    // },
  ],

};
