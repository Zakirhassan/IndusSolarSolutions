import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { getProjectBySlug } from "../data/projects";
import { business } from "../data/site";
import { getSeo } from "../data/seo";
import Seo from "../components/Seo";
import SizedImage from "../components/SizedImage";
import Footer from "../components/Footer";

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) return <Navigate to="/projects" replace />;

  return (
    <>
      <Seo {...getSeo(`/projects/${project.slug}`)} />
      <section className="relative flex min-h-[55vh] items-end overflow-hidden bg-charcoal px-6 pb-14 pt-32 md:px-16 md:pt-40">
        <SizedImage src={project.image} alt={project.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <Link to="/projects" className="inline-flex items-center gap-2 text-xs font-medium text-white/70 hover:text-white">
            <ArrowLeft size={14} /> All Projects
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-4 max-w-2xl font-display text-3xl font-bold text-white md:text-5xl"
          >
            {project.title}
          </motion.h1>
          <p className="mt-3 max-w-xl text-sm text-white/75 md:text-base">{project.location}</p>
        </div>
      </section>

      <section className="bg-cream px-6 py-16 md:px-16">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm leading-relaxed text-muted">
            {project.title} completed by Indus Solar Solutions in {project.location}. Contact us for details on
            system size, components used, and generation for this project.
          </p>
          <a
            href={business.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-block rounded-full bg-charcoal px-7 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.03]"
          >
            Ask About a Similar Project
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
