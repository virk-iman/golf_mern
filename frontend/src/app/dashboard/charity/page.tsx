'use client';

import { useState } from 'react';

export default function CharityPage() {
    const [contributionPct, setContributionPct] = useState(15);

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Charity Impact</h1>
                <p className="text-muted-foreground mt-2">Manage your chosen charity and monthly contribution percentage.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="border rounded-2xl p-6 bg-card shadow-sm">
                    <h2 className="text-xl font-semibold mb-6">Contribution Level</h2>

                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Percentage of Pool</span>
                        <span className="text-2xl font-bold text-primary">{contributionPct}%</span>
                    </div>

                    <input
                        type="range"
                        min="10"
                        max="100"
                        value={contributionPct}
                        onChange={(e) => setContributionPct(Number(e.target.value))}
                        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary mb-6"
                    />

                    <p className="text-sm text-muted-foreground mb-6">
                        A minimum of 10% is required. Increasing this percentage means more of your potential winnings go directly to your selected charity.
                    </p>

                    <button className="w-full bg-primary text-primary-foreground font-semibold py-2.5 rounded-lg hover:bg-primary/90 transition-colors">
                        Save Preference
                    </button>
                </div>

                <div className="border rounded-2xl p-6 bg-card shadow-sm flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold">Selected Charity</h2>
                        <button className="text-sm text-primary font-medium hover:underline">Change</button>
                    </div>

                    <div className="flex-1 border rounded-xl overflow-hidden bg-muted/30">
                        <div className="h-32 bg-rose-500/20 w-full flex items-center justify-center">
                            <span className="text-4xl text-rose-500 font-bold tracking-widest">WWF</span>
                        </div>
                        <div className="p-4">
                            <h3 className="font-bold text-lg">World Wildlife Fund</h3>
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-3">
                                Conserving nature and reducing the most pressing threats to the diversity of life on Earth.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
