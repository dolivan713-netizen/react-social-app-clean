import type { PropsFilters } from "../../types/post";

export default function PostFilters({search, sort, onSearchChange, onSortChange,}: PropsFilters) {
    return (
        <div className="post-filters">
            <select className="select" value={sort} onChange={(e) => onSortChange(e.target.value)}>
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