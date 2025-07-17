/**
 * @fileOverview Defines the data schemas and types for the house price prediction feature.
 *
 * - PredictHousePriceInputSchema - The Zod schema for the house price prediction input.
 * - PredictHousePriceInput - The TypeScript type for the prediction input.
 * - PredictHousePriceOutputSchema - The Zod schema for the house price prediction output.
 * - PredictHousePriceOutput - The TypeScript type for the prediction output.
 */

import {z} from 'genkit';

export const PredictHousePriceInputSchema = z.object({
  bedrooms: z.number().describe('The number of bedrooms.'),
  bathrooms: z.number().describe('The number of bathrooms.'),
  squareFootage: z.number().describe('The total square footage of the house.'),
  lotSize: z.number().describe('The total lot size in square feet.'),
  zipCode: z.string().describe('The 5-digit zip code of the property.'),
  propertyType: z.enum(['single_family', 'condo', 'townhouse']).describe('The type of property.'),
  yearBuilt: z.number().describe('The year the house was built.'),
  hasGarage: z.boolean().describe('Whether the property has a garage.'),
  hasPool: z.boolean().describe('Whether the property has a pool.'),
});
export type PredictHousePriceInput = z.infer<typeof PredictHousePriceInputSchema>;

export const PredictHousePriceOutputSchema = z.object({
  predictedPrice: z.number().describe('The predicted market price of the house in USD.'),
});
export type PredictHousePriceOutput = z.infer<typeof PredictHousePriceOutputSchema>;
