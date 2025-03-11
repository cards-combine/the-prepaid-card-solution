import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { supabase } from "../../../lib/supabase";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Email",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const { email, password } = credentials;

                // Authenticate user with Supabase
                const { data, error } = await supabase.auth.signInWithPassword({ email, password });

                if (error || !data.user) {
                    throw new Error("Invalid email or password");
                }

                return { id: data.user.id, email: data.user.email };
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: { strategy: "jwt" },
    callbacks: {
        async session({ session, token }) {
            session.user.id = token.sub;
            return session;
        },
    },
};

export default NextAuth(authOptions);
