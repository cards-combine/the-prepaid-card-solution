import { supabase } from "../../lib/supabase";

export default async function handler(req, res) {
    const { email, password, action } = req.body;

    if (action === "signup") {
        const { user, error } = await supabase.auth.signUp({ email, password });
        if (error) return res.status(400).json({ error: error.message });
        return res.json({ user });
    }

    if (action === "login") {
        const { user, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) return res.status(400).json({ error: error.message });
        return res.json({ user });
    }
}
