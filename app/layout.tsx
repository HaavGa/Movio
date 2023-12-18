import Navbar from "@/components/Navbar";
import ThemeProvider from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/providers/Providers";
import { Roboto } from "next/font/google";
import { cookies } from "next/headers";

import { Metadata } from "next";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import "./globals.css";
import { redirect } from "next/navigation";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Movio",
  description: "Search and bookmark your favorite movies",
};
const RootLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
          >
            <Navbar
              user={data?.session?.user as unknown as TUser["user"]}
            />
            <div className="grow p-10">
              {/* <Toolbar /> */}
              <div className="sm:ml-64">
                {/* <div>{category}</div> */}
                {children}
              </div>
            </div>
            <Toaster />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
