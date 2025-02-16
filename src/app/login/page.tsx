'use client';
import { useLayoutEffect } from "react";

import { useRouter } from "next/navigation";
import { Box, Button, Input, Stack, Text } from '@chakra-ui/react';
import { Tooltip } from "@/components/ui/tooltip"
import { PasswordInput } from "@/components/ui/password-input"
import { useForm } from "react-hook-form";

import { useAuth } from '@/context/AuthContext';

import styles from "@/styles/form.module.scss"

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

  return (
    <Box p={8} maxW="md" mx="auto">
      <form onSubmit={onSubmit} className={styles.formWrapper}>
        <Stack gap={4} align="center">
          <div className={styles.formItem}>
            <Tooltip content="Username : admin">
              <Text>
                Username
              </Text>
            </Tooltip>
            <Input placeholder="Username" {...register("username", { required: "Username is required" })} />
            {errors.username?.message && <Text textStyle="xs" color={"red"}>{errors.username?.message}</Text>}
          </div>

          <div className={styles.formItem}>
            <Tooltip content="Password : 12345">
              <Text>
                Password
              </Text>
            </Tooltip>
            <PasswordInput placeholder="Password" {...register("password", { required: "Password is required" })} type="password" />
            {errors.password?.message && <Text textStyle="xs" color={"red"}>{errors.password?.message}</Text>}
          </div>

          <Button type="submit" colorScheme="blue">
            Login
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
