
'use client';

import { useState, useEffect, useActionState } from 'react';
import * as React from 'react'; // Ensure React is imported for useFormStatus
import { useFormStatus } from 'react-dom'; // Corrected import path
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form'; // useForm remains from react-hook-form
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import { FeedbackSubmissionSchema, type FeedbackSubmissionFormState } from '@/lib/schemas';
import { addFeedbackAction } from '@/app/actions';
import type { Feedback } from '@/lib/definitions';
import { useToast } from '@/hooks/use-toast';
import { Send, MessageSquare, UserRound, CalendarDays } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';

interface FeedbackDialogProps {
  ideaId: string;
  ideaText: string;
  initialFeedbackList: Feedback[]; // Accept initial feedback list as a prop
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

function SubmitFeedbackButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="bg-primary hover:bg-primary/90 text-primary-foreground">
      {pending ? (
        <>
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Submitting...
        </>
      ) : (
        <>
          <Send className="mr-2 h-4 w-4" /> Submit Feedback
        </>
      )}
    </Button>
  );
}


export function FeedbackDialog({ ideaId, ideaText, initialFeedbackList, isOpen, onOpenChange }: FeedbackDialogProps) {
  const [feedbackList, setFeedbackList] = useState<Feedback[]>(initialFeedbackList);
  const { toast } = useToast();

  // Synchronize feedbackList with initialFeedbackList when isOpen changes or initialFeedbackList changes
  useEffect(() => {
    if (isOpen) {
        setFeedbackList(initialFeedbackList);
    }
  }, [isOpen, initialFeedbackList]);


  const [state, formAction] = useActionState<FeedbackSubmissionFormState | null, FormData>(addFeedbackAction, null);

  const form = useForm<z.infer<typeof FeedbackSubmissionSchema>>({
    resolver: zodResolver(FeedbackSubmissionSchema),
    defaultValues: {
      feedbackText: '',
      ideaId: ideaId,
    },
  });

  useEffect(() => {
    form.setValue('ideaId', ideaId);
  }, [ideaId, form]);

  useEffect(() => {
    if (state?.message) {
      if (state.success && state.feedbackItem) {
        toast({
          title: "Success!",
          description: state.message,
        });
        // Optimistically update the feedback list
        setFeedbackList(prev => [state.feedbackItem!, ...prev].sort((a,b) => new Date(b.submittedAt.toString()).getTime() - new Date(a.submittedAt.toString()).getTime()));
        form.reset({ feedbackText: '', ideaId: ideaId });
      } else if (!state.success) {
        toast({
          title: "Error",
          description: state.message || "Something went wrong.",
          variant: "destructive",
        });
         if (state.issues) {
            state.issues.forEach((issue) => {
                 form.setError("feedbackText", { type: "server", message: issue });
            });
        }
      }
    }
  }, [state, toast, form, ideaId]);
  
  const handleDialogClose = (open: boolean) => {
    if (!open) {
        form.reset({ feedbackText: '', ideaId: ideaId }); 
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center">
            <MessageSquare className="mr-2 h-6 w-6 text-primary" />
            Feedback for Idea
          </DialogTitle>
          <DialogDescription className="text-base line-clamp-3">
            {ideaText}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-grow overflow-hidden pr-2">
          <ScrollArea className="h-[300px] pr-4">
            {feedbackList.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No feedback yet. Be the first to share your thoughts!</p>
            ) : (
              <div className="space-y-4">
                {feedbackList.map((fb) => {
                  const authorInitial = fb.author ? fb.author.charAt(0).toUpperCase() : <UserRound className="h-4 w-4"/>;
                  return (
                    <div key={fb.id} className="p-4 rounded-md border bg-card shadow">
                      <div className="flex items-center space-x-3 mb-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={`https://placehold.co/32x32.png?text=${authorInitial}`} alt={fb.author} data-ai-hint="profile avatar" />
                          <AvatarFallback>{authorInitial}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-semibold text-card-foreground">{fb.author}</p>
                          <p className="text-xs text-muted-foreground flex items-center">
                            <CalendarDays className="mr-1 h-3 w-3" />
                            {fb.submittedAt ? formatDistanceToNow(new Date(fb.submittedAt.toString()), { addSuffix: true }) : 'recently'}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-foreground leading-relaxed">{fb.text}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </ScrollArea>
        </div>

        <Form {...form}>
          <form action={formAction} className="space-y-4 pt-4 border-t">
            <FormField
              control={form.control}
              name="feedbackText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="feedbackText" className="font-semibold">Your Feedback</FormLabel>
                  <FormControl>
                    <Textarea
                      id="feedbackText"
                      placeholder="Share your thoughts on this idea..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <input type="hidden" {...form.register('ideaId')} />
            <DialogFooter>
                <Button type="button" variant="outline" onClick={() => handleDialogClose(false)}>Cancel</Button>
                <SubmitFeedbackButton />
            </DialogFooter>
            {state && !state.success && state.message && !state.issues && (
                 <p className="text-sm font-medium text-destructive text-center pt-2">{state.message}</p>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

