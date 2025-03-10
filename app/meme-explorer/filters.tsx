const categories = ["Trending", "New", "Classic", "Random"];

interface FiltersProps {
  activeCategory: string;
  setCategory: (category: string) => void;
}

export default function Filters({ activeCategory, setCategory }: FiltersProps) {
  return (
    <div className="flex justify-center space-x-4 my-4">
      {categories.map((category) => (
        <button
          key={category}
          className={`px-4 py-2 rounded-lg ${
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
