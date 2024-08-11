import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from "$env/static/public";
import { createBrowserClient, isBrowser } from "@supabase/ssr";
import type { LayoutLoad } from "./$types";

export const ssr = false;

export const load: LayoutLoad = async ({ fetch, data, depends }) => {
    depends('supabase:auth');
    
    const supabase = createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
        global: { fetch }
    });

    const {
        data: { session }
    } = await supabase.auth.getSession();

    return { supabase, session };
};