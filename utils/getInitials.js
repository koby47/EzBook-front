export const getInitials = (name) => {
  if (!name) return "EZ";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};
