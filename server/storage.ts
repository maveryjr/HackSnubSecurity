import { 
  users, 
  leads, 
  assessments, 
  recommendations, 
  type User, 
  type InsertUser, 
  type InsertLead, 
  type Lead,
  type InsertAssessment,
  type Assessment,
  type InsertRecommendation,
  type Recommendation
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

// Updated interface with assessment methods
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Lead methods
  createLead(lead: InsertLead & { createdAt: string }): Promise<Lead>;
  getAllLeads(): Promise<Lead[]>;
  
  // Assessment methods
  createAssessment(assessment: InsertAssessment): Promise<Assessment>;
  getAssessment(id: number): Promise<Assessment | undefined>;
  getAssessmentByEmail(email: string): Promise<Assessment | undefined>;
  getAllAssessments(): Promise<Assessment[]>;
  
  // Recommendation methods
  createRecommendations(recommendations: InsertRecommendation[]): Promise<Recommendation[]>;
  getRecommendationsByAssessmentId(assessmentId: number): Promise<Recommendation[]>;
}

// Updated DatabaseStorage implementation
export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Lead methods
  async createLead(insertLead: InsertLead & { createdAt: string }): Promise<Lead> {
    const [lead] = await db
      .insert(leads)
      .values(insertLead)
      .returning();
    return lead;
  }

  async getAllLeads(): Promise<Lead[]> {
    return await db.select().from(leads);
  }
  
  // Assessment methods
  async createAssessment(insertAssessment: InsertAssessment): Promise<Assessment> {
    const [assessment] = await db
      .insert(assessments)
      .values(insertAssessment)
      .returning();
    return assessment;
  }
  
  async getAssessment(id: number): Promise<Assessment | undefined> {
    const [assessment] = await db
      .select()
      .from(assessments)
      .where(eq(assessments.id, id));
    return assessment || undefined;
  }
  
  async getAssessmentByEmail(email: string): Promise<Assessment | undefined> {
    const [assessment] = await db
      .select()
      .from(assessments)
      .where(eq(assessments.email, email))
      .orderBy(desc(assessments.createdAt))
      .limit(1);
    return assessment || undefined;
  }
  
  async getAllAssessments(): Promise<Assessment[]> {
    return await db
      .select()
      .from(assessments)
      .orderBy(desc(assessments.createdAt));
  }
  
  // Recommendation methods
  async createRecommendations(insertRecommendations: InsertRecommendation[]): Promise<Recommendation[]> {
    if (insertRecommendations.length === 0) {
      return [];
    }
    
    return await db
      .insert(recommendations)
      .values(insertRecommendations)
      .returning();
  }
  
  async getRecommendationsByAssessmentId(assessmentId: number): Promise<Recommendation[]> {
    return await db
      .select()
      .from(recommendations)
      .where(eq(recommendations.assessmentId, assessmentId))
      .orderBy(desc(recommendations.severity));
  }
}

export const storage = new DatabaseStorage();
