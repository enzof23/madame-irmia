"use client";

import { Database } from "@/lib/database";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const supabaseClient = () => createClientComponentClient<Database>();
