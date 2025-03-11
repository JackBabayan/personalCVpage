"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Flex, Button, Box } from "@chakra-ui/react";
import { LogoIcon } from "@/styles/icon";
import { motion } from "framer-motion";

import styles from "./header.module.scss";

export default function Header() {
    const { authStatus, logout } = useAuth();
    const pathname = usePathname();

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/experience", label: "Experience" },
        { href: "/about", label: "About Me" },
        { href: "/projects", label: "My Projects" },
        { href: "/contact", label: "Contact" },
    ];

    if (authStatus) {
        navLinks.splice(4, 0, { href: "/my-biography", label: "My Biography" });
    }

    return (
        <header className={styles.header}>
            <Flex gap="15" align="center" justify="space-between" className={styles.navbarWrapper}>
                <Link href="/" className={styles.logo}>
                    <LogoIcon />
                </Link>

                <Box position="relative">
                    <Flex gap="35" align="center" position="relative">
                        {navLinks.map(({ href, label }) => (
                            <Link key={href} href={href} className={styles.navLink}>
                                {label}
                                {pathname === href && (
                                    <motion.div
                                        layoutId="activeIndicator"
                                        className={styles.underline}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </Link>
                        ))}
                    </Flex>
                </Box>

                <Flex gap="25">
                    <Link href="/file/SaroBabayan_FrontEnd_Dev_CV.pdf" target="_blank" download>
                        <Button colorScheme="teal" variant="solid">
                            Download CV
                        </Button>
                    </Link>
                    {authStatus ? (
                        <Button onClick={logout} variant="outline">Logout</Button>
                    ) : (
                        <Link href="/login">
                            <Button variant="outline">Login</Button>
                        </Link>
                    )}
                </Flex>
            </Flex>
        </header>
    );
}
