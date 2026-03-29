import { createClient } from '@/utils/supabase/server'

export default async function DashboardOverview() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    // Fetch subscription, scores summary, etc from backend API in a real app
    // Here we mock the visual components initially

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
                <p className="text-muted-foreground mt-2">Welcome back, {user?.email}</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                    <h3 className="tracking-tight text-sm font-medium text-muted-foreground">Subscription Status</h3>
                    <div className="text-2xl font-bold mt-2 text-primary">Active</div>
                </div>
                <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                    <h3 className="tracking-tight text-sm font-medium text-muted-foreground">Latest Score</h3>
                    <div className="text-2xl font-bold mt-2">32 pts</div>
                </div>
                <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                    <h3 className="tracking-tight text-sm font-medium text-muted-foreground">Charity Contribution</h3>
                    <div className="text-2xl font-bold mt-2 text-rose-500">15%</div>
                </div>
                <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                    <h3 className="tracking-tight text-sm font-medium text-muted-foreground">Total Winnings</h3>
                    <div className="text-2xl font-bold mt-2 text-blue-500">$0.00</div>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                    <h3 className="font-semibold text-lg mb-4">Recent Scores</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between border-b pb-2">
                            <span className="text-muted-foreground">12 May 2024</span>
                            <span className="font-medium">32 pts</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                            <span className="text-muted-foreground">05 May 2024</span>
                            <span className="font-medium">28 pts</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                            <span className="text-muted-foreground">28 Apr 2024</span>
                            <span className="font-medium">35 pts</span>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                    <h3 className="font-semibold text-lg mb-4">Upcoming Draw</h3>
                    <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-lg border border-primary/20">
                        <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">MAY 31</span>
                        <span className="text-muted-foreground mt-2">Current Prize Pool: $12,500</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
