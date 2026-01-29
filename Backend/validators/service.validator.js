export const validateService = (data) => {
  if (!data.serviceType) {
    throw new Error("Service type is required");
  }

  if (!data.idealClient) {
    throw new Error("Ideal client description is required");
  }

  if (!Array.isArray(data.deliverables) || data.deliverables.length === 0) {
    throw new Error("At least one deliverable is required");
  }

  if (data.duration && typeof data.duration !== "string") {
    throw new Error("Duration must be a string");
  }

  if (data.startingPrice && data.startingPrice < 0) {
    throw new Error("Starting price cannot be negative");
  }

  if (data.bookingLink && !data.bookingLink.startsWith("http")) {
    throw new Error("Booking link must be a valid URL");
  }
};
