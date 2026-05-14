import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-warm px-4">
      <div className="max-w-md text-center">
        <div className="text-7xl mb-4">🧭</div>
        <h1 className="font-display text-6xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          Looks like you wandered off the map
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist — but plenty of other
          adventures await.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-soft hover:shadow-warm transition-all"
          >
            Take me home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Wandr — Travel further on less" },
      { name: "description", content: "Discover famous places to visit anywhere in the world and plan unforgettable trips on a tight budget." },
      { name: "author", content: "Wandr" },
      { property: "og:title", content: "Wandr — Travel further on less" },
      { property: "og:description", content: "Discover famous places to visit anywhere in the world and plan unforgettable trips on a tight budget." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Wandr — Travel further on less" },
      { name: "twitter:description", content: "Discover famous places to visit anywhere in the world and plan unforgettable trips on a tight budget." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/2ac3a806-f39e-4e4b-8cf5-bf9f7a2790ef/id-preview-55e57e25--479fcfb2-f0e8-49ea-83a6-c696259ac1fe.lovable.app-1776923265760.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/2ac3a806-f39e-4e4b-8cf5-bf9f7a2790ef/id-preview-55e57e25--479fcfb2-f0e8-49ea-83a6-c696259ac1fe.lovable.app-1776923265760.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <main>
      <Outlet />
    </main>
  );
}
