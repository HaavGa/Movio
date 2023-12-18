import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const DELETE = async (_: any, { params }: TParamsProps) => {
  const { id, displayCollection } = params;

  const supabase = createRouteHandlerClient({ cookies });

  const { error } = await supabase
    .from(displayCollection)
    .delete()
    .match({ id });

  return NextResponse.json({ error });
};
