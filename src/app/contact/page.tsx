"use client";

import { useEffect, useRef } from "react";
import { LoveIcon } from "@/styles/icon"; // Проверь правильность импорта
import gsap from 'gsap';

import EmailForm from "@/components/emailForm";
import { Box, Flex } from "@chakra-ui/react";
import styles from "./style.module.scss";

export default function Contact() {
  const titleRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!titleRef.current || !leftRef.current || !rightRef.current) return;

    const tl = gsap.timeline();

    const tl2 = gsap.timeline({
      duration: 0.5,
      ease: "power2.out"
    });

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: "300px" },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );

    tl2.add([
      gsap.fromTo(
        leftRef.current,
        { x: 0, top: "-50px", bottom: "-7px", rotate: 0, transformOrigin: "right bottom" },
        { x: "-300px", top: 0, bottom: "-50px", rotate: -13, transformOrigin: "right bottom" }
      ),
      gsap.fromTo(
        rightRef.current,
        { x: 0, top: "-50px", bottom: "-7px", rotate: 0, transformOrigin: "left bottom" },
        { x: "300px", top: 0, bottom: "-50px", rotate: 13, transformOrigin: "left bottom" }
      )
    ]);

    return () => {
      tl.kill();
      tl2.kill();
    };
  }, []);

  return (
    <section className={styles.contactWrapper}>
      <Flex justifyContent={"center"} mb={10}>
        <h3 ref={titleRef}>Contact me</h3>
      </Flex>
      <Box className={styles.container}>
        <div className={styles.left} ref={leftRef}>
          <LoveIcon />
        </div>
        <div className={styles.right} ref={rightRef}>
          <LoveIcon />
        </div>
        <EmailForm />
      </Box>
    </section>
  );
}
