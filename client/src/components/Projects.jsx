import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiGithub, FiExternalLink, FiArrowRight } from "react-icons/fi";
import api from "../api/axios";
import "./Projects.css";

const fallbackProjects = [
  {
    _id: "1",
    title: "NorthStarr Market",
    description:
      "A user-friendly online marketplace that helps shoppers discover products and shop with ease.",
    image: "/assets/NorhStar.jpg",
    techStack: ["React", "Node.js", "Express", "MongoDB", "CSS"],
    liveUrl: "https://daniel-portfolio.vercel.app",
    githubUrl: "https://github.com/daniel-desalew/portfolio",
  },
  {
    _id: "2",
    title: "hotel-managment2",
    description:
      "A hotel management application designed to simplify day-to-day hotel operations.",
    image: "/assets/hotel-mangment-2.png",
    techStack: ["React", "Express", "MongoDB", "Stripe", "Redux"],
    liveUrl: "https://shophub-daniel.vercel.app",
    githubUrl: "https://github.com/daniel-desalew/shophub",
  },
  {
    _id: "3",
    title: "Hotel -Mangment1",
    description:
      "A hotel management solution focused on keeping hotel workflows organized.",
    image: "/assets/hotel-managment1.jpg",
    techStack: ["React", "Node.js", "MongoDB", "Socket.IO", "JWT"],
    liveUrl: "https://taskflow-daniel.vercel.app",
    githubUrl: "https://github.com/daniel-desalew/taskflow",
  },
  {
    _id: "special-boarding-schools-portal",
    title: "Special Boarding Schools Portal",
    description:
      "A multilingual education portal with school programs, admissions guidance, resources, and news.",
    image: "https://sbs-portal-nu.vercel.app/icon.svg?3df467fc17fc410e",
    techStack: [],
    liveUrl: "https://sbs-portal-nu.vercel.app/",
    externalOnly: true,
  },
];

const sbsPortalProject = fallbackProjects.find(
  (project) => project.externalOnly,
);

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/projects")
      .then((res) => {
        const projects =
          res.data.length > 0 ? res.data : fallbackProjects;
        const hasSbsPortal = projects.some(
          (project) => project.liveUrl === sbsPortalProject.liveUrl,
        );
        setProjects(
          hasSbsPortal ? projects : [...projects, sbsPortalProject],
        );
        setLoading(false);
      })
      .catch(() => {
        setProjects(fallbackProjects);
        setLoading(false);
      });
  }, []);

  return (
    <section id="projects">
      <div className="container">
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p>
            A selection of my recent work — from full-stack apps to polished frontend experiences.
          </p>
        </motion.div>

        {loading ? (
          <div className="projects-loading">
            {[1, 2, 3].map((n) => (
              <div key={n} className="skeleton-card" />
            ))}
          </div>
        ) : (
          <div className="projects-grid">
            {projects.map((project, i) => (
              <motion.div
                key={project._id}
                className="project-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                {/* Image */}
                <div className="project-image">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    onError={(e) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&h=500&fit=crop";
                    }}
                  />
                  <div className="project-overlay">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub repository"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FiGithub />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Live demo"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FiExternalLink />
                      </a>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tags">
                    {(project.techStack || []).map((tech) => (
                      <span key={tech} className="tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.externalOnly ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-detail-link"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        marginTop: 16,
                        color: "var(--accent)",
                        fontWeight: 600,
                        fontSize: "0.9rem",
                        transition: "gap 0.2s ease",
                      }}
                    >
                      Visit Website <FiArrowRight />
                    </a>
                  ) : (
                    <Link
                      to={`/project/${project._id}`}
                      className="project-detail-link"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        marginTop: 16,
                        color: "var(--accent)",
                        fontWeight: 600,
                        fontSize: "0.9rem",
                        transition: "gap 0.2s ease",
                      }}
                    >
                      View Details <FiArrowRight />
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
