"use client";

import { useRef, useEffect, useMemo } from 'react';
import Link from "next/link";
import ProjectItems from "@/components/projectItems";
import { Text, Center, Box, SimpleGrid, Button } from "@chakra-ui/react";
import { ArrowLeftTopIcon } from "@/styles/icon";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import styles from './style.module.scss'
// Инициализация ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function ProjectSection({ projects, loading, error }) {
    const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        if (projectRefs.current.length > 0) {
            projectRefs.current.forEach((ref) => {
                if (ref) {
                    gsap.fromTo(ref,
                        { opacity: 0, y: 50 },
                        {
                            opacity: 1,
                            y: 0,
                            x: 0,
                            duration: 1,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: ref,
                                start: "top 80%",
                                end: "bottom 20%",
                                toggleActions: "play none none reverse",
                            }
                        }
                    );
                }
            });
        }

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, [projects]);


    const projests = useMemo(() => {
        return projects?.map((item, index) => (
            <Box
                className={styles.wrapperItem}
                key={item.id}
                ref={(el) => {
                    projectRefs.current[index] = el;
                }}
                maxW={{ base: "100%", md: "66%" }}
                justifySelf={index % 2 === 0 ? "start" : "end"}
            >
                <ProjectItems project={item} />
            </Box>
        ));
    }, [projects]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Box as="section" className={styles.wrapper}>
            <Center className={styles.top}>
                <Box maxW="600px" textAlign="center">
                    <h2>Projects</h2>
                    <Box>
                        <Text>
                        This section presents projects that in my opinion deserve your attention. All of them are developed by React.js using Next.js for faster operation , optimization and SEO.
                        </Text>
                    </Box>
                </Box>
            </Center>
            <SimpleGrid columns={{ base: 1 }} gap={"100"} className={styles.content}>
                {projests}
            </SimpleGrid>
            <Center>
                <Link href="/projects">
                    <Button rightIcon={<ArrowLeftTopIcon />} variant="outline">
                        All Projects
                    </Button>
                </Link>
            </Center>
        </Box>
    );
}