"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Flex, Button } from "@chakra-ui/react"
import { LogoIcon } from "@/styles/icon"

import styles from "./header.module.scss"

export default function Header() {
    const { authStatus, logout } = useAuth();

    return (
        <header className={styles.header}>

            <Flex gap="15" align="center" justify="space-between" className={styles.navbarWrapper}>
                <Link href="/" className={styles.logo}>
                    <LogoIcon />
                </Link>
                <Flex gap="35" align="center">
                    {authStatus &&
                        <>
                            <Link href="/pokemon-page">Pokemon Page</Link>
                            <Link href="/about">About me</Link>
                            <Link href="/contact">Contact</Link>
                            <Link href="/projects">My projects</Link>
                        </>
                    }
                </Flex>
                {authStatus ? (
                    <Button onClick={logout} variant="outline">Logout</Button>
                ) : (
                    <Link href="/login"><Button variant="outline">Login</Button></Link>
                )}
            </Flex >
        </header>
    );
}
