"use client"

import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import { ThemeProvider } from "next-themes"

const theme = extendTheme({
  fonts: {
    heading: 'var(--font-rubik)',
    body: 'var(--font-rubik)',
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "bold",
      },
      variants: {
        solid: {
          bg: "black",
          color: "white",
          _hover: { bg: "gray.700" },
        },
      },
    },
    Input: {
      baseStyle: {
        field: {
          border: "2px solid",
          borderColor: "gray.300",
          _hover: {
            borderColor: "black.500",
            boxShadow: "0 0 0 2px rgb(0 0 0 / 13%)",
          },
          _focus: {
            borderColor: "black.700",
            boxShadow: "0 0 0 2px rgb(0 0 0 / 13%)",
          },
          _focusVisible: {
            borderColor: "black.700",
            boxShadow: "0 0 0 2px rgb(0 0 0 / 13%)",
          },
        },
      },
    },
    Textarea: {
      baseStyle: {
          border: "2px solid",
          borderColor: "gray.300",
          _hover: {
            borderColor: "black.700",
            boxShadow: "0 0 0 2px rgb(0 0 0 / 13%)",
          },
          _focus: {
            borderColor: "black.700",
            boxShadow: "0 0 0 2px rgb(0 0 0 / 13%)",
          },
          _focusVisible: {
            borderColor: "black.700",
            boxShadow: "0 0 0 2px rgb(0 0 0 / 13%)",
          },
      },
  }
  },

}) // Кастомная тема, можно добавить стили

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      <ThemeProvider attribute="class" disableTransitionOnChange defaultTheme="light">
        {children}
      </ThemeProvider>
    </ChakraProvider>
  )
}
