"use client";

import { useEffect, useRef } from 'react';
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Flex, Text, Highlight, Center, Box, SimpleGrid, Grid } from "@chakra-ui/react"
import Image from 'next/image';
import gsap from 'gsap';

import styles from "./style.module.scss"

export default function ProjectItems() {


    return (

        <Box>
            <h5>
                Best Projects
            </h5>
            <Box>
                <Text>
                    My expertise includes React, TypeScript, Redux Toolkit, REST APIs, Next.js, Webpack,
                    Vite, Babel, and other technologies such as HTML, CSS, SCSS, LESS, Ant Design, GSAP, Chakra UI, MUI, and Tampermonkey.
                    I focus on writing clean, scalable, and maintainable code while ensuring optimal performance and usability. I also have experience
                    integrating REST APIs and utilizing various tools to streamline the development process.
                </Text>
            </Box>
        </Box>
    );
}
