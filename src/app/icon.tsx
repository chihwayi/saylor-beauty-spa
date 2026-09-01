import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
  const markData = await readFile(join(process.cwd(), "public/images/logo/mark.jpg"));
  const markSrc = `data:image/jpeg;base64,${markData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          overflow: "hidden",
        }}
      >
        <img
          src={markSrc}
          alt=""
          width={size.width * 1.4}
          height={size.height * 1.4}
          style={{ objectFit: "cover" }}
        />
      </div>
    ),
    { ...size }
  );
}
