export async function fetchImageFromPrompt(prompt: string): Promise<string | undefined> {
  try {
    const accessKey = process.env.UNSPLASH_ACCESS_KEY;
    if (!accessKey) throw new Error('Missing UNSPLASH_ACCESS_KEY in env');

    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(prompt)}&per_page=1`,
      {
        headers: {
          Authorization: `Client-ID ${accessKey}`,
        },
      }
    );

    if (!response.ok) throw new Error(`Unsplash API error: ${response.status}`);

    const data = await response.json();
    const imageUrl = data.results?.[0]?.urls?.regular ?? null;
    return imageUrl;
  } catch (err) {
        console.error(`Failed to fetch image for prompt "${prompt}":`, err);
        return undefined;
  }
}
