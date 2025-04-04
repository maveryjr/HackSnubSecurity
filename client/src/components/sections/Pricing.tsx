export default function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-[#1A1A1A]/80">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-['Outfit'] font-bold mb-4">Simple, Transparent <span className="text-[#ADFF6C]">Pricing</span></h2>
          <p className="text-xl max-w-2xl mx-auto">No hidden fees, no surprise costs—just straightforward security.</p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Basic Plan */}
            <div className="bg-[#1A1A1A] border border-[#ADFF6C]/20 rounded-lg overflow-hidden transform transition-all hover:-translate-y-1">
              <div className="bg-[#ADFF6C]/10 p-6">
                <h3 className="text-2xl font-['Outfit'] font-bold mb-2">HackSnub Basics</h3>
                <div className="flex items-baseline">
                  <span className="text-4xl font-['Outfit'] font-bold">$299</span>
                  <span className="ml-2 text-[#F5F5F5]/70">/month</span>
                </div>
                <p className="text-[#F5F5F5]/70 mt-2">Perfect for solo entrepreneurs and microbusinesses.</p>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-[#ADFF6C] mr-3 mt-1"><i className="fas fa-check"></i></span>
                    <span>Security assessment and basic protection plan</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#ADFF6C] mr-3 mt-1"><i className="fas fa-check"></i></span>
                    <span>Password management system</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#ADFF6C] mr-3 mt-1"><i className="fas fa-check"></i></span>
                    <span>Phishing awareness training (1 session)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#ADFF6C] mr-3 mt-1"><i className="fas fa-check"></i></span>
                    <span>Basic endpoint protection</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#ADFF6C] mr-3 mt-1"><i className="fas fa-check"></i></span>
                    <span>Email security scanning</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <a 
                    href="#contact" 
                    className="block text-center bg-[#5FD35F] hover:bg-[#ADFF6C] text-[#1A1A1A] font-['Outfit'] font-bold py-3 px-6 rounded-md transition-colors"
                  >
                    Get Started
                  </a>
                </div>
              </div>
            </div>
            
            {/* Pro Plan */}
            <div className="bg-[#1A1A1A] border-2 border-[#ADFF6C] rounded-lg overflow-hidden transform transition-all hover:-translate-y-1 relative">
              <div className="absolute top-0 right-0 bg-[#ADFF6C] text-[#1A1A1A] px-4 py-1 font-['Outfit'] font-bold text-sm">
                Most Popular
              </div>
              <div className="bg-[#ADFF6C]/20 p-6">
                <h3 className="text-2xl font-['Outfit'] font-bold mb-2">HackSnub Pro</h3>
                <div className="flex items-baseline">
                  <span className="text-4xl font-['Outfit'] font-bold">$599</span>
                  <span className="ml-2 text-[#F5F5F5]/70">/month</span>
                </div>
                <p className="text-[#F5F5F5]/70 mt-2">Ideal for small businesses with 5-25 employees.</p>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-[#ADFF6C] mr-3 mt-1"><i className="fas fa-check"></i></span>
                    <span>Everything in Basics, plus:</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#ADFF6C] mr-3 mt-1"><i className="fas fa-check"></i></span>
                    <span>Advanced threat protection</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#ADFF6C] mr-3 mt-1"><i className="fas fa-check"></i></span>
                    <span>Quarterly security training for all staff</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#ADFF6C] mr-3 mt-1"><i className="fas fa-check"></i></span>
                    <span>24/7 security monitoring</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#ADFF6C] mr-3 mt-1"><i className="fas fa-check"></i></span>
                    <span>Incident response plan</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#ADFF6C] mr-3 mt-1"><i className="fas fa-check"></i></span>
                    <span>VPN service for all employees</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <a 
                    href="#contact" 
                    className="block text-center bg-[#ADFF6C] hover:bg-[#5FD35F] text-[#1A1A1A] font-['Outfit'] font-bold py-3 px-6 rounded-md transition-colors"
                  >
                    Get Started
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-lg mb-4">Need a custom plan for your business?</p>
            <a 
              href="#contact" 
              className="inline-block border-2 border-[#ADFF6C] text-[#ADFF6C] hover:bg-[#ADFF6C] hover:text-[#1A1A1A] font-['Outfit'] font-bold py-3 px-8 rounded-md transition-colors"
            >
              Contact Us for Custom Solutions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
