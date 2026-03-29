import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createClient()
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
        redirect('/login')
    }

    // Check admin role
    const { data: profile } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single();

    // Uncomment for production:
    // if (profile?.role !== 'admin') {
    //   redirect('/dashboard')
    // }

    return (
        <div className="flex min-h-[calc(100vh-4rem)] flex-col md:flex-row">
            <aside className="w-full md:w-64 border-r border-border/40 bg-card p-6 flex flex-col gap-2">
                <h2 className="font-semibold px-2 mb-4 text-xs uppercase tracking-wider text-destructive border-l-2 border-destructive pl-2">Admin Panel</h2>
                <Link href="/admin" className="rounded-lg px-3 py-2 transition-colors hover:bg-accent hover:text-accent-foreground font-medium">
                    Analytics
                </Link>
                <Link href="/admin" className="rounded-lg px-3 py-2 transition-colors hover:bg-accent hover:text-accent-foreground font-medium">
                    User Management
                </Link>
                <Link href="/admin" className="rounded-lg px-3 py-2 transition-colors hover:bg-accent hover:text-accent-foreground font-medium">
                    Draw Management
                </Link>
                <Link href="/admin" className="rounded-lg px-3 py-2 transition-colors hover:bg-accent hover:text-accent-foreground font-medium">
                    Charity Management
                </Link>
                <Link href="/admin" className="rounded-lg px-3 py-2 transition-colors hover:bg-accent hover:text-accent-foreground font-medium">
                    Verify Winners
                </Link>
            </aside>
            <main className="flex-1 p-6 md:p-10 overflow-auto bg-background/50">
                {children}
            </main>
        </div>
    )
}
