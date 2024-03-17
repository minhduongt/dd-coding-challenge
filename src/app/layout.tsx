import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "@/theme/index";
import ContextProviders from "@/contexts";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Drag & Drop",
  description: "Created by dtminh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppRouterCacheProvider>
            <ContextProviders>{children}</ContextProviders>
          </AppRouterCacheProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
