
'use server';

import type { Idea, Feedback } from '@/lib/definitions';
import { IdeaSubmissionSchema, FeedbackSubmissionSchema, type IdeaSubmissionFormState, type FeedbackSubmissionFormState } from '@/lib/schemas';
import { revalidatePath } from 'next/cache';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp, doc, updateDoc, arrayUnion, Timestamp } from 'firebase/firestore';

// --- Persistence with Firestore ---

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

  try {
    const newIdeaData = {
      text: validatedFields.data.ideaText,
      submittedAt: serverTimestamp(),
      author: 'Anonymous User', // TODO: Replace with authenticated user's ID/name
      feedback: [],
    };
    const docRef = await addDoc(collection(db, "ideas"), newIdeaData);

    revalidatePath('/');
    // revalidatePath(`/ideas/${docRef.id}`); // If we had individual idea pages

    return {
      message: 'Idea submitted successfully!',
      success: true,
    };
  } catch (error) {
    console.error("Error submitting idea to Firestore:", error);
    return {
      message: 'Database error: Failed to submit idea.',
      success: false,
    };
  }
}

export async function getIdeasAction(): Promise<Idea[]> {
  try {
    const ideasCollection = collection(db, "ideas");
    const q = query(ideasCollection, orderBy("submittedAt", "desc"));
    const querySnapshot = await getDocs(q);
    
    const ideas: Idea[] = querySnapshot.docs.map(docSnap => {
      const data = docSnap.data();
      // Ensure feedback array exists and convert timestamps
      const feedback = (data.feedback || []).map((fb: any) => ({
        ...fb,
        submittedAt: fb.submittedAt instanceof Timestamp ? fb.submittedAt.toDate() : new Date(fb.submittedAt),
      }));

      return {
        id: docSnap.id,
        text: data.text,
        // Convert Firestore Timestamp to JavaScript Date object
        submittedAt: data.submittedAt instanceof Timestamp ? data.submittedAt.toDate() : new Date(data.submittedAt),
        author: data.author,
        feedback: feedback,
      } as Idea;
    });
    return ideas;
  } catch (error) {
    console.error("Error fetching ideas from Firestore:", error);
    return []; // Return empty array on error
  }
}

// --- Feedback System with Firestore ---
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
  
  const submittedAtDate = new Date();

  const newFeedbackItem: Feedback = {
    id: crypto.randomUUID(), // Client-generated ID for feedback item within the array
    ideaId: validatedFields.data.ideaId,
    text: validatedFields.data.feedbackText,
    submittedAt: submittedAtDate, 
    author: 'Anonymous Feedbacker', // TODO: Replace with actual authenticated user data
  };

  try {
    const ideaRef = doc(db, "ideas", newFeedbackItem.ideaId);
    
    // Prepare feedback item for Firestore (convert Date to Timestamp)
    const feedbackForFirestore = {
      ...newFeedbackItem,
      submittedAt: Timestamp.fromDate(submittedAtDate),
    };

    await updateDoc(ideaRef, {
      feedback: arrayUnion(feedbackForFirestore)
    });

    revalidatePath('/'); 
    // revalidatePath(`/ideas/${newFeedbackItem.ideaId}`);

    return { success: true, message: 'Feedback submitted successfully!', feedbackItem: newFeedbackItem };
  } catch (error) {
    console.error("Error adding feedback to Firestore:", error);
     let errorMessage = 'Database error: Failed to submit feedback.';
    if (error instanceof Error && error.message.includes('No document to update')) {
        errorMessage = 'Error: Idea not found. Could not submit feedback.';
    }
    return { success: false, message: errorMessage };
  }
}
// getFeedbackForIdeaAction is no longer needed as feedback is passed directly to FeedbackDialog
// --- End Feedback System ---
