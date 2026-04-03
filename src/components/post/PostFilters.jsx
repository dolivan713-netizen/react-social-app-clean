export default function PostFilters({
    search,
    sort,
    onSearchChange,
    onSortChange,
}) {
    return (
        <div>
            <select value={sort} onChange={(e) => onSortChange(e.target.value)}>
                <option value="">No sort</option>
                <option value="title">Sort by title</option>
                <option value="body">Sort by body</option>
            </select>

            <input
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                type="text"
                placeholder="Search..."
            />
        </div>
    );
}