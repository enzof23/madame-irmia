import { cookies } from "next/headers";
import {
  createRouteHandlerClient,
  createServerActionClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";

import type { Database } from "@/lib/database";

export const supabaseServer = () =>
  createServerComponentClient<Database>({ cookies });

export const supabaseRouteHandler = () =>
  createRouteHandlerClient<Database>({ cookies });

export const supabaseServerActions = () =>
  createServerActionClient<Database>({ cookies });
