export default function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-[#1A1A1A]/80">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-['Outfit'] font-bold mb-4">Simple, Transparent <span className="text-[#ADFF6C]">Pricing</span></h2>
          <p className="text-xl max-w-2xl mx-auto">No hidden fees, no surprise costs—just straightforward security.</p>
        </div>
        
        <div className="max-w-7xl mx-auto">
          {/* Main pricing grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1: Cybersecurity Training */}
            <div className="bg-[#1A1A1A] border border-[#ADFF6C]/20 rounded-lg overflow-hidden transform transition-all hover:-translate-y-1">
              <div className="bg-[#ADFF6C]/10 p-6">
                <h3 className="text-2xl font-['Outfit'] font-bold mb-2">Cybersecurity Training</h3>
                <div className="flex items-baseline">
                  <span className="text-4xl font-['Outfit'] font-bold">$299</span>
                </div>
                <p className="text-[#F5F5F5]/70 mt-2">Per session (up to 10 attendees)</p>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <p className="text-sm text-[#F5F5F5]/70 mb-2">What It Is:</p>
                  <p>A 1–2 hour workshop teaching employees how to avoid phishing scams, use strong passwords, and follow basic security habits.</p>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-[#F5F5F5]/70 mb-2">Why It Matters:</p>
                  <p>Most breaches (over 80%) come from human error—training is a quick win for protection.</p>
                </div>
                <div className="mt-8">
                  <a 
                    href="#contact" 
                    className="block text-center bg-[#5FD35F] hover:bg-[#ADFF6C] text-[#1A1A1A] font-['Outfit'] font-bold py-3 px-6 rounded-md transition-colors"
                  >
                    Book Training
                  </a>
                </div>
              </div>
            </div>
            
            {/* Service 2: Basic Security Setup */}
            <div className="bg-[#1A1A1A] border-2 border-[#ADFF6C] rounded-lg overflow-hidden transform transition-all hover:-translate-y-1 relative">
              <div className="absolute top-0 right-0 bg-[#ADFF6C] text-[#1A1A1A] px-4 py-1 font-['Outfit'] font-bold text-sm">
                Most Popular
              </div>
              <div className="bg-[#ADFF6C]/20 p-6">
                <h3 className="text-2xl font-['Outfit'] font-bold mb-2">Basic Security Setup</h3>
                <div className="flex items-baseline">
                  <span className="text-4xl font-['Outfit'] font-bold">$599</span>
                </div>
                <p className="text-[#F5F5F5]/70 mt-2">One-time service</p>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <p className="text-sm text-[#F5F5F5]/70 mb-2">What It Is:</p>
                  <p>A one-time service to install and configure essential tools like antivirus software, password managers, and two-factor authentication (2FA) on up to 5 devices.</p>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-[#F5F5F5]/70 mb-2">Why It Matters:</p>
                  <p>Many small businesses lack these basics—HackSnub makes it hassle-free.</p>
                </div>
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
            
            {/* Service 3: Phishing Simulation */}
            <div className="bg-[#1A1A1A] border border-[#ADFF6C]/20 rounded-lg overflow-hidden transform transition-all hover:-translate-y-1">
              <div className="bg-[#ADFF6C]/10 p-6">
                <h3 className="text-2xl font-['Outfit'] font-bold mb-2">Phishing Simulation</h3>
                <div className="flex items-baseline">
                  <span className="text-4xl font-['Outfit'] font-bold">$199</span>
                </div>
                <p className="text-[#F5F5F5]/70 mt-2">Per test (up to 10 employees)</p>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <p className="text-sm text-[#F5F5F5]/70 mb-2">What It Is:</p>
                  <p>Send fake phishing emails to test employees, then provide a 1-hour debrief with tips to improve.</p>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-[#F5F5F5]/70 mb-2">Why It Matters:</p>
                  <p>Real-world practice helps employees spot threats.</p>
                </div>
                <div className="mt-8">
                  <a 
                    href="#contact" 
                    className="block text-center bg-[#5FD35F] hover:bg-[#ADFF6C] text-[#1A1A1A] font-['Outfit'] font-bold py-3 px-6 rounded-md transition-colors"
                  >
                    Book Test
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bundle and Subscription */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {/* Bundle */}
            <div className="bg-[#1A1A1A] border border-[#ADFF6C]/30 rounded-lg overflow-hidden transform transition-all hover:-translate-y-1">
              <div className="bg-[#ADFF6C]/15 p-6">
                <h3 className="text-2xl font-['Outfit'] font-bold mb-2">HackSnub Starter Kit</h3>
                <div className="flex items-baseline">
                  <span className="text-4xl font-['Outfit'] font-bold">$999</span>
                  <span className="ml-3 px-2 py-1 bg-[#ADFF6C] text-[#1A1A1A] text-xs font-bold rounded">Save 15%</span>
                </div>
                <p className="text-[#F5F5F5]/70 mt-2">Complete bundle</p>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <p className="text-sm text-[#F5F5F5]/70 mb-2">What It Is:</p>
                  <p>Combines Training, Security Setup, and Phishing Simulation at a discount.</p>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-[#F5F5F5]/70 mb-2">Why It Matters:</p>
                  <p>A one-stop solution to kickstart cybersecurity.</p>
                </div>
                <div className="mt-8">
                  <a 
                    href="#contact" 
                    className="block text-center bg-[#ADFF6C] hover:bg-[#5FD35F] text-[#1A1A1A] font-['Outfit'] font-bold py-3 px-6 rounded-md transition-colors"
                  >
                    Get Bundle
                  </a>
                </div>
              </div>
            </div>
            
            {/* Ongoing Support */}
            <div className="bg-[#1A1A1A] border border-[#ADFF6C]/20 rounded-lg overflow-hidden transform transition-all hover:-translate-y-1">
              <div className="bg-[#ADFF6C]/10 p-6">
                <h3 className="text-2xl font-['Outfit'] font-bold mb-2">Ongoing Support</h3>
                <div className="flex items-baseline">
                  <span className="text-4xl font-['Outfit'] font-bold">$99</span>
                  <span className="ml-2 text-[#F5F5F5]/70">/month</span>
                </div>
                <p className="text-[#F5F5F5]/70 mt-2">First month free with Starter Kit</p>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <p className="text-sm text-[#F5F5F5]/70 mb-2">What It Is:</p>
                  <p>Monthly check-ins, quarterly phishing tests, and priority support.</p>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-[#F5F5F5]/70 mb-2">Why It Matters:</p>
                  <p>Cybersecurity needs regular upkeep—this keeps clients protected long-term.</p>
                </div>
                <div className="mt-8">
                  <a 
                    href="#contact" 
                    className="block text-center bg-[#5FD35F] hover:bg-[#ADFF6C] text-[#1A1A1A] font-['Outfit'] font-bold py-3 px-6 rounded-md transition-colors"
                  >
                    Subscribe
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
