
'use server';

import type { Idea, Feedback } from '@/lib/definitions';
import { IdeaSubmissionSchema, FeedbackSubmissionSchema, type IdeaSubmissionFormState, type FeedbackSubmissionFormState } from '@/lib/schemas';
import { initialIdeas } from '@/lib/data';
import { revalidatePath } from 'next/cache';

// --- Persistence ---
// TODO: Replace this in-memory store with a database solution (e.g., Firestore, Supabase, Prisma with a DB)
// Ensure each initial idea has a feedback array.
let ideas: Idea[] = initialIdeas.map(idea => ({
  ...idea,
  feedback: idea.feedback || [],
}));

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

  revalidatePath('/'); // Revalidates the homepage where ideas are listed
  revalidatePath(`/ideas/${newIdea.id}`); // If we had individual idea pages

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
  prevState: FeedbackSubmissionFormState | null,
  formData: FormData
): Promise<FeedbackSubmissionFormState> {
  const rawFormData = {
    feedbackText: formData.get('feedbackText') as string,
    ideaId: formData.get('ideaId') as string,
  };

  const validatedFields = FeedbackSubmissionSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      message: "Failed to submit feedback.",
      issues: validatedFields.error.flatten().fieldErrors.feedbackText,
      success: false,
    };
  }

  const idea = ideas.find(i => i.id === validatedFields.data.ideaId);
  if (!idea) {
    return { success: false, message: "Idea not found." };
  }

  const newFeedbackItem: Feedback = {
    id: crypto.randomUUID(),
    ideaId: validatedFields.data.ideaId,
    text: validatedFields.data.feedbackText,
    submittedAt: new Date(),
    // TODO: Replace with actual authenticated user data
    author: 'Anonymous Feedbacker',
  };

  // TODO: Database interaction: Save newFeedbackItem to the database, associated with ideaId.
  // For in-memory simulation, find the idea and add feedback to it.
  const ideaIndex = ideas.findIndex(i => i.id === newFeedbackItem.ideaId);
  if (ideaIndex !== -1) {
    if (!ideas[ideaIndex].feedback) {
      ideas[ideaIndex].feedback = [];
    }
    ideas[ideaIndex].feedback!.unshift(newFeedbackItem); // Add to the beginning
  }

  // Revalidate the path to update the UI where ideas/feedback are displayed.
  revalidatePath('/'); // For the main ideas list
  // If we had individual idea pages, we'd revalidate those too:
  // revalidatePath(`/ideas/${newFeedbackItem.ideaId}`);

  return { success: true, message: 'Feedback submitted successfully!', feedbackItem: newFeedbackItem };
}

export async function getFeedbackForIdeaAction(ideaId: string): Promise<Feedback[]> {
  // TODO: Database interaction: Fetch feedback for the given ideaId from the database.
  const idea = ideas.find(i => i.id === ideaId);
  return idea?.feedback || [];
}
// --- End Feedback System ---
