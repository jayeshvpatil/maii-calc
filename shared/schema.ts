import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Individual Calculator Schema
export const individualCalculatorSchema = z.object({
  // Part 1: Value Analysis
  comp: z.number().positive(),
  workHours: z.number().positive().default(2080),
  valueOfWorkMultiple: z.number().positive().default(2.0),
  estProductivityLift: z.number().positive().max(100),
  
  // Part 2: Cost Analysis
  aiTrainingHours: z.number().positive(),
  aiTrainingLicenseFees: z.number().min(0),
  aiTechCosts: z.number().min(0)
});

// Team Calculator Schema
export const teamCalculatorSchema = z.object({
  // Part 1: Value Analysis
  numberOfLearners: z.number().positive(),
  combinedComp: z.number().positive(),
  averageWorkHours: z.number().positive().default(2080),
  valueOfWorkMultiple: z.number().positive().default(2.0),
  estProductivityLift: z.number().positive().max(100),
  
  // Part 2: Cost Analysis
  aiTrainingHoursPerLearner: z.number().positive(),
  aiTrainingLicenseFeesPerLearner: z.number().min(0),
  aiTechCostsPerLearner: z.number().min(0)
});

export type IndividualCalculatorInputs = z.infer<typeof individualCalculatorSchema>;
export type TeamCalculatorInputs = z.infer<typeof teamCalculatorSchema>;

// Results interfaces
export interface IndividualCalculatorResults {
  // Part 1 Calculated Values
  costPerHour: number;
  valueOfWorkPerHour: number;
  annualValueOfWork: number;
  valueOfProductivityLift: number;
  newAnnualValueOfWork: number;
  
  // Part 2 Calculated Values
  aiTrainingHumanCosts: number;
  totalAiTrainingCosts: number;
  totalAiCosts: number;
  
  // Part 3 Results
  firstYearNetValue: number;
  roi: number;
}

export interface TeamCalculatorResults {
  // Part 1 Calculated Values
  combinedWorkHours: number;
  blendedCostPerHour: number;
  blendedValueOfWorkPerHour: number;
  avgAnnualValueOfWork: number;
  avgValueOfProductivityLift: number;
  avgNewAnnualValueOfWork: number;
  totalValueOfProductivityLift: number;
  
  // Part 2 Calculated Values
  combinedAiTrainingHours: number;
  combinedAiTrainingHumanCosts: number;
  combinedAiTrainingLicenseFees: number;
  totalAiTrainingCosts: number;
  totalAiTechCosts: number;
  totalAiCosts: number;
  
  // Part 3 Results
  firstYearNetValue: number;
  roi: number;
}
