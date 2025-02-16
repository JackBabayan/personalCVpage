import Provider from "@/components/provider"
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import "@/styles/global.scss";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Provider>
          <AuthProvider>
            <header >
              <Navbar/>
            </header>
            {children}
          </AuthProvider>
        </Provider>
      </body>
    </html>
  );
}
