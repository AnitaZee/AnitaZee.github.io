
import './App.css'
import MemoryGame from "./components/MemoryGame/MemoryGame";

const projects = [
  {
    number: '01',
    title: 'Drawseum',
    category: 'Web Development',
    description:
      'A multiplayer drawing party game where players create characters, draw, and compete in creative challenges.',
    technologies: ['React', 'TypeScript', 'Socket.IO'],
    icon: '✳',
  },
  {
    number: '02',
    title: 'Connect Four AI',
    category: 'Artificial Intelligence',
    description:
      'A competitive game-playing agent using alpha-beta pruning, iterative deepening, and optimized board representations.',
    technologies: ['Python', 'AI', 'Algorithms'],
    icon: '◈',
  },
  {
    number: '03',
    title: 'Concurrent Request Processing',
    category: 'Systems Programming',
    description:
      'A multithreaded request-processing system built with synchronization, shared queues, and POSIX threads.',
    technologies: ['C++', 'Linux', 'POSIX Threads'],
    icon: '⌘',
  },
  {
    number: '04',
    title: 'AI Digit Generator',
    category: 'Machine Learning',
    description:
      'A conditional image-generation model that creates handwritten digits with customizable colors and backgrounds.',
    technologies: ['Python', 'PyTorch', 'Deep Learning'],
    icon: '✦',
  },
]

const skills = [
  'C++', 'Python', 'Java', 'C#',
  'TypeScript', 'JavaScript', 'React',
  'Node.js', 'SQL', 'Git', 'Linux',
  'PyTorch',
]

function App() {
  return (
    <div className="site-wrapper">
      <header className="navbar">
        <a href="#home" className="logo">Anita<span>.</span></a>

        <nav aria-label="Main navigation">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#game">Play a Game</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <span className="eyebrow">HELLO FRIEND</span>

            <h1>
              Turning ideas into
              <span> something real.</span>
            </h1>

            <p>
              I'm a Computer Science student at the University of
              South Carolina who loves building creative applications,
              solving complex problems, and bringing ideas to life.
            </p>

            <div className="hero-buttons">
              <a href="#projects" className="btn btn-primary">
                Explore my work ↗
              </a>
              <a href="#about" className="btn btn-outline">
                More about me
              </a>
            </div>
          </div>

          <div className="hero-decoration" aria-hidden="true">
            <div className="decoration-circle">
              <span>AZ</span>
            </div>
            <span className="floating-star star-one">✳</span>
            <span className="floating-star star-two">✦</span>
            <span className="floating-star star-three">✳</span>
          </div>
        </section>

        <section className="section about-section" id="about">
          <div className="section-heading">
            <span className="eyebrow">A LITTLE INTRODUCTION</span>
            <h2>About me<span className="accent">.</span></h2>
          </div>

          <div className="about-content">
            <p>
              I'm currently pursuing my B.S. in Computer Science at
              the University of South Carolina, graduating in May 2027.
            </p>
            <p>
              My interests span software development, artificial
              intelligence, interactive applications, and the
              intersection of technology and people.
            </p>
            <p>
              With a background in hospitality leadership, I bring
              strong communication, collaboration, and problem-solving
              skills to the technical projects I work on.
            </p>
          </div>
        </section>

        <section className="section projects-section" id="projects">
          <div className="section-heading">
            <span className="eyebrow">THINGS I'VE BUILT</span>
            <h2>Featured projects<span className="accent">.</span></h2>
            <p>
              A collection of projects exploring development,
              artificial intelligence, and creative problem-solving.
            </p>
          </div>

          <div className="projects-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.number}>
                <div className="project-card-top">
                  <span className="project-number">{project.number}</span>
                  <span className="project-icon" aria-hidden="true">
                    {project.icon}
                  </span>
                </div>

                <span className="project-category">
                  {project.category}
                </span>

                <h3>{project.title}</h3>
                <p>{project.description}</p>

                <div className="tech-tags">
                  {project.technologies.map((tech) => (
                    <span className="tech-tag" key={tech}>
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section skills-section" id="skills">
          <div className="section-heading">
            <span className="eyebrow">MY TOOLKIT</span>
            <h2>Skills & technologies<span className="accent">.</span></h2>
          </div>

          <div className="skills-grid">
            {skills.map((skill) => (
              <span className="skill-pill" key={skill}>
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* BEAT THE DEVELOPER GAME */}
        <section id="game" className="game-section">
          <MemoryGame />
        </section>

        <section className="section contact-section" id="contact">
          <span className="eyebrow">LET'S CONNECT</span>
          <h2>Have something in mind?</h2>
          <p>
            I'm always interested in new opportunities, interesting
            projects, and meeting people who love creating things.
          </p>

          <a
            className="btn btn-primary"
            href="mailto:Anitazakutansky99@gmail.com"
          >
            Say hello ↗
          </a>

          <div className="social-links">
            <a
              href="https://github.com/AnitaZee"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub ↗
            </a>
            <a href="mailto:Anitazakutansky99@gmail.com">
              Email ↗
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>© {new Date().getFullYear()} Anita Zakutansky</span>
        <span>Made with ♥</span>
      </footer>
    </div>
  )
}

export default App
