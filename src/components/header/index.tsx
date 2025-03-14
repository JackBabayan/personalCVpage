"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
    Flex, Button, Box, Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerBody,
    DrawerFooter,
    useDisclosure
} from "@chakra-ui/react";
import { LogoIcon } from "@/styles/icon";
import { HamburgerIcon } from '@chakra-ui/icons';
import { motion } from "framer-motion";
import useStore from '@/store/store';

import styles from "./header.module.scss";

export default function Header() {

    const { winWidth, setWindowWidth } = useStore();

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


    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, [setWindowWidth]);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef<HTMLButtonElement | null>(null); // Указал тип для useRef

    return (
        <header className={styles.header}>
            <Flex gap="15" align="center" justify="space-between" className={styles.navbarWrapper}>
                <Link href="/" className={styles.logo}>
                    <LogoIcon />
                </Link>

                {
                    winWidth > 1024 ?
                        <>
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
                        </>
                        :
                        <>
                        <Button ref={btnRef} variant="outline" onClick={onOpen}>
                          <HamburgerIcon/>
                        </Button>
                        <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
                          <DrawerOverlay />
                          <DrawerContent bg="gray.50" p={4}>
                            <DrawerCloseButton />
                            <DrawerBody mt={"30px"}>
                              {navLinks.map(({ href, label }) => (
                                <Link key={href} href={href} passHref>
                                  <motion.div
                                    className="nav-link"
                                    whileHover={{ scale: 1.05 }}
                                    style={{
                                      padding: '10px 15px',
                                      marginBottom: '10px',
                                      borderRadius: '8px',
                                      backgroundColor: pathname === href ? '#E2E8F0' : 'transparent',
                                      transition: 'background-color 0.2s ease-in-out',
                                    }}
                                  >
                                    {label}
                                  </motion.div>
                                </Link>
                              ))}
                            </DrawerBody>
                            <DrawerFooter display="flex" justifyContent="space-between">
                              <Link href="/file/SaroBabayan_FrontEnd_Dev_CV.pdf" target="_blank" download>
                                <Button colorScheme="teal" variant="solid">
                                  Download CV
                                </Button>
                              </Link>
                              {authStatus ? (
                                <Button onClick={logout} variant="outline">
                                  Logout
                                </Button>
                              ) : (
                                <Link href="/login">
                                  <Button variant="outline">Login</Button>
                                </Link>
                              )}
                            </DrawerFooter>
                          </DrawerContent>
                        </Drawer>
                      </>
                }
            </Flex>
        </header>
    );
}
