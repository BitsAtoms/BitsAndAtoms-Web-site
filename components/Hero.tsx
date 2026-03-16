import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Logo from "./Logo";

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]), {
    stiffness: 100,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]), {
    stiffness: 100,
    damping: 30,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = clientX - innerWidth / 2;
      const y = clientY - innerHeight / 2;

      setMousePosition({ x, y });
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const handleScroll = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="
        relative h-screen w-full overflow-hidden
        bg-background
        flex items-center justify-center lg:pt-20
      "
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* ================= GRID DE FONDO ================= */}
      <div className="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, var(--primary) 1px, transparent 1px),
              linear-gradient(to bottom, var(--primary) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            transition: "transform 0.1s ease-out",
          }}
        />
      </div>

      {/* ================= PARTÍCULAS ================= */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary pointer-events-none"
          style={{
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5 + 0.3,
          }}
          animate={{
            y: [0, Math.random() * 100 - 50],
            x: [0, Math.random() * 100 - 50],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* ================= CONTENIDO ================= */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-8 px-4 w-full">
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
        >
          <motion.div
            animate={{ scale: isHovering ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative">
              {/* Glow */}
              <motion.div
                className="absolute inset-0 rounded-full blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, var(--glow-primary) 0%, transparent 70%)",
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Texto + logo */}
              <div className="relative z-10 flex flex-col items-center">
                <span className="text-2xl sm:text-4xl md:text-6xl mb-8 font-bold tracking-tight text-center">
                  Bits &amp; Atoms
                </span>
                <Logo />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ================= CTA ================= */}
        <motion.div
          className="flex flex-wrap gap-4 justify-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          {/* Primary */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="
              px-8 py-3 rounded-full
              bg-gradient-to-r from-purple-500 to-indigo-500
              text-white text-sm font-extrabold tracking-widest uppercase
              shadow-lg shadow-purple-500/30
            "
          >
            Únete a nosotros
          </motion.button>

          {/* Secondary */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="
              group relative px-8 py-3 rounded-full
              border border-foreground/40
              text-foreground text-sm font-extrabold tracking-widest uppercase
              backdrop-blur-sm transition-all
              hover:border-foreground/70
            "
          >
            <span className="relative z-10">Nuestros proyectos</span>
            <span
              className="
                absolute inset-0 rounded-full
                bg-foreground/5 opacity-0
                group-hover:opacity-100 transition-opacity
              "
            />
          </motion.button>
        </motion.div>
      </div>

      {/* ================= SCROLL INDICATOR ================= */}
      <motion.button
        onClick={handleScroll}
        className="
          absolute bottom-8 left-1/2 -translate-x-1/2
          text-muted-foreground hover:text-primary
          hidden md:block
        "
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.2 }}
      >
        <ChevronDown size={32} />
      </motion.button>

      {/* ================= FADE HERO → FONDO GLOBAL ================= */}
      <div
        className="
          pointer-events-none
          absolute bottom-0 left-0 right-0
          h-56 md:h-72 lg:h-96
          ient-to-bbg-grad
          from-transparent
          to-background
        "
      />
    </section>
  );
}
