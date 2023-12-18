import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const AuthLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();
  if (data.session) {
    redirect("/");
  }
  return <>{children}</>;
};

export default AuthLayout;
