// Fallback static data: shown if the API is not running or unreachable.
// Keep this in sync with server/seed/seedData.js.
const portfolioData = {
  about: {
    name: "Your Name",
    title: "Full-Stack Developer",
    location: "City, Country",
    bio: "I'm Daniel, a software engineering student who enjoys creating practical, polished digital experiences. I build responsive web applications and keep learning through hands-on projects.",
    photo: "/assets/profile.jpg",
    resumeUrl: "/assets/resume.pdf",
    github: "https://github.com/daniel-desalew",
    linkedin: "https://www.linkedin.com/in/daniel-desalew-553298448",
    twitter: "https://twitter.com/yourusername",
    facts: [
      { label: "Location", value: "City, Country" },
      { label: "Experience", value: "3 years" },
      { label: "Focus", value: "MERN stack" },
    ],
  },
  skills: [
    { _id: "s1", name: "HTML", category: "Frontend", level: 90 },
    { _id: "s2", name: "CSS", category: "Frontend", level: 85 },
    { _id: "s3", name: "JavaScript", category: "Frontend", level: 85 },
    { _id: "s4", name: "React", category: "Frontend", level: 80 },
    { _id: "s5", name: "Node.js", category: "Backend", level: 80 },
    { _id: "s6", name: "MongoDB", category: "Backend", level: 75 },
  ],
  projects: [1, 2, 3].map((n) => ({
    _id: String(n),
    title:
      n === 1
        ? "NorthStarr Market"
        : n === 2
          ? "hotel-managment2"
          : "Hotel -Mangment1",
    description:
      n === 1
        ? "A user-friendly online marketplace that helps shoppers discover products and shop with ease."
        : n === 2
        ? "A hotel management application designed to simplify day-to-day hotel operations."
        : n === 3
          ? "A hotel management solution focused on keeping hotel workflows organized."
          : "Short description of what it does.",
    details:
      n === 1
        ? "NorthStarr Market brings product discovery and online shopping together in a simple, convenient marketplace experience."
        : n === 2
        ? "A project focused on making everyday hotel operations simpler to manage."
        : n === 3
          ? "A project designed to help keep hotel workflows clear and organized."
          : "Longer write-up: the problem, your approach, and the result.",
    image:
      n === 1
        ? "/assets/NorhStar.jpg"
        : n === 2
          ? "/assets/hotel-mangment-2.png"
          : "/assets/hotel-managment1.jpg",
    screenshots: [
      n === 1
        ? "/assets/NorhStar.jpg"
        : n === 2
          ? "/assets/hotel-mangment-2.png"
          : "/assets/hotel-managment1.jpg",
    ],
    tech: ["React", "Node.js", "MongoDB"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/daniel-desalew",
  })),
};

export default portfolioData;
