import { createFileRoute } from "@tanstack/react-router";
import { GameShell } from "@/components/game/GameShell";

export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Aethelgard: Abismo de Cinzas" },
      { name: "description", content: "Plataforma de ação 2D em pixel art com mundos conectados, heróis elementais, sandbox gigante e chefões épicos." },
      { property: "og:title", content: "Aethelgard: Abismo de Cinzas" },
      { property: "og:description", content: "Plataforma de ação 2D em pixel art com mundos conectados, heróis elementais, sandbox gigante e chefões épicos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="game-root h-screen w-screen overflow-hidden select-none">
      <GameShell />
    </div>
  );
}
