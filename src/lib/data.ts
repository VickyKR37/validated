import type { ResourceCategory, Idea } from '@/lib/definitions';
import { Users } from 'lucide-react'; // Keep Users if AppHeader or other components might use it.

export const initialIdeas: Idea[] = [
  {
    id: '1',
    text: 'A mobile app that uses AI to create personalized workout plans based on available equipment and fitness goals.',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    author: 'FitnessFan123',
    feedback: [
      { id: 'f1-1', ideaId: '1', text: 'This sounds great! I\'d definitely pay for this.', author: 'EarlyAdopter', submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 23) },
      { id: 'f1-2', ideaId: '1', text: 'How would it handle different fitness levels?', author: 'CuriousUser', submittedAt: new Date(Date.now() - 1000 * 60 * 30) },
    ],
  },
  {
    id: '2',
    text: 'A subscription box service for rare and exotic indoor plants, including care guides and community support.',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 10), // 10 hours ago
    author: 'PlantParentPro',
    feedback: [
      { id: 'f2-1', ideaId: '2', text: 'Love this idea! Take my money!', author: 'PlantLover', submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 2) },
    ],
  },
  {
    id: '3',
    text: 'An online platform connecting local artists with businesses looking for custom mural paintings.',
    submittedAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    author: 'ArtConnector',
    feedback: [],
  },
];

export const testerResourcesData: ResourceCategory[] = [
  {
    id: 'communities',
    name: 'Online Communities & Platforms',
    icon: Users, 
    resources: [
      {
        id: 'tr-comm-1',
        name: 'BetaFamily',
        description: 'Connect with beta testers for your mobile apps, specifically focusing on finding users willing to provide *paid* feedback for early access and validation.',
        url: 'https://betafamily.com/',
      }
    ],
  }
];
