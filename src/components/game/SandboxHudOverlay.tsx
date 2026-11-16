import React, { useState } from 'react';
import { GameEngine } from '../../game/engine';
import { SANDBOX_QUESTS } from '../../game/sandboxWorld';
import { HudSnapshot } from '../../game/types';
import { PixelButton } from './PixelUi';

interface SandboxHudOverlayProps {
  engine: GameEngine;
  hud: HudSnapshot;
  onOpenForge: () => void;
  onOpenPets: () => void;
}

function formatDayClock(hours: number): string {
  const h = Math.floor(((hours % 24) + 24) % 24);
  const m = Math.floor((hours - Math.floor(hours)) * 60);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

export const SandboxHudOverlay: React.FC<SandboxHudOverlayProps> = ({
  engine,
  hud,
  onOpenForge,
  onOpenPets,
}) => {
  const [showQuests, setShowQuests] = useState(false);
  const [houseFeedback, setHouseFeedback] = useState<string | null>(null);

  return (
    <div
      data-testid="sandbox-hud-overlay"
      className="fixed inset-0 z-20 pointer-events-none"
    >
      {/* Top-Center Sandbox Environment Bar */}
      <div className="absolute left-1/2 top-2 -translate-x-1/2 flex flex-wrap items-center justify-center gap-1.5 pointer-events-auto max-w-[96vw]">
        <div className="flex items-center gap-2 border-2 border-[#07050d] bg-[#100c1be6] px-2.5 py-1 shadow-[0_2px_0_0_#07050d]">
          <span className="font-mono-num text-[11px] font-bold text-[#ffe066]">
            {hud.sandboxIsNight ? '🌙 Noite' : '☀ Dia'} {formatDayClock(hud.sandboxDayTime)}
          </span>
          <span className="text-[#4a3e6b]">|</span>
          <span className="font-pixel text-[11px] font-bold text-[#4df0c0]">
            {hud.sandboxBiomeName}
          </span>
          <span className="text-[#4a3e6b]">|</span>
          <span className="font-mono-num text-[11px] text-[#52e5ff]">
            Picareta T{hud.sandboxToolTier}
          </span>
          <span className="text-[#4a3e6b]">|</span>
          <span className="font-mono-num text-[11px] text-[#f5efe6]">
            Casas: {hud.sandboxHousesCount} · NPCs: {hud.sandboxNpcsCount}
          </span>
        </div>

        <PixelButton
          type="button"
          variant="emerald"
          tabIndex={-1}
          data-testid="sandbox-validate-house-btn"
          onClick={() => {
            const res = engine.validateCurrentSandboxHouse();
            setHouseFeedback(res.reason);
            setTimeout(() => setHouseFeedback(null), 4000);
          }}
          className="whitespace-nowrap shrink-0 !px-2.5 !py-1 text-[11px]"
        >
          Validar Casa
        </PixelButton>

        <PixelButton
          type="button"
          variant={showQuests ? 'gold' : 'slate'}
          tabIndex={-1}
          data-testid="sandbox-quests-toggle-btn"
          onClick={() => setShowQuests((v) => !v)}
          className="whitespace-nowrap shrink-0 !px-2.5 !py-1 text-[11px]"
        >
          Quests ({hud.sandboxQuestsCompleted}/{hud.sandboxQuestsTotal})
        </PixelButton>

        <PixelButton
          type="button"
          variant="cyan"
          tabIndex={-1}
          onClick={onOpenForge}
          className="whitespace-nowrap shrink-0 !px-2.5 !py-1 text-[11px]"
        >
          Forja [I]
        </PixelButton>

        <PixelButton
          type="button"
          variant="slate"
          tabIndex={-1}
          onClick={onOpenPets}
          className="whitespace-nowrap shrink-0 !px-2.5 !py-1 text-[11px]"
        >
          Pets [Y]
        </PixelButton>

        <PixelButton
          type="button"
          variant="cyan"
          tabIndex={-1}
          data-testid="sandbox-warp-pylon-btn"
          onClick={() => {
            const res = engine.warpToNextSandboxPylon();
            setHouseFeedback(res.ok ? `Teleportado para: ${res.label}` : res.label);
            setTimeout(() => setHouseFeedback(null), 3500);
          }}
          className="whitespace-nowrap shrink-0 !px-2.5 !py-1 text-[11px] text-[#7ce8ff]"
        >
          Pilão Teleporte [E]
        </PixelButton>
      </div>

      {houseFeedback && (
        <div className="absolute left-1/2 top-14 -translate-x-1/2 border-2 border-[#07050d] bg-[#140e24f0] px-3 py-1 font-pixel text-xs font-bold text-[#ffe066]">
          {houseFeedback}
        </div>
      )}

      {/* Expandable Sandbox Quests Panel */}
      {showQuests && (
        <div className="absolute right-3 top-14 w-80 max-h-[60vh] overflow-y-auto border-2 border-[#4df0c0] bg-[#0e0a1af2] p-3 pointer-events-auto pixel-scroll shadow-[0_6px_0_0_#07050d]">
          <div className="mb-2 flex items-center justify-between border-b border-[#2a2140] pb-1.5">
            <span className="font-pixel text-xs font-bold text-[#4df0c0]">
              Desafios do Mundo Sandbox
            </span>
            <button
              type="button"
              onClick={() => setShowQuests(false)}
              className="font-pixel text-[10px] text-[#ff708d]"
            >
              Fechar
            </button>
          </div>
          <div className="space-y-2">
            {SANDBOX_QUESTS.map((q) => {
              const prog = Math.min(q.target, engine.getSandboxQuestProgress(q.id));
              const claimed = engine.sandboxQuestsClaimed.has(q.id);
              const ready = !claimed && prog >= q.target;
              return (
                <div key={q.id} className="border border-[#28203d] bg-[#090712] p-2">
                  <div className="flex items-center justify-between gap-1">
                    <span style={{ color: q.accent }} className="font-pixel text-[11px] font-bold">
                      {q.title}
                    </span>
                    <span className="font-mono-num text-[10px] text-[#d5cce6]">
                      {prog}/{q.target}
                    </span>
                  </div>
                  <p className="mt-0.5 font-body-pixel text-[10px] text-[#b8afc9]">{q.desc}</p>
                  <div className="mt-1.5 flex items-center justify-between">
                    <span className="font-mono-num text-[10px] text-[#ffe47a]">
                      +{q.coinReward}★ · +{q.xpReward} XP
                    </span>
                    {claimed ? (
                      <span className="font-pixel text-[10px] font-bold text-[#4df0c0]">RESGATADO</span>
                    ) : ready ? (
                      <PixelButton
                        type="button"
                        variant="gold"
                        onClick={() => engine.claimSandboxQuest(q.id)}
                        className="!px-2 !py-0.5 text-[10px]"
                      >
                        Resgatar
                      </PixelButton>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Bottom-Center Terraria-Style Hotbar (1..9) */}
      <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-auto">
        <div className="flex items-center gap-1 border-2 border-[#07050d] bg-[#0e0a1ae8] p-1 shadow-[0_4px_0_0_#07050d]">
          {hud.sandboxHotbar.slice(0, 9).map((slot, idx) => {
            const active = idx === hud.sandboxSelectedSlot;
            return (
              <button
                key={slot.id}
                type="button"
                tabIndex={-1}
                data-testid={`sandbox-hotbar-${idx}`}
                onClick={() => engine.selectSandboxSlot(idx)}
                style={{ borderColor: active ? '#ffe066' : '#2a2140' }}
                className={`relative flex h-11 w-11 flex-col items-center justify-between border-2 p-1 transition-transform ${
                  active ? '-translate-y-0.5 bg-[#241942]' : 'bg-[#130e24] hover:bg-[#1b1433]'
                }`}
              >
                <span className="self-start font-mono-num text-[8px] leading-none text-[#b8afc9]">
                  {idx + 1}
                </span>
                <span
                  style={{ backgroundColor: slot.color }}
                  className="h-3.5 w-3.5 border border-[#07050d]"
                />
                <span className="w-full truncate text-center font-pixel text-[8px] leading-none text-[#f5efe6]">
                  {slot.label.split(' ')[0]}
                </span>
                {slot.count > 1 && (
                  <span className="absolute right-0.5 top-0.5 font-mono-num text-[8px] font-bold text-[#ffe066]">
                    {slot.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
        <div className="bg-[#08060fcc] px-2.5 py-0.5 font-body-pixel text-[10px] text-[#d5cce6]">
          Teclas 1-9 selecionam item · Esq: Minerar / Quebrar Potes / Atacar · Dir: Construir / Abrir Porta / Usar Pilão & Totem
        </div>
      </div>
    </div>
  );
};
