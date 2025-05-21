'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { submitIdeaAction } from '@/app/actions';
import { IdeaSubmissionSchema, type IdeaSubmissionFormState } from '@/lib/schemas';
import { useToast } from '@/hooks/use-toast';
import { Lightbulb, Send } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
      {pending ? (
        <>
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Submitting...
        </>
      ) : (
        <>
          <Send className="mr-2 h-4 w-4" /> Submit Idea
        </>
      )}
    </Button>
  );
}

export function SubmitIdeaForm() {
  const [state, formAction] = useFormState<IdeaSubmissionFormState | null, FormData>(submitIdeaAction, null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof IdeaSubmissionSchema>>({
    resolver: zodResolver(IdeaSubmissionSchema),
    defaultValues: {
      ideaText: '',
    },
  });

  useEffect(() => {
    if (state?.message) {
      if (state.success) {
        toast({
          title: "Success!",
          description: state.message,
        });
        form.reset(); // Reset form on successful submission
      } else {
        toast({
          title: "Error",
          description: state.message || "Something went wrong.",
          variant: "destructive",
        });
        // Set form errors if issues are present
        if (state.issues) {
            state.issues.forEach((issue) => {
                 form.setError("ideaText", { type: "server", message: issue });
            });
        }
      }
    }
  }, [state, toast, form]);

  return (
    <Card className="w-full max-w-lg shadow-xl">
      <CardHeader className="items-center text-center">
        <Lightbulb className="h-12 w-12 text-primary mb-2" />
        <CardTitle className="text-3xl font-bold">Share Your Vision</CardTitle>
        <CardDescription>Got a brilliant business idea? Pitch it below and let the community help you refine it.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form action={formAction} className="space-y-6">
            <FormField
              control={form.control}
              name="ideaText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="ideaText" className="text-lg font-semibold">Your Business Idea</FormLabel>
                  <FormControl>
                    <Textarea
                      id="ideaText"
                      placeholder="Describe your business idea in a few sentences. What problem does it solve? Who is it for?"
                      className="min-h-[150px] text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SubmitButton />
            {state && !state.success && state.message && !state.issues && (
                 <p className="text-sm font-medium text-destructive">{state.message}</p>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
