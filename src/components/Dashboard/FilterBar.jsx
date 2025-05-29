const FilterBar = ({ search, setSearch, typeFilter, setTypeFilter, priceFilter, setPriceFilter }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border px-4 py-2 rounded w-full sm:max-w-sm"
      />

      {/* Type Dropdown */}
      <select
        value={typeFilter}
        onChange={(e) => setTypeFilter(e.target.value)}
        className="border px-4 py-2 rounded w-full sm:w-48"
      >
        <option value="">All Types</option>
        <option value="hotel">Hotel</option>
        <option value="hall">Hall</option>
        <option value="conference">Conference Room</option>
        <option value="party">Party Venue</option>
      </select>

      {/* Price Filter */}
      <select
        value={priceFilter}
        onChange={(e) => setPriceFilter(e.target.value)}
        className="border px-4 py-2 rounded w-full sm:w-48"
      >
        <option value="">All Prices</option>
        <option value="lt500">Below GHS 500</option>
        <option value="500to1000">GHS 500 - 1000</option>
        <option value="gt1000">Above GHS 1000</option>
      </select>
    </div>
  );
};

export default FilterBar;
