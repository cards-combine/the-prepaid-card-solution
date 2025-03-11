import { supabase } from "../../../lib/supabase";

export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).end();

    const { email, password } = JSON.parse(req.body);

    // Create user in Supabase
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
        return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ user: data.user });
}
