export const validateProduct = (data) => {
    if (!data.productName) {
        throw new Error("Product name is required");
    }

    if (!data.usp) {
        throw new Error("USP is required");
    }

    if (!data.retailPrice || data.retailPrice <= 0) {
        throw new Error("Retail price must be greater than 0");
    }

    if (data.unitCost && data.unitCost > data.retailPrice) {
        throw new Error("Unit cost cannot exceed retail price");
    }

    if (
        data.distribution &&
        !Array.isArray(data.distribution)
    ) {
        throw new Error("Distribution must be an array");
    }
};
