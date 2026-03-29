'use client';

import { useState } from 'react';

export default function AdminPage() {
    const [runningDraw, setRunningDraw] = useState(false);

    const handleRunDraw = () => {
        setRunningDraw(true);
        setTimeout(() => {
            setRunningDraw(false);
            alert('Draw Executed! Winning numbers generated and pool distributed.');
        }, 2000);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">System Analytics & Controls</h1>
                <p className="text-muted-foreground mt-2">Manage the entire platform from this secure admin console.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 border-l-4 border-l-blue-500">
                    <h3 className="tracking-tight text-sm font-medium text-muted-foreground">Total Users</h3>
                    <div className="text-2xl font-bold mt-2">1,248</div>
                </div>
                <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 border-l-4 border-l-emerald-500">
                    <h3 className="tracking-tight text-sm font-medium text-muted-foreground">Active Subscriptions</h3>
                    <div className="text-2xl font-bold mt-2">1,029</div>
                </div>
                <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 border-l-4 border-l-primary">
                    <h3 className="tracking-tight text-sm font-medium text-muted-foreground">Prize Pool (May)</h3>
                    <div className="text-2xl font-bold mt-2">$12,500.00</div>
                </div>
                <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 border-l-4 border-l-rose-500">
                    <h3 className="tracking-tight text-sm font-medium text-muted-foreground">Charity Generated</h3>
                    <div className="text-2xl font-bold mt-2">$2,840.50</div>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-xl border bg-card shadow-sm p-6 border-destructive/20 relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-destructive/10 rounded-full blur-2xl"></div>
                    <h3 className="font-semibold text-xl mb-4 text-destructive">Draw Controls</h3>
                    <p className="text-muted-foreground mb-6 text-sm">Initiate the monthly draw algorithm. This action cannot be undone.</p>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center bg-muted/50 p-3 rounded-lg border">
                            <div>
                                <span className="block font-medium">May 2024 Draw</span>
                                <span className="text-xs text-muted-foreground">Status: Pending</span>
                            </div>
                            <button
                                onClick={handleRunDraw}
                                disabled={runningDraw}
                                className="bg-destructive text-destructive-foreground px-4 py-2 rounded-lg font-bold hover:bg-destructive/90 transition-all disabled:opacity-50"
                            >
                                {runningDraw ? 'Executing...' : 'Run Simulation'}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                    <h3 className="font-semibold text-xl mb-4">Pending Proof Verifications</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between border-b pb-3 border-border">
                            <div>
                                <div className="font-medium inline-flex items-center gap-2">
                                    user_1984
                                    <span className="bg-yellow-500 text-yellow-950 text-[10px] uppercase font-bold px-2 py-0.5 rounded">Matches 4</span>
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">Claim: $1,250.00</div>
                            </div>
                            <div className="flex gap-2">
                                <button className="text-xs border px-3 py-1.5 rounded-lg hover:bg-muted font-medium">View File</button>
                                <button className="text-xs bg-emerald-500 text-white px-3 py-1.5 rounded-lg hover:bg-emerald-600 font-medium">Approve</button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pb-3">
                            <div>
                                <div className="font-medium inline-flex items-center gap-2">
                                    user_7721
                                    <span className="bg-orange-500 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded">Matches 5 (Jackpot)</span>
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">Claim: $5,000.00</div>
                            </div>
                            <div className="flex gap-2">
                                <button className="text-xs border px-3 py-1.5 rounded-lg hover:bg-muted font-medium">View File</button>
                                <button className="text-xs bg-emerald-500 text-white px-3 py-1.5 rounded-lg hover:bg-emerald-600 font-medium">Approve</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
