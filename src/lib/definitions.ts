export interface Feedback {
  id: string;
  ideaId: string;
  text: string;
  submittedAt: Date;
  author: string; // Or authorId if auth is implemented
}

export interface Idea {
  id: string;
  text: string;
  submittedAt: Date;
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
