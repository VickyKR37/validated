import { getIdeasAction } from '@/app/actions';
import { IdeaCard } from '@/components/idea-card';
import { MessageCircle } from 'lucide-react';

export async function CommunityIdeas() {
  const ideas = await getIdeasAction();

  return (
    <div className="w-full">
      <div className="text-center mb-12">
        <MessageCircle className="h-16 w-16 text-primary mx-auto mb-4" />
        <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Community Idea Board
        </h2>
        <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
          Explore innovative ideas shared by our community. Offer your insights and help shape the future!
        </p>
      </div>

      {ideas.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">No ideas submitted yet. Be the first to share!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ideas.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} />
          ))}
        </div>
      )}
    </div>
  );
}
