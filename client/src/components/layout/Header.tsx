import { useState, useEffect } from "react";
import { Logo } from "@/components/ui/logo";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 bg-[#1A1A1A]/90 backdrop-blur-sm ${scrolled ? 'shadow-md shadow-[#ADFF6C]/10' : ''}`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Logo className="w-10 h-10 text-[#ADFF6C]" />
          <span className="text-2xl font-['Outfit'] font-bold text-[#ADFF6C]">HackSnub</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-10">
          <a href="#why-us" className="hover:text-[#ADFF6C] transition-colors">Why Us</a>
          <a href="#how-it-works" className="hover:text-[#ADFF6C] transition-colors">How It Works</a>
          <a href="#pricing" className="hover:text-[#ADFF6C] transition-colors">Pricing</a>
          <a href="#contact" className="bg-[#5FD35F] hover:bg-[#ADFF6C] text-[#1A1A1A] font-['Outfit'] font-bold py-2 px-4 rounded-md transition-colors">Get Started</a>
        </nav>
        
        <div className="md:hidden">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="text-[#F5F5F5]"
          >
            <i className="fas fa-bars text-xl"></i>
          </button>
        </div>
      </div>
      
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1A1A1A]/95 backdrop-blur-md">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <a 
              href="#why-us" 
              className="hover:text-[#ADFF6C] transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Why Us
            </a>
            <a 
              href="#how-it-works" 
              className="hover:text-[#ADFF6C] transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </a>
            <a 
              href="#pricing" 
              className="hover:text-[#ADFF6C] transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </a>
            <a 
              href="#contact" 
              className="bg-[#5FD35F] hover:bg-[#ADFF6C] text-[#1A1A1A] font-['Outfit'] font-bold py-2 px-4 rounded-md transition-colors text-center mt-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
