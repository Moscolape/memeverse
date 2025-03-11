import Image from "next/image";
import { Meme } from "./meme-explorer";
import Link from "next/link";

export default function MemeCard({ meme }: { meme: Meme }) {
  return (
    <Link key={meme.id} href={`/meme/${meme.id}`} passHref>
      <div className="border p-2 rounded-lg shadow-md">
        <Image src={meme.url} alt={meme.name} width={200} height={200} />
        <p className="text-center font-semibold mt-2">{meme.name}</p>
      </div>
    </Link>
  );
}
