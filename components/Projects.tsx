import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Youtube, X } from "lucide-react";
import { FaSpotify } from "react-icons/fa";
import { Card } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useScrollFocusSection } from "./useScrollFocusSection";

/* ---------------- DATA ---------------- */
const categories = ["Todos", "Programación", "Robotica", "Videojuegos","RV (Realidad Virtual)", "Impresión 3D","Realización","Podcast"];

const projects = [
  {
    title: "Video Juegos",
    description: "Diseño y desarrollo de videojuegos interactivos combinando programación, arte y narrativa.",
    image: "img/jeep.jpeg",
    category: "Videojuegos",
    gallery: [
      "Projects/Vjuegos/Backjeep.jpg",
      
    ],
    videos: [
      "Projects/Vjuegos/VideoGameJeep.mp4",
      "Projects/Vjuegos/videoExpli.MP4",
      
    ]
  },
  {
    title: "Sistemas Robóticos Autónomos",
    description: "Creación de robots y sistemas inteligentes que combinan hardware, programación y automatización.",
    image: "https://imgs.search.brave.com/kF6pI7h-BZRE6vxI8GxgS_PcUcoidmGeHcWWqFMGl80/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTIy/MDU5MTgyMS9lcy9m/b3RvL3JvYm90LXkt/bWFuby1odW1hbmEt/Y29uLWVuZ3JhbmFq/ZXMuanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPW02MVZUYkJM/bFhISGdkbVVEd0Y1/SXQtTHVwOXBhTmRU/MGM2X1I0dXJHNEE9",
    category: "Robotica",
    gallery: ["https://images.unsplash.com/photo-1563394867331-e687a36112fd?fit=max&q=80&w=1080"],
    videos: ["Projects/perroRobot.mp4",
            "https://www.youtube.com/shorts/jaiPjj3FrEI",
            "https://www.youtube.com/shorts/v-cNINzUhJ8"
    ]
  },
  {
    title: "Podcast",
    description: (
      <span>
        Conversaciones y contenido sonoro para compartir ideas, proyectos y aprendizaje.
        <br />
        <br />
        <a
          href="https://www.youtube.com/@BitsAtomsAdmira"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-blue-500 hover:text-red-600 font-bold transition-colors"
        >
          <Youtube size={20} />
          Si quieres ver más, suscríbete a nuestro canal de YouTube
        </a>
      </span>
    ),
    image: "Projects/podcast/pod.jpg",
    category: "Podcast",
    gallery: {
      "Bits&Atoms": [
        
        "Projects/podcast/podcast3.jpg",
        "Projects/podcast/podcast1.jpg",
        "Projects/podcast/podcastElena.jpg",
        "Projects/podcast/pddcast.jpg",
        "Projects/podcast/podcastAg.jpg",
        
      ],
      "On the Cloud": [
        "Projects/podcast/on the cloud 1.jpg",
        "Projects/podcast/on the cloud 4.jpg",
        "Projects/podcast/snvsjr.jpg",
        "Projects/podcast/on the cloud 5.png",
      ],
      "Senior vs Junior": [
         "Projects/podcast/PodcastBA2.jpg",
      ]
    },
    videos: ["https://www.youtube.com/watch?v=_Fa6OJ_CoUQ",
          "https://www.youtube.com/watch?v=ZZ4M4r3-CvQ",
        ]
  },
  {
    title: "Programación",
    description: "Desarrollo de software, aplicaciones y sistemas a través de código y pensamiento lógico.",
    image: "Projects/programacion/programacion1.PNG",
    category: "Programación",
    gallery: ["Projects/programacion/programacion.jpg",
              , 
    ],
    videos: [
    ]
  },
  {
    title: "Realización",
    description: "Producción audiovisual de proyectos tecnológicos, desde la grabación hasta la edición final.",
    image: "Projects/Realizacion/PodcastBA1.jpg",
    category: "Realización",
    gallery: ["Projects/Realizacion/pdcst.jpg",
              "Projects/Realizacion/PodcastBA.jpg",
              "Projects/Realizacion/podcast2.jpg",
              "Projects/Realizacion/podcast.jpg",
              "Projects/Realizacion/realizacion.jpg",
              "Projects/Realizacion/realizacion1.jpg",
              
    ],
    videos: []
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
    videos: []
  },
];

/* ---------------- HELPERS  ---------------- */

function getVisibleCountFromWidth(width: number) {
  if (width >= 1024) return 4; // lg
  if (width >= 768) return 2; // md
  return 1; // mobile fallback
}

const getEmbedUrl = (url: string | null): string => {
  if (!url) return "";

  // Check if it's already an embed URL
  if (url.includes("/embed/")) {
    return url;
  }

  if (url.includes("youtube.com/watch")) {
    const videoId = url.split("v=")[1]?.split("&")[0];
    if (videoId) return `https://www.youtube.com/embed/${videoId}`;
  }

  if (url.includes("youtu.be/")) {
    const videoId = url.split("youtu.be/")[1]?.split("?")[0];
    if (videoId) return `https://www.youtube.com/embed/${videoId}`;
  }

  if (url.includes("youtube.com/shorts/")) {
    const videoId = url.split("shorts/")[1]?.split("?")[0];
    if (videoId) return `https://www.youtube.com/embed/${videoId}`;
  }

  // For local videos or other URLs
  return url;
};

