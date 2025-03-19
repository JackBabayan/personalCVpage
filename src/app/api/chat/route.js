import { NextResponse } from "next/server";
import axios from "axios";
import fs from 'fs';
import path from 'path';

export async function POST(req) {

    try {
        const { message } = await req.json();

        // Путь к файлам данных
        const aboutMeFile = path.join(process.cwd(), "mockData", "aboutMe.json");
        const experiencesFile = path.join(process.cwd(), "mockData", "experiences.json");
        const portfolioFile = path.join(process.cwd(), "mockData", "portfolio.json");

        // Чтение данных из файлов
        function readJsonFile(filePath) {
            const fileData = fs.readFileSync(filePath, "utf8");
            return JSON.parse(fileData);
        }


        // Формируем контекст
        const context = `
    Here is some context to answer the user's questions based on my resume:

    About Me: 
    ${aboutMe.description}
    ${aboutMe.ending}

    Skills and technologies:
    ${aboutMe.technicalSkills.map(skill => `${skill.name}: ${skill.technologies.join(", ")}`).join("\n")}

    Work Experience:
    ${experiences.map(exp => `
    Position: ${exp.position}
    Location: ${exp.location}
    Dates: ${exp.dates}
    Description: ${exp.description}
    Projects: ${exp.projects.map(p => `- ${p.name} (${p.url})`).join("\n")}
    `).join("\n")}

    Portfolio:
    ${portfolio.map(port => `
    Project: ${port.name}
    Description: ${port.description}
    URL: ${port.url}
    Technologies: ${port.technologies.join(", ")}
    `).join("\n")}
    `;


        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-3.5-turbo", // или gpt-4
                messages: [
                    { role: "system", content: "You are a chatbot trained to answer questions based on a developer's resume and portfolio." },
                    { role: "user", content: message },
                    { role: "system", content: context }
                ],
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY || process.env.OPENAI_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        return NextResponse.json({ reply: response.data.choices[0].message.content });
    } catch (error) {
        console.error('OpenAI request failed:', error.response?.data || error.message);
        return NextResponse.json({ error: "Ошибка обработки запроса" }, { status: 500 });
    }

}
