"use client";

import { useEffect, useRef } from 'react';
import Link from "next/link";
import { Text, Highlight, Box, SimpleGrid, Grid } from "@chakra-ui/react";
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import styles from "./style.module.scss";

export default function AboutMeInformation() {
    const textRef = useRef<HTMLDivElement | null>(null);
    const linkRef = useRef<HTMLAnchorElement | null>(null);
    const container = useRef<HTMLDivElement | null>(null);

    const splitText = (text: string) =>
        text.split('').map((letter, index) => (
            <span key={index} className={styles.letter}>
                {letter}
            </span>
        ));

    useEffect(() => {
        if (!container.current) return;

        setTimeout(() => {
            if (!textRef.current) return; 

            const letters = textRef.current.querySelectorAll("span");
            if (letters.length === 0) return; 

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container.current,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse",
                    // markers: true
                },
            });

            tl.fromTo(
                letters,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 0.01, ease: "power2.out", stagger: 0.01 }
            );

            if (linkRef.current) {
                tl.to(linkRef.current, {
                    backgroundPosition: "100% 50%",
                    duration: 1,
                    ease: "power1.inOut",
                }, "-=0.05");
            }
        }, 100); // Даем 100ms на рендер

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <section className={styles.wrapper} ref={container}>
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
                                query={['React.js', 'React Native', 'TypeScript', 'Redux ', 'Front-End Developer', 'Next.js', 'REST ', 'APIs', 'Saro', '8 years']}
                                styles={{ px: '2', py: '1', rounded: 'full', bg: 'teal.100' }}
                            >
                                I'm a Front-End Developer with 8 years of experience. Specializing in building modern, user-friendly, and high-performance interfaces. My expertise includes React.js, React Native, TypeScript, Redux Toolkit, Zustand.js , Next.js , REST APIs, Webpack,
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
                <h1>Saro Babayan</h1>
                <div className={styles.imageWrap}>
                    <div className={styles.textAbout} ref={textRef}>
                        {splitText("Hey! If you're curious about my background—here’s a bit about my education. I studied Economic-Mathematical methods, Accounting, Analysis, and Audit at the Plekhanov Russian University of Economics (2013 – 2017) in Yerevan, Armenia. This gave me strong analytical skills, which later helped in my development career.")}<br/>
                        {splitText("I initially started in finance, but quickly realized that building digital products was my true passion. So, I switched to front-end development, and it’s been the best decision ever!")}<br/>
                        {splitText("Want to dive deeper into my experience? Check out my full resume : ")}
                        
                        <Link ref={linkRef} href="/file/SaroBabayan_FrontEnd_Dev_CV.pdf" target="_blank" download>
                            {splitText("Download CV")}
                        </Link>
                    </div>

                    <Image
                        width={400}
                        height={600}
                        style={{ objectFit: "cover" }}
                        src={'/images/sar2.png'}
                        alt='Saro Babayan'
                        quality={100}
                        unoptimized
                    />
                </div>
            </Box>
        </section>
    );
}
