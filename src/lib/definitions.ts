export interface Idea {
  id: string;
  text: string;
  submittedAt: Date;
  author?: string; // Optional: if we want to display who submitted
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
  tags?: string[];
}
