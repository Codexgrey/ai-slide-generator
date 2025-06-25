import openai from './openaiClient';

interface GenerateSlidesInput {
  topic: string;
  numSlides: number;
  includeImages?: boolean;
  theme?: string;
}

export async function generateSlidesWithAI({
  topic,
  numSlides,
  includeImages = false,
  theme = 'default',
}: GenerateSlidesInput) {
  const prompt = `
You are an expert presentation assistant. Generate a ${numSlides}-slide presentation on the topic: "${topic}".

Each slide should follow this exact JSON format:
{
  "title": "Slide Title",
  "content": ["Bullet point 1", "Bullet point 2", "Bullet point 3"]
  ${includeImages ? ',\n  "imagePrompt": "A short prompt describing a relevant image"' : ''}
}

${includeImages
    ? 'Every slide must include an "imagePrompt" field describing an image suitable for the content.'
    : 'Do NOT include the "imagePrompt" field in any slide.'
}

Use a "${theme}" style. Keep the language clear, structured, and professional.
Return ONLY a JSON array of slides. No explanation or intro.
`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
  });

  const raw = response.choices[0].message.content;

  try {
    const slides = JSON.parse(raw || '[]');
    return slides;
  } catch {
    throw new Error('Invalid JSON from AI response');
  }
}
