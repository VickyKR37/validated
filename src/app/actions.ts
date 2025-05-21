
'use server';

import type { Idea, Feedback } from '@/lib/definitions';
import { IdeaSubmissionSchema, type IdeaSubmissionFormState } from '@/lib/schemas';
import { initialIdeas } from '@/lib/data';
import { revalidatePath } from 'next/cache';

// --- Persistence ---
// TODO: Replace this in-memory store with a database solution (e.g., Firestore, Supabase, Prisma with a DB)
// Ensure each initial idea has a feedback array.
let ideas: Idea[] = initialIdeas.map(idea => ({
  ...idea,
  feedback: idea.feedback || [],
}));

// Placeholder for Feedback data store - this would also be in the database
let allFeedback: Feedback[] = [];
// --- End Persistence ---

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
    // --- User Authentication ---
    // TODO: Replace 'Anonymous User' with authenticated user's ID/name from a session
    author: 'Anonymous User',
    // --- End User Authentication ---
    feedback: [], // Initialize with an empty feedback array
  };

  // TODO: Database interaction: ideas.unshift(newIdea) would become an INSERT operation.
  ideas.unshift(newIdea);

  revalidatePath('/');

  return {
    message: 'Idea submitted successfully!',
    success: true,
  };
}

export async function getIdeasAction(): Promise<Idea[]> {
  // TODO: Database interaction: return ideas would become a SELECT operation.
  // Ensure all ideas have a feedback array for type consistency.
  return ideas.map(idea => ({
    ...idea,
    feedback: idea.feedback || [],
  }));
}

// --- Feedback System ---
export async function addFeedbackAction(
  ideaId: string,
  feedbackText: string,
  // TODO: Add authorId/name from authenticated user session
  authorName?: string
): Promise<{ success: boolean; message: string; feedbackItem?: Feedback }> {
  'use server'; // Ensure this can be called from client components if needed for forms

  // TODO: Add more robust validation for feedbackText
  if (!feedbackText || feedbackText.trim().length < 5) {
    return { success: false, message: "Feedback should be at least 5 characters long." };
  }

  const newFeedbackItem: Feedback = {
    id: crypto.randomUUID(),
    ideaId,
    text: feedbackText,
    submittedAt: new Date(),
    // TODO: Replace with actual authenticated user data
    author: authorName || 'Anonymous Feedbacker',
  };

  // TODO: Database interaction: Save newFeedbackItem to the database, associated with ideaId.
  allFeedback.push(newFeedbackItem); // Placeholder storage for all feedback

  // TODO: Database interaction: Update the specific idea's feedback array or relation.
  // For in-memory simulation, find the idea and add feedback to it.
  const ideaIndex = ideas.findIndex(idea => idea.id === ideaId);
  if (ideaIndex !== -1) {
    if (!ideas[ideaIndex].feedback) {
      ideas[ideaIndex].feedback = [];
    }
    ideas[ideaIndex].feedback!.push(newFeedbackItem);
  }

  // Revalidate the path to update the UI where ideas/feedback are displayed.
  // This might be '/' or a more specific page like `/ideas/${ideaId}`.
  revalidatePath('/');
  return { success: true, message: 'Feedback submitted successfully!', feedbackItem: newFeedbackItem };
}

export async function getFeedbackForIdeaAction(ideaId: string): Promise<Feedback[]> {
  'use server';
  // TODO: Database interaction: Fetch feedback for the given ideaId from the database.
  // This placeholder filters the in-memory allFeedback array.
  return allFeedback.filter(f => f.ideaId === ideaId);
}
// --- End Feedback System ---
