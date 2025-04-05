import { db } from "./db";
import { recommendations } from "@shared/schema";
import { eq } from "drizzle-orm";

// Define the benefits, costs and timeframes for each category
const recommendationDetails: Record<string, {
  benefits: string;
  estimatedCost: string;
  timeframe: string;
}> = {
  "password": {
    benefits: "Reduces the risk of successful brute force attacks and credential stuffing, which are among the most common attack vectors for small businesses.",
    estimatedCost: "$199/month", 
    timeframe: "2-4 weeks"
  },
  "authentication": {
    benefits: "Adds an essential second layer of defense even if passwords are compromised. Reduces unauthorized access risk by over 99%.",
    estimatedCost: "$249/month",
    timeframe: "2-3 weeks"
  },
  "data": {
    benefits: "Protects your most valuable data even if systems are breached. Meets regulatory requirements and helps avoid costly data breach penalties.",
    estimatedCost: "$349/month",
    timeframe: "4-6 weeks"
  },
  "access": {
    benefits: "Limits the impact of compromised credentials, reduces insider threat risks, and simplifies compliance auditing.",
    estimatedCost: "$299/month",
    timeframe: "3-5 weeks"
  },
  "network": {
    benefits: "Creates a critical first line of defense against network-based attacks and unauthorized access attempts.",
    estimatedCost: "$399/month",
    timeframe: "2-3 weeks"
  },
  "patching": {
    benefits: "Closes known vulnerabilities that hackers frequently exploit. The majority of successful breaches leverage unpatched vulnerabilities.",
    estimatedCost: "$249/month",
    timeframe: "2-4 weeks"
  },
  "backup": {
    benefits: "Provides robust protection against ransomware and data loss events. Reduces recovery time and minimizes business disruption.",
    estimatedCost: "$299/month",
    timeframe: "3-4 weeks"
  },
  "training": {
    benefits: "Addresses the human element, which is involved in over 85% of breaches. Creates a security-conscious culture throughout your organization.",
    estimatedCost: "$199/month",
    timeframe: "1-2 months ongoing"
  },
  "incident": {
    benefits: "Reduces response time and damage from breaches. Studies show organizations with response plans face 38% lower costs from breaches.",
    estimatedCost: "$349/month",
    timeframe: "1-2 months"
  },
  "policy": {
    benefits: "Establishes clear security expectations, supports compliance requirements, and provides legal protection in case of incidents.",
    estimatedCost: "$249/month",
    timeframe: "1-3 months"
  },
  "risk": {
    benefits: "Provides systematic approach to identifying and addressing security weaknesses before they can be exploited.",
    estimatedCost: "$399/month",
    timeframe: "2-3 months"
  },
  "vendor": {
    benefits: "Reduces supply chain risk and ensures your data is properly protected by business partners and vendors.",
    estimatedCost: "$299/month",
    timeframe: "2-3 months"
  },
  "compliance": {
    benefits: "Ensures regulatory compliance, avoids penalties, and establishes security best practices appropriate for your industry.",
    estimatedCost: "$499/month",
    timeframe: "3-6 months"
  },
  "general": {
    benefits: "Provides a thorough evaluation of your security posture and a roadmap for addressing critical vulnerabilities.",
    estimatedCost: "$999 one-time",
    timeframe: "Immediate"
  },
  "service": {
    benefits: "Provides ongoing security support without requiring in-house expertise. Includes regular reassessments to adapt to evolving threats.",
    estimatedCost: "$299-599/month",
    timeframe: "Can be implemented within 2 weeks"
  }
};

// Default fallback values
const defaultDetails = {
  benefits: "Improves your overall security posture and reduces risk of breaches.",
  estimatedCost: "Varies based on implementation",
  timeframe: "1-3 months"
};

async function updateRecommendations() {
  try {
    console.log("Updating existing recommendations with benefits, costs, and timeframes...");
    
    // Get all recommendations
    const allRecommendations = await db.select().from(recommendations);
    console.log(`Found ${allRecommendations.length} recommendations to update`);
    
    // Update each recommendation
    for (const rec of allRecommendations) {
      const details = recommendationDetails[rec.category] || defaultDetails;
      
      // Only update if fields are null
      if (rec.benefits === null || rec.estimatedCost === null || rec.timeframe === null) {
        await db.update(recommendations)
          .set({
            benefits: details.benefits,
            estimatedCost: details.estimatedCost,
            timeframe: details.timeframe
          })
          .where(eq(recommendations.id, rec.id));
          
        console.log(`Updated recommendation ID ${rec.id} (${rec.category}: ${rec.recommendation})`);
      }
    }
    
    console.log("Recommendation update complete!");
  } catch (error) {
    console.error("Error updating recommendations:", error);
  }
}

// Execute the update
updateRecommendations().then(() => {
  console.log("Script execution completed");
  process.exit(0);
}).catch(err => {
  console.error("Script execution failed:", err);
  process.exit(1);
});