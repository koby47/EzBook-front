const FilterBar = ({ search, setSearch }) => {
  return (
    <div className="flex justify-between items-center">
      <input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border px-4 py-2 rounded w-full max-w-md"
      />
    </div>
  );
};

export default FilterBar;