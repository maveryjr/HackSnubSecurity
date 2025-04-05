import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useLocation } from "wouter";
import { assessmentResponseSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { ShieldCheck, Lock, Server, Key, FileCheck, Clock, User, AlertTriangle } from "lucide-react";

// Extend the base schema for the form
const formSchema = assessmentResponseSchema.extend({
  // Add custom validation if needed
});

type FormData = z.infer<typeof formSchema>;

// Define the question structure for better type safety
type Question = {
  id: string;
  category: string;
  question: string;
  description?: string;
  type: "radio" | "checkbox" | "range";
  options?: { value: any; label: string }[];
  icon?: React.ReactNode;
};

export default function Assessment() {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [assessmentResult, setAssessmentResult] = useState<{ score: number; recommendations: any[] } | null>(null);
  const [_, setLocation] = useLocation();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      company: "",
      companySize: "",
      industry: "",
      responses: {},
    },
  });

  // Define the questions for the assessment
  const sections = [
    // Initial contact information
    {
      title: "About Your Business",
      description: "Let us know about your organization",
      questions: [] as Question[],
      isContactInfo: true,
    },
    // Password & Authentication
    {
      title: "Password & Authentication",
      description: "Assess your organization's password policies and authentication methods",
      questions: [
        {
          id: "passwordPolicy",
          category: "authentication",
          question: "Does your organization have a formal password policy?",
          description: "A password policy defines requirements for password complexity, expiration, and reuse.",
          type: "radio",
          options: [
            { value: true, label: "Yes" },
            { value: false, label: "No" },
          ],
          icon: <Lock className="w-5 h-5 text-lime-500" />,
        },
        {
          id: "passwordLength",
          category: "authentication",
          question: "What is the minimum password length required?",
          type: "radio",
          options: [
            { value: 1, label: "Less than 8 characters" },
            { value: 2, label: "8-11 characters" },
            { value: 4, label: "12 or more characters" },
          ],
          icon: <Key className="w-5 h-5 text-lime-500" />,
        },
        {
          id: "twoFactor",
          category: "authentication",
          question: "Do you use two-factor authentication for critical systems?",
          description: "Two-factor authentication adds an extra layer of security beyond passwords.",
          type: "radio",
          options: [
            { value: true, label: "Yes" },
            { value: false, label: "No" },
          ],
          icon: <ShieldCheck className="w-5 h-5 text-lime-500" />,
        },
      ],
    },
    // Data Security
    {
      title: "Data Security",
      description: "Evaluate how your organization protects sensitive data",
      questions: [
        {
          id: "dataEncryption",
          category: "data",
          question: "Is sensitive data encrypted at rest and in transit?",
          description: "Encryption helps protect data from unauthorized access.",
          type: "radio",
          options: [
            { value: true, label: "Yes" },
            { value: false, label: "No" },
          ],
          icon: <Lock className="w-5 h-5 text-lime-500" />,
        },
        {
          id: "dataAccess",
          category: "data",
          question: "Do you have a formal process for granting and revoking access to sensitive data?",
          type: "radio",
          options: [
            { value: true, label: "Yes" },
            { value: false, label: "No" },
          ],
          icon: <Server className="w-5 h-5 text-lime-500" />,
        },
      ],
    },
    // Infrastructure Security
    {
      title: "Infrastructure Security",
      description: "Assess the security of your technical infrastructure",
      questions: [
        {
          id: "firewallEnabled",
          category: "network",
          question: "Do you have a properly configured firewall?",
          type: "radio",
          options: [
            { value: true, label: "Yes" },
            { value: false, label: "No" },
          ],
          icon: <Server className="w-5 h-5 text-lime-500" />,
        },
        {
          id: "softwareUpdates",
          category: "patching",
          question: "How frequently do you apply security patches and updates?",
          type: "radio",
          options: [
            { value: 1, label: "Rarely or never" },
            { value: 2, label: "When convenient" },
            { value: 3, label: "Monthly" },
            { value: 5, label: "As soon as available" },
          ],
          icon: <FileCheck className="w-5 h-5 text-lime-500" />,
        },
        {
          id: "backupSolution",
          category: "backup",
          question: "How would you rate your backup and recovery solution?",
          type: "radio",
          options: [
            { value: 1, label: "Non-existent or minimal" },
            { value: 2, label: "Basic but inconsistent" },
            { value: 3, label: "Regular backups, untested recovery" },
            { value: 5, label: "Comprehensive with tested recovery plan" },
          ],
          icon: <Clock className="w-5 h-5 text-lime-500" />,
        },
      ],
    },
    // Security Practices
    {
      title: "Security Practices",
      description: "Evaluate your organization's security culture and procedures",
      questions: [
        {
          id: "securityTraining",
          category: "training",
          question: "How often do employees receive security awareness training?",
          type: "radio",
          options: [
            { value: 0, label: "Never" },
            { value: 1, label: "During onboarding only" },
            { value: 3, label: "Annually" },
            { value: 5, label: "Quarterly or more frequently" },
          ],
          icon: <User className="w-5 h-5 text-lime-500" />,
        },
        {
          id: "incidentResponse",
          category: "incident",
          question: "Do you have a documented security incident response plan?",
          description: "A formal plan outlines how to respond to security breaches.",
          type: "radio",
          options: [
            { value: true, label: "Yes" },
            { value: false, label: "No" },
          ],
          icon: <AlertTriangle className="w-5 h-5 text-lime-500" />,
        },
      ],
    },
  ];

  const totalSteps = sections.length;
  const currentSection = sections[step];
  const progress = (step / totalSteps) * 100;

  // Handle form submission
  const onSubmit = async (data: FormData) => {
    // If not on the final step, move to the next step
    if (step < totalSteps - 1) {
      setStep(step + 1);
      return;
    }

    // Final submission
    setIsSubmitting(true);
    try {
      const result = await apiRequest("POST", "/api/assessments", data);
      
      const responseData = await result.json();
      
      setAssessmentResult({
        score: responseData.data.score,
        recommendations: responseData.recommendations || [],
      });
      
      toast({
        title: "Assessment Complete!",
        description: "Your security assessment has been submitted successfully.",
      });
    } catch (error) {
      console.error("Error submitting assessment:", error);
      toast({
        title: "Submission Error",
        description: "There was a problem submitting your assessment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Navigate to previous step
  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  // Get score color based on value
  const getScoreColor = (score: number) => {
    if (score < 40) return "bg-red-500";
    if (score < 70) return "bg-yellow-500";
    return "bg-green-500";
  };

  // Get severity badge color
  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-blue-500";
    }
  };

  // Render assessment results
  if (assessmentResult) {
    return (
      <div className="container max-w-4xl mx-auto py-8 px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Your Security Assessment Results</CardTitle>
            <CardDescription>
              Based on your responses, here's how your organization's security measures up
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-2">Security Score</h3>
              <div className="flex items-center space-x-4">
                <div
                  className={cn(
                    "w-24 h-24 rounded-full flex items-center justify-center text-white font-bold text-2xl",
                    getScoreColor(assessmentResult.score)
                  )}
                >
                  {assessmentResult.score}%
                </div>
                <div>
                  <p className="text-sm">
                    {assessmentResult.score < 40
                      ? "Your security posture needs significant improvement"
                      : assessmentResult.score < 70
                      ? "Your security is average but there's room for improvement"
                      : "Your security posture is strong, but continued vigilance is needed"}
                  </p>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            <div>
              <h3 className="text-lg font-medium mb-4">Key Recommendations</h3>
              <div className="space-y-4">
                {assessmentResult.recommendations && assessmentResult.recommendations.length > 0 ? (
                  assessmentResult.recommendations.map((rec: any, index: number) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">{rec.recommendation}</h4>
                          <p className="text-sm text-gray-600 mt-1">{rec.implementationDetails}</p>
                        </div>
                        <span
                          className={cn(
                            "px-2 py-1 text-xs rounded text-white uppercase",
                            getSeverityColor(rec.severity)
                          )}
                        >
                          {rec.severity}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No specific recommendations at this time.</p>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => {
                setLocation("/");
              }}
            >
              Return to Home
            </Button>
            <Button
              onClick={() => {
                setLocation("/contact");
              }}
            >
              Schedule a Consultation
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-3xl mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle>HackSnub Security Assessment</CardTitle>
          <CardDescription>
            Complete this short assessment to evaluate your organization's security posture
          </CardDescription>
          <Progress value={progress} className="h-2 mt-4" />
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <h2 className="text-xl font-semibold">{currentSection.title}</h2>
            <p className="text-sm text-gray-500">{currentSection.description}</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {currentSection.isContactInfo ? (
                // Contact information fields
                <>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="your.email@company.com" {...field} />
                        </FormControl>
                        <FormDescription>
                          We'll send your assessment results to this email
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Company" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="companySize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Size</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select company size" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1-10">1-10 employees</SelectItem>
                            <SelectItem value="11-50">11-50 employees</SelectItem>
                            <SelectItem value="51-200">51-200 employees</SelectItem>
                            <SelectItem value="201-500">201-500 employees</SelectItem>
                            <SelectItem value="501+">501+ employees</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="industry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Industry</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your industry" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="technology">Technology</SelectItem>
                            <SelectItem value="healthcare">Healthcare</SelectItem>
                            <SelectItem value="finance">Finance & Banking</SelectItem>
                            <SelectItem value="retail">Retail</SelectItem>
                            <SelectItem value="manufacturing">Manufacturing</SelectItem>
                            <SelectItem value="education">Education</SelectItem>
                            <SelectItem value="government">Government</SelectItem>
                            <SelectItem value="nonprofit">Nonprofit</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              ) : (
                // Assessment questions
                <div className="space-y-8">
                  {currentSection.questions.map((question) => {
                    // For radio button questions
                    if (question.type === "radio") {
                      return (
                        <FormField
                          key={question.id}
                          control={form.control}
                          name={`responses.${question.id}`}
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <div className="flex items-center space-x-2">
                                {question.icon}
                                <FormLabel className="text-base">{question.question}</FormLabel>
                              </div>
                              
                              {question.description && (
                                <FormDescription>{question.description}</FormDescription>
                              )}
                              
                              <FormControl>
                                <RadioGroup
                                  onValueChange={(value) => {
                                    // Convert string "true"/"false" to boolean if needed
                                    if (value === "true") field.onChange(true);
                                    else if (value === "false") field.onChange(false);
                                    // Convert to number if it's a numeric string
                                    else if (!isNaN(Number(value))) field.onChange(Number(value));
                                    else field.onChange(value);
                                  }}
                                  defaultValue={field.value?.toString()}
                                  className="space-y-1"
                                >
                                  {question.options?.map((option) => (
                                    <FormItem
                                      key={option.value.toString()}
                                      className="flex items-center space-x-3 space-y-0"
                                    >
                                      <FormControl>
                                        <RadioGroupItem value={option.value.toString()} />
                                      </FormControl>
                                      <FormLabel className="font-normal">{option.label}</FormLabel>
                                    </FormItem>
                                  ))}
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      );
                    }
                    
                    // For checkbox questions
                    if (question.type === "checkbox") {
                      return (
                        <FormField
                          key={question.id}
                          control={form.control}
                          name={`responses.${question.id}`}
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>{question.question}</FormLabel>
                                {question.description && (
                                  <FormDescription>{question.description}</FormDescription>
                                )}
                              </div>
                            </FormItem>
                          )}
                        />
                      );
                    }
                    
                    return null;
                  })}
                </div>
              )}

              <div className="flex justify-between pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={step === 0}
                >
                  Previous
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {step === totalSteps - 1 ? "Submit Assessment" : "Continue"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}