import { GoogleGenerativeAI } from "@google/generative-ai";
import portfolio from "@/data/portfolio.json"; // import your portfolio data

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

let chatSessions = {};

export async function POST(req) {
  try {
    const { message, sessionId } = await req.json();

    // inject portfolio data into system prompt
    const systemMessage = `
You are a chatbot assistant for Gery Jonathan's portfolio website.
Always answer based on this portfolio data:
${JSON.stringify(portfolio, null, 2)}

If a user asks about Gery’s projects, skills, or experience, use the above data.
If the user asks something unrelated, politely answer in a friendly casual way.
`;

    // create a new chat session with proper text objects
    if (!chatSessions[sessionId]) {
      chatSessions[sessionId] = model.startChat({
        history: [
          { role: "user", parts: [{ text: systemMessage }] },
          { role: "model", parts: [{ text: "Understood. I will act as Gery’s portfolio assistant." }] },
        ],
        generationConfig: { maxOutputTokens: 500 },
      });
    }

    const chat = chatSessions[sessionId];
    const result = await chat.sendMessage([{ text: message }]); // message also needs wrapping
    const reply = result.response.text();

    return new Response(
      JSON.stringify({ reply }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Chatbot error:", err);
    return new Response(
      JSON.stringify({ reply: "⚠️ Oops, something went wrong. Try again later!" }),
      { headers: { "Content-Type": "application/json" } }
    );
  }
}
