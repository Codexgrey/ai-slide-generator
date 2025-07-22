/**
 * Fetches images from Unsplash using a slide-specific prompt.
 * This is typically the slide title or a concise prompt like:
 * "An image that fits the slide titled 'Benefits of Meditation'"
 */

export async function fetchImageFromPrompt(title: string): Promise<string | undefined> {
  try {
    const accessKey = process.env.UNSPLASH_ACCESS_KEY;
    if (!accessKey) throw new Error('Missing UNSPLASH_ACCESS_KEY in env');

    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(title)}&per_page=1`,
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
    console.error(`🖼️ Failed to fetch image for slide title "${title}":`, err);
    return undefined;
  }
}
