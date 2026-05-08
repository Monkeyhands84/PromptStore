export default function DashboardLoading() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "220px 1fr",
        minHeight: "calc(100vh - 56px)",
      }}
      className="dashboard-loading"
    >
      <aside
        style={{
          borderRight: "1px solid var(--border)",
          padding: "24px 16px",
        }}
      >
        <div
          style={{
            height: 14,
            width: 80,
            borderRadius: 6,
            background: "var(--bg-3)",
            marginBottom: 14,
          }}
        />
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            style={{
              height: 30,
              borderRadius: "var(--r-sm)",
              background: "var(--bg-2)",
              marginBottom: 6,
            }}
          />
        ))}
      </aside>

      <main style={{ padding: "28px 32px" }}>
        <div
          style={{
            height: 36,
            width: 320,
            borderRadius: "var(--r-md)",
            background: "var(--bg-2)",
            marginBottom: 20,
          }}
        />
        <div
          style={{
            height: 22,
            width: 160,
            borderRadius: 6,
            background: "var(--bg-3)",
            marginBottom: 18,
          }}
        />
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            style={{
              background: "var(--surface)",
              border: "1.5px solid var(--border)",
              borderRadius: "var(--r-lg)",
              padding: "18px 20px",
              marginBottom: 12,
            }}
          >
            <div
              style={{
                height: 16,
                width: "40%",
                borderRadius: 6,
                background: "var(--bg-2)",
                marginBottom: 8,
              }}
            />
            <div
              style={{
                height: 12,
                width: "70%",
                borderRadius: 6,
                background: "var(--bg-3)",
              }}
            />
          </div>
        ))}
      </main>
    </div>
  );
}
