'use server';
/**
 * @fileOverview A house price prediction AI agent.
 *
 * - predictHousePrice - A function that handles the house price prediction process.
 * - PredictHousePriceInput - The input type for the predictHousePrice function.
 * - PredictHousePriceOutput - The return type for the predictHousePrice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const PredictHousePriceInputSchema = z.object({
  bedrooms: z.number().describe('The number of bedrooms.'),
  bathrooms: z.number().describe('The number of bathrooms.'),
  squareFootage: z.number().describe('The total square footage of the house.'),
  zipCode: z.string().describe('The 5-digit zip code of the property.'),
  propertyType: z.enum(['single_family', 'condo', 'townhouse']).describe('The type of property.'),
  yearBuilt: z.number().describe('The year the house was built.'),
});
export type PredictHousePriceInput = z.infer<typeof PredictHousePriceInputSchema>;

const PredictHousePriceOutputSchema = z.object({
  predictedPrice: z.number().describe('The predicted market price of the house in USD.'),
});
export type PredictHousePriceOutput = z.infer<typeof PredictHousePriceOutputSchema>;

export async function predictHousePrice(input: PredictHousePriceInput): Promise<PredictHousePriceOutput> {
  return predictHousePriceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictHousePricePrompt',
  input: {schema: PredictHousePriceInputSchema},
  output: {schema: PredictHousePriceOutputSchema},
  prompt: `You are an expert real estate valuation AI. Your task is to predict the market price of a house based on its features.

Analyze the following property details and provide a realistic price prediction in USD.

- Property Type: {{propertyType}}
- Location (Zip Code): {{zipCode}}
- Square Footage: {{squareFootage}} sq ft
- Bedrooms: {{bedrooms}}
- Bathrooms: {{bathrooms}}
- Year Built: {{yearBuilt}}

Based on this information, calculate the estimated market value. Return only the predicted price.`,
});

const predictHousePriceFlow = ai.defineFlow(
  {
    name: 'predictHousePriceFlow',
    inputSchema: PredictHousePriceInputSchema,
    outputSchema: PredictHousePriceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('Unable to get a prediction from the model.');
    }
    return output;
  }
);
