export async function POST(req) {
  const body = await req.json();
  const { message } = body;

  // Simple FAQ responses
  const faq = {
    "who are you": "I’m Gery, an IT graduate passionate about data science and cybersecurity.",
    "what can you do": "I can work on data science, automation, and backend development projects.",
    "contact": "You can reach me at: your.email@example.com"
  };

  const lower = message.toLowerCase();
  for (const key in faq) {
    if (lower.includes(key)) {
      return new Response(JSON.stringify({ reply: faq[key] }), {
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  // Default fallback
  return new Response(
    JSON.stringify({ reply: "I’m not sure about that, but check out my portfolio above!" }),
    { headers: { "Content-Type": "application/json" } }
  );
}
