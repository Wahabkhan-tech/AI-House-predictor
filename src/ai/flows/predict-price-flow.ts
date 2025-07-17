'use server';
/**
 * @fileOverview A house price prediction AI agent.
 *
 * - predictHousePrice - A function that handles the house price prediction process.
 */

import {ai} from '@/ai/genkit';
import { 
    PredictHousePriceInputSchema, 
    PredictHousePriceOutputSchema,
    PredictHousePriceInput,
    PredictHousePriceOutput 
} from '@/ai/schemas/house-price-schema';


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
