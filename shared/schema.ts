import { pgTable, text, serial, integer, timestamp, json, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Leads table - main entity for the form submissions
export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  company: text("company").notNull(),
  employees: text("employees").notNull(),
  createdAt: text("created_at").notNull(),
});

// Explicitly define relations
export const usersRelations = relations(users, ({ many }) => ({
  // Define future relations here if needed
}));

export const leadsRelations = relations(leads, ({ one }) => ({
  // Define future relations here if needed
}));

// Insert schemas for validation
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertLeadSchema = createInsertSchema(leads).omit({
  id: true,
  createdAt: true,
});

// Security Assessment table
export const assessments = pgTable("assessments", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  company: text("company"),
  companySize: text("company_size"),
  industry: text("industry"),
  responses: json("responses").notNull(), // Store all question responses as JSON
  score: integer("score").notNull(),       // Overall security score
  completed: boolean("completed").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Recommendations linked to assessments
export const recommendations = pgTable("recommendations", {
  id: serial("id").primaryKey(),
  assessmentId: integer("assessment_id").notNull().references(() => assessments.id),
  category: text("category").notNull(),    // E.g., "password", "network", "employee_training"
  severity: text("severity").notNull(),    // "high", "medium", "low"
  recommendation: text("recommendation").notNull(),
  implementationDetails: text("implementation_details"),
  benefits: text("benefits"),              // Benefits of implementing this recommendation
  estimatedCost: text("estimated_cost"),   // Estimated cost to implement
  timeframe: text("timeframe"),            // Estimated timeframe to implement
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Define relations for assessments
export const assessmentsRelations = relations(assessments, ({ many }) => ({
  recommendations: many(recommendations),
}));

// Define relations for recommendations
export const recommendationsRelations = relations(recommendations, ({ one }) => ({
  assessment: one(assessments, {
    fields: [recommendations.assessmentId],
    references: [assessments.id],
  }),
}));

// Insert schemas for validation
export const insertAssessmentSchema = createInsertSchema(assessments).omit({
  id: true,
  createdAt: true,
});

export const insertRecommendationSchema = createInsertSchema(recommendations).omit({
  id: true,
  createdAt: true,
});

// Type definitions
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;

export type InsertAssessment = z.infer<typeof insertAssessmentSchema>;
export type Assessment = typeof assessments.$inferSelect;

export type InsertRecommendation = z.infer<typeof insertRecommendationSchema>;
export type Recommendation = typeof recommendations.$inferSelect;

// Define the response type for client-side validation
export const assessmentResponseSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  companySize: z.string().optional(),
  industry: z.string().optional(),
  responses: z.record(z.string(), z.any()),  // Map of question IDs to responses
});
