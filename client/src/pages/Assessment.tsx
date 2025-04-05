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
import { ShieldCheck, Lock, Server, Key, FileCheck, Clock, User, AlertTriangle, ArrowLeft, ArrowRight, Loader2 } from "lucide-react";

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
  description?: string; // Make description optional
  type: string; // Use string instead of enum to accommodate all possible values
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
        {
          id: "securityPolicies",
          category: "policy",
          question: "Which security policies does your organization have documented?",
          description: "Select all that apply to your organization.",
          type: "checkbox",
          options: [
            { value: "acceptable_use", label: "Acceptable Use Policy" },
            { value: "data_protection", label: "Data Protection Policy" },
            { value: "byod", label: "Bring Your Own Device (BYOD) Policy" },
            { value: "remote_work", label: "Remote Work Security Policy" },
            { value: "disaster_recovery", label: "Disaster Recovery Plan" },
          ],
          icon: <FileCheck className="w-5 h-5 text-lime-500" />,
        },
      ],
    },
    // Compliance and Risk
    {
      title: "Compliance and Risk Management",
      description: "Assess your compliance posture and risk management practices",
      questions: [
        {
          id: "riskAssessment",
          category: "risk",
          question: "How often does your organization perform security risk assessments?",
          type: "radio",
          options: [
            { value: 0, label: "Never" },
            { value: 1, label: "Only when required by clients/partners" },
            { value: 3, label: "Annually" },
            { value: 5, label: "Quarterly or more frequently" },
          ],
          icon: <AlertTriangle className="w-5 h-5 text-lime-500" />,
        },
        {
          id: "thirdPartyRisk",
          category: "vendor",
          question: "Do you assess the security of your vendors and third-party providers?",
          description: "This includes reviewing their security practices before engagement.",
          type: "radio",
          options: [
            { value: true, label: "Yes" },
            { value: false, label: "No" },
          ],
          icon: <User className="w-5 h-5 text-lime-500" />,
        },
        {
          id: "complianceFrameworks",
          category: "compliance",
          question: "Which compliance frameworks does your organization follow?",
          description: "Select all that apply to your organization.",
          type: "checkbox",
          options: [
            { value: "pci_dss", label: "PCI DSS" },
            { value: "hipaa", label: "HIPAA" },
            { value: "gdpr", label: "GDPR" },
            { value: "ccpa", label: "CCPA/CPRA" },
            { value: "soc2", label: "SOC 2" },
            { value: "iso27001", label: "ISO 27001" },
            { value: "none", label: "None" },
          ],
          icon: <FileCheck className="w-5 h-5 text-lime-500" />,
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
      
      // Fetch assessment details including recommendations
      const assessmentId = responseData.data.assessment.id;
      try {
        const assessmentResult = await apiRequest("GET", `/api/assessments/${assessmentId}`);
        const assessmentData = await assessmentResult.json();
        
        setAssessmentResult({
          score: responseData.data.score,
          recommendations: assessmentData.recommendations || [],
        });
      } catch (error) {
        console.error("Error fetching assessment details:", error);
        setAssessmentResult({
          score: responseData.data.score,
          recommendations: [],
        });
      }
      
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
        <Card className="overflow-hidden border-0 shadow-lg">
          <div className="bg-[#1A1A1A] p-6 text-center">
            <h1 className="text-3xl font-bold text-[#ADFF6C] mb-2">Your Security Assessment Results</h1>
            <p className="text-gray-300">
              Based on your responses, here's how your organization's security measures up
            </p>
          </div>
          <CardContent className="p-6">
            <div className="mb-8 bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Security Score</h3>
              <div className="flex flex-col md:flex-row items-center md:space-x-8">
                <div
                  className={cn(
                    "w-32 h-32 rounded-full flex items-center justify-center text-white font-bold text-3xl mb-4 md:mb-0 shadow-md transition-all duration-500 animate-pulse",
                    getScoreColor(assessmentResult.score)
                  )}
                >
                  {assessmentResult.score}%
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold mb-2">
                    {assessmentResult.score < 40
                      ? "High Risk"
                      : assessmentResult.score < 70
                      ? "Moderate Risk"
                      : "Low Risk"}
                  </h4>
                  <p className="text-gray-700">
                    {assessmentResult.score < 40
                      ? "Your security posture needs significant improvement. We recommend addressing the high-priority issues immediately to reduce your cybersecurity risk."
                      : assessmentResult.score < 70
                      ? "Your security is average but there's room for improvement. Focus on the recommendations below to strengthen your security posture."
                      : "Your security posture is strong, but continued vigilance is needed. Even with a good score, regular security reviews are essential."}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                <h4 className="font-medium flex items-center text-red-800">
                  <AlertTriangle className="w-5 h-5 mr-2 text-red-500" />
                  High Priority
                </h4>
                <p className="text-sm text-gray-700 mt-1">
                  Issues that require immediate attention due to significant security risks
                </p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                <h4 className="font-medium flex items-center text-yellow-800">
                  <AlertTriangle className="w-5 h-5 mr-2 text-yellow-500" />
                  Medium Priority
                </h4>
                <p className="text-sm text-gray-700 mt-1">
                  Issues that should be addressed in the near future to improve security
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <h4 className="font-medium flex items-center text-green-800">
                  <ShieldCheck className="w-5 h-5 mr-2 text-green-500" />
                  Low Priority
                </h4>
                <p className="text-sm text-gray-700 mt-1">
                  Suggestions that will further enhance your already good security posture
                </p>
              </div>
            </div>

            <Separator className="my-8" />

            <div>
              <h3 className="text-xl font-bold mb-6 text-gray-800">Custom Security Recommendations</h3>
              <div className="space-y-6">
                {assessmentResult.recommendations && assessmentResult.recommendations.length > 0 ? (
                  assessmentResult.recommendations.map((rec: any, index: number) => (
                    <div 
                      key={index} 
                      className={cn(
                        "border rounded-lg p-5 shadow-sm transition-all duration-300 hover:shadow-md",
                        rec.severity.toLowerCase() === "high" ? "border-l-4 border-l-red-500" :
                        rec.severity.toLowerCase() === "medium" ? "border-l-4 border-l-yellow-500" :
                        "border-l-4 border-l-green-500"
                      )}
                    >
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg">{rec.recommendation}</h4>
                          <p className="text-gray-600 mt-2">{rec.implementationDetails}</p>
                          
                          {rec.benefits && (
                            <div className="mt-3">
                              <h5 className="text-sm font-medium text-gray-700">Benefits:</h5>
                              <p className="text-sm text-gray-600 mt-1">{rec.benefits}</p>
                            </div>
                          )}
                        </div>
                        <div className="md:text-right">
                          <span
                            className={cn(
                              "px-3 py-1 text-sm rounded-full text-white uppercase inline-block font-medium",
                              getSeverityColor(rec.severity)
                            )}
                          >
                            {rec.severity}
                          </span>
                          
                          {rec.estimatedCost && (
                            <div className="mt-2 text-sm text-gray-600">
                              <span className="font-medium">Est. Cost: </span>
                              {rec.estimatedCost}
                            </div>
                          )}
                          
                          {rec.timeframe && (
                            <div className="mt-1 text-sm text-gray-600">
                              <span className="font-medium">Timeframe: </span>
                              {rec.timeframe}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center p-8 bg-gray-50 rounded-lg">
                    <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                    <h4 className="text-lg font-medium">No Recommendations Generated</h4>
                    <p className="text-gray-600 mt-1">
                      There was an issue generating your recommendations. Please try again or contact us for assistance.
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-12 bg-[#1A1A1A] p-6 rounded-lg text-white">
              <h3 className="text-xl font-bold mb-3 text-[#ADFF6C]">Next Steps</h3>
              <p className="mb-4">
                Schedule a consultation with our security experts to discuss your assessment results in detail 
                and develop a customized security plan for your organization.
              </p>
              <div className="flex items-center space-x-2 text-sm">
                <ShieldCheck className="w-5 h-5 text-[#ADFF6C]" />
                <span>Full assessment review with a security expert</span>
              </div>
              <div className="flex items-center space-x-2 text-sm mt-2">
                <ShieldCheck className="w-5 h-5 text-[#ADFF6C]" />
                <span>Customized security roadmap development</span>
              </div>
              <div className="flex items-center space-x-2 text-sm mt-2">
                <ShieldCheck className="w-5 h-5 text-[#ADFF6C]" />
                <span>Prioritized action plan based on your specific needs</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-between gap-4 p-6 bg-gray-50">
            <Button
              variant="outline"
              onClick={() => {
                setLocation("/");
              }}
              className="w-full sm:w-auto"
            >
              Return to Home
            </Button>
            <Button
              onClick={() => {
                setLocation("/#contact");
              }}
              className="w-full sm:w-auto bg-[#ADFF6C] hover:bg-[#8DCC4C] text-[#1A1A1A]"
            >
              Schedule a Consultation
            </Button>
          </CardFooter>
        </Card>
        
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>
            This assessment provides a basic overview of your security posture. 
            For a comprehensive evaluation, we recommend a full security audit.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-3xl mx-auto py-8 px-4">
      <Card className="border-0 shadow-lg overflow-hidden">
        <div className="bg-[#1A1A1A] p-6">
          <CardTitle className="text-2xl text-[#ADFF6C]">HackSnub Security Assessment</CardTitle>
          <CardDescription className="text-gray-300 mt-2">
            Complete this short assessment to evaluate your organization's security posture
          </CardDescription>
          <Progress value={progress} className="h-2 mt-4 bg-gray-700">
            <div className="h-full bg-[#ADFF6C]" style={{ width: `${progress}%` }} />
          </Progress>
        </div>
        <CardContent className="p-6">
          <div className="mb-8 p-4 bg-gray-50 rounded-lg border-l-4 border-[#ADFF6C]">
            <h2 className="text-xl font-semibold text-gray-800">{currentSection.title}</h2>
            <p className="text-sm text-gray-600 mt-1">{currentSection.description}</p>
            <div className="flex items-center mt-3">
              <ShieldCheck className="w-5 h-5 text-[#ADFF6C] mr-2" />
              <span className="text-sm text-gray-600">Step {step + 1} of {totalSteps}</span>
            </div>
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
                              
                              {'description' in question && question.description && (
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
                    
                    // For checkbox questions (multiple selection)
                    if (question.type === "checkbox") {
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
                              
                              {'description' in question && question.description && (
                                <FormDescription>{question.description}</FormDescription>
                              )}
                              
                              <div className="space-y-3">
                                {question.options?.map((option) => (
                                  <div key={option.value} className="flex items-center space-x-2">
                                    <Checkbox
                                      id={`${question.id}-${option.value}`}
                                      checked={
                                        field.value && Array.isArray(field.value)
                                          ? field.value.includes(option.value)
                                          : false
                                      }
                                      onCheckedChange={(checked) => {
                                        const currentValues = Array.isArray(field.value) ? [...field.value] : [];
                                        
                                        if (checked) {
                                          field.onChange([...currentValues, option.value]);
                                        } else {
                                          field.onChange(currentValues.filter((value) => value !== option.value));
                                        }
                                      }}
                                    />
                                    <label 
                                      htmlFor={`${question.id}-${option.value}`}
                                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      );
                    }
                    
                    return null;
                  })}
                </div>
              )}

              <div className="flex justify-between pt-6 mt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={step === 0}
                  className="border-gray-300 hover:bg-gray-100 hover:text-gray-900"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-[#ADFF6C] hover:bg-[#8DCC4C] text-[#1A1A1A] font-medium"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </div>
                  ) : step === totalSteps - 1 ? (
                    <div className="flex items-center">
                      Submit Assessment
                      <ShieldCheck className="ml-2 h-4 w-4" />
                    </div>
                  ) : (
                    <div className="flex items-center">
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}