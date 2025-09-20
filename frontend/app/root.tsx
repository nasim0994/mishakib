import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "react-router";
import type { Route } from "./+types/root";
import "./app.css";
import Providers from "./providers/Providers";
import { Toaster } from "react-hot-toast";

export async function loader() {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/seo`);
  const seo = await res.json();

  const res2 = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/logo-favicon`
  );
  const favicon = await res2.json();

  return { seo, favicon };
}

export function meta({ matches }: Route.MetaArgs) {
  const rootData = matches?.find((m) => m?.id === "root");
  const seo = (rootData?.data as { seo?: { data?: any } })?.seo?.data;

  return [
    { title: seo?.title || "Root" },
    {
      name: "description",
      content: seo?.description || "Welcome to React Router!",
    },
    {
      name: "keywords",
      content: seo?.keywords || "eBook",
    },
    {
      name: "author",
      content: seo?.author || "Nasim Uddin",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1.0",
    },
    {
      name: "copyright",
      content: seo?.copyright || "Nasim Uddin",
    },

    // og tags
    { property: "og:title", content: seo?.ogTitle || "Root" },
    {
      property: "og:description",
      content: seo?.ogDescription || "Welcome to React Router!",
    },
    {
      property: "og:image",
      content: seo?.ogImageUrl || "",
    },
    {
      property: "og:url",
      content: seo?.ogUrl || "https://example.com",
    },
    {
      property: "og:type",
      content: seo?.ogType || "website",
    },
  ];
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { favicon } = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        {favicon?.data?.favicon && (
          <link rel="icon" href={favicon.data.favicon} type="image/x-icon" />
        )}
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Providers>
      <Outlet />
    </Providers>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
