// server/seed/seedData.js
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Project from "../models/Project.js";
import Skill from "../models/Skill.js";
import About from "../models/About.js";
import User from "../models/User.js";

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    // ---------- CLEAR OLD DATA ----------
    await Project.deleteMany();
    await Skill.deleteMany();
    await About.deleteMany();
    await User.deleteMany();
    console.log("🗑️  Cleared existing data");

    // ============================================
    // PROJECTS
    // ============================================
    await Project.insertMany([
      {
        title: "NorthStarr Market",
        description:
          "A user-friendly online marketplace that helps shoppers discover products and shop with ease.",
        longDescription:
          "NorthStarr Market brings product discovery and online shopping together in a simple, convenient marketplace experience.",
        image: "/assets/NorhStar.jpg",
        techStack: ["React", "Node.js", "Express", "MongoDB", "CSS"],
        liveUrl: "https://daniel-portfolio.vercel.app",
        githubUrl: "https://github.com/daniel-desalew/portfolio",
        featured: true,
        order: 1,
      },
      {
        title: "hotel-managment2",
        description:
          "A hotel management application designed to simplify day-to-day hotel operations.",
        longDescription:
          "A project focused on making everyday hotel operations simpler to manage.",
        image: "/assets/hotel-mangment-2.png",
        techStack: ["React", "Express", "MongoDB", "Stripe", "Redux"],
        liveUrl: "https://shophub-daniel.vercel.app",
        githubUrl: "https://github.com/daniel-desalew/shophub",
        featured: true,
        order: 2,
      },
      {
        title: "Hotel -Mangment1",
        description:
          "A hotel management solution focused on keeping hotel workflows organized.",
        longDescription:
          "A project designed to help keep hotel workflows clear and organized.",
        image: "/assets/hotel-managment1.jpg",
        techStack: ["React", "Node.js", "MongoDB", "Socket.IO", "JWT"],
        liveUrl: "https://taskflow-daniel.vercel.app",
        githubUrl: "https://github.com/daniel-desalew/taskflow",
        featured: true,
        order: 3,
      },
      {
        title: "Special Boarding Schools Portal",
        description:
          "A multilingual education portal with school programs, admissions guidance, resources, and news.",
        details:
          "A portal for Ethiopia's special boarding schools, featuring information about programs, admissions, resources, career opportunities, news, and a multilingual experience.",
        image: "https://sbs-portal-nu.vercel.app/icon.svg?3df467fc17fc410e",
        tech: [],
        liveUrl: "https://sbs-portal-nu.vercel.app/",
      },
    ]);
    console.log("✅ Seeded 4 projects");

    // ============================================
    // SKILLS
    // ============================================
    await Skill.insertMany([
      { name: "HTML5", category: "Frontend", level: 95, order: 1 },
      { name: "CSS3", category: "Frontend", level: 92, order: 2 },
      { name: "JavaScript", category: "Frontend", level: 90, order: 3 },
      { name: "React", category: "Frontend", level: 88, order: 4 },
      { name: "Tailwind CSS", category: "Frontend", level: 85, order: 5 },
      { name: "Node.js", category: "Backend", level: 88, order: 6 },
      { name: "Express", category: "Backend", level: 87, order: 7 },
      { name: "REST APIs", category: "Backend", level: 90, order: 8 },
      { name: "JWT Auth", category: "Backend", level: 82, order: 9 },
      { name: "MongoDB", category: "Database", level: 85, order: 10 },
      { name: "Mongoose", category: "Database", level: 83, order: 11 },
      { name: "Git & GitHub", category: "Tools", level: 90, order: 12 },
      { name: "VS Code", category: "Tools", level: 95, order: 13 },
      { name: "Postman", category: "Tools", level: 85, order: 14 },
      { name: "Vite", category: "Tools", level: 85, order: 15 },
    ]);
    console.log("✅ Seeded 15 skills");

    // ============================================
    // ABOUT — Updated with your real info
    // ============================================
    await About.create({
      name: "Daniel",
      title: "Full-Stack Web Developer",
      location: "Injibara, Ethiopia",
      bio: "I'm Daniel, a software engineering student who enjoys creating practical, polished digital experiences. I build responsive web applications and keep learning through hands-on projects.",

      // 👇 CHANGE THIS LINE 👇
      photo: "/profile.jpg",
      // 👆 CHANGE THIS LINE 👆

      resumeUrl: "/resume.pdf",
      email: "danieldesalew23@gmail.com",
      phone: "0954207319",
      github: "https://github.com/daniel-desalew",
      linkedin: "https://www.linkedin.com/in/daniel-desalew-553298448",
      twitter: "https://twitter.com/daniel",
      website: "https://daniel-portfolio.vercel.app",
      stats: [
        { label: "Years Coding", value: "3+" },
        { label: "Projects Shipped", value: "10+" },
        { label: "Technologies", value: "15+" },
        { label: "Happy Clients", value: "5+" },
      ],
    });
    console.log("✅ Seeded about info");

    // ============================================
    // ADMIN USER
    // ============================================
    await User.create({
      name: "Daniel",
      email: "admin@daniel.com",
      password: "admin123",
      isAdmin: true,
    });
    console.log("✅ Seeded admin: admin@daniel.com / admin123");

    console.log("\n🎉 Database seeded successfully!\n");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed error:", error);
    process.exit(1);
  }
};

seedData();
