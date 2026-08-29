import styles from "./StatusMessage.module.css";

export default function StatusMessage({ type = "info", context = "page", children }) {
  if (!children) {
    return null;
  }

  const baseKey = context === "form" ? "formMessage" : "message";
  const toneKey = type !== "info" ? `${baseKey}${type.charAt(0).toUpperCase()}${type.slice(1)}` : "";
  const role = type === "error" ? "alert" : undefined;
  const ariaLive = type === "error" ? undefined : "polite";

  return (
    <p className={[styles[baseKey], styles[toneKey]].filter(Boolean).join(" ")} role={role} aria-live={ariaLive}>
      {children}
    </p>
  );
}
