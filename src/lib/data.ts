
import type { ResourceCategory } from '@/lib/definitions';
import { Users } from 'lucide-react';

// initialIdeas array is removed as data will now come from Firestore.
// You can keep this file for testerResourcesData or other static data.

export const testerResourcesData: ResourceCategory[] = [
  {
    id: 'communities',
    name: 'Online Communities & Platforms',
    icon: Users,
    resources: [
      {
        id: 'tr-comm-1',
        name: 'BetaFamily',
        description: "Connect with beta testers for your mobile apps, specifically focusing on finding users willing to provide *paid* feedback for early access and validation.",
        url: 'https://betafamily.com/',
      }
    ],
  }
];
