export const rules = {
  required: (value: string) => !!value || "This field cannot be empty.",
  max:
    (limit = 100) =>
    (value: string) =>
      value.length < limit ||
      `This field must be shorter than ${limit} characters.`,
  min:
    (limit = 100) =>
    (value: string) =>
      value.length > limit ||
      `This field must be longer than ${limit} characters.`,
};
