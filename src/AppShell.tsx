import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import WhatsAppButton from "./components/WhatsAppButton";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import FaqPage from "./pages/FaqPage";
import Blog from "./pages/Blog";
import BlogArticlePage from "./pages/BlogArticlePage";
import MoneyPage from "./pages/MoneyPage";
import KwSystemPage from "./pages/KwSystemPage";
import LocalityPage from "./pages/LocalityPage";
import { moneyPages } from "./data/moneyPages";
import { kwSystems } from "./data/kwSystems";
import { localities } from "./data/localities";

export default function AppShell() {
  return (
    <div className="relative">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:slug" element={<ProductDetail />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogArticlePage />} />
        {moneyPages.map((p) => (
          <Route key={p.slug} path={`/${p.slug}`} element={<MoneyPage slug={p.slug} />} />
        ))}
        {kwSystems.map((s) => (
          <Route key={s.slug} path={`/${s.slug}`} element={<KwSystemPage slug={s.slug} />} />
        ))}
        {localities.map((l) => (
          <Route key={l.slug} path={`/${l.slug}`} element={<LocalityPage slug={l.slug} />} />
        ))}
      </Routes>
      <WhatsAppButton />
    </div>
  );
}
