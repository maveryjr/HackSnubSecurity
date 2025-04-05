import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { sendLeadNotification } from "./email";

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

  const httpServer = createServer(app);
  return httpServer;
}
