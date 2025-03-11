import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import axios from "axios";

export default function Dashboard() {
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        async function fetchBalance() {
            const { data } = await supabase.from("users").select("balance").single();
            setBalance(data?.balance || 0);
        }
        fetchBalance();
    }, []);

    return (
        <div>
            <h1>Your Balance: ${balance.toFixed(2)}</h1>
            <button onClick={() => axios.post("/api/deposit")}>Deposit Funds</button>
            <button onClick={() => axios.post("/api/redeem")}>Redeem Gift Card</button>
            <button onClick={() => axios.post("/api/withdraw")}>Withdraw to PayPal</button>
        </div>
    );
}
