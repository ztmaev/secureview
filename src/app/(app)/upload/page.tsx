'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { protectContentWithWatermark } from '@/ai/flows/content-protection-watermarks';
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
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ShieldCheck, FileWarning } from 'lucide-react';
import Image from 'next/image';

const formSchema = z.object({
  watermarkText: z
    .string()
    .min(1, 'Watermark text is required.')
    .max(50, 'Watermark must be 50 characters or less.'),
  mediaFile: z
    .any()
    .refine(files => files?.length > 0, 'A media file is required.')
    .refine(
      files => files?.[0]?.size <= 5000000,
      `Max file size is 5MB.`
    )
    .refine(
      files =>
        ['image/jpeg', 'image/png', 'image/webp'].includes(files?.[0]?.type),
      'Only .jpg, .png, and .webp formats are supported.'
    ),
});

export default function UploadPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [resultUri, setResultUri] = useState<string | null>(null);
  const [originalUri, setOriginalUri] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      watermarkText: '© SecureView',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setResultUri(null);
    setOriginalUri(null);

    const file = values.mediaFile[0];
    const reader = new FileReader();

    reader.onload = async e => {
      const dataUri = e.target?.result as string;
      setOriginalUri(dataUri);

      try {
        const result = await protectContentWithWatermark({
          mediaDataUri: dataUri,
          watermarkText: values.watermarkText,
        });

        if (result?.watermarkedMediaDataUri) {
          setResultUri(result.watermarkedMediaDataUri);
          toast({
            title: 'Success!',
            description: 'Your media has been protected.',
            variant: 'default',
          });
        } else {
            throw new Error('AI failed to return watermarked media.');
        }
      } catch (error) {
        console.error('Error watermarking content:', error);
        toast({
          title: 'An Error Occurred',
          description:
            'Failed to protect media. Please check the file and try again.',
          variant: 'destructive',
        });
        setResultUri(null); // Clear previous results on error
      } finally {
        setIsLoading(false);
      }
    };

    reader.onerror = () => {
        setIsLoading(false);
        toast({
            title: 'File Read Error',
            description: 'Could not read the selected file.',
            variant: 'destructive',
        });
    }

    reader.readAsDataURL(file);
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Protect Your Content</CardTitle>
          <CardDescription>
            Upload an image and our AI will add a watermark to protect it from
            unauthorized use.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="mediaFile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Media File</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={e => field.onChange(e.target.files)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="watermarkText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Watermark Text</FormLabel>
                    <FormControl>
                      <Input placeholder="© Your Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <ShieldCheck className="mr-2 h-4 w-4" />
                )}
                Protect Media
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Preview</CardTitle>
          <CardDescription>
            The protected image will appear here.
          </CardDescription>
        </CardHeader>
        <CardContent className="min-h-80 flex items-center justify-center">
            {isLoading && (
                <div className="flex flex-col items-center gap-4 text-muted-foreground">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    <p>AI is adding your watermark...</p>
                </div>
            )}
            {!isLoading && resultUri && (
                <div className="space-y-4 w-full">
                    <h3 className="font-semibold">Protected Image:</h3>
                    <Image src={resultUri} alt="Watermarked media" width={500} height={500} className="rounded-lg object-contain w-full h-auto" />
                </div>
            )}
             {!isLoading && !resultUri && originalUri && (
                 <div className="flex flex-col items-center gap-4 text-destructive">
                    <FileWarning className="h-12 w-12" />
                    <p className="text-center">Processing failed. Please try a different file or check your watermark text.</p>
                </div>
            )}
            {!isLoading && !resultUri && !originalUri && (
                 <div className="flex flex-col items-center gap-4 text-muted-foreground">
                    <ShieldCheck className="h-12 w-12" />
                    <p>Awaiting media upload</p>
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
