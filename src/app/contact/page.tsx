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

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: "300px" },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );

    tl.to([leftRef.current, rightRef.current], {
      duration: 0.2,
      ease: "power2.out",
      stagger: 0.3,
    });

    const leftAnim = gsap.fromTo(
      leftRef.current,
      { x: 0, top: "-50px", bottom: 0, rotate: 0, transformOrigin: "right bottom" },
      { x: "-300px", top: 0, bottom: "-50px", rotate: -13, transformOrigin: "right bottom", duration: 0.5 }
    );

    const rightAnim = gsap.fromTo(
      rightRef.current,
      { x: 0, top: "-50px", bottom: 0, rotate: 0, transformOrigin: "left bottom" },
      { x: "300px", top: 0, bottom: "-50px", rotate: 13, transformOrigin: "left bottom", duration: 0.5 }
    );

    return () => {
      tl.kill();
      leftAnim.kill();
      rightAnim.kill();
    };
  }, []);

  return (
    <section className={styles.contactWrapper}>
      <Flex justifyContent={"center"} mb={10}>
        <h3 ref={titleRef}>Contact with me</h3>
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
