interface SortOptionsProps {
    sortBy: string;
    setSortBy: (value: string) => void;
  }
  
  export default function SortOptions({ sortBy, setSortBy }: SortOptionsProps) {
    return (
      <select
        className="border p-2 rounded"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="likes">Most Liked</option>
        <option value="date">Newest</option>
        <option value="comments">Most Commented</option>
      </select>
    );
  }
  