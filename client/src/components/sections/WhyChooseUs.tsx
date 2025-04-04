export default function WhyChooseUs() {
  return (
    <section id="why-us" className="py-20 bg-[#1A1A1A]/80">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-['Outfit'] font-bold mb-4">Why Choose <span className="text-[#ADFF6C]">HackSnub</span>?</h2>
          <p className="text-xl max-w-2xl mx-auto">We understand small businesses need big security without the complexity.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Feature 1 */}
          <div className="bg-[#1A1A1A] border border-[#ADFF6C]/20 rounded-lg p-8 transform transition-all hover:border-[#ADFF6C] hover:-translate-y-1">
            <div className="w-16 h-16 bg-[#ADFF6C]/10 rounded-full flex items-center justify-center mb-6 mx-auto">
              <i className="fas fa-graduation-cap text-2xl text-[#ADFF6C]"></i>
            </div>
            <h3 className="text-xl font-['Outfit'] font-bold mb-4 text-center">No IT degree required</h3>
            <p className="text-center">We translate complex security concepts into plain English you can actually use.</p>
          </div>
          
          {/* Feature 2 */}
          <div className="bg-[#1A1A1A] border border-[#ADFF6C]/20 rounded-lg p-8 transform transition-all hover:border-[#ADFF6C] hover:-translate-y-1">
            <div className="w-16 h-16 bg-[#ADFF6C]/10 rounded-full flex items-center justify-center mb-6 mx-auto">
              <i className="fas fa-dollar-sign text-2xl text-[#ADFF6C]"></i>
            </div>
            <h3 className="text-xl font-['Outfit'] font-bold mb-4 text-center">Flat-fee pricing, no surprises</h3>
            <p className="text-center">Know exactly what you're paying upfront. No hidden fees or unexpected charges.</p>
          </div>
          
          {/* Feature 3 */}
          <div className="bg-[#1A1A1A] border border-[#ADFF6C]/20 rounded-lg p-8 transform transition-all hover:border-[#ADFF6C] hover:-translate-y-1">
            <div className="w-16 h-16 bg-[#ADFF6C]/10 rounded-full flex items-center justify-center mb-6 mx-auto">
              <i className="fas fa-brain text-2xl text-[#ADFF6C]"></i>
            </div>
            <h3 className="text-xl font-['Outfit'] font-bold mb-4 text-center">Training that actually sticks</h3>
            <p className="text-center">Our security training is practical, memorable, and won't put your team to sleep.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
