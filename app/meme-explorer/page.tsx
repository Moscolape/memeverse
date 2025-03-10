import MemeExplorer from "../meme-explorer/meme-explorer";

async function getMemes() {
  const res = await fetch("https://api.imgflip.com/get_memes");
  const data = await res.json();
  return data.data.memes;
}

export default async function MemeExplorerPage() {
  const memes = await getMemes();
  return <MemeExplorer initialMemes={memes} />;
}
