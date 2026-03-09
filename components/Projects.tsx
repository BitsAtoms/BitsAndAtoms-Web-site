import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Youtube, X } from "lucide-react";
import { FaSpotify } from "react-icons/fa";
import { Card } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useScrollFocusSection } from "./useScrollFocusSection";

/* ---------------- DATA ---------------- */
const categories = ["Todos", "RV", "Robotica", "Software", "Podcast","Programación", "Impresión 3D"];

const projects = [
  {
    title: "Simulador de Combate Realidad Virtual & Jeep",
    description: "Sistema dual de combate: juega en pantalla gigante con un Jeep modificado y pistolas tácticas, o sumérgete totalmente con gafas de realidad virtual.",
    image: "https://images.unsplash.com/photo-1725923727790-15ec49fa4d15?fit=max&q=80&w=1080",
    category: "RV",
    gallery: [
      "public/Projects/Backjeep.jpg",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?fit=max&q=80&w=1080"
    ],
    video: "public/Projects/VideoGameJeep.mp4"
  },
  {
    title: "Plataforma Educativa Inteligente",
    description: "Aprendizaje adaptativo basado en IA.",
    image: "https://images.unsplash.com/photo-1563394867331-e687a36112fd?fit=max&q=80&w=1080",
    category: "IA",
    gallery: ["https://images.unsplash.com/photo-1563394867331-e687a36112fd?fit=max&q=80&w=1080"],
    video: ""
  },
  {
    title: "Prótesis Biónica Accesible",
    description: "Diseño funcional mediante impresión 3D.",
    image: "https://images.unsplash.com/photo-1694701503673-379c9e0d887e?fit=max&q=80&w=1080",
    category: "Hardware",
    gallery: ["https://images.unsplash.com/photo-1694701503673-379c9e0d887e?fit=max&q=80&w=1080"],
    video: ""
  },
  {
    title: "Experiencia AR para Museos",
    description: "Contenido digital integrado en espacios físicos.",
    image: "https://images.unsplash.com/photo-1758685848208?fit=max&q=80&w=1080",
    category: "AR / VR",
    gallery: ["https://images.unsplash.com/photo-1758685848208?fit=max&q=80&w=1080"],
    video: ""
  },
  {
    title: "Robot Autónomo Solar",
    description: "Robot para limpieza de paneles solares de forma autónoma.",
    image: "https://images.unsplash.com/photo-1627667050609-d4ba6483a368?fit=max&q=80&w=1080",
    category: "Hardware",
    gallery: ["https://images.unsplash.com/photo-1627667050609-d4ba6483a368?fit=max&q=80&w=1080"],
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    title: "Trazabilidad Alimentaria",
    description: "Rastreo del origen y recorrido de productos alimentarios.",
    image: "https://images.unsplash.com/photo-1728933102332-a4f1a281a621?fit=max&q=80&w=1080",
    category: "IoT",
    gallery: [
      "https://images.unsplash.com/photo-1728933102332-a4f1a281a621?fit=max&q=80&w=1080",
      "https://images.unsplash.com/photo-1606787366850-de6330128bfc?fit=max&q=80&w=1080"
    ],
    video: ""
  },
];

/* ---------------- HELPERS  ---------------- */

function getVisibleCountFromWidth(width: number) {
  if (width >= 1024) return 4; // lg
  if (width >= 768) return 2; // md
  return 1; // mobile fallback
}

