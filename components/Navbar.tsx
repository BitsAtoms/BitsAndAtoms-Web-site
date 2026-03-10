import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  /* ---------------- SCROLL ---------------- */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---------------- THEME ---------------- */
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const navItems = [
    { name: "Quiénes somos", href: "#about" },
    { name: "Proyectos", href: "#projects" },
    { name: "Mentores", href: "#mentors" },
    { name: "Espacios", href: "#spaces" },
    { name: "Contacto", href: "#contact" },
  ];

  const scrollTo = (href: string) => {
   
    setIsOpen(false);

    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        
        const y = element.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        {/* ================= CAPA 1: BLUR ================= */}
        <div
          className={`
            absolute inset-0
            backdrop-blur-xl
            transition-opacity duration-300
            ${scrolled || isOpen ? "opacity-100" : "opacity-0"} 
          `}
        
        />

        {/* ================= CAPA 2: CONTRASTE REAL ================= */}
        <div
          className={`
            absolute inset-0
            transition-all duration-300
            ${
              scrolled || isOpen 
                ? `bg-background/90 dark:bg-background/75`
                : `bg-background/40 dark:bg-background/30`
            }
          `}
        />

        {/* ================= CONTENIDO ================= */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* LOGO */}
            <motion.button
              onClick={() => scrollTo("#hero")}
              whileHover={{ scale: 1.04 }}
              className="select-none"
            >
              <span
                className="
                  text-2xl font-black tracking-tight
                  bg-gradient-to-r
                  from-blue-600 to-purple-600
                  dark:from-blue-400 dark:to-purple-500
                  bg-clip-text text-transparent
                "
              >
                B&amp;A
              </span>
            </motion.button>

            {/* DESKTOP NAV */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <motion.button
                  key={item.name}
                  onClick={() => scrollTo(item.href)}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.96 }}
                  className="
                    px-4 py-2 rounded-full
                    text-sm font-semibold
                    text-foreground/80
                    hover:text-foreground
                    hover:bg-foreground/5
                    transition-all
                  "
                >
                  {item.name}
                </motion.button>
              ))}
            </div>

            {/* ACTIONS (Desktop) */}
            <div className="hidden lg:flex items-center gap-3">
              <motion.button
                onClick={() => setDarkMode(!darkMode)}
                whileHover={{ rotate: 8, scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                className="
                  p-2.5 rounded-full
                  border border-foreground/25
                  backdrop-blur-sm
                  text-foreground/70
                  hover:text-foreground
                  hover:border-foreground/50
                  transition-all
                "
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </motion.button>
            </div>

            {/* MOBILE TOGGLES */}
            <div className="lg:hidden flex items-center gap-2">
              <motion.button
                onClick={() => setDarkMode(!darkMode)}
                whileTap={{ scale: 0.9 }}
                className="
                  p-2 rounded-xl
                  border border-foreground/25
                  backdrop-blur-sm
                  text-foreground/70
                "
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </motion.button>

              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileTap={{ scale: 0.9 }}
                className="
                  p-2 rounded-xl
                  border border-foreground/25
                  backdrop-blur-sm
                  text-foreground/70
                "
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU CONTENT */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isOpen ? "auto" : 0,
            opacity: isOpen ? 1 : 0,
          }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="
            lg:hidden
            relative overflow-hidden
            bg-background/95
            border-t border-border
            z-50
          "
        >
          {/* ================= MOBILE NAV ITEMS ================= */}
          <div className="px-4 pt-4 pb-6 space-y-2">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => scrollTo(item.href)}
                whileTap={{ scale: 0.96 }}
                className="
                  w-full text-left
                  px-4 py-3 rounded-2xl
                  text-base font-semibold
                  text-foreground
                  hover:bg-foreground/5
                  transition-all
                "
              >
                {item.name}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.nav>

      {/* ================= OVERLAY ================= */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsOpen(false)}
            
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm top-20"
          />
        )}
      </AnimatePresence>
    </>
  );
}