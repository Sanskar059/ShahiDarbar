import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="w-full border-t border-surface-container-highest bg-surface-container-lowest mt-16">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-12 flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="max-w-xs flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-on-surface uppercase tracking-tighter">
            Shahi<span className="text-luxury-gold italic font-normal">Darbar</span>
          </h1>
          <p className="text-sm font-semibold text-on-surface-variant uppercase tracking-widest">
            Curated culinary experiences delivered with precision.
          </p>
        </div>
        <div className="flex gap-16">
          <div className="flex flex-col gap-4">
            <span className="text-sm font-bold text-on-surface uppercase tracking-widest">Company</span>
            <Link to="/" className="text-sm font-semibold text-on-surface-variant hover:text-on-surface uppercase tracking-widest">About</Link>
            <Link to="/" className="text-sm font-semibold text-on-surface-variant hover:text-on-surface uppercase tracking-widest">Careers</Link>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-sm font-bold text-on-surface uppercase tracking-widest">Support</span>
            <Link to="/" className="text-sm font-semibold text-on-surface-variant hover:text-on-surface uppercase tracking-widest">Help Center</Link>
            <Link to="/" className="text-sm font-semibold text-on-surface-variant hover:text-on-surface uppercase tracking-widest">Contact</Link>
          </div>
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-6 border-t border-surface-container-highest text-center text-sm font-semibold text-on-surface-variant uppercase tracking-widest">
        © 2026 Shahi Darbar. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;

