export default function Loading() {
  return (
    <div style={containerStyle} role="status" aria-live="polite">
      <div style={spinnerStyle} aria-hidden="true" />
      <div style={labelStyle}>Carregando...</div>
    </div>
  );
}

const containerStyle = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  gap: "12px",
  background: "linear-gradient(180deg, #f7fafc 0%, #ffffff 100%)",
};

const spinnerStyle = {
  width: "64px",
  height: "64px",
  borderRadius: "50%",
  border: "8px solid rgba(0,0,0,0.08)",
  borderTopColor: "#1976d2",
  animation: "spin 1s linear infinite",
};

const labelStyle = {
  color: "#374151",
  fontSize: "16px",
  fontWeight: 500,
};

if (typeof document !== "undefined") {
  const id = "__app_loading_keyframes";
  if (!document.getElementById(id)) {
    const style = document.createElement("style");
    style.id = id;
    style.innerHTML = `@keyframes spin { to { transform: rotate(360deg); } }`;
    document.head.appendChild(style);
  }
}
