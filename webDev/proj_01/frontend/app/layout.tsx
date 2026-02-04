import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My first next.js app",
  description: "Professional project with Next.js",
  keywords: ["nextjs", "react", "typescript"],
  robots: "index, follow",
  authors: [{ name: "John Doe", url: "https://mySampleWebsite.com" }],
  creator: "John Doe",
  publisher: "Boss Inc",
  metadataBase: new URL("https://mySampleWebsite.com"),
  openGraph: {
    title: "My next.js web application",
    description: "Professional web application with NextJS",
    url: "https://mySampleWebsite.com",
    type: "website",
    images: ["https://mywebsite.com/og-image.png"],
  },
  twitter: {
    card: "summary_large_image", // type of card: small or large image
    title: "My Next.js App", // overrides OG title if set
    description: "Professional Next.js project",
    images: ["https://mywebsite.com/twitter-image.png"],
    creator: "@boss", // Twitter handle of the creator
  },
  icons: {
    icon: "favicon.ico",
    shortcut: "favicon.ico",
    apple: "favicon.ico"
  },
  themeColor: "#0ea5e9",
  manifest: "/site.webmanifest",
};
/**
 * COMMON METADATA PROPERTIES (Next.js 13+ App Router)
 *
 * 1. title (string)
 *    -> The page title displayed in the browser tab and search results.
 *    -> Must-use for every page.
 *
 * 2. description (string)
 *    -> The page description for SEO (<meta name="description">).
 *    -> Recommended for all pages.
 *
 * 3. keywords (string[])
 *    -> List of keywords for SEO (<meta name="keywords">).
 *    -> Optional; search engines mostly ignore today.
 *
 * 4. robots (string)
 *    -> Controls crawling by search engines ("index, follow" or "noindex, nofollow").
 *    -> Use "noindex" during development for pages you don’t want indexed.
 *
 * 5. authors ({ name: string; url?: string }[])
 *    -> List of page authors.
 *    -> Optional; useful for blogs or multi-author sites.
 *
 * 6. creator (string)
 *    -> The creator of the page.
 *    -> Optional.
 *
 * 7. publisher (string)
 *    -> The publisher of the page/site.
 *    -> Optional.
 *
 * 8. metadataBase (URL)
 *    -> Base URL for resolving relative URLs (Open Graph, images).
 *    -> Useful when generating absolute URLs for social previews.
 *
 * 9. openGraph ({ title, description, url?, images?, type? })
 *    -> Open Graph metadata for social sharing (Facebook, LinkedIn).
 *    -> Recommended for marketing, blogs, or e-commerce.
 *
 * 10. twitter ({ card, title?, description?, images?, creator? })
 *     -> Twitter Card metadata for Twitter link previews.
 *     -> Recommended if your links will be shared on Twitter.
 *
 * 11. icons ({ icon, shortcut, apple })
 *     -> Favicon and Apple touch icons.
 *     -> Optional but recommended for branding.
 *
 * 12. themeColor (string | { media: string; color: string })
 *     -> Sets browser or mobile theme color (PWA, Android Chrome, Safari).
 *     -> Optional; improves UX on mobile devices.
 *
 * 13. manifest (string)
 *     -> Path to web app manifest for PWAs.
 *     -> Optional; only needed for PWA support.
 *
 * 14. alternates (object)
 *     -> Alternate URLs or languages for the page.
 *     -> Optional; useful for multilingual sites.
 *
 * 15. other custom meta tags
 *     -> Next.js allows extra <meta> tags via next/head or custom Head components if needed.
 *     -> Optional; project-specific.
 * 16. openGraph (object)
 *     -> Controls how your website link appears when shared on social media
 *        (Facebook, Messenger, LinkedIn, Discord, etc.).
 *     -> You can set the title, description, image, URL, and content type.
 *     -> Without openGraph, social platforms guess the title/image, often messy.
 *     -> With openGraph, your link shows a clean “card”:
 *          - title: “My Awesome App”
 *          - description: “Professional Next.js website”
 *          - image: https://mywebsite.com/preview-image.png
 *     -> Example usage in Next.js 13+:
 *        openGraph: {
 *          title: "My Awesome App",
 *          description: "Professional Next.js website",
 *          url: "https://mywebsite.com",
 *          type: "website",
 *          images: ["https://mywebsite.com/preview-image.png"],
 *        }
 * 17. twitter (object)
 *     -> Controls how your page link appears specifically on Twitter.
 *     -> Twitter uses its own "Twitter Card" system for link previews.
 *     -> Optional: if you don't include it, Twitter will usually fallback to Open Graph metadata.
 *     -> Common properties:
 *        - card: "summary" | "summary_large_image"  // type of card
 *        - title: string                             // page title (overrides OG if set)
 *        - description: string                       // short summary (overrides OG if set)
 *        - images: string[]                           // array of image URLs for preview
 *        - creator: string                            // Twitter handle of the creator
 *     -> Example usage in Next.js 13+:
 *        export const metadata = {
 *          title: "My Awesome App",
 *          description: "Professional Next.js website",
 *          twitter: {
 *            card: "summary_large_image",
 *            title: "My Awesome App",
 *            description: "Professional Next.js website",
 *            images: ["https://mywebsite.com/twitter-image.png"],
 *            creator: "@boss",
 *          },
 *        };
 *     -> When someone shares your link on Twitter, the card will display the title,
 *        description, and image specified here.
 */

// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "sans-serif", padding: "2rem" }}>
        <header style={{ marginBottom: "2rem" }}>
          <h1>My Next.js App</h1>
          <nav style={{ display: "flex", gap: "1rem" }}>
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
          </nav>
        </header>
        <main>{children}</main>
        <footer
          style={{
            marginTop: "2rem",
            borderTop: "1px solid #ccc",
            paddingTop: "1rem",
          }}
        >
          Footer © 2026
        </footer>
      </body>
    </html>
  );
}
