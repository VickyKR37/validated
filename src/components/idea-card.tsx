
'use client';

import type { Idea } from '@/lib/definitions';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MessageSquare, UserRound } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';
import { FeedbackDialog } from '@/components/feedback-dialog'; 

export function IdeaCard({ idea }: { idea: Idea }) {
  const timeAgo = idea.submittedAt ? formatDistanceToNow(new Date(idea.submittedAt.toString()), { addSuffix: true }) : 'some time ago';
  const authorInitial = idea.author ? idea.author.charAt(0).toUpperCase() : <UserRound className="h-5 w-5" />;
  const feedbackCount = idea.feedback?.length || 0;

  const [isFeedbackDialogOpen, setIsFeedbackDialogOpen] = useState(false);

  return (
    <>
      <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
        <CardHeader>
          <div className="flex items-center space-x-3 mb-2">
            <Avatar>
              <AvatarImage src={`https://placehold.co/40x40.png?text=${authorInitial}`} alt={idea.author || 'User'} data-ai-hint="profile avatar" />
              <AvatarFallback>{authorInitial}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg font-semibold">{idea.author || 'Anonymous Idea'}</CardTitle>
              <CardDescription className="text-xs text-muted-foreground">{timeAgo}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-foreground leading-relaxed">{idea.text}</p>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 pt-4">
          <Button
            variant="outline"
            size="sm"
            className="w-full transition-colors hover:bg-accent hover:text-accent-foreground"
            onClick={() => setIsFeedbackDialogOpen(true)}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            View & Add Feedback ({feedbackCount})
          </Button>
        </CardFooter>
      </Card>
      <FeedbackDialog
        ideaId={idea.id}
        ideaText={idea.text}
        initialFeedbackList={idea.feedback || []} // Pass feedback list as a prop
        isOpen={isFeedbackDialogOpen}
        onOpenChange={setIsFeedbackDialogOpen}
      />
    </>
  );
}
