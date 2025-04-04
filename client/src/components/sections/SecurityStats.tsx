export default function SecurityStats() {
  return (
    <section className="py-16 bg-gradient-to-b from-[#1A1A1A] to-[#1A1A1A]/90 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="h-full w-full opacity-5">
          {/* Binary code background effect */}
          <div className="font-['JetBrains_Mono'] text-xs text-[#ADFF6C]/20 leading-none select-none">
            01001000 01100001 01100011 01101011 01010011 01101110 01110101 01100010 00100000 01110000 01110010 01101111 01110100 01100101 01100011 01110100 01110011 00100000 01111001 01101111 01110101 01110010 00100000 01100010 01110101 01110011 01101001 01101110 01100101 01110011 01110011 00100000 01100110 01110010 01101111 01101101 00100000 01110100 01101000 01110010 01100101 01100001 01110100 01110011 00100000 01101100 01101001 01101011 01100101 00100000 01110000 01101000 01101001 01110011 01101000 01101001 01101110 01100111 00101100 00100000 01110010 01100001 01101110 01110011 01101111 01101101 01110111 01100001 01110010 01100101 00101100 00100000 01100001 01101110 01100100 00100000 01101000 01100001 01100011 01101011 01100101 01110010 01110011
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Stat 1 */}
          <div className="bg-[#1A1A1A]/70 backdrop-blur-sm border-l-4 border-[#FFD050] p-6 rounded-r-lg">
            <div className="flex flex-col">
              <span className="text-4xl font-['Outfit'] font-black text-[#FFD050] mb-2">60%</span>
              <p className="text-[#F5F5F5]/80">of small businesses go bankrupt within 6 months of a cyber attack.</p>
            </div>
          </div>
          
          {/* Stat 2 */}
          <div className="bg-[#1A1A1A]/70 backdrop-blur-sm border-l-4 border-[#FFD050] p-6 rounded-r-lg">
            <div className="flex flex-col">
              <span className="text-4xl font-['Outfit'] font-black text-[#FFD050] mb-2">$200k+</span>
              <p className="text-[#F5F5F5]/80">average cost of a data breach for small businesses in 2023.</p>
            </div>
          </div>
          
          {/* Stat 3 */}
          <div className="bg-[#1A1A1A]/70 backdrop-blur-sm border-l-4 border-[#FFD050] p-6 rounded-r-lg">
            <div className="flex flex-col">
              <span className="text-4xl font-['Outfit'] font-black text-[#FFD050] mb-2">95%</span>
              <p className="text-[#F5F5F5]/80">of cybersecurity breaches are caused by human error.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
