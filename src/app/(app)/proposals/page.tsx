'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, FileText } from 'lucide-react';
import { useFirebase } from '@/firebase';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { collection } from 'firebase/firestore';

const formSchema = z.object({
  title: z.string().min(1, 'Proposal title is required.'),
  description: z.string().min(1, 'Proposal description is required.'),
});

export default function ProposalsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { firestore, user } = useFirebase();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      if (firestore && user) {
        const updatesCollection = collection(firestore, 'website_updates');
        await addDocumentNonBlocking(updatesCollection, {
          eventType: 'new_proposal',
          entityId: 'some-proposal-id', // Replace with actual ID after saving proposal
          timestamp: new Date().toISOString(),
          userProfileId: user.uid,
          ...values, // Storing title and description for display
        });

        toast({
          title: 'Success!',
          description: 'Your new proposal has been submitted.',
          variant: 'default',
        });
        form.reset();
      } else {
        throw new Error('User or database not available.');
      }
    } catch (error) {
      console.error('Error submitting proposal:', error);
      toast({
        title: 'An Error Occurred',
        description: 'Failed to submit proposal. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="font-headline">Submit a New Proposal</CardTitle>
        <CardDescription>
          Share your idea by filling out the form below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Proposal Title</FormLabel>
                  <FormControl>
                    <Input placeholder="My Innovative Idea" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Proposal Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="A detailed description of your proposal."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading || !firestore} className="w-full">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <FileText className="mr-2 h-4 w-4" />
              )}
              Submit Proposal
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
