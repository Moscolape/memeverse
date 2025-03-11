const categories = ["Trending", "New", "Classic", "Random"];

interface FiltersProps {
  activeCategory: string;
  setCategory: (category: string) => void;
}

export default function Filters({ activeCategory, setCategory }: FiltersProps) {
  return (
    <div className="flex justify-center sm:space-x-4 my-4">
      {categories.map((category) => (
        <button
          key={category}
          className={`sm:px-4 px-2 py-1 sm:py-2 text-sm mx-1 inline-block rounded-lg ${
            activeCategory === category
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
          onClick={() => setCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
