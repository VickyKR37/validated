import type { Idea } from '@/lib/definitions';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MessageSquare, UserRound } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export function IdeaCard({ idea }: { idea: Idea }) {
  const timeAgo = formatDistanceToNow(new Date(idea.submittedAt), { addSuffix: true });
  const authorInitial = idea.author ? idea.author.charAt(0).toUpperCase() : <UserRound className="h-5 w-5" />;
  const feedbackCount = idea.feedback?.length || 0;

  return (
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
      <CardFooter className="flex-col items-start gap-2 pt-4"> {/* Added pt-4 for spacing */}
        <Button variant="outline" size="sm" className="w-full transition-colors hover:bg-accent hover:text-accent-foreground">
          <MessageSquare className="mr-2 h-4 w-4" />
          Provide Feedback (Coming Soon)
        </Button>
        {feedbackCount > 0 && (
          <p className="text-xs text-muted-foreground w-full text-right pr-1">
            {feedbackCount} {feedbackCount === 1 ? 'feedback' : 'feedbacks'}
          </p>
        )}
      </CardFooter>
    </Card>
  );
}
