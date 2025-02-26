import Provider from "@/components/provider"
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import { fonts } from './fonts'

import "@/styles/global.scss";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className={fonts.rubik.variable} suppressHydrationWarning>
      <body>
        <Provider>
          <AuthProvider>
            <header >
              <Navbar/>
            </header>
            {children}
            <footer >
              footer
            </footer>
          </AuthProvider>
        </Provider>
      </body>
    </html>
  );
}
