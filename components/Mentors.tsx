import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Linkedin,
  Globe,
  Award,
  Briefcase,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Card } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useScrollFocusSection } from "./useScrollFocusSection";

/* ---------------- DATA ---------------- */

const mentors = [
  {
    name: "Carlos Silva",
    role: "Entrepreneurship",
    image:
      "Mentores/Silva_Carlos.png",
    bio: "Diseña y desarrolla proyectos emprendedores, trabajando el modelo de negocio, la estrategia y la ejecución.",
    social: {
      linkedin: "https://www.linkedin.com/in/carlossilvasantin/?locale=es_ES",
      website: "https://admira.com/es/",
    },
  },
  /*
  {
    name: "Joshua Sedano",
    role: "Entrepreneurship",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=max&q=80&w=600",
    bio: "Estrategias disruptivas para escalar proyectos y negocios digitales.",
    social: {
      linkedin: "#",
      website: "#",
    },
  },
  {
    name: "Paul Vilà",
    role: "Entrepreneurship",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=max&q=80&w=600",
    bio: "Estrategias disruptivas para escalar proyectos y negocios digitales.",
    social: {
      linkedin: "#",
      website: "#",
    },
  },*/
  {
    name: "Marc Segarra",
    role: "Creatividad",
    image: "Mentores/Marc_Segarra.png",
    bio: "Explora y expande los límites de tu imaginación, convirtiendo ideas innovadoras en realidades impactantes.",
    social: {
      linkedin: "https://www.linkedin.com/in/marcsegarratorres/",
      website: "#",
    },
  },  
  {
    name: "Daniel Vidal",
    role: "Propiedad intelectual",
    image: "Mentores/Daniel_Vidal.png",
    bio: "Protege y maximiza el valor de tus ideas y productos con las herramientas legales adecuadas.",
    social: {
      linkedin: "https://www.linkedin.com/in/danielvidal1/",
      website: "#",
    },
  },
  {
    name: "Jordi Palou",
    role: "IoT",
    image: "Mentores/Jordi_Palou.png",
    bio: "Integra el mundo físico y el digital creando soluciones inteligentes, aprendiendo a diseñar y conectar sistemas reales.",
    social: {
      linkedin: "https://www.linkedin.com/in/jordipalou/",
      website: "#",
    },
  },
  {
    name: "Carles Mayans",
    role: ". Estrategia y contenido",
    image: "Mentores/Carles_Mayans.png",
    bio: "Aprende a comunicar de manera efectiva y a crear contenido con criterio. La creatividad sin estrategia sólo es arte. ",
    social: {
      linkedin: "https://www.linkedin.com/in/cmayansc/",
      website: "#",
    },
  },
  {
    name: "Miguel Fernández",
    role: "Arcade",
    image: "Mentores/Miguel_Fernández.png",
    bio: "Explora el interior de las máquinas arcade, abriéndolas, reparándolas y entendiendo cómo funcionan.",
    social: {
      linkedin: "#",
      website: "#",
    },
  },
  {
    name: "Joan Melchor",
    role: "Robótica",
    image: "Mentores/Joan_Melchor.png",
    bio: "Diseña y programa sistemas robóticos automatizados, trabajando con brazos robóticos, sensores y plataformas móviles.",
    social: {
      linkedin: "https://www.linkedin.com/in/joanmelchor/",
      website: "#",
    },
  },
  {
    name: "Juan Antonio Domingo",
    role: "Producción audiovisual",
    image:
      "Mentores/ja_Domingo.jpg",
    bio: "Da vida a tus ideas con excelencia técnica y creatividad, dominando cada etapa de la producción y postproducción audiovisual.    ",
    social: {
      linkedin: "#",
      website: "#",
    },
  },
];

/* ---------------- COMPONENT ---------------- */

export function Mentors() {
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [isMobileLayout, setIsMobileLayout] = useState(false);
  const focusRef = useScrollFocusSection("blue");

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobileLayout(mobile);

      if (window.innerWidth < 640) setItemsPerPage(1);
      else if (window.innerWidth < 1024) setItemsPerPage(2);
      else setItemsPerPage(4);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    if (startIndex >= mentors.length - itemsPerPage) {
      setStartIndex(0);
    } else {
      setStartIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (startIndex === 0) {
      setStartIndex(mentors.length - itemsPerPage);
    } else {
      setStartIndex((prev) => prev - 1);
    }
  };

  return (
    <section
      ref={focusRef}
      id="mentors"
      className="py-24 px-4"
    >
      <div className="max-w-7xl mx-auto">

        {/* ================= HEADER ================= */}
        <motion.div
          className="text-center mb-20 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center">
            <div
              className="inline-flex px-6 py-2 rounded-full
                         bg-gradient-to-r from-purple-500 to-indigo-500
                         text-white text-xs font-extrabold tracking-widest uppercase
                         shadow-lg shadow-purple-500/30"
            >
              Mentores
            </div>
          </div>

          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-foreground">
            Aprende de quienes{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              lideran la industria
            </span>
          </h2>

          <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
          Nuestro equipo de mentores está formado por profesionales en activo en las empresas tecnológicas más avanzadas.

          </p>
        </motion.div>

       {/* ================= CAROUSEL ================= */}
        <div className="relative">
         
          {!isMobileLayout && (
            <>
              <button
                onClick={prevSlide}
                className="absolute top-1/2 -left-12 -translate-y-1/2 p-3 rounded-full bg-background border border-border hover:bg-primary hover:text-white transition z-10"
              >
                <ChevronLeft />
              </button>

              <button
                onClick={nextSlide}
                className="absolute top-1/2 -right-12 -translate-y-1/2 p-3 rounded-full bg-background border border-border hover:bg-primary hover:text-white transition z-10"
              >
                <ChevronRight />
              </button>
            </>
          )}

         
          <div className="py-10 -my-10 overflow-x-auto lg:overflow-hidden snap-x snap-mandatory scroll-smooth">
            <motion.div
              className="flex"

              animate={!isMobileLayout ? { x: `-${startIndex * (100 / mentors.length)}%` } : {}}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              
          
              style={{ 
                width: isMobileLayout ? "auto" : `${(mentors.length / itemsPerPage) * 100}%` 
              }}
            >
              {mentors.map((mentor) => (
                <div
                  key={mentor.name}
                 
                  className="px-3 snap-center shrink-0"
              
                  style={{ 
                    width: isMobileLayout ? "85vw" : `${100 / mentors.length}%` 
                  }}
                >
                  <Card className="group h-full overflow-hidden rounded-3xl border border-border bg-card hover:border-primary/50 transition-all duration-300">
             
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <ImageWithFallback
                        src={mentor.image}
                        alt={mentor.name}
                        className="w-full h-full object-cover transition-transform duration-700 lg:group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 opacity-100 lg:opacity-0 lg:translate-y-6 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 transition-all duration-300">
                        <a href={mentor.social.linkedin} className="p-2 bg-white/10 backdrop-blur rounded-full text-white hover:bg-primary transition">
                          <Linkedin size={18} />
                        </a>
                        <a href={mentor.social.website} className="p-2 bg-white/10 backdrop-blur rounded-full text-white hover:bg-primary transition">
                          <Globe size={18} />
                        </a>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col h-full">
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition">
                        {mentor.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                        <Briefcase size={14} className="text-primary" />
                        {mentor.role}
                      </div>
                      <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                        {mentor.bio}
                      </p>
                    </div>
                  </Card>
                </div>
              ))}
            </motion.div>
          </div>
        </div>       
      </div>
    </section>
  );
}