export function Projects() {
  const focusRef = useScrollFocusSection("pink");
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  
  // États de votre version originale
  const [pageStart, setPageStart] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onResize = () => {
      const width = window.innerWidth;
      setVisibleCount(getVisibleCountFromWidth(width));
      setIsMobile(width < 1024);
    };

    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const filtered = useMemo(() => {
    return activeCategory === "Todos"
      ? projects
      : projects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const total = filtered.length;
  
  const showCount = Math.min(visibleCount, total);
  const canNavigate = total > showCount;

  useEffect(() => {
    if (total === 0) return;
    setPageStart((prev) => prev % total);
  }, [total]);

  const next = () => {
    if (!canNavigate) return;
    setPageStart((prev) => (prev + showCount) % total);
  };

  const prev = () => {
    if (!canNavigate) return;
    setPageStart((prev) => (prev - showCount + total) % total);
  };

  const pageItems = useMemo(() => {
    if (total === 0) return [];
    return Array.from({ length: showCount }).map((_, i) => {
      const idx = (pageStart + i) % total;
      return { ...filtered[idx], _key: `${activeCategory}-${idx}-${pageStart}` };
    });
  }, [filtered, total, showCount, pageStart, activeCategory]);

  return (
    <section
      ref={focusRef}
      id="projects"
      className="py-24 px-4"
    >
      <div className="max-w-7xl mx-auto space-y-24">
        
        {/* HEADER*/}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center justify-center px-6 py-2 rounded-full
                         bg-gradient-to-r from-purple-500 to-indigo-500
                         text-white text-xs font-extrabold tracking-widest uppercase
                         shadow-lg shadow-purple-500/30"
            >
              Proyectos
            </motion.div>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-foreground">
            Creatividad e innovación{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-500 dark:to-blue-500">
              en acción
            </span>
          </h2>
        </div>

        {/* PODCAST*/}
        <motion.div
          className="grid lg:grid-cols-2 gap-16 items-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="relative h-[360px] rounded-3xl overflow-hidden border border-border">
            <ImageWithFallback
              src="img/podcast_1.jpeg"
              alt="Bits & Atoms Podcast"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="max-w-xl">
            <h3 className="text-3xl font-black mb-4 text-foreground">
              Bits & Atoms{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                Podcast
              </span>
            </h3>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Apostamos por el debate, la creatividad y las conversaciones honestas
              sobre tecnología, educación y futuro.
            </p>
            <div className="flex flex-wrap gap-6">
              <a href="https://open.spotify.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <FaSpotify size={22} />
                <span className="text-sm font-medium">Spotify</span>
                <ExternalLink size={14} />
              </a>
              <a href="https://www.youtube.com/@BitsAtomsAdmira" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <Youtube size={22} />
                <span className="text-sm font-medium">YouTube</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </motion.div>

        {/* ================= SECTION PROJETS ================= */}
        <div className="space-y-10">
          
          {/* Título y Filtros */}
          <div className="space-y-6">
            <h3 className="text-3xl md:text-4xl font-black text-foreground">
              Todos{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                nuestros proyectos
              </span>
            </h3>
            <div className="flex gap-3 flex-wrap">
              {categories.map((cat) => {
                const active = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat);
                      setPageStart(0);
                    }}
                    className={`px-5 py-2 rounded-full text-sm font-bold border transition
                      ${active ? "bg-primary text-white border-primary" : "bg-card text-muted-foreground border-border hover:text-foreground"}`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          
          {/* CAS 1 : MODO MOBILE (Scroll Horizontal) */}
          {isMobile ? (
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 -mb-6">
               
               {filtered.map((project, idx) => (
                  <motion.div
                    key={`${project.title}-${idx}`}
                    className="min-w-[85vw] md:min-w-[45vw] snap-center h-full cursor-pointer"
                    initial={{ opacity: 0, scale: 0.9 }}
                    onClick={() => setSelectedProject(project)}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="group h-full overflow-hidden rounded-3xl border border-border bg-card">
                       
                       <div className="relative h-64 overflow-hidden">
                        <ImageWithFallback src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-black/60 text-white backdrop-blur">{project.category}</span>
                        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                          <div className="p-5">
                            <h4 className="text-white font-bold mb-2 line-clamp-2">{project.title}</h4>
                            <p className="text-gray-200 text-sm line-clamp-3">{project.description}</p>
                            <span className="inline-block mt-3 text-xs uppercase tracking-wide text-white/80">Ver proyecto →</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
               ))}
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <button
                onClick={prev}
                disabled={!canNavigate}
                className={`p-3 rounded-full bg-card border border-border transition ${canNavigate ? "hover:text-primary" : "opacity-40 cursor-not-allowed"}`}
              >
                <ChevronLeft />
              </button>

              <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <AnimatePresence mode="wait">
                    
                    {pageItems.map((project) => (
                      <motion.div
                        key={project._key}
                        className="cursor-pointer"
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={() => setSelectedProject(project)}
                        exit={{ opacity: 0, y: -14 }}
                        transition={{ duration: 0.25 }}
                      >
                        <Card className="group overflow-hidden rounded-3xl border border-border bg-card">
                          <div className="relative h-64 overflow-hidden">
                            <ImageWithFallback src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                            <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-black/60 text-white backdrop-blur">{project.category}</span>
                            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                              <div className="p-5">
                                <h4 className="text-white font-bold mb-2 line-clamp-2">{project.title}</h4>
                                <p className="text-gray-200 text-sm line-clamp-3">{project.description}</p>
                                <span className="inline-block mt-3 text-xs uppercase tracking-wide text-white/80">Ver proyecto →</span>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              <button
                onClick={next}
                disabled={!canNavigate}
                className={`p-3 rounded-full bg-card border border-border transition ${canNavigate ? "hover:text-primary" : "opacity-40 cursor-not-allowed"}`}
              >
                <ChevronRight />
              </button>
            </div>
          )}

          <div className="text-center pt-8">
            <button className="text-sm font-bold tracking-wide uppercase text-muted-foreground hover:text-foreground transition-colors">
              Ver todos los proyectos →
            </button>
          </div>
        </div>

        {/* ================= MODAL PROJET ================= */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-background w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl border border-border shadow-2xl relative flex flex-col"
              >
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition z-10"
                >
                  <X size={24} />
                </button>

                <div className="relative h-64 md:h-96 flex-shrink-0">
                  <ImageWithFallback src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                  <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary text-white mb-3 inline-block">
                      {selectedProject.category}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black text-foreground">{selectedProject.title}</h2>
                  </div>
                </div>

                <div className="p-6 md:p-10 space-y-8">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {selectedProject.description}
                  </p>

                  {selectedProject.video && (
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold">Video del proyecto</h3>
                      <div className="rounded-2xl overflow-hidden aspect-video border border-border bg-black">
                        <iframe
                          src={selectedProject.video}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  )}

                  {selectedProject.gallery && selectedProject.gallery.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold">Galería</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedProject.gallery.map((img, idx) => (
                          <div key={idx} className="rounded-xl overflow-hidden h-64 border border-border">
                            <ImageWithFallback
                              src={img}
                              alt={`Galería ${idx}`}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}