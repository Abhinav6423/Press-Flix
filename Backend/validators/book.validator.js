export const validateBook = (data) => {
    if (!data.authorName) {
        throw new Error("Author name is required");
    }

    if (!data.synopsis || data.synopsis.length < 50) {
        throw new Error("Synopsis must be at least 50 characters");
    }

    if (!Array.isArray(data.genre) || data.genre.length === 0) {
        throw new Error("At least one genre is required");
    }

    if (data.wordCount && data.wordCount < 1000) {
        throw new Error("Word count is too low for a book");
    }

    if (data.sampleLink && !data.sampleLink.startsWith("http")) {
        throw new Error("Sample link must be a valid URL");
    }
};
