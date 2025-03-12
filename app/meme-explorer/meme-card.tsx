import Image from "next/image";
import { Meme } from "./meme-explorer";
import Link from "next/link";
import { motion } from "framer-motion";

export default function MemeCard({ meme }: { meme: Meme }) {
  return (
    <Link key={meme.id} href={`/meme/${meme.id}`} passHref>
      <motion.div
        className="border p-2 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Image
          src={meme.url}
          alt={meme.name}
          width={200}
          height={200}
          className="rounded-lg"
          layout="intrinsic"
        />
        <p className="text-center font-semibold mt-2">{meme.name}</p>
      </motion.div>
    </Link>
  );
}
