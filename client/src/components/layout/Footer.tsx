import { Link } from "wouter";
import { Logo } from "@/components/ui/logo";
import { Facebook, Twitter, Instagram, Linkedin, Github, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#1A1A1A] text-gray-300 border-t border-[#333]">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Logo className="w-10 h-10" />
              <span className="text-xl font-['Outfit'] font-bold text-[#ADFF6C]">HackSnub</span>
            </div>
            <p className="text-sm text-gray-400 max-w-xs">
              Providing simple, affordable cybersecurity solutions built specifically for small businesses.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#ADFF6C]">
                <Twitter size={18} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#ADFF6C]">
                <Facebook size={18} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#ADFF6C]">
                <Linkedin size={18} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#ADFF6C]">
                <Github size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#why-us" className="hover:text-[#ADFF6C] transition-colors">
                  Why Choose Us
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-[#ADFF6C] transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="hover:text-[#ADFF6C] transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#ADFF6C] transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-[#ADFF6C] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="hover:text-[#ADFF6C] transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-[#ADFF6C] transition-colors">
                  Security Checklist
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#ADFF6C] transition-colors">
                  Glossary
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#ADFF6C] transition-colors">
                  Security FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#ADFF6C] transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-[#ADFF6C] mt-1 flex-shrink-0" />
                <span>123 Security Street, Cyber City, CS 12345</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-[#ADFF6C] flex-shrink-0" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-[#ADFF6C] flex-shrink-0" />
                <span>info@hacksnub.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#333] mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © {currentYear} HackSnub. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-gray-400 hover:text-[#ADFF6C]">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-gray-400 hover:text-[#ADFF6C]">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-gray-400 hover:text-[#ADFF6C]">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}