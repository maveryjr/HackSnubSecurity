import { Logo } from "@/components/ui/logo";

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] border-t border-[#ADFF6C]/20 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Logo className="w-8 h-8 text-[#ADFF6C]" />
              <span className="text-xl font-['Outfit'] font-bold text-[#ADFF6C]">HackSnub</span>
            </div>
            <p className="mb-4">Cybersecurity made simple, affordable, and built for small businesses.</p>
            <p className="text-[#F5F5F5]/70 text-sm">© {new Date().getFullYear()} HackSnub. All rights reserved.</p>
          </div>
          
          <div>
            <h3 className="font-['Outfit'] font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-[#ADFF6C] transition-colors">Security Assessment</a></li>
              <li><a href="#" className="hover:text-[#ADFF6C] transition-colors">Employee Training</a></li>
              <li><a href="#" className="hover:text-[#ADFF6C] transition-colors">Threat Monitoring</a></li>
              <li><a href="#" className="hover:text-[#ADFF6C] transition-colors">Incident Response</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-['Outfit'] font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-[#ADFF6C] transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-[#ADFF6C] transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-[#ADFF6C] transition-colors">Careers</a></li>
              <li><a href="#contact" className="hover:text-[#ADFF6C] transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-[#ADFF6C]/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-6 mb-4 md:mb-0">
            <a href="#" className="text-[#F5F5F5] hover:text-[#ADFF6C] transition-colors">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-[#F5F5F5] hover:text-[#ADFF6C] transition-colors">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="#" className="text-[#F5F5F5] hover:text-[#ADFF6C] transition-colors">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="text-[#F5F5F5] hover:text-[#ADFF6C] transition-colors">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
          
          <div className="flex space-x-6 text-sm text-[#F5F5F5]/70">
            <a href="#" className="hover:text-[#ADFF6C] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#ADFF6C] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#ADFF6C] transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
