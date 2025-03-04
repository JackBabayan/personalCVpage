"use client";

import { useEffect, useRef } from 'react';
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Flex, Text, Highlight, Box, SimpleGrid, Grid } from "@chakra-ui/react"
import Image from 'next/image';
import gsap from 'gsap';

import styles from "./style.module.scss"

export default function AboutMeInformation() {

    const textRef = useRef<HTMLDivElement>(null);
    const linkRef1 = useRef();
    const linkRef2 = useRef();

    const splitText = (text) => {
        return text.split('').map((letter, index) => (
            <span key={index} className={styles.letter}>
                {letter}
            </span>
        ));
    };

    useEffect(() => {
        if (!textRef.current) return;
    
        const letters = textRef.current.querySelectorAll("span");
    
        const tl = gsap.timeline();
    
        // Анимация букв
        tl.fromTo(
            letters,
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.01,
                ease: "power2.out",
                stagger: 0.01 
            }
        );
    
        tl.to(
            [linkRef1.current, linkRef2.current],
            {
                backgroundPosition: "100% 50%",
                duration: 1.5,
                ease: "power1.inOut"
            },
            "-=0.5" 
        );
    
    }, []);
    


    return (
        <section className={styles.wrapper}>
            <Grid templateColumns='2fr 3fr' gap={6} >
                <Box>
                    <h3>
                        Hey there, I’m
                    </h3>
                </Box>

                <SimpleGrid columns={2} spacing={20}>
                    <Box>
                        <h4>
                            Front-End & <br />React.js Developer
                        </h4>
                        <Text lineHeight='tall'>
                            <Highlight
                                query={['React', 'TypeScript', 'Redux ', 'Front-End Developer', 'Next.js', 'REST ', 'APIs', 'Saro', '8 years']}
                                styles={{ px: '2', py: '1', rounded: 'full', bg: 'teal.100' }}
                            >
                                I'm a Front-End Developer with 8 years of experience. Specializing in building modern, user-friendly, and high-performance interfaces. My expertise includes React, TypeScript, Redux Toolkit, Zustand.js , Next.js , REST APIs, Webpack,
                                Vite, Babel, Git, GitLab, HTML5 , CSS3 , LESS , SASS , Ant Design, GSAP, MUI, Chakra UI, Tampermonkey, and other technologies.
                            </Highlight>
                        </Text>
                    </Box>

                    <Box >
                        <h4>
                            Based in<br />
                            Armenia, Yerevan
                        </h4>
                        <Text lineHeight='tall'>
                            <Highlight
                                query={['personal CV website', 'portfolio', 'Feel free to explore']}
                                styles={{ px: '2', py: '1', rounded: 'full', bg: 'teal.100' }}
                            >
                                This is my personal CV website, where I share my skills, the technologies I work with, and showcase my portfolio. Feel free to explore and get to know my work!
                            </Highlight>
                        </Text>
                    </Box>
                </SimpleGrid>
            </Grid>
            <Box>
                <h1>
                    Saro Babayan
                </h1>
                <div className={styles.imageWrap}>
                    <div className={styles.textAbout} ref={textRef}>
                       {splitText("Hey! If you're interested and want to learn more about me, my skills, and the projects I've worked on, feel free to reach out.")}
                       <br/> 
                        {splitText("Just write to me and I will send you a login and password for ")}
                        <Link ref={linkRef1} href="/login">{splitText("authorization")}</Link> 
                        {splitText("on the site , or you can ")}
                        <Link ref={linkRef2} href="/file/SaroBabayan_FrontEnd_Dev_CV.pdf" target="_blank" download>
                        {splitText("Download my CV")}
                        </Link>
                        {splitText(", where everything is detailed.")}
                    </div>

                    <Image
                        width={400}
                        height={600}
                        style={{ objectFit: "cover" }}
                        src={'/images/sar2.png'}
                        alt='Saro Babayan'
                        quality={100}
                        unoptimized // Отключает оптимизацию
                    />
                </div>
            </Box>
        </section>
    );
}
