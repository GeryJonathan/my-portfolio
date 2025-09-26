import { GoogleGenerativeAI } from "@google/generative-ai";
import portfolio from "@/data/portfolio.json"; // import your portfolio data

const chatSessions = {};

export async function POST(req) {
  try {
    const { message, sessionId } = await req.json();

    if (!message || !sessionId) {
      return new Response(
        JSON.stringify({ reply: "Missing message or sessionId." }),
        { headers: { "Content-Type": "application/json" }, status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    if (!chatSessions[sessionId]) {
      const systemMessage = `
        You are a chatbot assistant for ${portfolio.name}'s portfolio website.
        Always answer based on this portfolio data:
        ${JSON.stringify(portfolio, null, 2)}
        If a user asks about projects, skills, or experience, use the above data.
        If the user asks something unrelated, politely answer in a friendly casual way.
      `;

      chatSessions[sessionId] = model.startChat({
        history: [
          { role: "user", parts: [{ text: systemMessage }] },
          { role: "model", parts: [{ text: "Understood. I will act as Gery’s portfolio assistant." }] }
        ]
      });
    }

    const chat = chatSessions[sessionId];
    const result = await chat.sendMessage(message);
    const reply = result.response.text();

    return new Response(JSON.stringify({ reply }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    console.error("Chatbot error:", err);
    return new Response(
      JSON.stringify({ reply: "Oops, something went wrong. Try again later!" }),
      { headers: { "Content-Type": "application/json" }, status: 500 }
    );
  }
}
