export function formatEventDate(dateString) {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("da-DK", {
    weekday: "long",
    day: "numeric",
    month: "long"
  });

  return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
}

export function formatEventDateTime(dateString) {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("da-DK", {
    weekday: "long",
    day: "numeric",
    month: "long"
  });
  const formattedTime = date.toLocaleTimeString("da-DK", { hour: "2-digit", minute: "2-digit" });

  return `${formattedDate} kl. ${formattedTime}`;
}

export function formatShortDate(dateString) {
  return new Date(dateString).toLocaleDateString("da-DK");
}
