"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

import { MotionPathPlugin } from "gsap/MotionPathPlugin";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Box, Flex, Text } from "@chakra-ui/react"
import { LinkedinIcon, TelegramIcon, InstagramIcon, ArrowLeftTopIcon, MoveArrowIcon } from "@/styles/icon"

import styles from "./footer.module.scss"
gsap.registerPlugin(MotionPathPlugin);

export default function Footer() {
    const { authStatus } = useAuth();
    const rectRef = useRef<SVGRectElement>(null);

    useEffect(() => {
        if (!rectRef.current) return;

        gsap.to(rectRef.current, {
            duration: 1,
            repeat: -1,
            repeatDelay: 0.4,
            yoyo: true,
            ease: "power1.inOut",
            motionPath: {
                path: "#path",
                align: "#path",
                autoRotate: -150,
                alignOrigin: [0.5, 0.5],
            },
        });
    }, []);

    return (
        <footer className={styles.footer}>
            <Flex gap="8" align="center" justify="space-between" className={styles.footerTop}>
                <Box>
                    <Link href="mailto:saro.babayan.95@gmail.com" className={styles.footerMailLink}>
                        saro.babayan.95@gmail.com
                        <ArrowLeftTopIcon />
                        <div className={styles.moveIcon}>
                            <svg viewBox="0 0 337.21 194.22" preserveAspectRatio="none">
                                <path ref={rectRef} d="M214.1,38.06c-36.79-5.14-69.86-2.83-98.28,6.86A147.59,147.59,0,0,0,56.67,82.21a153.93,153.93,0,0,0-33,51.8L10.47,107.45,3.31,111l16.11,32.34,3.26,7.22L61.55,133l-3.29-7.29L30.73,138.17a147,147,0,0,1,32-50.67,139.8,139.8,0,0,1,56-35.09C145.81,43.2,177.56,41,213,46l4,.55,1.1-7.92Z" ></path>
                                <path id="path" strokeWidth="8px" fill="none" stroke="none" d="M148.42,36.08C127.27,39.66,104,47.64,82.5,64.3A149.62,149.62,0,0,0,63.28,82.18">
                                </path>

                            </svg>
                        </div>
                    </Link>
                </Box>
                <div className={styles.contactWithMe}>Contact me and we can collaborate</div>
                <Flex gap="25" align="center" className={styles.footerSocialIconWrap}>
                    <Link aria-label="social" href="https://t.me/Jack9690" target="_blank" className={styles.footerSocialLink}>
                        <TelegramIcon />
                    </Link>
                    <Link aria-label="social" href="https://www.instagram.com/babayansaro/" target="_blank" className={styles.footerSocialLink}>
                        <InstagramIcon />
                    </Link>
                    <Link aria-label="social" href="www.linkedin.com/in/saro-babayan-8b646519b" target="_blank" className={styles.footerSocialLink}>
                        <LinkedinIcon />
                    </Link>
                </Flex>
            </Flex>

            <Flex gap="8" align="center" justify="space-between" className={styles.footerBottom}>
                <Flex gap="8" align="center">
                    <Text fontSize='sm'>
                        © 2025 · SaroBabyan · All rights reserved
                    </Text>
                </Flex>
                <Flex gap="8" align="center" className={styles.footerNavBar}>

                    <Link href="/">Home </Link>
                    <Link href="/experience">Experience</Link>
                    <Link href="/about">About me</Link>
                    <Link href="/projects">My projects</Link>
                    {
                        authStatus &&
                        <Link href="/my-biography">My Biography</Link>
                    }
                    <Link href="/contact">Contact</Link>

                </Flex>

                <Text fontSize='sm'>
                    Designed by Me
                </Text>
            </Flex>


        </footer >
    );
}
