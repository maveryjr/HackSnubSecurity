export default function Testimonials() {
  return (
    <section className="py-20 bg-gradient-to-b from-[#1A1A1A]/90 to-[#1A1A1A]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-['Outfit'] font-bold mb-4">What Our Clients <span className="text-[#ADFF6C]">Say</span></h2>
          <p className="text-xl max-w-2xl mx-auto">Small businesses just like yours are already sleeping better at night.</p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-[#1A1A1A]/50 backdrop-blur-sm border border-[#ADFF6C]/20 rounded-lg p-8">
              <div className="flex items-center mb-4">
                <div className="text-[#ADFF6C] text-2xl">
                  <i className="fas fa-quote-left"></i>
                </div>
              </div>
              <p className="mb-6 text-lg italic">"HackSnub made security something I finally understand—and actually use. Their team took the time to explain everything in terms I could grasp."</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[#ADFF6C]/20 rounded-full flex items-center justify-center mr-4">
                  <span className="text-[#ADFF6C] font-bold">MJ</span>
                </div>
                <div>
                  <h4 className="font-['Outfit'] font-bold">Marcus Johnson</h4>
                  <p className="text-[#F5F5F5]/70 text-sm">Gym Owner</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-[#1A1A1A]/50 backdrop-blur-sm border border-[#ADFF6C]/20 rounded-lg p-8">
              <div className="flex items-center mb-4">
                <div className="text-[#ADFF6C] text-2xl">
                  <i className="fas fa-quote-left"></i>
                </div>
              </div>
              <p className="mb-6 text-lg italic">"After a ransomware scare, I knew we needed help. HackSnub's flat-fee pricing and jargon-free approach was exactly what we needed to get protected."</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[#ADFF6C]/20 rounded-full flex items-center justify-center mr-4">
                  <span className="text-[#ADFF6C] font-bold">SR</span>
                </div>
                <div>
                  <h4 className="font-['Outfit'] font-bold">Sarah Rodriguez</h4>
                  <p className="text-[#F5F5F5]/70 text-sm">Dental Practice Manager</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-[#1A1A1A]/50 backdrop-blur-sm border border-[#ADFF6C]/20 rounded-lg p-8">
              <div className="flex items-center mb-4">
                <div className="text-[#ADFF6C] text-2xl">
                  <i className="fas fa-quote-left"></i>
                </div>
              </div>
              <p className="mb-6 text-lg italic">"The training HackSnub provided for my team was engaging and practical. For the first time, my employees actually care about security."</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[#ADFF6C]/20 rounded-full flex items-center justify-center mr-4">
                  <span className="text-[#ADFF6C] font-bold">DP</span>
                </div>
                <div>
                  <h4 className="font-['Outfit'] font-bold">David Park</h4>
                  <p className="text-[#F5F5F5]/70 text-sm">Retail Store Owner</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 4 */}
            <div className="bg-[#1A1A1A]/50 backdrop-blur-sm border border-[#ADFF6C]/20 rounded-lg p-8">
              <div className="flex items-center mb-4">
                <div className="text-[#ADFF6C] text-2xl">
                  <i className="fas fa-quote-left"></i>
                </div>
              </div>
              <p className="mb-6 text-lg italic">"As a law firm, we handle sensitive data daily. HackSnub didn't just secure our systems—they helped us meet compliance requirements too."</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[#ADFF6C]/20 rounded-full flex items-center justify-center mr-4">
                  <span className="text-[#ADFF6C] font-bold">JM</span>
                </div>
                <div>
                  <h4 className="font-['Outfit'] font-bold">Jennifer Miller</h4>
                  <p className="text-[#F5F5F5]/70 text-sm">Attorney</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
