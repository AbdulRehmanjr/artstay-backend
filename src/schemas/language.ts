import { z } from "zod";

export const LanguageServiceCreationSchema = z.object({
  profileName: z.string().min(1, "Profile name is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  experience: z.string().min(1, "Experience is required"),
  languages: z.array(z.string()).min(1, "At least one language is required"),
  specialization: z
    .array(z.string())
    .min(1, "At least one specialization is required"),
  hourlyRate: z.number().positive("Hourly rate must be positive"),
  minBookingHours: z
    .number()
    .positive()
    .int("Minimum booking hours must be a positive integer"),
  maxBookingHours: z
    .number()
    .positive()
    .int("Maximum booking hours must be a positive integer"),
  availability: z
    .array(z.string())
    .min(1, "At least one availability day is required"),
  startTime: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format"),
  endTime: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format"),
  location: z.string().min(1, "Location is required"),
  serviceMode: z
    .array(z.string())
    .min(1, "At least one service mode is required"),
  certification: z.array(z.string()).optional().default([]),
  qualification: z.string().min(1, "Qualification is required"),
  profileImage: z.string().optional().default("none"),
  portfolio: z.array(z.string()).optional().default([]),
  accountId: z.string(),
});

export const LanguageServiceUpdateSchema =
  LanguageServiceCreationSchema.partial();
