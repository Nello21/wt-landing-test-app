import React from "react";

export function highlightMatch(text: string, query: string) {
    // Return original text if query is empty
    if (!query || query.trim() === "") return text;

    // Escape special characters in the query for regex
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    // Create a case-insensitive regex to find the matches
    const regex = new RegExp(`(${escapedQuery})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? (
            <span key={`${part}-${index}`} className="bg-yellow-300">
                {part}
            </span>
        ) : (
            part
        )
    );
}
