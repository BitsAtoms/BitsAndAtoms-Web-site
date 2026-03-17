import React from "react";
import { motion } from "framer-motion";
import { Globe2, UsersRound, Sparkles, Atom } from "lucide-react";
import { Card } from "./ui/card";
import { useScrollFocusSection } from "./useScrollFocusSection";

/* ---------------- DATA ---------------- */

const values = [
  {
    icon: Globe2,
    title: "Visión",
    description: "Usar la tecnología para crear impacto real.",
  },
  {
    icon: UsersRound,
    title: "Personas",
    description: "Una comunidad curiosa, diversa y con ganas de aprender juntas.",
  },
  {
    icon: Sparkles,
    title: "Propósito",
    description: "Acompañar a futuros creadores a encontrar su camino.",
  },
  {
    icon: Atom,
    title: "Misión",
    description: "Innovar, colaborar y crecer creando",
  },
];

const programs = [
  {
    title: "Learning by Doing",
    description:
      "Aprende tecnología construyéndola desde el primer día. Explora, experimenta y convierte ideas en proyectos reales.",
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    title: "Proyectos reales",
    description:
      "Retos auténticos donde aplicar IA, IoT y creatividad para desarrollar soluciones con impacto.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "Mentores",
    description:
      "Profesionales en activo que acompañan, retan y ayudan a convertir cada proyecto en aprendizaje.",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    title: "Colaboración",
    description:
      "Trabajo en equipos multidisciplinares donde las ideas se debaten y evolucionan juntas.",
    gradient: "from-indigo-500 to-purple-500",
  },
];

/* ---------------- COMPONENT ---------------- */

export function About() {    
  const focusRef = useScrollFocusSection("purple");
  return (  
    <section
      ref={focusRef}
      id="about"
      className="relative py-24 px-4"
    >

      {/* ================= CONTENIDO ================= */}
      <div className="max-w-7xl mx-auto space-y-32 md:px-10">

        {/* ================= HEADER GENERAL ================= */}
        <motion.div
          className="text-center space-y-4 "
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Pill estilo Proyectos */}
          <div className="flex justify-center">
            <div
              className="inline-flex items-center justify-center px-6 py-2 rounded-full
                         bg-gradient-to-r from-purple-500 to-indigo-500
                         text-white text-xs font-extrabold tracking-widest uppercase
                         shadow-lg shadow-purple-500/30"
            >
              Sobre Bits & Atoms
            </div>
          </div>

          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-foreground">
            Educación práctica,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              creatividad e innovación
            </span>
          </h2>
        </motion.div>

        {/* ================= QUIÉNES SOMOS ================= */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Video */}
          <motion.div
            className="relative h-[360px] lg:h-[520px] rounded-3xl overflow-hidden border border-border"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <iframe
              src="https://www.youtube.com/embed/PN577xVQ4SM?mute=1&controls=1"
              className="w-full h-full"
              allowFullScreen
            />
          </motion.div>

          {/* Texto */}
          <motion.div
            className="space-y-6 max-w-xl text-left md:max-w-3xl"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-black text-foreground md:text-4xl">
              Donde la tecnología {" "}
              <span className="text-primary md:text-4xl">cobra vida</span>
            </h3>

            <p className="text-muted-foreground text-lg leading-relaxed text-justify hyphens-auto  md:text-xl " lang="es">
              Bits and Atoms es un proyecto de Admira nacido desde una visión 
              de tecnología con propósito, pensado para formar, acompañar y crear 
              oportunidades reales para jóvenes con talento. El aprendizaje se basa 
              en la práctica: construir, probar y equivocarse es parte del camino.
            </p>

            <p className="text-muted-foreground text-lg leading-relaxed text-justify hyphens-auto md:text-xl " lang="es">
              El programa combina inteligencia artificial, IoT y pensamiento 
              creativo para desarrollar proyectos reales desde el primer día, 
              trabajando con retos auténticos, ideas con sentido y crecimiento en equipo.
            </p>

            <p className="text-muted-foreground text-lg leading-relaxed text-justify hyphens-auto md:text-xl " lang="es">
              Un entorno donde la curiosidad y las ganas de aprender marcan la diferencia,
              y donde cada proyecto impulsa el desarrollo profesional.
            </p>
          </motion.div>
        </div>

        {/* ================= CÓMO APRENDEMOS ================= */}
        <div className="space-y-12">
          <h3 className="text-3xl md:text-4xl font-black text-foreground">
            Cómo{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              aprendemos
            </span>
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            {programs.map((program, index) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="relative p-8 rounded-3xl border border-border bg-card overflow-hidden md:h-full ">
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${program.gradient}`}
                  />

                  <h4 className="text-xl font-bold mb-4 text-foreground">
                    {program.title}
                  </h4>
                  <p className="text-muted-foreground text-lg leading-relaxed  hyphens-auto" lang="es">
                    {program.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ================= VALORES ================= */}
        <div className="space-y-12">
          <h3 className="text-3xl md:text-4xl font-black text-foreground">
            Lo que{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              nos mueve
            </span>
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-3xl border border-border bg-card text-center flex flex-col justify-center items-center"
              >
                <div className="mb-4 inline-flex p-3 rounded-xl bg-primary/10 text-primary">
                  <value.icon size={24} />
                </div>
                <h4 className="font-bold text-foreground mb-2">
                  {value.title}
                </h4>
                <p className="text-muted-foreground">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
