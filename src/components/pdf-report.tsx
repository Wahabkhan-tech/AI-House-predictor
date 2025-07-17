"use client";

import type { z } from "zod";
import type { predictionFormSchema } from "./prediction-form";
import { Logo } from "./logo";
import { format } from "date-fns";

type FormValues = z.infer<typeof predictionFormSchema>;

type HistoryItem = {
    id: string;
    inputs: FormValues & { yearBuilt: number };
    prediction: string;
    timestamp: Date;
};

const DetailItem = ({ label, value }: { label: string; value: string | number | boolean }) => (
    <div className="flex justify-between py-3 border-b border-gray-200">
        <p className="text-gray-500">{label}</p>
        <p className="font-semibold text-gray-800">
            {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}
        </p>
    </div>
);

export function PdfReport({ item }: { item: HistoryItem }) {
    const { inputs, prediction, timestamp } = item;
    
    const propertyTypeMap: { [key: string]: string } = {
        single_family: "Single Family",
        condo: "Condo",
        townhouse: "Townhouse",
    };

    return (
        <div className="bg-white p-10 font-body text-gray-800" style={{ fontFamily: 'Inter, sans-serif' }}>
            <header className="flex justify-between items-center pb-6 border-b-2 border-gray-800">
                <Logo />
                <div className="text-right">
                    <h2 className="text-2xl font-bold text-gray-800">Valuation Report</h2>
                    <p className="text-sm text-gray-500">Generated: {format(timestamp, "PPP")}</p>
                </div>
            </header>
            
            <main className="py-8">
                <div className="text-center mb-10">
                    <p className="text-lg text-gray-600">Estimated Market Value</p>
                    <h1 className="text-6xl font-bold text-blue-600 my-2">{prediction}</h1>
                    <p className="text-sm text-gray-500">Based on data provided on {format(timestamp, "MM/dd/yyyy")}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Property Details</h3>
                    <div className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm">
                        <div>
                            <DetailItem label="Property Type" value={propertyTypeMap[inputs.propertyType]} />
                            <DetailItem label="Zip Code" value={inputs.zipCode} />
                            <DetailItem label="Square Footage" value={`${inputs.squareFootage.toLocaleString()} sq ft`} />
                             <DetailItem label="Lot Size" value={`${inputs.lotSize.toLocaleString()} sq ft`} />
                        </div>
                        <div>
                            <DetailItem label="Bedrooms" value={inputs.bedrooms} />
                            <DetailItem label="Bathrooms" value={inputs.bathrooms} />
                            <DetailItem label="Year Built" value={inputs.yearBuilt} />
                            <DetailItem label="Has Garage" value={inputs.hasGarage} />
                            <DetailItem label="Has Pool" value={inputs.hasPool} />
                        </div>
                    </div>
                </div>
            </main>

            <footer className="text-center pt-6 border-t border-gray-200 text-xs text-gray-400">
                <p>&copy; {new Date().getFullYear()} AI House Price Predictor. All Rights Reserved.</p>
                <p className="mt-1">This is an AI-generated estimate and not a formal appraisal. Values are for informational purposes only. Consult a real estate professional for a formal valuation.</p>
            </footer>
        </div>
    );
}
