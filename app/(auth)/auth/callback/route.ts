import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

import type { NextRequest } from "next/server";
import type { Database } from "@/lib/database";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = createRouteHandlerClient<Database>({ cookies });
    await supabase.auth.exchangeCodeForSession(code);
  }

  const next = requestUrl.searchParams.get("next");

  if (next) {
    return NextResponse.redirect(`${requestUrl.origin}${next}`);
  } else {
    return NextResponse.redirect(requestUrl.origin);
  }
}
