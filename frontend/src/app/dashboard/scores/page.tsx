'use client';

import { useState } from 'react';

export default function ScoresPage() {
    const [score, setScore] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // API call to backend /api/scores/add
        alert(`Score ${score} for ${date} submitted!`);
        setScore('');
        setDate('');
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Manage Scores</h1>
                <p className="text-muted-foreground mt-2">Enter your latest 5 Stableford scores. The oldest will automatically be replaced.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1 border rounded-xl p-6 bg-card shadow-sm h-fit">
                    <h2 className="text-xl font-semibold mb-4">Add Score</h2>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="text-sm font-medium mb-1 block">Stableford Score (1-45)</label>
                            <input
                                type="number"
                                min="1"
                                max="45"
                                required
                                value={score}
                                onChange={(e) => setScore(e.target.value)}
                                className="w-full bg-background border rounded-lg px-3 py-2 text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium mb-1 block">Date Played</label>
                            <input
                                type="date"
                                required
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full bg-background border rounded-lg px-3 py-2 text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-primary text-primary-foreground font-semibold py-2.5 rounded-lg hover:bg-primary/90 transition-colors"
                        >
                            Submit Score
                        </button>
                    </form>
                </div>

                <div className="md:col-span-2 border rounded-xl p-6 bg-card shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">Your Recent Scores (Max 5)</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
                                <tr>
                                    <th className="px-4 py-3 rounded-tl-lg">Date</th>
                                    <th className="px-4 py-3">Score</th>
                                    <th className="px-4 py-3 rounded-tr-lg">Avg Impact</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b">
                                    <td className="px-4 py-3">2024-05-12</td>
                                    <td className="px-4 py-3 font-semibold text-primary">32</td>
                                    <td className="px-4 py-3 text-emerald-500">+1.2</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="px-4 py-3">2024-05-05</td>
                                    <td className="px-4 py-3 font-semibold text-primary">28</td>
                                    <td className="px-4 py-3 text-red-500">-0.4</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="px-4 py-3">2024-04-28</td>
                                    <td className="px-4 py-3 font-semibold text-primary">35</td>
                                    <td className="px-4 py-3 text-emerald-500">+2.1</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
