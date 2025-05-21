import type { Idea, ResourceCategory } from '@/lib/definitions';
import { Users } from 'lucide-react';

export const initialIdeas: Idea[] = [
  {
    id: '1',
    text: 'A mobile app that uses AI to create personalized workout plans based on available equipment and fitness goals.',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    author: 'FitnessFan123',
  },
  {
    id: '2',
    text: 'A subscription box service for rare and exotic indoor plants, including care guides and community support.',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 10), // 10 hours ago
    author: 'PlantParentPro',
  },
  {
    id: '3',
    text: 'An online platform connecting local artists with businesses looking for custom mural paintings.',
    submittedAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    author: 'ArtConnector',
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
        description: 'Connect with beta testers for your mobile apps, including options to find users willing to provide *paid* feedback for early access.',
        url: 'https://betafamily.com/',
        tags: ['paid', 'free', 'mobile', 'beta', 'feedback'],
      }
    ],
  }
];
