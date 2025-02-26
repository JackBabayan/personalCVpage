"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Flex, Button } from "@chakra-ui/react"

import styles from "@/styles/navbar.module.scss"

export default function Navbar() {
    const { authStatus, logout } = useAuth();

    return (
        <Flex gap="4" align="center" justify="space-between" className={styles.navbarWrapper}>
            <Flex gap="8" align="center">
                <Link href="/">Home</Link>
                {authStatus &&
                    <>
                        <Link href="/pokemon-page">Pokemon Page</Link>
                        <Link href="/about">About me</Link>
                        <Link href="/contact">Contact</Link>
                        <Link href="/projects">My projects</Link>
                    </>
                }
            </Flex>
            <div>
                {authStatus ? (
                    <Button onClick={logout} colorScheme="green" variant="outline">Logout</Button>
                ) : (
                    <Link href="/login"><Button colorScheme="green" variant="outline">Login</Button></Link>
                )}
            </div>
        </Flex >
    );
}
