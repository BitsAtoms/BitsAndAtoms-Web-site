import React from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Mail,
  Instagram,
  Linkedin,
  Youtube,
  Podcast,
} from "lucide-react";
import { SiTiktok } from "react-icons/si";
import { useScrollFocusSection } from "./useScrollFocusSection";
import { ContactMap } from "./ContactMap";
import { FaSpotify } from "react-icons/fa";


const socialMedia = [
  { name: "Instagram", icon: Instagram, url: "https://www.instagram.com/bitsatoms_/" },
  { name: "LinkedIn", icon: Linkedin, url: "https://www.linkedin.com/company/bitsatoms/" },
  { name: "TikTok", icon: SiTiktok, url: "https://www.tiktok.com/@bitsatoms" },
  { name: "YouTube", icon: Youtube, url: "https://www.youtube.com/@BitsAtomsAdmira" },
  
];

export function Contact() {
  const focusRef = useScrollFocusSection("white");

  return (
    <section ref={focusRef} id="contact" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <motion.div
          className="text-center mb-10 space-y-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center">
            <div className="inline-flex px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs font-extrabold tracking-widest uppercase shadow-lg shadow-purple-500/30">
              Contacto
            </div>
          </div>

          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-foreground">
            ¿Te apetece{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              formar parte?
            </span>
          </h2>

        </motion.div>

        {/* CONTENIDO */}
        <div className="flex flex-col items-center justify-center">
            <motion.div
              className="w-full max-w-2xl mx-auto space-y-8 pt-6 text-center flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div>
                
                <h4 className="text-xl  mb-3">Contacto</h4>

                <p className="text-xl text-muted-foreground flex items-center justify-center gap-2">
                  <Mail size={16} /> comunicacion@admira.com
                </p>
                <p className="text-l text-muted-foreground flex items-center justify-center gap-2 mt-2">
                  <MapPin size={16} /> Gràcia, Barcelona
                </p>
              </div>

              <div>
                <h4 className="text-xl font-bold mb-3">Síguenos</h4>

                <div className="flex justify-center gap-4">
                  {socialMedia.map((s) => (
                    <a
                      key={s.name}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition"
                      aria-label={s.name}
                    >
                      <s.icon size={20} />
                    </a>
                  ))}
                </div>
              </div>

              <div className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto text-center">
                Si tienes dudas sobre el programa o el proceso de inscripción, escríbenos y te responderemos lo antes posible.
              </div>
            </motion.div>


        </div>
      </div>
    </section>
  );
}