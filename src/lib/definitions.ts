
import type { Timestamp } from 'firebase/firestore';

export interface Feedback {
  id: string;
  ideaId: string;
  text: string;
  submittedAt: Date | Timestamp; // Allow Timestamp for Firestore, convert to Date in app
  author: string; // Or authorId if auth is implemented
}

export interface Idea {
  id: string;
  text: string;
  submittedAt: Date | Timestamp; // Allow Timestamp for Firestore, convert to Date in app
  author: string;
  feedback: Feedback[]; // Array to hold feedback items
}

export interface ResourceCategory {
  id: string;
  name: string;
  icon?: React.ElementType;
  resources: Resource[];
}

export interface Resource {
  id: string;
  name: string;
  description: string;
  url: string;
}
