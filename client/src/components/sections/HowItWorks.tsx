export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-['Outfit'] font-bold mb-4">How It <span className="text-[#ADFF6C]">Works</span></h2>
          <p className="text-xl max-w-2xl mx-auto">Three simple steps to secure your business.</p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="absolute top-0 left-0 -mt-2 -ml-2 w-12 h-12 rounded-full bg-[#ADFF6C] text-[#1A1A1A] flex items-center justify-center font-['Outfit'] font-bold text-xl z-10">1</div>
              <div className="bg-[#1A1A1A]/50 backdrop-blur-sm rounded-lg p-8 pt-12 border border-[#ADFF6C]/20 h-full">
                <h3 className="text-xl font-['Outfit'] font-bold mb-4">Sign Up</h3>
                <p className="mb-4">Book your free "Snub Checkup" — a 30-minute security assessment for your business.</p>
                <div className="flex items-center">
                  <span className="text-[#ADFF6C] mr-2"><i className="fas fa-clipboard-check"></i></span>
                  <span>No technical knowledge required</span>
                </div>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="relative">
              <div className="absolute top-0 left-0 -mt-2 -ml-2 w-12 h-12 rounded-full bg-[#ADFF6C] text-[#1A1A1A] flex items-center justify-center font-['Outfit'] font-bold text-xl z-10">2</div>
              <div className="bg-[#1A1A1A]/50 backdrop-blur-sm rounded-lg p-8 pt-12 border border-[#ADFF6C]/20 h-full">
                <h3 className="text-xl font-['Outfit'] font-bold mb-4">Get Your Snub Plan</h3>
                <p className="mb-4">Receive a custom security plan tailored to your specific business needs.</p>
                <div className="flex items-center">
                  <span className="text-[#ADFF6C] mr-2"><i className="fas fa-shield-alt"></i></span>
                  <span>Clear action steps, no geek-speak</span>
                </div>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="relative">
              <div className="absolute top-0 left-0 -mt-2 -ml-2 w-12 h-12 rounded-full bg-[#ADFF6C] text-[#1A1A1A] flex items-center justify-center font-['Outfit'] font-bold text-xl z-10">3</div>
              <div className="bg-[#1A1A1A]/50 backdrop-blur-sm rounded-lg p-8 pt-12 border border-[#ADFF6C]/20 h-full">
                <h3 className="text-xl font-['Outfit'] font-bold mb-4">Kick Hackers Out</h3>
                <p className="mb-4">We implement your security plan and train your team to recognize threats.</p>
                <div className="flex items-center">
                  <span className="text-[#ADFF6C] mr-2"><i className="fas fa-user-shield"></i></span>
                  <span>Ongoing protection and updates</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <a 
              href="#contact" 
              className="inline-block bg-[#5FD35F] hover:bg-[#ADFF6C] text-[#1A1A1A] font-['Outfit'] font-bold py-3 px-8 rounded-md transition-colors"
            >
              Get Your Free Snub Checkup
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
