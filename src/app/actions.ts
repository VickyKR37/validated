'use server';

import type { Idea } from '@/lib/definitions';
import { IdeaSubmissionSchema, type IdeaSubmissionFormState } from '@/lib/schemas';
import { initialIdeas } from '@/lib/data'; // Import initial ideas
import { revalidatePath } from 'next/cache';

// In-memory store for ideas. In a real app, this would be a database.
let ideas: Idea[] = [...initialIdeas]; // Initialize with mock data

export async function submitIdeaAction(
  prevState: IdeaSubmissionFormState | null,
  formData: FormData
): Promise<IdeaSubmissionFormState> {
  const rawFormData = {
    ideaText: formData.get('ideaText') as string,
  };

  const validatedFields = IdeaSubmissionSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      message: "Failed to submit idea.",
      issues: validatedFields.error.flatten().fieldErrors.ideaText,
      success: false,
    };
  }

  const newIdea: Idea = {
    id: crypto.randomUUID(),
    text: validatedFields.data.ideaText,
    submittedAt: new Date(),
    author: 'Anonymous User', // Or implement user authentication later
  };

  ideas.unshift(newIdea); // Add to the beginning of the array

  revalidatePath('/'); // Revalidate the page to show the new idea

  return { 
    message: 'Idea submitted successfully!', 
    success: true,
  };
}

export async function getIdeasAction(): Promise<Idea[]> {
  // Simulate API delay
  // await new Promise(resolve => setTimeout(resolve, 1000));
  return ideas;
}
