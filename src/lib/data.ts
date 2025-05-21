import type { Idea, ResourceCategory } from '@/lib/definitions';
import { FlaskConical, Users, DollarSign, MessageSquare } from 'lucide-react'; // Changed TestTube2 to FlaskConical

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
    id: 'platforms',
    name: 'User Testing Platforms',
    icon: FlaskConical, // Changed TestTube2 to FlaskConical
    resources: [
      {
        id: 'tr-plat-1',
        name: 'UserTesting.com',
        description: 'Get videos of real people speaking their thoughts as they use your website or app.',
        url: 'https://www.usertesting.com',
        tags: ['paid', 'feedback', 'video'],
      },
      {
        id: 'tr-plat-2',
        name: 'Testbirds',
        description: 'Crowdtesting services for websites, apps, and IoT devices with a global tester community.',
        url: 'https://www.testbirds.com',
        tags: ['paid', 'global', 'bugs'],
      },
      {
        id: 'tr-plat-3',
        name: 'Userlytics',
        description: 'Provides a platform for user experience testing with diverse demographic targeting.',
        url: 'https://www.userlytics.com',
        tags: ['paid', 'UX', 'demographics'],
      },
    ],
  },
  {
    id: 'communities',
    name: 'Online Communities',
    icon: Users,
    resources: [
      {
        id: 'tr-comm-1',
        name: 'BetaFamily',
        description: 'Connect with beta testers for your mobile apps.',
        url: 'https://betafamily.com/',
        tags: ['free', 'paid', 'mobile', 'beta'],
      },
      {
        id: 'tr-comm-2',
        name: 'Reddit (r/TestMyApp, r/alphaandbetausers)',
        description: 'Subreddits where developers can post their apps for testing by community members.',
        url: 'https://www.reddit.com',
        tags: ['free', 'community', 'feedback'],
      },
    ],
  },
  {
    id: 'freelance',
    name: 'Freelance Platforms',
    icon: DollarSign,
    resources: [
      {
        id: 'tr-free-1',
        name: 'Upwork',
        description: 'Hire freelance testers for specific testing tasks or long-term projects.',
        url: 'https://www.upwork.com',
        tags: ['paid', 'freelance', 'custom'],
      },
      {
        id: 'tr-free-2',
        name: 'Fiverr',
        description: 'Find testers offering gigs for app testing, website feedback, and more.',
        url: 'https://www.fiverr.com',
        tags: ['paid', 'gigs', 'freelance'],
      },
    ],
  },
   {
    id: 'feedback-tools',
    name: 'Feedback & Survey Tools',
    icon: MessageSquare,
    resources: [
      {
        id: 'tr-feed-1',
        name: 'SurveyMonkey',
        description: 'Create and send surveys to gather targeted feedback from potential users.',
        url: 'https://www.surveymonkey.com',
        tags: ['survey', 'feedback', 'analytics'],
      },
      {
        id: 'tr-feed-2',
        name: 'Typeform',
        description: 'Build beautiful, interactive forms and surveys to collect user opinions.',
        url: 'https://www.typeform.com',
        tags: ['survey', 'interactive', 'design'],
      },
    ],
  }
];
