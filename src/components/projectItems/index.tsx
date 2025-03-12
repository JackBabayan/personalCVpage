"use client";

import { useState } from 'react';
import Link from "next/link";
import { ArrowLeftTopIcon } from "@/styles/icon";
import { Flex, Text, Wrap, Box, WrapItem } from "@chakra-ui/react"
import Image from 'next/image';

import styles from "./style.module.scss"

type projectTypes = {
    id: number;
    name: string;
    description: string;
    url: string;
    image: string;
    technologies: string[];
}

type ProjectItemsProps = {
    project: projectTypes;
}

export default function ProjectItems({ project }: ProjectItemsProps) {

    const [isExpanded, setIsExpanded] = useState(false);
    const MAX_LENGTH = 100;


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
                <h4>
                    {project?.name}
                </h4>
                <Text className={styles.text}>
                    {isExpanded ? project?.description : project?.description.slice(0, MAX_LENGTH) + (project?.description.length > MAX_LENGTH ? "... " : " ")}&nbsp;

                    {project?.description.length > MAX_LENGTH && (
                        <span onClick={() => setIsExpanded(!isExpanded)} >
                            {isExpanded ? "Hide" : "Show more"}
                        </span>
                    )}
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
        </Flex >
    );
}
