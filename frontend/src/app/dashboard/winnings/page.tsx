export default function WinningsPage() {
    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Draws & Winnings</h1>
                <p className="text-muted-foreground mt-2">View upcoming draws, past results, and your prize payouts.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <div className="md:col-span-2 space-y-6">
                    <div className="border rounded-2xl p-6 bg-card shadow-sm border-primary/50">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
                            Current Draw (May 2024)
                        </h2>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <div className="bg-muted rounded-xl p-4 text-center">
                                <div className="text-xs text-muted-foreground uppercase font-bold mb-1">Status</div>
                                <div className="font-semibold text-emerald-500">Active</div>
                            </div>
                            <div className="bg-muted rounded-xl p-4 text-center">
                                <div className="text-xs text-muted-foreground uppercase font-bold mb-1">Your Entries</div>
                                <div className="font-semibold text-lg">5</div>
                            </div>
                            <div className="bg-muted rounded-xl p-4 text-center">
                                <div className="text-xs text-muted-foreground uppercase font-bold mb-1">Est. Pool</div>
                                <div className="font-semibold text-lg text-primary">$12,500</div>
                            </div>
                            <div className="bg-muted rounded-xl p-4 text-center">
                                <div className="text-xs text-muted-foreground uppercase font-bold mb-1">Draw Date</div>
                                <div className="font-semibold text-lg">May 31</div>
                            </div>
                        </div>
                    </div>

                    <div className="border rounded-2xl p-6 bg-card shadow-sm">
                        <h2 className="text-xl font-bold mb-4">Past Results</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
                                    <tr>
                                        <th className="px-4 py-3 rounded-tl-lg">Month</th>
                                        <th className="px-4 py-3">Winning Numbers</th>
                                        <th className="px-4 py-3">Your Result</th>
                                        <th className="px-4 py-3 rounded-tr-lg">Prize</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b">
                                        <td className="px-4 py-4 font-medium">April 2024</td>
                                        <td className="px-4 py-4 tracking-widest font-mono text-primary bg-primary/10 rounded px-2 w-fit inline-block my-2">12 04 35 21 08</td>
                                        <td className="px-4 py-4"><span className="bg-yellow-500/20 text-yellow-600 px-2 py-1 rounded text-xs font-bold">3 Matches</span></td>
                                        <td className="px-4 py-4 font-semibold">$125.00</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="px-4 py-4 font-medium">March 2024</td>
                                        <td className="px-4 py-4 tracking-widest font-mono text-primary bg-primary/10 rounded px-2 w-fit inline-block my-2">05 18 22 41 11</td>
                                        <td className="px-4 py-4 text-muted-foreground">0 Matches</td>
                                        <td className="px-4 py-4 text-muted-foreground">-</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-1 space-y-6">
                    <div className="border rounded-2xl p-6 bg-card shadow-sm flex flex-col h-full">
                        <h2 className="text-xl font-bold mb-6">Winnings Wallet</h2>

                        <div className="flex-1 flex flex-col items-center justify-center py-8">
                            <span className="text-sm text-muted-foreground uppercase font-medium tracking-wide mb-2">Available Balance</span>
                            <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">$125.00</span>
                        </div>

                        <div className="space-y-3 mt-auto">
                            <button className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-xl hover:bg-primary/90 transition-colors">
                                Withdraw Funds
                            </button>
                            <button className="w-full border text-foreground font-semibold py-3 rounded-xl hover:bg-accent transition-colors">
                                Donate to Charity
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
