import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Mail,
  Send,
  Instagram,
  Linkedin,
  Youtube,
  Podcast,
} from "lucide-react";
import { SiTiktok } from "react-icons/si";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner";
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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    center: "",
    city: "",
    cv: null as File | null,
    coverLetter: null as File | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formToSend = new FormData();
    formToSend.append("name", formData.name);
    formToSend.append("email", formData.email);
    formToSend.append("center", formData.center);
    formToSend.append("city", formData.city);
    if (formData.cv) formToSend.append("cv", formData.cv);
    if (formData.coverLetter) formToSend.append("coverLetter", formData.coverLetter);

    const promise = fetch("https://bitsandatoms-web-site-backend.onrender.com/api/contact", {
      method: "POST",
      body: formToSend,
    }).then((res) => {
      if (!res.ok) throw new Error();
      return res.json();
    });

    toast.promise(promise, {
      loading: "Enviando...",
      success: () => {
        setFormData({
          name: "",
          email: "",
          center: "",
          city: "",
          cv: null,
          coverLetter: null,
        });
        return "Mensaje enviado correctamente";
      },
      error: "Error al enviar el mensaje",
    });
  };

  const focusRef = useScrollFocusSection("white");

  return (
    <section ref={focusRef} id="contact" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <motion.div
          className="text-center mb-20 space-y-4"
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
        <div className="grid lg:grid-cols-2 gap-20 items-start justify-center">

          {/* FORMULARIO */}
          <motion.div
            className="w-full max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-10 rounded-3xl border-border shadow-lg">
              <h3 className="text-3xl font-extrabold mb-2">
                Súmate a{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                  Bits & Atoms
                </span>
              </h3>

              <p className="text-muted-foreground mb-8 text-sm">
                Únete a la próxima edición · 2026/27
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label>Nombre completo *</Label>
                  <Input
                    required
                    placeholder="Nombre y apellidos"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div>
                  <Label>Email *</Label>
                  <Input
                    required
                    type="email"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div>
                  <Label>Centro</Label>
                  <p className="text-xs text-muted-foreground mb-2">
                    Si no estás estudiando, déjalo en blanco
                  </p>
                  <Input
                    placeholder="Centro actual"
                    value={formData.center}
                    onChange={(e) => setFormData({ ...formData, center: e.target.value })}
                  />
                </div>

                <div>
                  <Label>Ciudad *</Label>
                  <Input
                    required
                    placeholder="Ciudad de residencia"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>

                {/* CV */}
                <div>
                  <Label>Adjuntar CV *</Label>
                  <div className="border border-input rounded-xl h-11 px-4 flex items-center">
                    {!formData.cv ? (
                      <label
                        htmlFor="cv"
                        className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer w-full"
                      >
                        <span className="material-symbols-outlined text-[16px]">attach_file</span>
                        Ningún archivo seleccionado
                      </label>
                    ) : (
                      <>
                        <span className="text-sm truncate flex-1">{formData.cv.name}</span>
                        <label htmlFor="cv" className="text-xs text-primary cursor-pointer">
                          Cambiar
                        </label>
                      </>
                    )}
                    <input
                      id="cv"
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setFormData({ ...formData, cv: e.target.files?.[0] || null })}
                    />
                  </div>
                </div>

                {/* CARTA */}
                <div>
                  <Label>Carta de motivación</Label>
                  <p className="text-xs text-muted-foreground mb-2">Opcional</p>

                  <div className="border border-input rounded-xl h-11 px-4 flex items-center gap-3">
                    {!formData.coverLetter ? (
                      <label
                        htmlFor="coverLetter"
                        className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer w-full"
                      >
                        <span className="material-symbols-outlined text-[16px]">attach_file</span>
                        Ningún archivo seleccionado
                      </label>
                    ) : (
                      <>
                        <span className="text-sm truncate flex-1">{formData.coverLetter.name}</span>
                        <label htmlFor="coverLetter" className="text-xs text-primary cursor-pointer">
                          Cambiar
                        </label>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, coverLetter: null })}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </>
                    )}
                    <input
                      id="coverLetter"
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) =>
                        setFormData({ ...formData, coverLetter: e.target.files?.[0] || null })
                      }
                    />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full flex items-center justify-center gap-2 bg-primary text-white rounded-xl py-4 font-semibold"
                >
                  Enviar <Send size={18} />
                </motion.button>
              </form>
            </Card>
          </motion.div>

          {/* COLUMNA DERECHA */}
            <motion.div
              className="w-full max-w-2xl mx-auto space-y-8 pt-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div>
                <h4 className="font-bold mb-3">Contacto</h4>

                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Mail size={16} /> comunicacion@admira.com
                </p>
                <p className="text-sm text-muted-foreground flex items-center gap-2 mt-2">
                  <MapPin size={16} /> Gràcia, Barcelona
                </p>
              </div>

              <div>
                <h4 className="font-bold mb-3">Síguenos</h4>

                <div className="flex gap-4">
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

              <div className="text-sm text-muted-foreground leading-relaxed max-w-md">
                Si tienes dudas sobre el programa o el proceso de inscripción, escríbenos y te responderemos lo antes posible.
              </div>
            </motion.div>


        </div>
      </div>
    </section>
  );
}