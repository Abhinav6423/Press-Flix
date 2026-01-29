export const validateTech = (data) => {
  if (!data.tagline || data.tagline.length < 10) {
    throw new Error("Tagline is required");
  }

  if (!data.problem) {
    throw new Error("Problem statement is required");
  }

  if (!data.solution) {
    throw new Error("Solution description is required");
  }

  if (!Array.isArray(data.techStack) || data.techStack.length === 0) {
    throw new Error("Tech stack must be a non-empty array");
  }

  if (!data.demoUrl || !data.demoUrl.startsWith("http")) {
    throw new Error("Valid demo URL is required");
  }

  if (data.pricingModel && typeof data.pricingModel !== "string") {
    throw new Error("Invalid pricing model");
  }
};
