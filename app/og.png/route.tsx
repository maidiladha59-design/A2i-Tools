import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(135deg, #f7f7f3 0%, #eef3ee 55%, #e6f0ff 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 22,
              background: "#0e7c66",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 34,
              fontWeight: 800,
            }}
          >
            A2
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 30, fontWeight: 800, color: "#14171c" }}>
              Ai2 All Compress
            </div>
            <div style={{ fontSize: 19, color: "#52605b" }}>
              Image &amp; PDF tools
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 18px",
              borderRadius: 999,
              background: "rgba(14, 124, 102, 0.10)",
              color: "#0b6b58",
              fontSize: 20,
              fontWeight: 700,
              alignSelf: "flex-start",
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: "#0e7c66",
              }}
            />
            100% local processing — no uploads
          </div>
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -1.5,
              color: "#14171c",
              maxWidth: 960,
            }}
          >
            Compress files to the exact size you need.
          </div>
          <div style={{ fontSize: 25, color: "#52605b", maxWidth: 900 }}>
            Image compression with KB/MB targets, PDF reducing, page organization,
            and merging — all inside your browser.
          </div>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {["Image Compressor", "PDF Size Reducer", "Merge PDF", "ID / EN"].map(
            (label) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  padding: "12px 20px",
                  borderRadius: 16,
                  background: "white",
                  border: "1px solid #d9e0da",
                  color: "#14171c",
                  fontSize: 20,
                  fontWeight: 600,
                }}
              >
                {label}
              </div>
            )
          )}
        </div>
      </div>
    ),
    { ...size }
  );
}
