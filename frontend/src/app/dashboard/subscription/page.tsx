export default function SubscriptionPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Subscription</h1>
                <p className="text-muted-foreground mt-2">Manage your billing and subscription plan.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <div className="border border-primary rounded-2xl p-8 bg-card shadow-md relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
                        Current Plan
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Monthly Member</h2>
                    <div className="flex items-baseline mb-6">
                        <span className="text-4xl font-extrabold">$25</span>
                        <span className="text-muted-foreground ml-1">/mo</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                        <li className="flex items-center text-sm"><span className="text-primary mr-2">✓</span> Track latest 5 scores</li>
                        <li className="flex items-center text-sm"><span className="text-primary mr-2">✓</span> Entry to all monthly draws</li>
                        <li className="flex items-center text-sm"><span className="text-primary mr-2">✓</span> Minimum 10% charity contribution</li>
                        <li className="flex items-center text-sm"><span className="text-primary mr-2">✓</span> Real-time leaderboard access</li>
                    </ul>
                    <button className="w-full bg-secondary text-secondary-foreground border font-semibold py-3 rounded-xl hover:bg-secondary/80 transition-colors">
                        Manage via Stripe
                    </button>
                </div>

                <div className="border rounded-2xl p-8 bg-card shadow-sm opacity-60">
                    <h2 className="text-2xl font-bold mb-2">Yearly Pro</h2>
                    <div className="flex items-baseline mb-6">
                        <span className="text-4xl font-extrabold">$250</span>
                        <span className="text-muted-foreground ml-1">/yr</span>
                        <span className="ml-2 text-xs text-primary font-semibold block bg-primary/10 px-2 py-0.5 rounded-full">Save 16%</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                        <li className="flex items-center text-sm"><span className="text-primary mr-2">✓</span> All Monthly features</li>
                        <li className="flex items-center text-sm"><span className="text-primary mr-2">✓</span> Exclusive annual jackpot entry</li>
                        <li className="flex items-center text-sm"><span className="text-primary mr-2">✓</span> VIP Charity Gala invite</li>
                    </ul>
                    <button className="w-full border-2 border-primary text-primary font-semibold py-3 rounded-xl hover:bg-primary/5 transition-colors">
                        Upgrade to Yearly
                    </button>
                </div>
            </div>
        </div>
    );
}
