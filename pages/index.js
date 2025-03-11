import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Home() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    async function handleAuth(action) {
        const res = await axios.post("/api/auth", { email, password, action });
        if (res.data.user) router.push("/dashboard");
    }

    return (
        <div>
            <h1>Cards Combine Login</h1>
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={() => handleAuth("login")}>Login</button>
            <button onClick={() => handleAuth("signup")}>Signup</button>
        </div>
    );
}
