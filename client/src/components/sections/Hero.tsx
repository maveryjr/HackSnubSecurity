export default function Hero() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-[#ADFF6C]/10 to-[#5FD35F]/10"></div>
        <div className="grid grid-cols-8 grid-rows-8 h-full w-full opacity-10">
          <div className="col-span-full row-span-full border border-[#ADFF6C]/30"></div>
          {/* Grid decoration lines */}
          <div className="col-span-1 col-start-2 row-span-full bg-[#ADFF6C]/5"></div>
          <div className="col-span-1 col-start-4 row-span-full bg-[#ADFF6C]/5"></div>
          <div className="col-span-1 col-start-6 row-span-full bg-[#ADFF6C]/5"></div>
          <div className="row-span-1 row-start-2 col-span-full bg-[#ADFF6C]/5"></div>
          <div className="row-span-1 row-start-4 col-span-full bg-[#ADFF6C]/5"></div>
          <div className="row-span-1 row-start-6 col-span-full bg-[#ADFF6C]/5"></div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-['Outfit'] font-black mb-6 leading-tight">
            Hackers hate us. <span className="text-[#ADFF6C]">You'll love us.</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-['Outfit']">
            Cybersecurity made simple, affordable, and built for small businesses.
          </p>
          
          <div className="inline-block px-4 py-2 rounded-md bg-[#FFD050]/20 text-[#FFD050] mb-10">
            <span className="font-['JetBrains_Mono'] text-sm md:text-base">
              <i className="fas fa-exclamation-triangle mr-2"></i>
              43% of cyberattacks target SMBs—snub 'em with HackSnub.
            </span>
          </div>
          
          <div>
            <a 
              href="#contact" 
              className="inline-block bg-[#ADFF6C] hover:bg-[#5FD35F] text-[#1A1A1A] font-['Outfit'] font-bold text-lg py-3 px-8 rounded-md transition-colors"
            >
              Book Your Free Snub Checkup
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
