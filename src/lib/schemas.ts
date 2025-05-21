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
