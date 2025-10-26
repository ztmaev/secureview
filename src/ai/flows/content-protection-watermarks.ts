'use server';
/**
 * @fileOverview A content protection AI agent that adds watermarks to media.
 *
 * - protectContentWithWatermark - A function that handles the content protection process.
 * - ContentProtectionInput - The input type for the protectContentWithWatermark function.
 * - ContentProtectionOutput - The return type for the protectContentWithWatermark function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ContentProtectionInputSchema = z.object({
  mediaDataUri: z
    .string()
    .describe(
      "A media file (image or video), as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  watermarkText: z.string().describe('The text to use as a watermark.'),
});
export type ContentProtectionInput = z.infer<typeof ContentProtectionInputSchema>;

const ContentProtectionOutputSchema = z.object({
  watermarkedMediaDataUri: z
    .string()
    .describe('The watermarked media file as a data URI.'),
});
export type ContentProtectionOutput = z.infer<typeof ContentProtectionOutputSchema>;

export async function protectContentWithWatermark(input: ContentProtectionInput): Promise<ContentProtectionOutput> {
  return protectContentWithWatermarkFlow(input);
}

const prompt = ai.definePrompt({
  name: 'contentProtectionPrompt',
  input: {schema: ContentProtectionInputSchema},
  output: {schema: ContentProtectionOutputSchema},
  prompt: `You are an AI that adds a watermark to media to protect it from unauthorized use.

Add the following watermark text to the media: {{{watermarkText}}}

Here is the media file: {{media url=mediaDataUri}}

Return the watermarked media as a data URI.
`,
});

const protectContentWithWatermarkFlow = ai.defineFlow(
  {
    name: 'protectContentWithWatermarkFlow',
    inputSchema: ContentProtectionInputSchema,
    outputSchema: ContentProtectionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
