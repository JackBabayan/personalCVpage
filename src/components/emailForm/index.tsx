import { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Textarea, VStack, Text } from "@chakra-ui/react";
import { MailIcon } from "@/styles/icon";

export default function EmailForm() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("Отправка...");

        const response = await fetch("https://script.google.com/macros/s/AKfycbxXJ6kzKzcumAZZMOdtpB-7yRH_Ew8IGELofMb_X_n1v1w8yVyt3xYQBPb-SYTvpiYZYQ/exec", {
            method: "POST",
            body: new URLSearchParams(formData).toString(),
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });

        if (response.ok) {
            setStatus("✅ Сообщение отправлено!");
            setFormData({ name: "", email: "", message: "" });
        } else {
            setStatus("❌ Ошибка отправки");
        }
    };

    return (
        <Box maxW="md" mx="auto" p={6} borderWidth={1} borderRadius="lg" boxShadow="md">
            <form onSubmit={handleSubmit}>
                <VStack spacing={4}>
                    <FormControl isRequired>
                        <FormLabel>Name</FormLabel>
                        <Input type="text" name="name" value={formData.name} onChange={handleChange} />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input type="email" name="email" value={formData.email} onChange={handleChange} />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Message</FormLabel>
                        <Textarea name="message" value={formData.message} onChange={handleChange} />
                    </FormControl>

                    <Button type="submit" rightIcon={<MailIcon />} colorScheme={'teal'} minWidth={'200px'}>
                        Send
                    </Button>

                    {status && <Text color={status.includes("Ошибка") ? "red.500" : "green.500"}>{status}</Text>}
                </VStack>
            </form>
        </Box>
    );
}
