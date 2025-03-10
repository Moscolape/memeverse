import Image from "next/image";

interface Meme {
  url: string;
  name: string;
}

export default function MemeCard({ meme }: { meme: Meme }) {
  return (
    <div className="border p-2 rounded-lg shadow-md">
      <Image src={meme.url} alt={meme.name} width={200} height={200} />
      <p className="text-center font-semibold mt-2">{meme.name}</p>
    </div>
  );
}
