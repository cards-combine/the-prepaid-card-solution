import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const { email, password } = credentials;

                // Authenticate user with Supabase
                let { data, error } = await supabase.auth.signInWithPassword({ email, password });

                if (error) {
                    console.error("Supabase Auth Error:", error.message);
                    throw new Error("Invalid email or password.");
                }

                return {
                    id: data.user.id,
                    email: data.user.email,
                };
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: { strategy: "jwt" },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.email = token.email;
            return session;
        },
        async redirect({ url, baseUrl }) {
            return "/dashboard"; // ✅ Forces redirect to dashboard
        },
    },
    pages: {
        signIn: "/", // Redirects failed logins back to login
    },
};

export default NextAuth(authOptions);
