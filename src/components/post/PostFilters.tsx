import { Group, Select, TextInput } from "@mantine/core";
import type { PropsFilters } from "../../types/post";

export default function PostFilters({search, sort, onSearchChange, onSortChange,}: PropsFilters) {
    return (
        <Group>
            <Select
                value={sort}
                onChange={(value) => onSortChange(value ?? '')}
                data={[
                    { value: '', label: 'No sort' },
                    { value: 'title', label: 'Sort by title' },
                    { value: 'body', label: 'Sort by body' },
                ]}
                w={180}
            />

            <TextInput
                value={search}
                onChange={(e) => onSearchChange(e.currentTarget.value)}
                placeholder="Search..."
                flex={1}
            />
        </Group>
    );
}
