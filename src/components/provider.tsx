"use client"

import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import { ThemeProvider } from "next-themes"

const theme = extendTheme({
  fonts: {
    heading: 'var(--font-rubik)',
    body: 'var(--font-rubik)',
  }
  
}) // Кастомная тема, можно добавить стили

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </ChakraProvider>
  )
}