const ProjectGallery = ({ gallery, onImageClick }: { gallery: string[] | { [category: string]: string[] }, onImageClick?: (images: string[], index: number) => void }) => {
  const isCategorized = typeof gallery === 'object' && !Array.isArray(gallery) && gallery !== null;

  if (!isCategorized) {
    // Fallback for non-categorized galleries (string[])
    const images = (gallery as string[]).filter(img => img);
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {images.map((img, idx) => (
          <div key={idx} className={`rounded-xl overflow-hidden h-64 border border-border ${onImageClick ? 'cursor-pointer' : ''}`} onClick={onImageClick ? () => onImageClick(images, idx) : undefined}>
            <ImageWithFallback
              src={img}
              alt={`Galería ${idx}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        ))}
      </div>
    );
  }

  // Logic for categorized galleries
  const categories = Object.keys(gallery);
  const [activeCategory, setActiveCategory] = useState(categories[0] || null);

  if (!activeCategory) return null;

  const images = (gallery[activeCategory] || []).filter(img => img);

  return (
    <div className="space-y-6">
      {/* Category Filters */}
      <div className="flex gap-3 flex-wrap">
        {categories.map((cat) => {
          const active = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={(e) => { e.stopPropagation(); setActiveCategory(cat); }}
              className={`px-5 py-2 rounded-full text-sm font-bold border transition
                ${active ? "bg-primary text-white border-primary" : "bg-card text-muted-foreground border-border hover:text-foreground"}`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence>
          {images.map((img, idx) => (
            <motion.div
              key={img} // Use image src as key for better animation
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className={`rounded-xl overflow-hidden h-64 border border-border ${onImageClick ? 'cursor-pointer' : ''}`}
              onClick={onImageClick ? () => onImageClick(images, idx) : undefined}>
              <ImageWithFallback
                src={img}
                alt={`Galería ${idx}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export function Projects() {
  const focusRef = useScrollFocusSection("pink");
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [lightboxImage, setLightboxImage] = useState<{ images: string[]; index: number } | null>(null);
  
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

  const handleImageClick = (images: string[], index: number) => {
    setLightboxImage({ images, index });
  };

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
                    onClick={() => {
                      setSelectedProject(project);
                      setActiveVideo(project.videos && project.videos.length > 0 ? project.videos[0] : null);
                    }}
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
                        onClick={() => {
                          setSelectedProject(project);
                          setActiveVideo(project.videos && project.videos.length > 0 ? project.videos[0] : null);
                        }}
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
              onClick={() => {
                setSelectedProject(null);
                setActiveVideo(null);
              }}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-background w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl border border-border shadow-2xl relative flex flex-col"
              >
                <button
                  onClick={() => {
                    setSelectedProject(null);
                    setActiveVideo(null);
                  }}
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

                  {selectedProject.videos && selectedProject.videos.length > 0 && activeVideo && (
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold">Videos del proyecto</h3>
                      {/* Main Video Player */}
                      <div className="rounded-2xl overflow-hidden aspect-video border border-border bg-black">
                        <iframe
                          src={getEmbedUrl(activeVideo)}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                      {/* Video Thumbnails List */}
                      {selectedProject.videos.length > 1 && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                          {selectedProject.videos.map((vid, idx) => {
                            const isYoutube = vid.includes("youtube.com") || vid.includes("youtu.be");
                            let thumbnail;

                            if (isYoutube) {
                              const videoId = vid.split("/embed/")[1]?.split("?")[0] || vid.split("v=")[1]?.split("&")[0];
                              thumbnail = (
                                <img 
                                  src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`} 
                                  alt={`Video ${idx + 1}`} 
                                  className="w-full h-full object-cover"
                                />
                              );
                            } else {
                              const videoSrc = vid.startsWith("public/") ? vid.replace("public/", "/") : vid;
                              thumbnail = <video src={`${videoSrc}#t=1.0`} className="w-full h-full object-cover" muted preload="metadata" playsInline />;
                            }

                            return (
                              <div key={idx} onClick={() => setActiveVideo(vid)} className={`cursor-pointer rounded-xl overflow-hidden border-2 ${activeVideo === vid ? "border-primary" : "border-transparent"} relative aspect-video bg-muted hover:opacity-80 transition-all`}>
                                {thumbnail}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}

                  {selectedProject.gallery && (Array.isArray(selectedProject.gallery) ? selectedProject.gallery.length > 0 : Object.keys(selectedProject.gallery).length > 0) && (
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold">Galería</h3>
                      <ProjectGallery gallery={selectedProject.gallery} onImageClick={!isMobile ? handleImageClick : undefined} />
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {lightboxImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
              onClick={() => setLightboxImage(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-full h-full max-w-6xl max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={lightboxImage.index}
                    src={lightboxImage.images[lightboxImage.index]}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="w-full h-full object-contain"
                  />
                </AnimatePresence>
              </motion.div>

              <button
                onClick={() => setLightboxImage(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition z-20"
              >
                <X size={28} />
              </button>

              {lightboxImage.images.length > 1 && (
                <>
                  <button onClick={(e) => { e.stopPropagation(); setLightboxImage(prev => prev && { ...prev, index: (prev.index - 1 + prev.images.length) % prev.images.length }); }} className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition z-20">
                    <ChevronLeft size={32} />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); setLightboxImage(prev => prev && { ...prev, index: (prev.index + 1) % prev.images.length }); }} className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition z-20">
                    <ChevronRight size={32} />
                  </button>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}