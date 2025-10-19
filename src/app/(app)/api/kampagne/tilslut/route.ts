import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
    const { name, email } = await req.json();
    const { error } = await supabase.from("signups").insert([{ name, email }]);
    if (error) return Response.json({ error }, { status: 400 });
    return Response.json({ success: true });
}
