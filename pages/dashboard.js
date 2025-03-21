import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabase";

export default function Dashboard() {
    const { data: session, status } = useSession();
    const [balance, setBalance] = useState(0);
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.replace("/"); // ✅ Redirect to login if not authenticated
        } else if (session?.user?.id) {
            async function fetchBalance() {
                const { data } = await supabase.from("users").select("balance").eq("id", session?.user?.id).single();
                if (data) setBalance(data.balance);
            }
            fetchBalance();
        }
    }, [session, status, router]);

    if (status === "loading") return <p>Loading...</p>;

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome, {session?.user?.email}</p>
            <p>Your Balance: ${balance.toFixed(2)}</p>
            <button onClick={() => signOut()}>Logout</button>
        </div>
    );
}
