"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import {
  User,
  GraduationCap,
  Code,
  Users,
  Lightbulb,
  Heart,
  MessageSquare,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  ExternalLink,
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react"

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)

  const projectImages = [
    { src: "/ร่างกาย.png", alt: "IT359 Project Screenshot 1" },
    { src: "/หน้าหลัก.png", alt: "IT359 Project Screenshot 2" },
    { src: "/อาหาร.png", alt: "IT359 Project Screenshot 3" },
    { src: "/อาหาร2.png", alt: "IT359 Project Screenshot 4" }
  ]

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark")
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setIsDarkMode(true)
    }
  }, [])

  useEffect(() => {
    // Save theme preference
    localStorage.setItem("theme", isDarkMode ? "dark" : "light")
  }, [isDarkMode])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "education", "skills", "projects", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const navItems = [
    { id: "about", label: "About" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % projectImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length)
  }

  const openImageModal = () => {
    setIsImageModalOpen(true)
  }

  const closeImageModal = () => {
    setIsImageModalOpen(false)
  }

  const themeClasses = {
    background: isDarkMode ? "bg-stone-900" : "bg-amber-50",
    text: isDarkMode ? "text-amber-100" : "text-amber-900",
    navBg: isDarkMode ? "bg-stone-800/80" : "bg-amber-100/80",
    navBorder: isDarkMode ? "border-stone-700" : "border-amber-200",
    navText: isDarkMode ? "text-amber-200" : "text-amber-700",
    cardBg: isDarkMode ? "bg-stone-800/50" : "bg-amber-100/50",
    cardBorder: isDarkMode ? "border-stone-700" : "border-amber-200",
    cardBgSolid: isDarkMode ? "bg-stone-800" : "bg-amber-100",
    sectionBg: isDarkMode ? "bg-stone-800/30" : "bg-amber-100/30",
    accent: isDarkMode ? "text-amber-400" : "text-amber-700",
    accentHover: isDarkMode ? "hover:text-amber-300" : "hover:text-amber-700",
    button: isDarkMode ? "bg-amber-600 hover:bg-amber-700" : "bg-amber-600 hover:bg-amber-700",
    muted: isDarkMode ? "text-amber-300" : "text-amber-700",
    mutedLight: isDarkMode ? "text-amber-400" : "text-amber-600",
    footerBg: isDarkMode ? "bg-stone-900" : "bg-amber-100",
    footerBorder: isDarkMode ? "border-stone-800" : "border-amber-200",
    footerText: isDarkMode ? "text-amber-400" : "text-amber-600",
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${themeClasses.background} ${themeClasses.text}`}>
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${themeClasses.navBg} ${themeClasses.navBorder}`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className={`text-xl font-bold transition-colors duration-300 ${themeClasses.accent}`}>Portfolio</div>

            <div className="flex items-center space-x-4">
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-all duration-300 ${themeClasses.cardBg} ${themeClasses.cardBorder} border ${themeClasses.accentHover}`}
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <Sun className={`w-5 h-5 ${themeClasses.accent}`} />
                ) : (
                  <Moon className={`w-5 h-5 ${themeClasses.accent}`} />
                )}
              </button>

              {/* Desktop Navigation */}
              <div className="hidden md:flex space-x-8">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`transition-colors duration-200 ${themeClasses.accentHover} ${
                      activeSection === item.id ? themeClasses.accent : themeClasses.navText
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <button
                className={`md:hidden transition-colors duration-300 ${themeClasses.navText} ${themeClasses.accentHover}`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className={`md:hidden py-4 border-t transition-colors duration-300 ${themeClasses.navBorder}`}>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left py-2 px-4 transition-colors duration-200 ${themeClasses.accentHover} ${
                    activeSection === item.id ? themeClasses.accent : themeClasses.navText
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="w-48 h-48 mx-auto rounded-full overflow-hidden ring-4 ring-amber-400/30 shadow-2xl shadow-amber-400/20">
              <Image
                src="/placeholder.svg?height=192&width=192"
                alt="Pattarawadee Nuanta Profile"
                width={192}
                height={192}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 w-48 h-48 mx-auto rounded-full bg-gradient-to-r from-amber-400/20 to-orange-500/20 animate-pulse"></div>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            Pattarawadee Nuanta
            <span
              className={`block text-2xl sm:text-3xl lg:text-4xl mt-2 transition-colors duration-300 ${themeClasses.accent}`}
            >
              (Mod)
            </span>
          </h1>
          <p className={`text-xl sm:text-2xl mb-8 transition-colors duration-300 ${themeClasses.muted}`}>
            UX/UI design
          </p>
          <button
            onClick={() => scrollToSection("about")}
            className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg shadow-amber-500/25 text-white ${themeClasses.button}`}
          >
            Learn More About Me
          </button>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <User className={`mr-3 transition-colors duration-300 ${themeClasses.accent}`} size={32} />
            <h2 className="text-3xl sm:text-4xl font-bold">About Me</h2>
          </div>
          <div
            className={`rounded-lg p-8 border transition-colors duration-300 ${themeClasses.cardBg} ${themeClasses.cardBorder}`}
          >
            <p className={`text-lg leading-relaxed transition-colors duration-300 ${themeClasses.muted}`}>
              Hello! My name is Pattarawadee Nuanta, but you can call me "Mod." I am currently a 4th-year student majoring in Computer Science in the Faculty of Information Technology and Innovation at Bangkok University.
              Although my field of study mainly focuses on programming and advanced technology, I discovered a special interest in UX/UI Design. I enjoy creating designs that prioritize user experience and making technology more accessible and practical.
              With this passion, I have dedicated myself to developing my UX/UI skills outside of class through self-study, experimenting with Figma, and learning from real-world examples. I am always open to feedback and eager to grow professionally in this field.
            </p>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section
        id="education"
        className={`py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${themeClasses.sectionBg}`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-12">
            <GraduationCap className={`mr-3 transition-colors duration-300 ${themeClasses.accent}`} size={32} />
            <h2 className="text-3xl sm:text-4xl font-bold">Education</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div
              className={`rounded-lg p-8 border hover:border-amber-400/50 transition-all duration-300 group ${themeClasses.cardBgSolid} ${themeClasses.cardBorder}`}
            >
              <h3
                className={`text-xl font-bold mb-2 group-hover:text-amber-300 transition-colors duration-300 ${themeClasses.accent}`}
              >
                Bangkok University
              </h3>
              <p className={`mb-2 transition-colors duration-300 ${themeClasses.muted}`}>Faculty of Information Technology and Innovation , Bachelor of Computer Science</p>
              <p className={`mb-4 transition-colors duration-300 ${themeClasses.mutedLight}`}>2022 - Present</p>
              <div className="flex items-center">
                <span className={`text-sm mr-2 transition-colors duration-300 ${themeClasses.mutedLight}`}>GPA:</span>
                <span className={`font-semibold transition-colors duration-300 ${themeClasses.accent}`}>3.75</span>
              </div>
            </div>
            <div
              className={`rounded-lg p-8 border hover:border-amber-400/50 transition-all duration-300 group ${themeClasses.cardBgSolid} ${themeClasses.cardBorder}`}
            >
              <h3
                className={`text-xl font-bold mb-2 group-hover:text-amber-300 transition-colors duration-300 ${themeClasses.accent}`}
              >
                Nongkhae Sorakit Pittaya School
              </h3>
              <p className={`mb-2 transition-colors duration-300 ${themeClasses.muted}`}>Science-Mathematics Program</p>
              <p className={`mb-4 transition-colors duration-300 ${themeClasses.mutedLight}`}>2016 - 2022</p>
              <div className="flex items-center">
                <span className={`text-sm mr-2 transition-colors duration-300 ${themeClasses.mutedLight}`}>GPA:</span>
                <span className={`font-semibold transition-colors duration-300 ${themeClasses.accent}`}>3.90</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills & Tools Section */}
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-12">
            <Code className={`mr-3 transition-colors duration-300 ${themeClasses.accent}`} size={32} />
            <h2 className="text-3xl sm:text-4xl font-bold">My Skillset</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Skills Column */}
            <div>
              <div className="mb-8">
                <h3
                  className={`text-xl font-bold mb-4 flex items-center transition-colors duration-300 ${themeClasses.accent}`}
                >
                  <Code className="mr-2" size={20} />
                  Coding Skills
                </h3>
                <div
                  className={`rounded-lg p-6 border transition-colors duration-300 ${themeClasses.cardBg} ${themeClasses.cardBorder}`}
                >
                  <div className="flex flex-wrap gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm border transition-colors duration-300 ${
                        isDarkMode
                          ? "bg-amber-600/20 text-amber-300 border-amber-500/30"
                          : "bg-amber-200 text-amber-800 border-amber-300"
                      }`}
                    >
                      Python
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h3
                  className={`text-xl font-bold mb-4 flex items-center transition-colors duration-300 ${themeClasses.accent}`}
                >
                  <Users className="mr-2" size={20} />
                  Soft Skills
                </h3>
                <div
                  className={`rounded-lg p-6 border transition-colors duration-300 ${themeClasses.cardBg} ${themeClasses.cardBorder}`}
                >
                  <ul className="space-y-3">
                    <li className={`flex items-center transition-colors duration-300 ${themeClasses.muted}`}>
                      <Heart className={`mr-3 transition-colors duration-300 ${themeClasses.accent}`} size={16} />
                      Strong team player, adaptable, and quick to get along with others
                    </li>
                    <li className={`flex items-center transition-colors duration-300 ${themeClasses.muted}`}>
                      <Lightbulb className={`mr-3 transition-colors duration-300 ${themeClasses.accent}`} size={16} />
                      Responsible and attentive to the quality of work
                    </li>
                    <li className={`flex items-center transition-colors duration-300 ${themeClasses.muted}`}>
                      <MessageSquare
                        className={`mr-3 transition-colors duration-300 ${themeClasses.accent}`}
                        size={16}
                      />
                      Positive mindset with perseverance in the face of challenges
                    </li>
                    <li className={`flex items-center transition-colors duration-300 ${themeClasses.muted}`}>
                      <User className={`mr-3 transition-colors duration-300 ${themeClasses.accent}`} size={16} />
                      Continuously open to learning new things
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Tools Column */}
            <div>
              <h3 className={`text-xl font-bold mb-4 transition-colors duration-300 ${themeClasses.accent}`}>
                Tools & Technologies
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {/* Figma */}
                <div
                  className={`rounded-lg p-6 border hover:border-amber-400/50 transition-all duration-300 text-center group ${themeClasses.cardBg} ${themeClasses.cardBorder}`}
                >
                  <div className="w-12 h-12 mx-auto mb-3 bg-transparent rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                    <Image
                      src="/figma-icon.png"
                      alt="Figma"
                      width={32}
                      height={32}
                      className="w-8 h-8 object-contain transition-transform duration-300"
                    />
                  </div>
                  <p className={`text-sm transition-colors duration-300 ${themeClasses.muted}`}>Figma</p>
                </div>

                {/* Canva */}
                <div
                  className={`rounded-lg p-6 border hover:border-amber-400/50 transition-all duration-300 text-center group ${themeClasses.cardBg} ${themeClasses.cardBorder}`}
                >
                  <div className="w-12 h-12 mx-auto mb-3 bg-transparent rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                    <Image
                      src="/Canva-Icon.png"
                      alt="Canva"
                      width={32}
                      height={32}
                      className="w-8 h-8 object-contain transition-transform duration-300"
                    />
                  </div>
                  <p className={`text-sm transition-colors duration-300 ${themeClasses.muted}`}>Canva</p>
                </div>

                {/* Visual Studio Code */}
                <div
                  className={`rounded-lg p-6 border hover:border-amber-400/50 transition-all duration-300 text-center group ${themeClasses.cardBg} ${themeClasses.cardBorder}`}
                >
                  <div className="w-12 h-12 mx-auto mb-3 bg-transparent rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                    <Image
                      src="/VScode-Icon.png"
                      alt="Visual Studio Code"
                      width={32}
                      height={32}
                      className="w-8 h-8 object-contain transition-transform duration-300"
                    />
                  </div>
                  <p className={`text-sm transition-colors duration-300 ${themeClasses.muted}`}>VS Code</p>
                </div>

                {/* Microsoft Teams */}
                <div
                  className={`rounded-lg p-6 border hover:border-amber-400/50 transition-all duration-300 text-center group ${themeClasses.cardBg} ${themeClasses.cardBorder}`}
                >
                  <div className="w-12 h-12 mx-auto mb-3 bg-transparent rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                    <Image
                      src="/Microsoft-Teams-Icon.png"
                      alt="Microsoft Teams"
                      width={32}
                      height={32}
                      className="w-8 h-8 object-contain transition-transform duration-300"
                    />
                  </div>
                  <p className={`text-sm transition-colors duration-300 ${themeClasses.muted}`}>Teams</p>
                </div>

                {/* Microsoft PowerPoint */}
                <div
                  className={`rounded-lg p-6 border hover:border-amber-400/50 transition-all duration-300 text-center group ${themeClasses.cardBg} ${themeClasses.cardBorder}`}
                >
                  <div className="w-12 h-12 mx-auto mb-3 bg-transparent rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                    <Image
                      src="/Power-point_Icon.png"
                      alt="Microsoft PowerPoint"
                      width={32}
                      height={32}
                      className="w-8 h-8 object-contain transition-transform duration-300"
                    />
                  </div>
                  <p className={`text-sm transition-colors duration-300 ${themeClasses.muted}`}>PowerPoint</p>
                </div>

                {/* Microsoft Word */}
                <div
                  className={`rounded-lg p-6 border hover:border-amber-400/50 transition-all duration-300 text-center group ${themeClasses.cardBg} ${themeClasses.cardBorder}`}
                >
                  <div className="w-12 h-12 mx-auto mb-3 bg-transparent rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                    <Image
                      src="/Word_Icon.png"
                      alt="Microsoft Word"
                      width={32}
                      height={32}
                      className="w-8 h-8 object-contain transition-transform duration-300"
                    />
                  </div>
                  <p className={`text-sm transition-colors duration-300 ${themeClasses.muted}`}>Word</p>
                </div>

                {/* Microsoft Excel */}
                <div
                  className={`rounded-lg p-6 border hover:border-amber-400/50 transition-all duration-300 text-center group ${themeClasses.cardBg} ${themeClasses.cardBorder}`}
                >
                  <div className="w-12 h-12 mx-auto mb-3 bg-transparent rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                    <Image
                      src="/Excel_Icon.png"
                      alt="Microsoft Excel"
                      width={32}
                      height={32}
                      className="w-8 h-8 object-contain transition-transform duration-300"
                    />
                  </div>
                  <p className={`text-sm transition-colors duration-300 ${themeClasses.muted}`}>Excel</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className={`py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${themeClasses.sectionBg}`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-12">
            <Code className={`mr-3 transition-colors duration-300 ${themeClasses.accent}`} size={32} />
            <h2 className="text-3xl sm:text-4xl font-bold">Featured Project</h2>
          </div>
          <div
            className={`rounded-lg overflow-hidden border hover:border-amber-400/50 transition-all duration-300 ${themeClasses.cardBgSolid} ${themeClasses.cardBorder}`}
          >
            <div className="md:flex">
              <div className="md:w-1/2">
                <div className="relative h-64 md:h-80 bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={projectImages[currentImageIndex].src}
                    alt={projectImages[currentImageIndex].alt}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover transition-all duration-500 cursor-pointer"
                    onClick={openImageModal}
                  />
                  
                  {/* Navigation Arrows */}
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  {/* Dots Indicator */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {projectImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-200 ${
                          index === currentImageIndex 
                            ? 'bg-white' 
                            : 'bg-white/50 hover:bg-white/70'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 p-8">
                <h3 className={`text-2xl font-bold mb-4 transition-colors duration-300 ${themeClasses.accent}`}>
                  Healthclub
                </h3>
                <p className={`mb-6 leading-relaxed transition-colors duration-300 ${themeClasses.muted}`}>
                  A comprehensive web application developed as part of the IT359 course. This project demonstrates
                  full-stack development skills, including user authentication, database management, and responsive
                  design principles. The application features a modern interface and robust backend functionality.
                </p>
                <div className="mb-6">
                  <h4
                    className={`text-sm font-semibold mb-3 transition-colors duration-300 ${themeClasses.mutedLight}`}
                  >
                    Technologies Used:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm border transition-colors duration-300 ${
                        isDarkMode
                          ? "bg-amber-600/20 text-amber-300 border-amber-500/30"
                          : "bg-amber-200 text-amber-800 border-amber-300"
                      }`}
                    >
                      Figma
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => window.open("https://www.figma.com/proto/LCntHv7Pl5A87pPvBDmcDR/Health-hub?node-id=289-729&p=f&t=MePoxeZQzM9Zx2np-0&scaling=scale-down&content-scaling=fixed&page-id=1%3A3&starting-point-node-id=289%3A729", "_blank")}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg shadow-amber-500/25 flex items-center text-white ${themeClasses.button} cursor-pointer`}
                >
                  View Details
                  <ExternalLink className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {isImageModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
          onClick={closeImageModal}
        >
          <div className="relative max-w-7xl max-h-screen w-full h-full flex items-center justify-center">
            <Image
              src={projectImages[currentImageIndex].src}
              alt={projectImages[currentImageIndex].alt}
              width={800}
              height={600}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            
            {/* Close Button */}
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
            >
              <X className="w-6 h-6" />
            </button>
            
            {/* Navigation in Modal */}
            {projectImages.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    prevImage()
                  }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    nextImage()
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Dots Indicator in Modal */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
                  {projectImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation()
                        setCurrentImageIndex(index)
                      }}
                      className={`w-4 h-4 rounded-full transition-all duration-200 ${
                        index === currentImageIndex 
                          ? 'bg-white' 
                          : 'bg-white/50 hover:bg-white/70'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Contact Footer */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">Get In Touch</h2>
          <p className={`text-xl mb-12 transition-colors duration-300 ${themeClasses.muted}`}>
            I'm always open to discussing new opportunities and interesting projects.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mb-4">
                <Mail className={`transition-colors duration-300 ${themeClasses.accent}`} size={24} />
              </div>
              <h3 className="font-semibold mb-2">Email</h3>
              <p className={`transition-colors duration-300 ${themeClasses.mutedLight}`}>noi11102546@gmail.com</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mb-4">
                <Phone className={`transition-colors duration-300 ${themeClasses.accent}`} size={24} />
              </div>
              <h3 className="font-semibold mb-2">Phone</h3>
              <p className={`transition-colors duration-300 ${themeClasses.mutedLight}`}>+66 92-410-6151</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mb-4">
                <MapPin className={`transition-colors duration-300 ${themeClasses.accent}`} size={24} />
              </div>
              <h3 className="font-semibold mb-2">Location</h3>
              <p className={`transition-colors duration-300 ${themeClasses.mutedLight}`}>Thailand</p>
            </div>
          </div>

          <div className="flex justify-center space-x-6">
            {/* <a
              href="#"
              className={`w-12 h-12 rounded-full flex items-center justify-center border hover:border-amber-400 hover:bg-amber-200 transition-all duration-300 group ${themeClasses.cardBgSolid} ${themeClasses.cardBorder} ${
                isDarkMode ? "hover:bg-amber-600/20" : "hover:bg-amber-200"
              }`}
            >
              <Linkedin
                className={`group-hover:text-amber-700 transition-colors duration-300 ${themeClasses.mutedLight} ${
                  isDarkMode ? "group-hover:text-amber-400" : "group-hover:text-amber-700"
                }`}
                size={20}
              />
            </a>
            <a
              href="#"
              className={`w-12 h-12 rounded-full flex items-center justify-center border hover:border-amber-400 hover:bg-amber-200 transition-all duration-300 group ${themeClasses.cardBgSolid} ${themeClasses.cardBorder} ${
                isDarkMode ? "hover:bg-amber-600/20" : "hover:bg-amber-200"
              }`}
            >
              <Github
                className={`group-hover:text-amber-700 transition-colors duration-300 ${themeClasses.mutedLight} ${
                  isDarkMode ? "group-hover:text-amber-400" : "group-hover:text-amber-700"
                }`}
                size={20}
              />
            </a> */}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`border-t py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${themeClasses.footerBg} ${themeClasses.footerBorder}`}
      >
        <div className="max-w-6xl mx-auto text-center">
          <p className={`transition-colors duration-300 ${themeClasses.footerText}`}>
            © {new Date().getFullYear()} Pattarawadee Nuanta. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
