import Navbar from "@/components/Navbar";
import ThemeProvider from "@/components/ThemeProvider";
import { Providers } from "@/providers/Providers";
import { Roboto } from "next/font/google";

import { Metadata } from "next";

import "./globals.css";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

// export const generateMetadata = () => {
// const headersList = headers();
// console.log(headersList);
// // read the custom x-url header
// const header_url = headersList.get("x-url") || "";
// const equalIndex = header_url.indexOf("=");

// // Get the substring starting from the index after "="
// const category = header_url
//   .substring(equalIndex + 1)
//   .replace("+", " ");

// console.log(category);

// return {
//   title: `Movio | ${category}`,
// };
// };

export const metadata: Metadata = {
  title: "Movio",
  description: "Search and bookmark your favorite movies",
};
const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
          >
            <Navbar />
            <div className="grow p-10">
              {/* <Toolbar /> */}
              <div className="sm:ml-64">
                {/* <div>{category}</div> */}
                {children}
              </div>
            </div>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
