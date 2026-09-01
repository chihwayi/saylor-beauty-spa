import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { business } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const lockupData = await readFile(
    join(process.cwd(), "public/images/logo/lockup-dark.jpg")
  );
  const lockupSrc = `data:image/jpeg;base64,${lockupData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          display: "flex",
        }}
      >
        <img
          src={lockupSrc}
          alt=""
          width={size.width}
          height={size.height}
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 56,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            fontSize: 28,
            color: "#F2DCD8",
          }}
        >
          {business.tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}
