import OpenAI from "openai";

let _openai: OpenAI | null = null;

function getOpenAI(): OpenAI {
  if (!_openai) {
    _openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || "sk-placeholder",
    });
  }
  return _openai;
}

const MODEL = process.env.OPENAI_MODEL || "gpt-4o";

interface GenerateWebsitePrompt {
  businessName: string;
  businessType: string;
  description: string;
  style: string;
  colorPreference?: string;
  pages?: string[];
}

interface GenerationOutput {
  data: Record<string, unknown>;
  tokensUsed: number;
}

export async function generateWebsite(prompt: GenerateWebsitePrompt): Promise<GenerationOutput> {
  const systemPrompt = `You are an expert web designer and developer. You generate JSON configurations for websites.

When given a business description, you produce a complete website configuration including:
1. Website config (theme colors, fonts, border radius)
2. Pages with components (hero, features, testimonials, contact, footer, etc.)
3. SEO metadata

Each page has a "components" array. Each component has:
- id: unique string
- type: one of "hero", "header", "footer", "text", "image", "gallery", "cta", "features", "pricing", "testimonials", "contact", "faq"
- order: number
- props: object with content-specific properties (title, subtitle, description, items, buttonText, etc.)
- styles: object with CSS properties

Output ONLY valid JSON. No markdown, no explanations.`;

  const userPrompt = `Create a complete website for:
Business Name: ${prompt.businessName}
Business Type: ${prompt.businessType}
Description: ${prompt.description}
Design Style: ${prompt.style}
${prompt.colorPreference ? `Color Preference: ${prompt.colorPreference}` : ""}
Pages to include: ${prompt.pages?.join(", ") || "Home, About, Services, Contact"}

Generate a complete website JSON configuration with themed components for each page.`;

  const response = await getOpenAI().chat.completions.create({
    model: MODEL,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    response_format: { type: "json_object" },
    temperature: 0.7,
    max_tokens: 8000,
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new Error("Empty response from OpenAI");
  }

  const tokensUsed =
    (response.usage?.prompt_tokens || 0) + (response.usage?.completion_tokens || 0);

  try {
    const data = JSON.parse(content);
    return { data, tokensUsed };
  } catch {
    throw new Error("Failed to parse OpenAI response as JSON");
  }
}

export async function generatePageContent(
  pageType: string,
  businessContext: string,
  description: string
): Promise<GenerationOutput> {
  const response = await getOpenAI().chat.completions.create({
    model: MODEL,
    messages: [
      {
        role: "system",
        content: `You are a web content expert. Generate a page component configuration as JSON for a ${pageType} page. Include appropriate components with realistic content. Output ONLY valid JSON.`,
      },
      {
        role: "user",
        content: `Business context: ${businessContext}\nPage description: ${description}\nGenerate components for this page.`,
      },
    ],
    response_format: { type: "json_object" },
    temperature: 0.7,
    max_tokens: 4000,
  });

  const content = response.choices[0]?.message?.content;
  if (!content) throw new Error("Empty response from OpenAI");

  const tokensUsed =
    (response.usage?.prompt_tokens || 0) + (response.usage?.completion_tokens || 0);

  return { data: JSON.parse(content), tokensUsed };
}

export async function generateSEO(
  businessName: string,
  description: string,
  pageContent: string
): Promise<GenerationOutput> {
  const response = await getOpenAI().chat.completions.create({
    model: MODEL,
    messages: [
      {
        role: "system",
        content: "You are an SEO expert. Generate optimized SEO metadata as JSON including: title, description, keywords (array), ogTitle, ogDescription. Output ONLY valid JSON.",
      },
      {
        role: "user",
        content: `Business: ${businessName}\nDescription: ${description}\nPage content summary: ${pageContent}`,
      },
    ],
    response_format: { type: "json_object" },
    temperature: 0.5,
    max_tokens: 1000,
  });

  const content = response.choices[0]?.message?.content;
  if (!content) throw new Error("Empty response from OpenAI");

  const tokensUsed =
    (response.usage?.prompt_tokens || 0) + (response.usage?.completion_tokens || 0);

  return { data: JSON.parse(content), tokensUsed };
}
