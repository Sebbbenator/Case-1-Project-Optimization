export default function StatusMessage({ type = "info", context = "page", children }) {
  if (!children) {
    return null;
  }

  const baseClass = context === "form" ? "form-message" : "message";
  const toneClass = type !== "info" ? `${baseClass}-${type}` : "";
  const role = type === "error" ? "alert" : undefined;
  const ariaLive = type === "error" ? undefined : "polite";

  return (
    <p className={[baseClass, toneClass].filter(Boolean).join(" ")} role={role} aria-live={ariaLive}>
      {children}
    </p>
  );
}
