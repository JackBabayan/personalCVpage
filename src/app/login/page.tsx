'use client';
import { useEffect, useRef } from "react";

import { Box, Button, Input, Stack, Text, Tooltip, Flex, FormLabel ,FormControl } from '@chakra-ui/react';
import { PasswordInput } from "@/components/ui/password-input"
import { useForm } from "react-hook-form";
import { useAuth } from '@/context/AuthContext';
import gsap from 'gsap';

import styles from "./style.module.scss"

interface FormValues {
  username: string;
  password: string;
}

export default function AuthPage() {
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = handleSubmit((data: FormValues) => {
    login(data.username, data.password);
  });


  const titleRef = useRef<HTMLDivElement>(null);
  const contRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;

    const tl = gsap.timeline();

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: "300px" },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );

    tl.fromTo(
      contRef.current,
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className={styles.contactWrapper}>
      <Flex justifyContent={"center"} mb={10}>
        <h3 ref={titleRef}>Login</h3>
      </Flex>
      <Box className={styles.container}>
        <Box maxW="md" mx="auto" p={6} borderWidth={1} borderRadius="lg" boxShadow="md" ref={contRef}>
          <form onSubmit={onSubmit} className={styles.formWrapper}>
            <Stack gap={4} align="center">
              <FormControl isRequired className={styles.formItem}>
                <Tooltip label="Username : admin">
                  <FormLabel> User name</FormLabel>
                </Tooltip>
                <Input placeholder="User name" {...register("username", { required: "User name is required" })} />
                {errors.username?.message && <Text textStyle="xs" color={"red"}>{errors.username?.message}</Text>}
              </FormControl>

              <FormControl isRequired className={styles.formItem}>
                <Tooltip label="Password : 12345">
                  <FormLabel> Password</FormLabel>
                </Tooltip>
                <PasswordInput placeholder="Password" {...register("password", { required: "Password is required" })} />
                {errors.password?.message && <Text textStyle="xs" color={"red"}>{errors.password?.message}</Text>}
              </FormControl>

              <Button type="submit" colorScheme="teal" variant="solid">
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Box>
    </section>
  );
}
