import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  company: z.string().min(1, { message: "Company name is required." }),
  employees: z.string(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      employees: "1-5",
    },
  });

  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/leads", data);
      
      toast({
        title: "Success!",
        description: "Thanks for your interest! We'll contact you shortly to schedule your free Snub Checkup.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: "Please try again later or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="py-20 bg-[#1A1A1A]">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-['Outfit'] font-bold mb-6">Book Your Free <span className="text-[#ADFF6C]">Snub Checkup</span></h2>
              <p className="text-xl mb-8">Take the first step to secure your business against cyber threats. No commitment, no technical jargon—just practical security advice.</p>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div className="bg-[#ADFF6C]/10 p-3 rounded-full mr-4">
                    <i className="fas fa-clock text-[#ADFF6C]"></i>
                  </div>
                  <div>
                    <h3 className="font-['Outfit'] font-bold text-lg mb-1">30-Minute Assessment</h3>
                    <p>A focused security check-up for your business.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#ADFF6C]/10 p-3 rounded-full mr-4">
                    <i className="fas fa-file-alt text-[#ADFF6C]"></i>
                  </div>
                  <div>
                    <h3 className="font-['Outfit'] font-bold text-lg mb-1">Custom Security Report</h3>
                    <p>Get actionable insights specific to your business.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#ADFF6C]/10 p-3 rounded-full mr-4">
                    <i className="fas fa-hand-holding-heart text-[#ADFF6C]"></i>
                  </div>
                  <div>
                    <h3 className="font-['Outfit'] font-bold text-lg mb-1">No Obligation</h3>
                    <p>No pushy sales tactics, just helpful expertise.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-[#1A1A1A]/40 backdrop-blur-sm border border-[#ADFF6C]/20 rounded-lg p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-['Outfit'] font-bold">Full Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your name" 
                            {...field} 
                            className="bg-[#1A1A1A] border border-[#ADFF6C]/30 focus:border-[#ADFF6C] rounded-md py-3 px-4 text-[#F5F5F5]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-['Outfit'] font-bold">Email Address</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="you@company.com" 
                            type="email" 
                            {...field} 
                            className="bg-[#1A1A1A] border border-[#ADFF6C]/30 focus:border-[#ADFF6C] rounded-md py-3 px-4 text-[#F5F5F5]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-['Outfit'] font-bold">Phone Number</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="(123) 456-7890" 
                            type="tel" 
                            {...field} 
                            className="bg-[#1A1A1A] border border-[#ADFF6C]/30 focus:border-[#ADFF6C] rounded-md py-3 px-4 text-[#F5F5F5]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-['Outfit'] font-bold">Business Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your company" 
                            {...field} 
                            className="bg-[#1A1A1A] border border-[#ADFF6C]/30 focus:border-[#ADFF6C] rounded-md py-3 px-4 text-[#F5F5F5]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="employees"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-['Outfit'] font-bold">Number of Employees</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-[#1A1A1A] border border-[#ADFF6C]/30 focus:border-[#ADFF6C] rounded-md py-3 px-4 text-[#F5F5F5]">
                              <SelectValue placeholder="Select employee count" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-[#1A1A1A] border border-[#ADFF6C]/30">
                            <SelectItem value="1-5">1-5</SelectItem>
                            <SelectItem value="6-10">6-10</SelectItem>
                            <SelectItem value="11-25">11-25</SelectItem>
                            <SelectItem value="26-50">26-50</SelectItem>
                            <SelectItem value="51+">51+</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-[#ADFF6C] hover:bg-[#5FD35F] text-[#1A1A1A] font-['Outfit'] font-bold py-3 px-6 rounded-md transition-colors"
                  >
                    {isSubmitting ? "Submitting..." : "Book Your Free Checkup"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
