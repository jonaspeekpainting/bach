import { ImageResponse } from "next/og";

export const alt = "The Bachelor Party — Vegas & Hurricane — itinerary";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function ItineraryOpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(165deg, #f5e6d3 0%, #e8c9a0 45%, #c1440e 100%)",
          color: "#2c1810",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#faf3e7",
            border: "4px solid #8b4513",
            borderRadius: 12,
            padding: "48px 72px",
            boxShadow: "0 24px 80px rgba(44, 24, 16, 0.35)",
          }}
        >
          <div
            style={{
              fontSize: 22,
              letterSpacing: 8,
              textTransform: "uppercase",
              color: "#c1440e",
              fontWeight: 600,
              marginBottom: 16,
            }}
          >
            Official itinerary
          </div>
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              letterSpacing: 4,
              lineHeight: 1,
            }}
          >
            The Bachelor Party
          </div>
          <div
            style={{
              fontSize: 40,
              color: "#c1440e",
              marginTop: 20,
              letterSpacing: 6,
            }}
          >
            VEGAS · HURRICANE
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
