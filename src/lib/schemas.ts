import { z } from 'zod';

export const IdeaSubmissionSchema = z.object({
  ideaText: z.string().min(20, { message: "Your idea should be at least 20 characters long." }).max(500, { message: "Keep your idea concise (max 500 characters)." }),
});

export type IdeaSubmissionFormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
  success: boolean;
} | null;

export const FeedbackSubmissionSchema = z.object({
  feedbackText: z.string().min(5, { message: "Feedback should be at least 5 characters long." }).max(500, { message: "Keep your feedback concise (max 500 characters)." }),
  ideaId: z.string(), // Hidden field, but good to have in schema if passed explicitly
});

export type FeedbackSubmissionFormState = {
  message: string;
  issues?: string[];
  success: boolean;
  feedbackItem?: import('@/lib/definitions').Feedback;
} | null;
