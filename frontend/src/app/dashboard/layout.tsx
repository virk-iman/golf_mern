import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createClient()
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
        redirect('/login')
    }

    return (
        <div className="flex min-h-[calc(100vh-4rem)] flex-col md:flex-row">
            <aside className="w-full md:w-64 border-r border-border/40 bg-card p-6 flex flex-col gap-2">
                <h2 className="font-semibold px-2 mb-4 text-sm uppercase tracking-wider text-muted-foreground">User Panel</h2>
                <Link href="/dashboard" className="rounded-lg px-3 py-2 transition-colors hover:bg-accent hover:text-accent-foreground font-medium">
                    Overview
                </Link>
                <Link href="/dashboard/scores" className="rounded-lg px-3 py-2 transition-colors hover:bg-accent hover:text-accent-foreground font-medium">
                    My Scores
                </Link>
                <Link href="/dashboard/charity" className="rounded-lg px-3 py-2 transition-colors hover:bg-accent hover:text-accent-foreground font-medium">
                    Charity Settings
                </Link>
                <Link href="/dashboard/subscription" className="rounded-lg px-3 py-2 transition-colors hover:bg-accent hover:text-accent-foreground font-medium">
                    Subscription
                </Link>
                <Link href="/dashboard/winnings" className="rounded-lg px-3 py-2 transition-colors hover:bg-accent hover:text-accent-foreground font-medium">
                    Draws & Winnings
                </Link>
            </aside>
            <main className="flex-1 p-6 md:p-10 overflow-auto bg-background/50">
                {children}
            </main>
        </div>
    )
}
