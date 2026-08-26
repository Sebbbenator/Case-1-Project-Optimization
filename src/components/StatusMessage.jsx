export default function StatusMessage({ type = "info", context = "page", children }) {
  if (!children) {
    return null;
  }

  const baseClass = context === "form" ? "form-message" : "message";
  const toneClass = type !== "info" ? `${baseClass}-${type}` : "";

  return <p className={[baseClass, toneClass].filter(Boolean).join(" ")}>{children}</p>;
}
