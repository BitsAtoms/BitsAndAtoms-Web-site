// App.tsx
import { Layout } from "./Layout";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Mentors } from "./components/Mentors";
import { Spaces } from "./components/Spaces";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  return (
    <Layout>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Mentors />
      <Spaces />
      <Contact />
      <Footer />
      <Toaster />
    </Layout>
  );
}
