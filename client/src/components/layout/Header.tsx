import { useState, useEffect } from "react";
import { Logo } from "@/components/ui/logo";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  
  // Check if we're on the homepage
  const isHomePage = location === "/";

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animated entrance for header elements
  useEffect(() => {
    const headerElements = document.querySelectorAll('.header-item');
    headerElements.forEach((el, i) => {
      setTimeout(() => {
        (el as HTMLElement).style.opacity = '1';
        (el as HTMLElement).style.transform = 'translateY(0)';
      }, 100 + (i * 100));
    });
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 bg-[#1A1A1A]/90 backdrop-blur-sm transition-all duration-300 ${
        scrolled ? 'shadow-md shadow-[#ADFF6C]/10 py-2' : 'py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-3 header-item opacity-0 transform -translate-y-2 transition-all duration-500 cursor-pointer">
          <Logo className="w-12 h-12" />
          <span className="text-2xl font-['Outfit'] font-bold text-[#ADFF6C]">HackSnub</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          {isHomePage ? (
            // Home page navigation with hash links
            <>
              <a 
                href="#why-us" 
                className="header-item opacity-0 transform -translate-y-2 transition-all duration-500 hover:text-[#ADFF6C]"
              >
                Why Us
              </a>
              <a 
                href="#how-it-works" 
                className="header-item opacity-0 transform -translate-y-2 transition-all duration-500 hover:text-[#ADFF6C]"
              >
                How It Works
              </a>
              <a 
                href="#pricing" 
                className="header-item opacity-0 transform -translate-y-2 transition-all duration-500 hover:text-[#ADFF6C]"
              >
                Pricing
              </a>
              <Link href="/blog" className="header-item opacity-0 transform -translate-y-2 transition-all duration-500 hover:text-[#ADFF6C]">
                Resources
              </Link>
              <Link href="/assessment" className="header-item opacity-0 transform -translate-y-2 transition-all duration-500 hover:text-[#ADFF6C]">
                Security Assessment
              </Link>
              <a 
                href="#contact" 
                className="header-item opacity-0 transform -translate-y-2 transition-all duration-500 bg-[#ADFF6C] hover:bg-[#8DCC4C] text-[#1A1A1A] font-['Outfit'] font-bold py-2 px-4 rounded-md"
              >
                Get Started
              </a>
            </>
          ) : (
            // Non-home page navigation
            <>
              <Link href="/#why-us" className="header-item opacity-0 transform -translate-y-2 transition-all duration-500 hover:text-[#ADFF6C]">
                Why Us
              </Link>
              <Link href="/#how-it-works" className="header-item opacity-0 transform -translate-y-2 transition-all duration-500 hover:text-[#ADFF6C]">
                How It Works
              </Link>
              <Link href="/#pricing" className="header-item opacity-0 transform -translate-y-2 transition-all duration-500 hover:text-[#ADFF6C]">
                Pricing
              </Link>
              <Link href="/blog" className="header-item opacity-0 transform -translate-y-2 transition-all duration-500 hover:text-[#ADFF6C]">
                Resources
              </Link>
              <Link href="/assessment" className="header-item opacity-0 transform -translate-y-2 transition-all duration-500 hover:text-[#ADFF6C]">
                Security Assessment
              </Link>
              <Link href="/#contact" className="header-item opacity-0 transform -translate-y-2 transition-all duration-500 bg-[#ADFF6C] hover:bg-[#8DCC4C] text-[#1A1A1A] font-['Outfit'] font-bold py-2 px-4 rounded-md">
                Get Started
              </Link>
            </>
          )}
        </nav>
        
        <div className="md:hidden">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="text-[#F5F5F5] p-2"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1A1A1A]/95 backdrop-blur-md animate-fade-in-down">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {isHomePage ? (
              // Home page mobile navigation
              <>
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
                <Link 
                  href="/blog" 
                  className="hover:text-[#ADFF6C] transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Resources
                </Link>
                <Link 
                  href="/assessment" 
                  className="hover:text-[#ADFF6C] transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Security Assessment
                </Link>
                <a 
                  href="#contact" 
                  className="bg-[#ADFF6C] hover:bg-[#8DCC4C] text-[#1A1A1A] font-['Outfit'] font-bold py-2 px-4 rounded-md transition-colors text-center mt-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started
                </a>
              </>
            ) : (
              // Non-home page mobile navigation
              <>
                <Link 
                  href="/#why-us" 
                  className="hover:text-[#ADFF6C] transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Why Us
                </Link>
                <Link 
                  href="/#how-it-works" 
                  className="hover:text-[#ADFF6C] transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  How It Works
                </Link>
                <Link 
                  href="/#pricing" 
                  className="hover:text-[#ADFF6C] transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Pricing
                </Link>
                <Link 
                  href="/blog" 
                  className="hover:text-[#ADFF6C] transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Resources
                </Link>
                <Link 
                  href="/assessment" 
                  className="hover:text-[#ADFF6C] transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Security Assessment
                </Link>
                <Link 
                  href="/#contact" 
                  className="bg-[#ADFF6C] hover:bg-[#8DCC4C] text-[#1A1A1A] font-['Outfit'] font-bold py-2 px-4 rounded-md transition-colors text-center mt-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
