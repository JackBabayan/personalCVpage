"use client";

import { useEffect, useRef, useMemo } from 'react';
import Link from "next/link";
import ProjectItems from "@/components/projectItems";
import { Flex, Text, Highlight, Center, Box, SimpleGrid, Grid, Button } from "@chakra-ui/react"
import Image from 'next/image';
import gsap from 'gsap';

import { ArrowLeftTopIcon } from "@/styles/icon"


import styles from "./style.module.scss"

export default function ProjectSection() {

    const arr = [1, 2, 3, 4, 5, 6, , 7]

    const projests = useMemo(() => {
        return (
            arr.map((item, ind) => {
                return <ProjectItems key={ind} />
            })
        )

    }, [arr])

    return (
        <section className={styles.wrapper}>
            <Center >
                <Box maxW='600px' textAlign={'center'}>
                    <h2>
                        Projects
                    </h2>
                    <Box>
                        <Text>
                            My expertise includes React, TypeScript, Redux Toolkit, REST APIs, Next.js, Webpack,
                            Vite, Babel, and other technologies such as HTML, CSS, SCSS, LESS, Ant Design, GSAP, Chakra UI, MUI, and Tampermonkey.
                            I focus on writing clean, scalable, and maintainable code while ensuring optimal performance and usability. I also have experience
                            integrating REST APIs and utilizing various tools to streamline the development process.
                        </Text>
                    </Box>
                </Box>
            </Center>
            {projests}
            <Center >
                <Link href="/projects">
                    <Button rightIcon={<ArrowLeftTopIcon />} variant="outline">
                        All Projects
                    </Button>
                </Link>
            </Center>
        </section>
    );
}
