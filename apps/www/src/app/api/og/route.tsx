import { ImageResponse } from "next/og";

import { siteConfig } from "~/config/site";
import { formatShortDate } from "~/lib/date";
import { getBaseUrl } from "~/lib/url";
import { ogImageSchema } from "~/lib/validation";

export const runtime = "edge";

export const size = {
  width: 1920,
  height: 1080,
};

const inter400 = fetch(
  new URL("../../../fonts/Inter-4.0/Inter-Regular.woff", import.meta.url),
).then((res) => res.arrayBuffer());

const plusJakartaSans600 = fetch(
  new URL(
    "../../../fonts/PlusJakartaSans-2.7.1/PlusJakartaSans-SemiBold.woff",
    import.meta.url,
  ),
).then((res) => res.arrayBuffer());

const playfairLogo700 = fetch(
  new URL(
    "../../../fonts/Playfair-2.1/Playfair-RegularBold-Logo.woff",
    import.meta.url,
  ),
).then((res) => res.arrayBuffer());

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const { title, publishedAt } = ogImageSchema.parse(
      Object.fromEntries(searchParams),
    );

    return new ImageResponse(
      (
        <div
          style={{
            position: "relative",
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            backgroundImage: `url(${getBaseUrl()}/og-bg.jpg)`,
            filter: "saturate(0.85)",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 160,
              marginLeft: 190,
              marginRight: 190,
              display: "flex",
              fontSize: 250,
              fontFamily: "Playfair 700",
              fontStyle: "normal",
              color: "white",
              lineHeight: "65px",
              overflow: "hidden",
            }}
          >
            <span style={{ paddingTop: "0px", paddingBottom: "35px" }}>S</span>
          </div>
          <div
            style={{
              marginLeft: 190,
              marginRight: 190,
              display: "flex",
              fontSize: 130,
              fontFamily: "Plus Jakarta Sans 600",
              letterSpacing: "-0.03em",
              fontStyle: "normal",
              color: "white",
              lineHeight: "150px",
              whiteSpace: "pre-wrap",
            }}
          >
            {title}
          </div>
          <div
            style={{
              position: "absolute",
              top: 860,
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              fontSize: 50,
              fontFamily: "Inter 400",
              fontStyle: "normal",
              color: "white",
            }}
          >
            <div
              style={{
                marginLeft: 190,
              }}
            >
              {siteConfig.title}
            </div>
            <div
              style={{
                marginRight: 190,
              }}
            >
              {publishedAt && formatShortDate(publishedAt)}
            </div>
          </div>
        </div>
      ),
      {
        ...size,
        fonts: [
          {
            name: "Inter 400",
            data: await inter400,
            style: "normal",
          },
          {
            name: "Plus Jakarta Sans 600",
            data: await plusJakartaSans600,
            style: "normal",
          },
          {
            name: "Playfair 700",
            data: await playfairLogo700,
            style: "normal",
          },
        ],
      },
    );
  } catch (error) {
    return new Response("Failed to generate image", {
      status: 500,
    });
  }
}