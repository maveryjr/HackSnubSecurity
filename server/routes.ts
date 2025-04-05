import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertLeadSchema, 
  insertAssessmentSchema, 
  insertRecommendationSchema,
  assessmentResponseSchema,
  type Assessment,
  type InsertRecommendation
} from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { sendLeadNotification } from "./email";

// Function to generate security recommendations based on assessment
function generateRecommendations(assessment: Assessment): InsertRecommendation[] {
  const recommendations: InsertRecommendation[] = [];
  const responses = assessment.responses as Record<string, any>;
  const industry = assessment.industry;
  const companySize = assessment.companySize;
  
  // Helper function to customize recommendations based on company size
  const getEstimatedCost = (size: string, baseAmount: string): string => {
    switch(size) {
      case '1-10': return baseAmount;
      case '11-50': return `${parseInt(baseAmount.replace(/[^0-9]/g, '')) * 1.5}/month`;
      case '51-200': return `${parseInt(baseAmount.replace(/[^0-9]/g, '')) * 2.5}/month`;
      case '201-500': return `${parseInt(baseAmount.replace(/[^0-9]/g, '')) * 4}/month`;
      case '501+': return 'Custom pricing based on scale';
      default: return baseAmount;
    }
  };
  
  // Password Security Recommendations
  if (responses['passwordPolicy'] === false || responses['passwordLength'] < 3) {
    recommendations.push({
      assessmentId: assessment.id,
      category: 'password',
      severity: 'high',
      recommendation: 'Implement a strong password policy',
      implementationDetails: 'Require passwords with at least 12 characters, including uppercase, lowercase, numbers, and special characters. Enforce regular password changes every 90 days.',
      benefits: 'Reduces the risk of successful brute force attacks and credential stuffing, which are among the most common attack vectors for small businesses.',
      estimatedCost: getEstimatedCost(companySize, '$199/month'),
      timeframe: '2-4 weeks'
    });
  }
  
  // Two-Factor Authentication
  if (responses['twoFactor'] === false) {
    const healthcareAddendum = industry === 'healthcare' ? ' This is particularly critical for HIPAA compliance.' : '';
    const financeAddendum = industry === 'finance' ? ' This is essential for financial regulatory compliance.' : '';
    
    recommendations.push({
      assessmentId: assessment.id,
      category: 'authentication',
      severity: 'high',
      recommendation: 'Enable two-factor authentication',
      implementationDetails: `Implement two-factor authentication for all critical systems and admin accounts. Consider using authenticator apps or hardware keys rather than SMS-based 2FA.${healthcareAddendum}${financeAddendum}`,
      benefits: 'Adds an essential second layer of defense even if passwords are compromised. Reduces unauthorized access risk by over 99%.',
      estimatedCost: getEstimatedCost(companySize, '$249/month'),
      timeframe: '2-3 weeks'
    });
  }
  
  // Data Encryption
  if (responses['dataEncryption'] === false) {
    let industrySpecific = '';
    if (industry === 'healthcare') {
      industrySpecific = ' For healthcare organizations, this is a HIPAA requirement and should include encryption of all PHI.';
    } else if (industry === 'finance') {
      industrySpecific = ' Financial institutions should prioritize encryption of all PII and financial data to comply with regulations like PCI DSS.';
    } else if (industry === 'retail') {
      industrySpecific = ' Retailers should focus on PCI DSS compliance for payment data encryption.';
    }
    
    recommendations.push({
      assessmentId: assessment.id,
      category: 'data',
      severity: 'high',
      recommendation: 'Encrypt sensitive data',
      implementationDetails: `Implement strong encryption (AES-256) for all sensitive data at rest and in transit. Use HTTPS for all web traffic and encrypt databases that contain customer information.${industrySpecific}`,
      benefits: 'Protects your most valuable data even if systems are breached. Meets regulatory requirements and helps avoid costly data breach penalties.',
      estimatedCost: getEstimatedCost(companySize, '$349/month'),
      timeframe: '4-6 weeks'
    });
  }
  
  // Access Control
  if (responses['dataAccess'] === false) {
    recommendations.push({
      assessmentId: assessment.id,
      category: 'access',
      severity: 'high',
      recommendation: 'Implement least privilege access controls',
      implementationDetails: 'Establish formal processes for granting and revoking access to sensitive systems and data. Implement role-based access control (RBAC) to ensure employees only have access to what they need for their job.',
      benefits: 'Limits the impact of compromised credentials, reduces insider threat risks, and simplifies compliance auditing.',
      estimatedCost: getEstimatedCost(companySize, '$299/month'),
      timeframe: '3-5 weeks'
    });
  }
  
  // Network Security
  if (responses['firewallEnabled'] === false) {
    recommendations.push({
      assessmentId: assessment.id,
      category: 'network',
      severity: 'high',
      recommendation: 'Configure proper firewall protection',
      implementationDetails: 'Install and configure both hardware and software firewalls. Establish proper rulesets that block unauthorized access while allowing legitimate traffic. Include regular review of firewall rules.',
      benefits: 'Creates a critical first line of defense against network-based attacks and unauthorized access attempts.',
      estimatedCost: getEstimatedCost(companySize, '$399/month'),
      timeframe: '2-3 weeks'
    });
  }
  
  // Software Updates
  if (responses['softwareUpdates'] < 3) {
    recommendations.push({
      assessmentId: assessment.id,
      category: 'patching',
      severity: 'medium',
      recommendation: 'Implement regular software patching',
      implementationDetails: 'Establish a formal patching process that ensures all operating systems and applications are updated within 30 days of security patch releases. Consider automated patching solutions where possible.',
      benefits: 'Closes known vulnerabilities that hackers frequently exploit. The majority of successful breaches leverage unpatched vulnerabilities.',
      estimatedCost: getEstimatedCost(companySize, '$249/month'),
      timeframe: '2-4 weeks'
    });
  }
  
  // Backup Solutions
  if (responses['backupSolution'] < 3) {
    recommendations.push({
      assessmentId: assessment.id,
      category: 'backup',
      severity: 'medium',
      recommendation: 'Improve backup strategy',
      implementationDetails: 'Implement a 3-2-1 backup strategy: 3 copies of data, on 2 different media types, with 1 copy stored off-site. Test backup restoration regularly to ensure data can be recovered.',
      benefits: 'Provides robust protection against ransomware and data loss events. Reduces recovery time and minimizes business disruption.',
      estimatedCost: getEstimatedCost(companySize, '$299/month'),
      timeframe: '3-4 weeks'
    });
  }
  
  // Employee Training
  if (responses['securityTraining'] < 3) {
    recommendations.push({
      assessmentId: assessment.id,
      category: 'training',
      severity: 'medium',
      recommendation: 'Enhance security awareness training',
      implementationDetails: 'Conduct quarterly security awareness training for all employees. Include phishing simulations, password best practices, and social engineering awareness. Document attendance and test comprehension.',
      benefits: 'Addresses the human element, which is involved in over 85% of breaches. Creates a security-conscious culture throughout your organization.',
      estimatedCost: getEstimatedCost(companySize, '$199/month'),
      timeframe: '1-2 months ongoing'
    });
  }
  
  // Incident Response
  if (responses['incidentResponse'] === false) {
    recommendations.push({
      assessmentId: assessment.id,
      category: 'incident',
      severity: 'medium',
      recommendation: 'Develop incident response plan',
      implementationDetails: 'Create a formal incident response plan that outlines roles, responsibilities, and procedures for addressing security breaches. Test the plan annually through tabletop exercises.',
      benefits: 'Reduces response time and damage from breaches. Studies show organizations with response plans face 38% lower costs from breaches.',
      estimatedCost: getEstimatedCost(companySize, '$349/month'),
      timeframe: '1-2 months'
    });
  }
  
  // Security Policy Documentation
  if (responses['securityPolicies'] && Array.isArray(responses['securityPolicies']) && responses['securityPolicies'].length < 3) {
    recommendations.push({
      assessmentId: assessment.id,
      category: 'policy',
      severity: 'medium',
      recommendation: 'Develop comprehensive security policies',
      implementationDetails: 'Create and document key security policies including acceptable use, data protection, remote work security, and bring your own device (BYOD) guidelines. Ensure policies are regularly communicated and accessible to all employees.',
      benefits: 'Establishes clear security expectations, supports compliance requirements, and provides legal protection in case of incidents.',
      estimatedCost: getEstimatedCost(companySize, '$249/month'),
      timeframe: '1-3 months'
    });
  }

  // Risk Assessment Processes
  if (responses['riskAssessment'] < 3) {
    recommendations.push({
      assessmentId: assessment.id,
      category: 'risk',
      severity: 'medium',
      recommendation: 'Implement regular risk assessment process',
      implementationDetails: 'Conduct formal security risk assessments at least annually, identifying and prioritizing vulnerabilities and threats to your business. Document findings and create actionable remediation plans.',
      benefits: 'Provides systematic approach to identifying and addressing security weaknesses before they can be exploited.',
      estimatedCost: getEstimatedCost(companySize, '$399/month'),
      timeframe: '2-3 months'
    });
  }
  
  // Vendor Risk Management
  if (responses['thirdPartyRisk'] === false) {
    recommendations.push({
      assessmentId: assessment.id,
      category: 'vendor',
      severity: 'medium',
      recommendation: 'Establish vendor security assessment program',
      implementationDetails: 'Develop a formal process to evaluate the security practices of third-party vendors before engagement. Include security requirements in contracts and perform periodic reassessments.',
      benefits: 'Reduces supply chain risk and ensures your data is properly protected by business partners and vendors.',
      estimatedCost: getEstimatedCost(companySize, '$299/month'),
      timeframe: '2-3 months'
    });
  }
  
  // Compliance Management
  if (responses['complianceFrameworks'] && Array.isArray(responses['complianceFrameworks']) && 
      (responses['complianceFrameworks'].includes('none') || responses['complianceFrameworks'].length === 0)) {
    
    let complianceRec = 'Identify applicable compliance requirements';
    let complianceDetails = 'Determine which regulatory frameworks apply to your organization based on your industry, location, and data types. Develop a compliance roadmap.';
    
    if (industry === 'healthcare') {
      complianceRec = 'Implement HIPAA compliance program';
      complianceDetails = 'Establish a comprehensive HIPAA compliance program including risk analysis, policies/procedures, workforce training, and business associate management.';
    } else if (industry === 'finance') {
      complianceRec = 'Implement financial services compliance program';
      complianceDetails = 'Establish a comprehensive compliance program addressing relevant financial regulations, including data protection, privacy, and security requirements.';
    } else if (industry === 'retail' || responses['complianceFrameworks']?.includes('pci_dss')) {
      complianceRec = 'Implement PCI DSS compliance program';
      complianceDetails = 'Establish a comprehensive PCI DSS compliance program to protect payment card data, including network security, access controls, and regular testing.';
    }
    
    recommendations.push({
      assessmentId: assessment.id,
      category: 'compliance',
      severity: 'medium',
      recommendation: complianceRec,
      implementationDetails: complianceDetails,
      benefits: 'Ensures regulatory compliance, avoids penalties, and establishes security best practices appropriate for your industry.',
      estimatedCost: getEstimatedCost(companySize, '$499/month'),
      timeframe: '3-6 months'
    });
  }
  
  // Default recommendation if score is low but no specific recommendations
  if (assessment.score < 50 && recommendations.length < 3) {
    recommendations.push({
      assessmentId: assessment.id,
      category: 'general',
      severity: 'high',
      recommendation: 'Schedule comprehensive security assessment',
      implementationDetails: 'Your security posture shows significant weaknesses. We recommend scheduling a comprehensive security assessment with a HackSnub security specialist as soon as possible.',
      benefits: 'Provides a thorough evaluation of your security posture and a roadmap for addressing critical vulnerabilities.',
      estimatedCost: getEstimatedCost(companySize, '$999 one-time'),
      timeframe: 'Immediate'
    });
  }
  
  // Add HackSnub service recommendation based on score
  if (assessment.score < 70) {
    const planType = assessment.score < 40 ? 'HackSnub Plus Plan' : 'HackSnub Basic Plan';
    const planCost = assessment.score < 40 ? '$599/month' : '$299/month';
    
    recommendations.push({
      assessmentId: assessment.id,
      category: 'service',
      severity: assessment.score < 40 ? 'high' : 'medium',
      recommendation: `Consider ${planType} for ongoing protection`,
      implementationDetails: `The ${planType} provides continuous monitoring, regular vulnerability scanning, employee training, and incident response support tailored to your specific needs.`,
      benefits: 'Provides ongoing security support without requiring in-house expertise. Includes regular reassessments to adapt to evolving threats.',
      estimatedCost: getEstimatedCost(companySize, planCost),
      timeframe: 'Can be implemented within 2 weeks'
    });
  }
  
  return recommendations;
}

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for lead form
  app.post("/api/leads", async (req: Request, res: Response) => {
    try {
      // Validate the request body
      const validatedData = insertLeadSchema.parse(req.body);

      // Add lead to storage
      const lead = await storage.createLead({
        ...validatedData,
        createdAt: new Date().toISOString(),
      });

      // Send email notification
      try {
        await sendLeadNotification({
          name: validatedData.name,
          email: validatedData.email,
          phone: validatedData.phone || '',
          company: validatedData.company,
          employees: validatedData.employees,
        });
        console.log("Lead notification email sent successfully");
      } catch (emailError) {
        // Don't fail the request if email fails, just log it
        console.error("Error sending lead notification email:", emailError);
      }

      return res.status(201).json({
        message: "Lead created successfully",
        data: lead,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({
          message: "Validation error",
          errors: validationError.message,
        });
      }

      console.error("Error creating lead:", error);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  });

  // Get all leads (for testing purposes)
  app.get("/api/leads", async (_req: Request, res: Response) => {
    try {
      const leads = await storage.getAllLeads();
      return res.status(200).json(leads);
    } catch (error) {
      console.error("Error fetching leads:", error);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  });

  // ----- Security Assessment Endpoints -----
  
  // Submit a new security assessment
  app.post("/api/assessments", async (req: Request, res: Response) => {
    try {
      // Validate the assessment data
      const validatedData = assessmentResponseSchema.parse(req.body);
      
      // Calculate security score based on responses
      // This is a simplified version - in a real app, you would have a more 
      // sophisticated scoring algorithm based on the specific questions
      const responses = validatedData.responses;
      const scoreValues = Object.values(responses).map(val => 
        typeof val === 'number' ? val : 
        typeof val === 'boolean' && val ? 1 : 0
      );
      
      const totalScore = scoreValues.reduce((sum, score) => sum + score, 0);
      const maxPossibleScore = scoreValues.length * 5; // Assuming max score per question is 5
      const normalizedScore = Math.round((totalScore / maxPossibleScore) * 100);
      
      // Create the assessment in the database
      const assessment = await storage.createAssessment({
        email: validatedData.email,
        company: validatedData.company,
        companySize: validatedData.companySize,
        industry: validatedData.industry,
        responses: validatedData.responses,
        score: normalizedScore,
        completed: true,
      });
      
      // Generate recommendations based on responses
      const recommendations = generateRecommendations(assessment);
      
      // Store recommendations if any were generated
      if (recommendations.length > 0) {
        await storage.createRecommendations(recommendations);
      }
      
      return res.status(201).json({
        message: "Security assessment submitted successfully",
        data: {
          assessment,
          score: normalizedScore,
        },
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({
          message: "Validation error",
          errors: validationError.message,
        });
      }
      
      console.error("Error creating assessment:", error);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  });
  
  // Get latest assessment by email - IMPORTANT: This must be BEFORE the :id route to avoid conflicts
  app.get("/api/assessments/email/:email", async (req: Request, res: Response) => {
    try {
      const email = req.params.email;
      
      if (!email) {
        return res.status(400).json({
          message: "Email is required",
        });
      }
      
      const assessment = await storage.getAssessmentByEmail(email);
      
      if (!assessment) {
        return res.status(404).json({
          message: "No assessment found for this email",
        });
      }
      
      // Get recommendations for this assessment
      const recommendations = await storage.getRecommendationsByAssessmentId(assessment.id);
      console.log(`Retrieved ${recommendations.length} recommendations for assessment ${assessment.id} (email: ${email})`);
      
      return res.status(200).json({
        assessment,
        recommendations,
      });
    } catch (error) {
      console.error("Error fetching assessment by email:", error);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  });
  
  // Get assessment by ID 
  app.get("/api/assessments/:id", async (req: Request, res: Response) => {
    try {
      const assessmentId = parseInt(req.params.id);
      
      if (isNaN(assessmentId)) {
        return res.status(400).json({
          message: "Invalid assessment ID",
        });
      }
      
      const assessment = await storage.getAssessment(assessmentId);
      
      if (!assessment) {
        return res.status(404).json({
          message: "Assessment not found",
        });
      }
      
      // Get recommendations for this assessment
      const recommendations = await storage.getRecommendationsByAssessmentId(assessmentId);
      console.log(`Retrieved ${recommendations.length} recommendations for assessment ${assessmentId}`);
      
      return res.status(200).json({
        assessment,
        recommendations,
      });
    } catch (error) {
      console.error("Error fetching assessment:", error);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  });
  
  // Get all assessments (admin endpoint)
  app.get("/api/assessments", async (_req: Request, res: Response) => {
    try {
      const assessments = await storage.getAllAssessments();
      return res.status(200).json(assessments);
    } catch (error) {
      console.error("Error fetching assessments:", error);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
