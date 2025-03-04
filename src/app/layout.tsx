import Provider from "@/components/provider"
import { AuthProvider } from "@/context/AuthContext";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { fonts } from './fonts'

import "@/styles/scss/main.scss";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className={fonts.poppins.variable} suppressHydrationWarning>
      <body>
        <Provider>
          <AuthProvider>
            <Header />
            <main>
              {children}
            </main>
            <Footer/>
          </AuthProvider>
        </Provider>
      </body>
    </html>
  );
}
