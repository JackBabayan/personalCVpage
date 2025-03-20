import { NextResponse } from "next/server";
import Together from "together-ai";

const together = new Together({
    apiKey: process.env.TOGETHER_AI_API_KEY,
});

export async function POST(req) {
    try {
        const { message, context } = await req.json(); // Получаем контекст из запроса

        if (!context) {
            return NextResponse.json({ error: "Контекст не был передан." }, { status: 400 });
        }

        // Формируем запрос для создания чата
        const response = await together.chat.completions.create({
            messages: [
                { role: 'system', content: 'You are an AI assistant that helps users find the answers they are interested in on a CV, and will answer questions related to it and more.' },
                { role: 'user', content: context }, // Передаем контекст, который приходит из компонента
                { role: "user", content: message }, // Передаем сообщение пользователя
            ],
            model: "meta-llama/Llama-3.3-70B-Instruct-Turbo", // Используем модель
            max_tokens: 150, // Максимальное количество токенов
            temperature: 0.7, // Контроль случайности
            top_p: 0.7,
            top_k: 50,
            repetition_penalty: 1,
            stop: ["<|eot_id|>", "<|eom_id|>"], // Стоп-символы
            stream: false, // Выключаем стриминг для простоты
        });

        const content = response.choices[0]?.message?.content || "No response";

        return NextResponse.json({ reply: content });
    } catch (error) {
        console.error('AI request failed:', error.response?.data || error.message);
        return NextResponse.json({ error: "Ошибка обработки запроса" }, { status: 500 });
    }
}
