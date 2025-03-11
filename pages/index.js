import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function Home() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    async function handleLogin() {
        const res = await signIn("credentials", {
            email,
            password,
            redirect: false, 
            callbackUrl: "/dashboard", 
        });

        console.log("Login Response:", res);

        if (res?.error) {
            alert("Login failed! Check your credentials.");
        } else {
            alert("Login successful! Redirecting...");
            window.location.href = res.url || "/dashboard"; 
        }
    }

    async function handleSignup() {
        const res = await fetch("/api/auth/signup", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();
        if (data?.error) {
            alert(data.error);
        } else {
            alert("Signup successful! Now log in.");
        }
    }

    return (
        <div>
            <h1>Cards Combine - Login</h1>
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleSignup}>Signup</button> 
        </div>
    );
}
