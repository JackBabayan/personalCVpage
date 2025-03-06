"use client";

import { useEffect, useRef } from 'react';
import Link from "next/link";
import { ArrowLeftTopIcon } from "@/styles/icon";
import { Flex, Text, Wrap, Box, WrapItem, Grid } from "@chakra-ui/react"
import Image from 'next/image';

import styles from "./style.module.scss"

export default function ProjectItems({ project }) {

    return (
        <Flex className={styles.wrapper} gap={'30'}>
            <Image
                width={400}
                height={300}
                style={{ objectFit: "contain" }}
                src={project?.image ? project?.image : '/images/sar2.png'}
                alt='Saro Babayan'
                quality={100}
                unoptimized // Отключает оптимизацию
            />
            <Box>
                <h5>
                    {project?.name}
                </h5>
                <Text className={styles.text}>
                    {project?.description}
                </Text>

                <Wrap spacing=' 5px 20px' className={styles.wrapperTechnology}>
                    {project?.technologies?.map((item, id) => {
                        return (
                            <WrapItem key={id}>
                                {item}
                            </WrapItem>
                        )
                    })}
                </Wrap>

                <Link href={project?.url}>{project?.url} <ArrowLeftTopIcon /></Link>
            </Box>
        </Flex>
    );
}
