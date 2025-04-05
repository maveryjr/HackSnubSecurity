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
  
  // Password Security Recommendations
  if (responses['passwordPolicy'] === false || responses['passwordPolicy'] < 3) {
    recommendations.push({
      assessmentId: assessment.id,
      category: 'password',
      severity: 'high',
      recommendation: 'Implement a strong password policy',
      implementationDetails: 'Require passwords with at least 12 characters, including uppercase, lowercase, numbers, and special characters. Enforce regular password changes every 90 days.'
    });
  }
  
  // Two-Factor Authentication
  if (responses['twoFactor'] === false) {
    recommendations.push({
      assessmentId: assessment.id,
      category: 'authentication',
      severity: 'high',
      recommendation: 'Enable two-factor authentication',
      implementationDetails: 'Implement two-factor authentication for all critical systems and admin accounts. Consider using authenticator apps or hardware keys rather than SMS-based 2FA.'
    });
  }
  
  // Data Encryption
  if (responses['dataEncryption'] === false) {
    recommendations.push({
      assessmentId: assessment.id,
      category: 'data',
      severity: 'high',
      recommendation: 'Encrypt sensitive data',
      implementationDetails: 'Implement strong encryption (AES-256) for all sensitive data at rest and in transit. Use HTTPS for all web traffic and encrypt databases that contain customer information.'
    });
  }
  
  // Network Security
  if (responses['firewallEnabled'] === false) {
    recommendations.push({
      assessmentId: assessment.id,
      category: 'network',
      severity: 'high',
      recommendation: 'Configure proper firewall protection',
      implementationDetails: 'Install and configure both hardware and software firewalls. Establish proper ruleset that blocks unauthorized access while allowing legitimate traffic.'
    });
  }
  
  // Software Updates
  if (responses['softwareUpdates'] === false || responses['softwareUpdates'] < 3) {
    recommendations.push({
      assessmentId: assessment.id,
      category: 'patching',
      severity: 'medium',
      recommendation: 'Implement regular software patching',
      implementationDetails: 'Establish a formal patching process that ensures all operating systems and applications are updated within 30 days of security patch releases. Consider automated patching where possible.'
    });
  }
  
  // Backup Solutions
  if (responses['backupSolution'] === false || responses['backupSolution'] < 3) {
    recommendations.push({
      assessmentId: assessment.id,
      category: 'backup',
      severity: 'medium',
      recommendation: 'Improve backup strategy',
      implementationDetails: 'Implement a 3-2-1 backup strategy: 3 copies of data, on 2 different media types, with 1 copy stored off-site. Test backups regularly to ensure they can be restored.'
    });
  }
  
  // Employee Training
  if (responses['securityTraining'] === false || responses['securityTraining'] < 2) {
    recommendations.push({
      assessmentId: assessment.id,
      category: 'training',
      severity: 'medium',
      recommendation: 'Enhance security awareness training',
      implementationDetails: 'Conduct quarterly security awareness training for all employees. Include phishing simulations, password best practices, and social engineering awareness. Document attendance and test comprehension.'
    });
  }
  
  // Incident Response
  if (responses['incidentResponse'] === false) {
    recommendations.push({
      assessmentId: assessment.id,
      category: 'incident',
      severity: 'medium',
      recommendation: 'Develop incident response plan',
      implementationDetails: 'Create a formal incident response plan that outlines roles, responsibilities, and procedures for addressing security breaches. Test the plan annually through tabletop exercises.'
    });
  }
  
  // Default recommendation if score is low but no specific recommendations
  if (assessment.score < 50 && recommendations.length < 3) {
    recommendations.push({
      assessmentId: assessment.id,
      category: 'general',
      severity: 'high',
      recommendation: 'Schedule comprehensive security assessment',
      implementationDetails: 'Your security posture shows significant weaknesses. We recommend scheduling a comprehensive security assessment with a HackSnub security specialist as soon as possible.'
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
  
  // Get latest assessment by email
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
