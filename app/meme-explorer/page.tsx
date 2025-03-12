import MemeExplorer from "../meme-explorer/meme-explorer";

// Fetch memes server-side and enable caching
async function getMemes() {
  const res = await fetch("https://api.imgflip.com/get_memes", {
    next: { revalidate: 3600 }, // Cache results for 1 hour
  });
  const data = await res.json();
  return data.data.memes;
}

export default async function MemeExplorerPage() {
  const memes = await getMemes();
  return (
    <div className="mt-15 relative">
      <MemeExplorer initialMemes={memes} />
    </div>
  );
}