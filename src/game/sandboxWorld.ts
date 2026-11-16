import type { MaterialId } from './crafting';
import { TILE_SIZE } from './types';

export const SANDBOX_COLS = 1600;
export const SANDBOX_ROWS = 320;
export const SANDBOX_WORLD_WIDTH_PX = SANDBOX_COLS * TILE_SIZE;
export const SANDBOX_WORLD_HEIGHT_PX = SANDBOX_ROWS * TILE_SIZE;

export const enum SB_TILE {
  AIR = 0,
  DIRT = 1,
  GRASS = 2,
  STONE = 3,
  SAND = 4,
  SNOW = 5,
  ICE = 6,
  WOOD_TRUNK = 7,
  LEAVES = 8,
  MUD = 9,
  JUNGLE_GRASS = 10,
  ASH = 11,
  HELLSTONE = 12,
  OBSIDIAN = 13,
  DUNGEON_BRICK = 14,
  COPPER_ORE = 15,
  IRON_ORE = 16,
  GOLD_ORE = 17,
  MITHRIL_ORE = 18,
  ETHER_ORE = 19,
  PLANK = 20,
  BRICK_BLOCK = 21,
  PLATFORM = 22,
  GLASS = 23,
  TORCH = 24,
  WORKBENCH = 25,
  FORGE = 26,
  CAULDRON = 27,
  DOOR_CLOSED = 28,
  DOOR_OPEN = 29,
  TABLE = 30,
  CHAIR = 31,
  CHEST = 32,
  BED_SPAWN = 33,
  ALTAR = 34,
  CAMPFIRE = 35,
  BOUNCE_SHROOM = 36,
  DASH_CRYSTAL = 37,
  LIFE_CRYSTAL = 38,
  POT = 39,
  SHRINE = 40,
  TELEPORT_PYLON = 41,
  BANNER = 42,
}

export const enum SB_WALL {
  NONE = 0,
  DIRT_WALL = 1,
  WOOD_WALL = 2,
  STONE_WALL = 3,
  BRICK_WALL = 4,
  GLASS_WALL = 5,
  DUNGEON_WALL = 6,
}

export interface SandboxTileMeta {
  id: SB_TILE;
  name: string;
  solid: boolean;
  platform: boolean;
  blocksHouse: boolean;
  minToolTier: number;
  hitsRequired: number;
  color: string;
  highlightColor: string;
  materialDrop?: MaterialId;
  dropQty?: number;
  selfTileDrop?: SB_TILE;
}

export const SANDBOX_TILE_META: Record<number, SandboxTileMeta> = {
  [SB_TILE.AIR]: { id: SB_TILE.AIR, name: 'Ar', solid: false, platform: false, blocksHouse: false, minToolTier: 0, hitsRequired: 0, color: 'transparent', highlightColor: 'transparent' },
  [SB_TILE.DIRT]: { id: SB_TILE.DIRT, name: 'Terra', solid: true, platform: false, blocksHouse: true, minToolTier: 1, hitsRequired: 2, color: '#6b442b', highlightColor: '#8d5b3a', selfTileDrop: SB_TILE.DIRT },
  [SB_TILE.GRASS]: { id: SB_TILE.GRASS, name: 'Grama', solid: true, platform: false, blocksHouse: true, minToolTier: 1, hitsRequired: 2, color: '#3aa85b', highlightColor: '#69d97f', materialDrop: 'madeira_ancestral', dropQty: 1, selfTileDrop: SB_TILE.DIRT },
  [SB_TILE.STONE]: { id: SB_TILE.STONE, name: 'Pedra', solid: true, platform: false, blocksHouse: true, minToolTier: 1, hitsRequired: 3, color: '#5c6475', highlightColor: '#8690a6', materialDrop: 'pedra_runica', dropQty: 1, selfTileDrop: SB_TILE.STONE },
  [SB_TILE.SAND]: { id: SB_TILE.SAND, name: 'Areia Solar', solid: true, platform: false, blocksHouse: true, minToolTier: 1, hitsRequired: 2, color: '#d9b56c', highlightColor: '#f5dc93', materialDrop: 'areia_estelar', dropQty: 1, selfTileDrop: SB_TILE.SAND },
  [SB_TILE.SNOW]: { id: SB_TILE.SNOW, name: 'Neve', solid: true, platform: false, blocksHouse: true, minToolTier: 1, hitsRequired: 2, color: '#cbe6f7', highlightColor: '#ffffff', materialDrop: 'cristal_gelo', dropQty: 1, selfTileDrop: SB_TILE.SNOW },
  [SB_TILE.ICE]: { id: SB_TILE.ICE, name: 'Gelo Safira', solid: true, platform: false, blocksHouse: true, minToolTier: 1, hitsRequired: 3, color: '#5ec8e8', highlightColor: '#bdf3ff', materialDrop: 'cristal_gelo', dropQty: 1, selfTileDrop: SB_TILE.ICE },
  [SB_TILE.WOOD_TRUNK]: { id: SB_TILE.WOOD_TRUNK, name: 'Tronco Antigo', solid: false, platform: false, blocksHouse: false, minToolTier: 1, hitsRequired: 2, color: '#6e4526', highlightColor: '#99653c', materialDrop: 'madeira_ancestral', dropQty: 2, selfTileDrop: SB_TILE.PLANK },
  [SB_TILE.LEAVES]: { id: SB_TILE.LEAVES, name: 'Copa de Folhas', solid: false, platform: false, blocksHouse: false, minToolTier: 1, hitsRequired: 1, color: '#2b8a4e', highlightColor: '#56c77a', materialDrop: 'esporo_luminoso', dropQty: 1 },
  [SB_TILE.MUD]: { id: SB_TILE.MUD, name: 'Lama Abissal', solid: true, platform: false, blocksHouse: true, minToolTier: 1, hitsRequired: 2, color: '#45352d', highlightColor: '#665046', materialDrop: 'erva_celeste', dropQty: 1, selfTileDrop: SB_TILE.MUD },
  [SB_TILE.JUNGLE_GRASS]: { id: SB_TILE.JUNGLE_GRASS, name: 'Musgo Bioluminescente', solid: true, platform: false, blocksHouse: true, minToolTier: 1, hitsRequired: 2, color: '#1fb58d', highlightColor: '#6ef7cd', materialDrop: 'cristal_biolum', dropQty: 1, selfTileDrop: SB_TILE.MUD },
  [SB_TILE.ASH]: { id: SB_TILE.ASH, name: 'Cinza Vulcânica', solid: true, platform: false, blocksHouse: true, minToolTier: 1, hitsRequired: 2, color: '#38303d', highlightColor: '#594e61', materialDrop: 'pedra_runica', dropQty: 1, selfTileDrop: SB_TILE.ASH },
  [SB_TILE.HELLSTONE]: { id: SB_TILE.HELLSTONE, name: 'Pedra Infernal', solid: true, platform: false, blocksHouse: true, minToolTier: 3, hitsRequired: 5, color: '#9c2424', highlightColor: '#ff7733', materialDrop: 'brasa_viva', dropQty: 2, selfTileDrop: SB_TILE.HELLSTONE },
  [SB_TILE.OBSIDIAN]: { id: SB_TILE.OBSIDIAN, name: 'Obsidiana', solid: true, platform: false, blocksHouse: true, minToolTier: 3, hitsRequired: 5, color: '#241438', highlightColor: '#693fa1', materialDrop: 'obsidiana_viva', dropQty: 2, selfTileDrop: SB_TILE.OBSIDIAN },
  [SB_TILE.DUNGEON_BRICK]: { id: SB_TILE.DUNGEON_BRICK, name: 'Tijolo da Masmorra', solid: true, platform: false, blocksHouse: true, minToolTier: 2, hitsRequired: 4, color: '#293752', highlightColor: '#4c6694', materialDrop: 'osso_antigo', dropQty: 2, selfTileDrop: SB_TILE.DUNGEON_BRICK },
  [SB_TILE.COPPER_ORE]: { id: SB_TILE.COPPER_ORE, name: 'Minério de Cobre', solid: true, platform: false, blocksHouse: true, minToolTier: 1, hitsRequired: 3, color: '#8f5238', highlightColor: '#e8966b', materialDrop: 'minerio_cobre', dropQty: 2, selfTileDrop: SB_TILE.COPPER_ORE },
  [SB_TILE.IRON_ORE]: { id: SB_TILE.IRON_ORE, name: 'Minério de Ferro', solid: true, platform: false, blocksHouse: true, minToolTier: 1, hitsRequired: 4, color: '#5f6775', highlightColor: '#c2cde0', materialDrop: 'minerio_ferro', dropQty: 3, selfTileDrop: SB_TILE.IRON_ORE },
  [SB_TILE.GOLD_ORE]: { id: SB_TILE.GOLD_ORE, name: 'Veio de Ouro Solar', solid: true, platform: false, blocksHouse: true, minToolTier: 2, hitsRequired: 4, color: '#96711e', highlightColor: '#ffe066', materialDrop: 'minerio_ouro', dropQty: 2, selfTileDrop: SB_TILE.GOLD_ORE },
  [SB_TILE.MITHRIL_ORE]: { id: SB_TILE.MITHRIL_ORE, name: 'Minério de Mithril', solid: true, platform: false, blocksHouse: true, minToolTier: 3, hitsRequired: 5, color: '#1b6e6a', highlightColor: '#5cf2d6', materialDrop: 'minerio_mitril', dropQty: 2, selfTileDrop: SB_TILE.MITHRIL_ORE },
  [SB_TILE.ETHER_ORE]: { id: SB_TILE.ETHER_ORE, name: 'Cristal de Éter Puro', solid: true, platform: false, blocksHouse: true, minToolTier: 4, hitsRequired: 6, color: '#5e248a', highlightColor: '#e08aff', materialDrop: 'minerio_eter', dropQty: 2, selfTileDrop: SB_TILE.ETHER_ORE },
  [SB_TILE.PLANK]: { id: SB_TILE.PLANK, name: 'Tábua de Madeira', solid: true, platform: false, blocksHouse: true, minToolTier: 1, hitsRequired: 2, color: '#8f5d38', highlightColor: '#bd8455', selfTileDrop: SB_TILE.PLANK },
  [SB_TILE.BRICK_BLOCK]: { id: SB_TILE.BRICK_BLOCK, name: 'Bloco de Tijolo', solid: true, platform: false, blocksHouse: true, minToolTier: 1, hitsRequired: 2, color: '#6b4e57', highlightColor: '#9c7883', selfTileDrop: SB_TILE.BRICK_BLOCK },
  [SB_TILE.PLATFORM]: { id: SB_TILE.PLATFORM, name: 'Plataforma', solid: false, platform: true, blocksHouse: false, minToolTier: 1, hitsRequired: 1, color: '#a36e42', highlightColor: '#d49966', selfTileDrop: SB_TILE.PLATFORM },
  [SB_TILE.GLASS]: { id: SB_TILE.GLASS, name: 'Vidro Estelar', solid: true, platform: false, blocksHouse: true, minToolTier: 1, hitsRequired: 1, color: '#78d2eb', highlightColor: '#ffffff', selfTileDrop: SB_TILE.GLASS },
  [SB_TILE.TORCH]: { id: SB_TILE.TORCH, name: 'Tocha', solid: false, platform: false, blocksHouse: false, minToolTier: 1, hitsRequired: 1, color: '#ffb833', highlightColor: '#fff5b8', selfTileDrop: SB_TILE.TORCH },
  [SB_TILE.WORKBENCH]: { id: SB_TILE.WORKBENCH, name: 'Bancada', solid: false, platform: true, blocksHouse: false, minToolTier: 1, hitsRequired: 2, color: '#9c6334', highlightColor: '#d1925c', selfTileDrop: SB_TILE.WORKBENCH },
  [SB_TILE.FORGE]: { id: SB_TILE.FORGE, name: 'Forja Rúnica', solid: false, platform: false, blocksHouse: false, minToolTier: 1, hitsRequired: 2, color: '#543540', highlightColor: '#ff7733', selfTileDrop: SB_TILE.FORGE },
  [SB_TILE.CAULDRON]: { id: SB_TILE.CAULDRON, name: 'Caldeirão Alquímico', solid: false, platform: false, blocksHouse: false, minToolTier: 1, hitsRequired: 2, color: '#274d4c', highlightColor: '#4df0c0', selfTileDrop: SB_TILE.CAULDRON },
  [SB_TILE.DOOR_CLOSED]: { id: SB_TILE.DOOR_CLOSED, name: 'Porta', solid: true, platform: false, blocksHouse: true, minToolTier: 1, hitsRequired: 2, color: '#754624', highlightColor: '#b07246', selfTileDrop: SB_TILE.DOOR_CLOSED },
  [SB_TILE.DOOR_OPEN]: { id: SB_TILE.DOOR_OPEN, name: 'Porta Aberta', solid: false, platform: false, blocksHouse: true, minToolTier: 1, hitsRequired: 2, color: '#543118', highlightColor: '#8c5732', selfTileDrop: SB_TILE.DOOR_CLOSED },
  [SB_TILE.TABLE]: { id: SB_TILE.TABLE, name: 'Mesa', solid: false, platform: true, blocksHouse: false, minToolTier: 1, hitsRequired: 2, color: '#8f5932', highlightColor: '#c48656', selfTileDrop: SB_TILE.TABLE },
  [SB_TILE.CHAIR]: { id: SB_TILE.CHAIR, name: 'Cadeira', solid: false, platform: false, blocksHouse: false, minToolTier: 1, hitsRequired: 1, color: '#8f5932', highlightColor: '#c48656', selfTileDrop: SB_TILE.CHAIR },
  [SB_TILE.CHEST]: { id: SB_TILE.CHEST, name: 'Baú de Tesouro', solid: false, platform: false, blocksHouse: false, minToolTier: 1, hitsRequired: 2, color: '#b58428', highlightColor: '#ffe066', selfTileDrop: SB_TILE.CHEST },
  [SB_TILE.BED_SPAWN]: { id: SB_TILE.BED_SPAWN, name: 'Cama (Ponto Spawn)', solid: false, platform: true, blocksHouse: false, minToolTier: 1, hitsRequired: 2, color: '#c43b5a', highlightColor: '#ffd27d', selfTileDrop: SB_TILE.BED_SPAWN },
  [SB_TILE.ALTAR]: { id: SB_TILE.ALTAR, name: 'Altar do Núcleo', solid: false, platform: false, blocksHouse: false, minToolTier: 1, hitsRequired: 2, color: '#6b329c', highlightColor: '#e88aff', selfTileDrop: SB_TILE.ALTAR },
  [SB_TILE.CAMPFIRE]: { id: SB_TILE.CAMPFIRE, name: 'Fogueira Acolhedora', solid: false, platform: false, blocksHouse: false, minToolTier: 1, hitsRequired: 1, color: '#ff7733', highlightColor: '#ffe875', selfTileDrop: SB_TILE.CAMPFIRE },
  [SB_TILE.BOUNCE_SHROOM]: { id: SB_TILE.BOUNCE_SHROOM, name: 'Cogumelo Elástico', solid: false, platform: false, blocksHouse: false, minToolTier: 1, hitsRequired: 1, color: '#18b88c', highlightColor: '#a8ffea', materialDrop: 'esporo_luminoso', dropQty: 2, selfTileDrop: SB_TILE.BOUNCE_SHROOM },
  [SB_TILE.DASH_CRYSTAL]: { id: SB_TILE.DASH_CRYSTAL, name: 'Cristal de Dash', solid: false, platform: false, blocksHouse: false, minToolTier: 1, hitsRequired: 1, color: '#4df099', highlightColor: '#ffffff', materialDrop: 'cristal_biolum', dropQty: 2, selfTileDrop: SB_TILE.DASH_CRYSTAL },
  [SB_TILE.LIFE_CRYSTAL]: { id: SB_TILE.LIFE_CRYSTAL, name: 'Cristal de Vida', solid: false, platform: false, blocksHouse: false, minToolTier: 1, hitsRequired: 2, color: '#ff3864', highlightColor: '#ffd6e0', materialDrop: 'pedra_evolucao', dropQty: 1 },
  [SB_TILE.POT]: { id: SB_TILE.POT, name: 'Pote de Tesouro', solid: false, platform: false, blocksHouse: false, minToolTier: 1, hitsRequired: 1, color: '#a85a3a', highlightColor: '#e08e67', materialDrop: 'minerio_cobre', dropQty: 1 },
  [SB_TILE.SHRINE]: { id: SB_TILE.SHRINE, name: 'Totem de Bênção', solid: false, platform: false, blocksHouse: false, minToolTier: 1, hitsRequired: 2, color: '#52e5ff', highlightColor: '#ffffff', selfTileDrop: SB_TILE.SHRINE },
  [SB_TILE.TELEPORT_PYLON]: { id: SB_TILE.TELEPORT_PYLON, name: 'Pilão de Teleporte', solid: false, platform: false, blocksHouse: false, minToolTier: 1, hitsRequired: 2, color: '#66eeff', highlightColor: '#ffe066', selfTileDrop: SB_TILE.TELEPORT_PYLON },
  [SB_TILE.BANNER]: { id: SB_TILE.BANNER, name: 'Estandarte de Guerra', solid: false, platform: false, blocksHouse: false, minToolTier: 1, hitsRequired: 1, color: '#d92b54', highlightColor: '#ffd27d', selfTileDrop: SB_TILE.BANNER },
};

export function isSandboxSolid(tile: number): boolean {
  return Boolean(SANDBOX_TILE_META[tile]?.solid);
}

export function isSandboxPlatform(tile: number): boolean {
  return Boolean(SANDBOX_TILE_META[tile]?.platform);
}

export function isSandboxBlockingHouse(tile: number): boolean {
  return Boolean(SANDBOX_TILE_META[tile]?.blocksHouse);
}

export type SandboxBiomeId =
  | 'ocean_west'
  | 'ancient_dungeon'
  | 'tundra'
  | 'forest'
  | 'desert'
  | 'jungle'
  | 'abyss_surface'
  | 'ocean_east'
  | 'sky_islands'
  | 'caverns'
  | 'underworld';

export interface SandboxNpc {
  id: string;
  name: string;
  role: string;
  accentColor: string;
  spriteKind?: string;
  x: number;
  y: number;
  vx: number;
  homeTx: number;
  homeTy: number;
  dir: 1 | -1;
}

export interface SandboxEnemy {
  id: string;
  kind: 'slime' | 'demon_eye' | 'sand_crawler' | 'cave_skeleton' | 'hell_imp' | 'dungeon_guard' | 'core_boss';
  spriteKind?: string;
  name: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  hp: number;
  maxHp: number;
  w: number;
  h: number;
  color: string;
  timer: number;
  flash: number;
  isBoss?: boolean;
}

export type SandboxScenicPropKind =
  | 'tree_pine'
  | 'sakura_tree'
  | 'cactus_saguaro'
  | 'giant_shroom'
  | 'crystal_spire'
  | 'ruin_statue'
  | 'sun_brazier'
  | 'coral_pillar'
  | 'obelisk';

export interface SandboxScenicProp {
  id: string;
  kind: SandboxScenicPropKind;
  tx: number;
  ty: number;
}

export interface SandboxHouse {
  id: string;
  centerTx: number;
  centerTy: number;
  npcId?: string;
}

export interface SandboxHotbarSlot {
  id: string;
  name: string;
  kind: 'tool' | 'weapon' | 'tile' | 'wall' | 'summon';
  tile?: SB_TILE;
  wall?: SB_WALL;
  count: number;
  color: string;
}

export interface SandboxQuestDef {
  id: string;
  title: string;
  desc: string;
  target: number;
  coinReward: number;
  xpReward: number;
  accent: string;
}

export const SANDBOX_QUESTS: SandboxQuestDef[] = [
  { id: 'sb_cut_wood', title: 'Lenhador de Aethelgard', desc: 'Colete 8 blocos de madeira ou troncos na superfície.', target: 8, coinReward: 20, xpReward: 40, accent: '#8d5b3a' },
  { id: 'sb_mine_ore', title: 'Primeira Veia Mineral', desc: 'Minere 10 minérios subterrâneos (Cobre, Ferro ou Ouro).', target: 10, coinReward: 35, xpReward: 60, accent: '#52e5ff' },
  { id: 'sb_build_house', title: 'Arquiteto do Lar', desc: 'Construa e valide 1 Casa completa (paredes, porta, tocha, mesa e cadeira).', target: 1, coinReward: 60, xpReward: 100, accent: '#ffd27d' },
  { id: 'sb_attract_npc', title: 'Vila Despertada', desc: 'Abrigue 2 moradores NPCs em casas validadas.', target: 2, coinReward: 90, xpReward: 140, accent: '#4df0c0' },
  { id: 'sb_upgrade_pick', title: 'Picareta Refinada', desc: 'Evolua sua picareta para Nível 2+ na Forja/Crafting.', target: 1, coinReward: 45, xpReward: 80, accent: '#f59e0b' },
  { id: 'sb_reach_hell', title: 'Descida ao Magma', desc: 'Alcançe as profundezas infernais abaixo de 260 blocos.', target: 1, coinReward: 80, xpReward: 130, accent: '#ff5522' },
  { id: 'sb_explore_dungeon', title: 'Saqueador da Masmorra', desc: 'Abra 2 baús antigos nas Ilhas Celestes, Pirâmide ou Masmorra.', target: 2, coinReward: 75, xpReward: 120, accent: '#a855f7' },
  { id: 'sb_defeat_boss', title: 'Senhor do Núcleo Sandbox', desc: 'Invoque e derrote o Guardião do Núcleo Sandbox.', target: 1, coinReward: 200, xpReward: 300, accent: '#ff2e63' },
];

export const NPC_ROSTER: Omit<SandboxNpc, 'x' | 'y' | 'vx' | 'homeTx' | 'homeTy' | 'dir'>[] = [
  { id: 'npc_guide', name: 'Guia Lyra', role: 'Exploradora', accentColor: '#52e5ff', spriteKind: 'astra' },
  { id: 'npc_blacksmith', name: 'Ferreiro Korg', role: 'Mestre da Forja', accentColor: '#ff7733', spriteKind: 'ferro' },
  { id: 'npc_alchemist', name: 'Alquimista Vera', role: 'Boticária', accentColor: '#4df0c0', spriteKind: 'alch_vera' },
  { id: 'npc_tamer', name: 'Domador Sol', role: 'Guardião de Pets', accentColor: '#ffd27d', spriteKind: 'kael' },
  { id: 'npc_merchant', name: 'Mercador Astral', role: 'Comerciante', accentColor: '#c084fc', spriteKind: 'morgana' },
];

export interface SandboxWorld {
  seed: number;
  cols: number;
  rows: number;
  tiles: Uint8Array;
  walls: Uint8Array;
  tileDamage: Uint8Array;
  spawnTx: number;
  spawnTy: number;
  dayTime: number; // 0..24 (6-18 dia, 18-6 noite)
  houses: SandboxHouse[];
  npcs: SandboxNpc[];
  enemies: SandboxEnemy[];
  scenicProps: SandboxScenicProp[];
  pylons: { tx: number; ty: number; label: string; color: string }[];
  openedChests: Set<string>;
  modifiedCells: Map<number, { tile: number; wall: number }>;
  progress: {
    woodGathered: number;
    oresMined: number;
    housesBuilt: number;
    chestsOpened: number;
    reachedHell: number;
    bossDefeated: number;
  };
}

export interface SandboxDeltaSave {
  seed: number;
  dayTime: number;
  spawnTx: number;
  spawnTy: number;
  changes: [number, number, number][]; // [idx, tile, wall]
  houses: SandboxHouse[];
  openedChests: string[];
  progress: SandboxWorld['progress'];
}

function hash2d(x: number, y: number, seed: number): number {
  let h = (x * 374761393 + y * 668265263 + seed * 1442695041) | 0;
  h = ((h ^ (h >> 13)) * 1274126177) | 0;
  return ((h ^ (h >> 16)) >>> 0) / 4294967295;
}

export function getSandboxSurfaceBiome(tx: number): SandboxBiomeId {
  if (tx < 38) return 'ocean_west';
  if (tx < 110) return 'ancient_dungeon';
  if (tx < 340) return 'tundra';
  if (tx < 660) return 'forest';
  if (tx < 980) return 'desert';
  if (tx < 1280) return 'jungle';
  if (tx < 1495) return 'abyss_surface';
  return 'ocean_east';
}

export function getSandboxBiomeAt(tx: number, ty: number): { id: SandboxBiomeId; label: string; color: string } {
  if (ty < 64) return { id: 'sky_islands', label: 'Ilhas Celestes', color: '#7ce8ff' };
  if (ty >= 260) return { id: 'underworld', label: 'Submundo de Magma', color: '#ff5522' };
  if (ty >= 145) return { id: 'caverns', label: 'Cavernas Profundas', color: '#94a3b8' };
  const surf = getSandboxSurfaceBiome(tx);
  const map: Record<SandboxBiomeId, { label: string; color: string }> = {
    ocean_west: { label: 'Oceano Oeste', color: '#38bdf8' },
    ancient_dungeon: { label: 'Ruínas da Masmorra', color: '#818cf8' },
    tundra: { label: 'Tundra Glacial', color: '#7ce8ff' },
    forest: { label: 'Floresta de Aethelgard', color: '#4df0c0' },
    desert: { label: 'Deserto & Pirâmide', color: '#fbbf24' },
    jungle: { label: 'Selva Bioluminescente', color: '#34d399' },
    abyss_surface: { label: 'Abismo Corrompido', color: '#c084fc' },
    ocean_east: { label: 'Costa Vulcânica Leste', color: '#fb7185' },
    sky_islands: { label: 'Ilhas Celestes', color: '#7ce8ff' },
    caverns: { label: 'Cavernas Profundas', color: '#94a3b8' },
    underworld: { label: 'Submundo de Magma', color: '#ff5522' },
  };
  return { id: surf, ...map[surf] };
}

export function createStarterHotbar(): SandboxHotbarSlot[] {
  return [
    { id: 'tool_pick', name: 'Picareta', kind: 'tool', count: 1, color: '#52e5ff' },
    { id: 'weapon_blade', name: 'Lâmina Astral', kind: 'weapon', count: 1, color: '#ff5c8a' },
    { id: 'tile_plank', name: 'Tábua', kind: 'tile', tile: SB_TILE.PLANK, count: 48, color: '#bd8455' },
    { id: 'tile_platform', name: 'Plataforma', kind: 'tile', tile: SB_TILE.PLATFORM, count: 24, color: '#d49966' },
    { id: 'wall_wood', name: 'Parede Fundo', kind: 'wall', wall: SB_WALL.WOOD_WALL, count: 64, color: '#70492b' },
    { id: 'tile_torch', name: 'Tocha', kind: 'tile', tile: SB_TILE.TORCH, count: 16, color: '#ffd24d' },
    { id: 'tile_door', name: 'Porta', kind: 'tile', tile: SB_TILE.DOOR_CLOSED, count: 4, color: '#9c6334' },
    { id: 'tile_furniture', name: 'Mesa/Cadeira', kind: 'tile', tile: SB_TILE.TABLE, count: 4, color: '#c48656' },
    { id: 'summon_boss', name: 'Olho Núcleo', kind: 'summon', count: 1, color: '#e879f9' },
  ];
}

export function generateSandboxWorld(seed = 202504): SandboxWorld {
  const cols = SANDBOX_COLS;
  const rows = SANDBOX_ROWS;
  const tiles = new Uint8Array(cols * rows);
  const walls = new Uint8Array(cols * rows);
  const tileDamage = new Uint8Array(cols * rows);

  const setTile = (tx: number, ty: number, tile: SB_TILE) => {
    if (tx < 0 || tx >= cols || ty < 0 || ty >= rows) return;
    tiles[ty * cols + tx] = tile;
  };
  const setWall = (tx: number, ty: number, wall: SB_WALL) => {
    if (tx < 0 || tx >= cols || ty < 0 || ty >= rows) return;
    walls[ty * cols + tx] = wall;
  };

  const surfaceHeightAt = (tx: number): number => {
    if (tx < 38) return 104 + Math.round(Math.sin(tx * 0.08) * 3);
    if (tx > 1495) return 104 + Math.round(Math.sin(tx * 0.08) * 3);
    if (tx >= 485 && tx <= 525) return 96; // Flat starter valley around tx=500
    const wave =
      Math.sin(tx * 0.025 + seed) * 6 +
      Math.cos(tx * 0.065) * 3 +
      Math.sin(tx * 0.008) * 5;
    return Math.max(82, Math.min(116, Math.round(98 + wave)));
  };

  for (let tx = 0; tx < cols; tx++) {
    const surfY = surfaceHeightAt(tx);
    const biome = getSandboxSurfaceBiome(tx);

    for (let ty = surfY; ty < rows; ty++) {
      const depth = ty - surfY;
      // Underworld floor (ty >= 260)
      if (ty >= 260) {
        const hellNoise = Math.sin(tx * 0.06 + ty * 0.14) + Math.cos(tx * 0.11 - ty * 0.09);
        if (ty < 276 && hellNoise > 0.35) {
          setTile(tx, ty, SB_TILE.AIR);
        } else if (ty >= 274 && ty <= 296 && Math.abs(Math.sin(tx * 0.035 + ty * 0.08)) < 0.72) {
          setTile(tx, ty, SB_TILE.AIR);
        } else {
          setTile(tx, ty, ty > 304 ? SB_TILE.OBSIDIAN : SB_TILE.ASH);
        }
        continue;
      }

      // Caverns & noise caves
      const caveN =
        Math.sin(tx * 0.08 + ty * 0.09) +
        Math.cos(tx * 0.045 - ty * 0.07) * 0.8 +
        Math.sin((tx + ty) * 0.13) * 0.4;
      if (depth > 8 && caveN > 1.08) {
        setWall(tx, ty, depth > 34 ? SB_WALL.STONE_WALL : SB_WALL.DIRT_WALL);
        continue;
      }

      // Walls below ground
      if (depth >= 2) {
        setWall(tx, ty, depth > 28 ? SB_WALL.STONE_WALL : SB_WALL.DIRT_WALL);
      }

      // Biome terrain materials
      if (depth === 0) {
        if (biome === 'desert' || biome === 'ocean_west' || biome === 'ocean_east') setTile(tx, ty, SB_TILE.SAND);
        else if (biome === 'tundra') setTile(tx, ty, SB_TILE.SNOW);
        else if (biome === 'jungle') setTile(tx, ty, SB_TILE.JUNGLE_GRASS);
        else if (biome === 'abyss_surface') setTile(tx, ty, SB_TILE.OBSIDIAN);
        else setTile(tx, ty, SB_TILE.GRASS);
      } else if (depth < 14) {
        if (biome === 'desert') setTile(tx, ty, SB_TILE.SAND);
        else if (biome === 'tundra') setTile(tx, ty, depth > 6 ? SB_TILE.ICE : SB_TILE.SNOW);
        else if (biome === 'jungle') setTile(tx, ty, SB_TILE.MUD);
        else if (biome === 'abyss_surface') setTile(tx, ty, SB_TILE.ASH);
        else setTile(tx, ty, SB_TILE.DIRT);
      } else {
        setTile(tx, ty, biome === 'tundra' && depth < 42 ? SB_TILE.ICE : SB_TILE.STONE);
      }
    }
  }

  // Deterministic Ore Veins
  for (let tx = 16; tx < cols - 16; tx += 3) {
    for (let ty = 104; ty < 312; ty += 3) {
      if (tiles[ty * cols + tx] === SB_TILE.AIR) continue;
      const r = hash2d(tx, ty, seed);
      if (ty < 165 && r > 0.945) {
        setTile(tx, ty, SB_TILE.COPPER_ORE);
        setTile(tx + 1, ty, SB_TILE.COPPER_ORE);
      } else if (ty >= 120 && ty < 220 && r > 0.955) {
        setTile(tx, ty, SB_TILE.IRON_ORE);
        setTile(tx, ty + 1, SB_TILE.IRON_ORE);
      } else if (ty >= 165 && ty < 255 && r > 0.968) {
        setTile(tx, ty, SB_TILE.GOLD_ORE);
        setTile(tx + 1, ty, SB_TILE.GOLD_ORE);
      } else if (ty >= 195 && ty < 265 && r > 0.976) {
        setTile(tx, ty, SB_TILE.MITHRIL_ORE);
        setTile(tx + 1, ty, SB_TILE.MITHRIL_ORE);
      } else if (ty >= 230 && ty < 295 && r > 0.982) {
        setTile(tx, ty, ty >= 260 ? SB_TILE.HELLSTONE : SB_TILE.ETHER_ORE);
        setTile(tx + 1, ty, ty >= 260 ? SB_TILE.HELLSTONE : SB_TILE.ETHER_ORE);
      }
    }
  }

  // Surface Trees
  for (let tx = 120; tx < 1475; tx += 11) {
    if (tx >= 488 && tx <= 522) continue; // Keep starter clearing open
    if (tx >= 760 && tx <= 865) continue; // Pyramid zone
    const biome = getSandboxSurfaceBiome(tx);
    if (biome === 'desert') continue;
    if (hash2d(tx, 99, seed) < 0.42) continue;
    const sy = surfaceHeightAt(tx);
    const height = 5 + Math.floor(hash2d(tx, 77, seed) * 5);
    for (let h = 1; h <= height; h++) {
      setTile(tx, sy - h, SB_TILE.WOOD_TRUNK);
    }
    for (let lx = -2; lx <= 2; lx++) {
      for (let ly = -2; ly <= 0; ly++) {
        if (Math.abs(lx) + Math.abs(ly) <= 3) {
          setTile(tx + lx, sy - height + ly, SB_TILE.LEAVES);
        }
      }
    }
  }

  // Sky Islands (7 islands with shrines & treasure chests)
  const skyIslandXs = [210, 420, 620, 840, 1050, 1260, 1420];
  skyIslandXs.forEach((ix, i) => {
    const iy = 38 + (i % 3) * 8;
    for (let dx = -12; dx <= 12; dx++) {
      const thickness = Math.max(1, 5 - Math.floor(Math.abs(dx) / 3));
      for (let dy = 0; dy < thickness; dy++) {
        setTile(ix + dx, iy + dy, dy === 0 ? SB_TILE.GRASS : dx % 4 === 0 ? SB_TILE.GOLD_ORE : SB_TILE.DIRT);
      }
    }
    // Small sky pavilion with chest
    for (let px = -4; px <= 4; px++) {
      setTile(ix + px, iy - 5, SB_TILE.BRICK_BLOCK);
      for (let py = -4; py <= -1; py++) {
        setWall(ix + px, iy + py, SB_WALL.BRICK_WALL);
        if (Math.abs(px) === 4 && py >= -4) setTile(ix + px, iy + py, py === -1 ? SB_TILE.DOOR_CLOSED : SB_TILE.BRICK_BLOCK);
      }
    }
    setTile(ix, iy - 1, SB_TILE.CHEST);
    setTile(ix - 2, iy - 1, SB_TILE.TORCH);
    setTile(ix + 2, iy - 1, SB_TILE.TORCH);
  });

  // Desert Pyramid Dungeon (tx = 780..850)
  const pyrCenter = 815;
  const pyrBaseY = surfaceHeightAt(pyrCenter) + 1;
  for (let level = 0; level < 26; level++) {
    const halfW = 28 - level;
    const py = pyrBaseY - level;
    for (let dx = -halfW; dx <= halfW; dx++) {
      const isInner = Math.abs(dx) < halfW - 2 && level > 0 && level < 22;
      setWall(pyrCenter + dx, py, SB_WALL.BRICK_WALL);
      setTile(pyrCenter + dx, py, isInner ? SB_TILE.AIR : SB_TILE.BRICK_BLOCK);
    }
  }
  // Entrance doors & pyramid treasure room
  setTile(pyrCenter - 26, pyrBaseY - 1, SB_TILE.DOOR_CLOSED);
  setTile(pyrCenter - 26, pyrBaseY - 2, SB_TILE.AIR);
  setTile(pyrCenter, pyrBaseY - 1, SB_TILE.CHEST);
  setTile(pyrCenter - 4, pyrBaseY - 1, SB_TILE.ALTAR);
  setTile(pyrCenter + 4, pyrBaseY - 3, SB_TILE.TORCH);
  setTile(pyrCenter - 4, pyrBaseY - 3, SB_TILE.TORCH);

  // Far West Ancient Brick Dungeon (tx = 46..98 descending to ty = 190)
  for (let ty = surfaceHeightAt(72) - 4; ty < 192; ty++) {
    for (let tx = 62; tx <= 82; tx++) {
      setWall(tx, ty, SB_WALL.DUNGEON_WALL);
      const isBorder = tx === 62 || tx === 82 || ty === 191;
      setTile(tx, ty, isBorder ? SB_TILE.DUNGEON_BRICK : SB_TILE.AIR);
    }
    if (ty % 8 === 0) {
      for (let tx = 64; tx <= 80; tx++) setTile(tx, ty, SB_TILE.PLATFORM);
      setTile(65, ty - 1, SB_TILE.TORCH);
    }
  }
  setTile(72, 190, SB_TILE.CHEST);
  setTile(75, 190, SB_TILE.ALTAR);

  // Starter Safe Camp with Workbench, Forge, Cauldron, Campfire, Pylon & Banner at tx=500
  const spawnTx = 500;
  const spawnBaseY = surfaceHeightAt(spawnTx);
  for (let dx = -12; dx <= 12; dx++) {
    setTile(spawnTx + dx, spawnBaseY, SB_TILE.GRASS);
  }
  setTile(spawnTx - 7, spawnBaseY - 1, SB_TILE.TELEPORT_PYLON);
  setTile(spawnTx - 5, spawnBaseY - 1, SB_TILE.TORCH);
  setTile(spawnTx - 3, spawnBaseY - 1, SB_TILE.WORKBENCH);
  setTile(spawnTx - 1, spawnBaseY - 1, SB_TILE.CAMPFIRE);
  setTile(spawnTx + 3, spawnBaseY - 1, SB_TILE.FORGE);
  setTile(spawnTx + 5, spawnBaseY - 1, SB_TILE.TORCH);
  setTile(spawnTx + 6, spawnBaseY - 1, SB_TILE.CAULDRON);
  setTile(spawnTx + 8, spawnBaseY - 1, SB_TILE.SHRINE);
  setTile(spawnTx + 10, spawnBaseY - 1, SB_TILE.BANNER);

  // Teleport Pylons across biomes for Terraria Pylon fast-travel
  const pylons: { tx: number; ty: number; label: string; color: string }[] = [
    { tx: spawnTx - 7, ty: spawnBaseY - 1, label: 'Acampamento Base', color: '#4df0c0' },
  ];
  const biomePylonTargets = [
    { tx: 240, label: 'Tundra Glacial', color: '#7ce8ff' },
    { tx: 782, label: 'Pirâmide Solar', color: '#fbbf24' },
    { tx: 1120, label: 'Selva Bioluminescente', color: '#34d399' },
    { tx: 1380, label: 'Abismo Corrompido', color: '#c084fc' },
    { tx: 60, label: 'Masmorra Antiga', color: '#818cf8' },
  ];
  for (const pt of biomePylonTargets) {
    const py = surfaceHeightAt(pt.tx);
    for (let dx = -2; dx <= 2; dx++) setTile(pt.tx + dx, py, getSandboxSurfaceBiome(pt.tx) === 'desert' ? SB_TILE.SAND : getSandboxSurfaceBiome(pt.tx) === 'tundra' ? SB_TILE.SNOW : SB_TILE.BRICK_BLOCK);
    setTile(pt.tx, py - 1, SB_TILE.TELEPORT_PYLON);
    setTile(pt.tx - 1, py - 1, SB_TILE.TORCH);
    setTile(pt.tx + 1, py - 1, SB_TILE.TORCH);
    pylons.push({ tx: pt.tx, ty: py - 1, label: pt.label, color: pt.color });
  }
  // Sky island pylon + Underworld bridge pylon
  setTile(617, 37, SB_TILE.TELEPORT_PYLON);
  pylons.push({ tx: 617, ty: 37, label: 'Ilha Celeste', color: '#52e5ff' });
  for (let dx = -4; dx <= 4; dx++) setTile(500 + dx, 274, SB_TILE.OBSIDIAN);
  for (let dy = 1; dy <= 4; dy++) {
    for (let dx = -3; dx <= 3; dx++) setTile(500 + dx, 274 - dy, SB_TILE.AIR);
  }
  setTile(500, 273, SB_TILE.TELEPORT_PYLON);
  setTile(498, 273, SB_TILE.CAMPFIRE);
  setTile(502, 273, SB_TILE.BANNER);
  pylons.push({ tx: 500, ty: 273, label: 'Fornalha Infernal', color: '#ff5522' });

  // Populate Underground Clay Pots, Life Crystals, Bounce Shrooms & Dash Crystals
  for (let tx = 44; tx < cols - 44; tx += 7) {
    const surfY = surfaceHeightAt(tx);
    // Bounce shrooms on jungle/forest ledges + Dash crystals ascending toward sky islands
    if (tx % 28 === 0 && getSandboxSurfaceBiome(tx) === 'jungle') {
      setTile(tx, surfY - 1, SB_TILE.BOUNCE_SHROOM);
    }
    if (skyIslandXs.some((sx) => Math.abs(sx - tx) === 8)) {
      setTile(tx, surfY - 18, SB_TILE.DASH_CRYSTAL);
      setTile(tx, surfY - 34, SB_TILE.DASH_CRYSTAL);
    }
    for (let ty = surfY + 10; ty < 252; ty += 11) {
      const idx = ty * cols + tx;
      const below = (ty + 1) * cols + tx;
      if (tiles[idx] === SB_TILE.AIR && isSandboxSolid(tiles[below])) {
        const r = hash2d(tx, ty, seed + 51);
        if (r > 0.94 && ty > 145) {
          setTile(tx, ty, SB_TILE.LIFE_CRYSTAL);
        } else if (r > 0.80) {
          setTile(tx, ty, SB_TILE.POT);
        } else if (r > 0.72 && ty > 135) {
          setTile(tx, ty, SB_TILE.BOUNCE_SHROOM);
        }
      }
    }
  }
  // Treasure pots & banners in Pyramid and Ancient Dungeon
  setTile(pyrCenter - 8, pyrBaseY - 1, SB_TILE.POT);
  setTile(pyrCenter + 6, pyrBaseY - 1, SB_TILE.POT);
  setTile(pyrCenter + 2, pyrBaseY - 1, SB_TILE.BANNER);
  setTile(68, 190, SB_TILE.POT);
  setTile(78, 190, SB_TILE.POT);
  setTile(70, 190, SB_TILE.CAMPFIRE);

  // Scenic Biome Background Objects (non-blocking atmospheric richness matching normal campaign)
  const scenicProps: SandboxScenicProp[] = [];
  for (let tx = 48; tx < cols - 48; tx += 15) {
    if (tx >= 488 && tx <= 515) continue;
    const surfY = surfaceHeightAt(tx);
    if (tiles[(surfY - 1) * cols + tx] !== SB_TILE.AIR) continue;
    const biome = getSandboxSurfaceBiome(tx);
    const r = hash2d(tx, 333, seed);
    let kind: SandboxScenicPropKind = 'tree_pine';
    if (biome === 'forest') kind = r > 0.68 ? 'sakura_tree' : r > 0.35 ? 'tree_pine' : 'ruin_statue';
    else if (biome === 'desert') kind = r > 0.4 ? 'cactus_saguaro' : 'sun_brazier';
    else if (biome === 'tundra') kind = r > 0.45 ? 'crystal_spire' : 'tree_pine';
    else if (biome === 'jungle') kind = r > 0.3 ? 'giant_shroom' : 'crystal_spire';
    else if (biome === 'abyss_surface') kind = r > 0.5 ? 'obelisk' : 'sun_brazier';
    else if (biome === 'ocean_west' || biome === 'ocean_east') kind = 'coral_pillar';
    else if (biome === 'ancient_dungeon') kind = 'ruin_statue';
    scenicProps.push({ id: `sp_${tx}_${surfY}`, kind, tx, ty: surfY });
  }

  return {
    seed,
    cols,
    rows,
    tiles,
    walls,
    tileDamage,
    spawnTx,
    spawnTy: spawnBaseY - 2,
    dayTime: 9.0,
    houses: [],
    npcs: [
      {
        id: 'npc_guide',
        name: 'Guia Lyra',
        role: 'Exploradora',
        accentColor: '#52e5ff',
        spriteKind: 'astra',
        x: (spawnTx + 2) * TILE_SIZE,
        y: (spawnBaseY - 2) * TILE_SIZE,
        vx: 0,
        homeTx: spawnTx + 2,
        homeTy: spawnBaseY - 1,
        dir: 1,
      },
    ],
    enemies: [],
    scenicProps,
    pylons,
    openedChests: new Set(),
    modifiedCells: new Map(),
    progress: {
      woodGathered: 0,
      oresMined: 0,
      housesBuilt: 0,
      chestsOpened: 0,
      reachedHell: 0,
      bossDefeated: 0,
    },
  };
}

export function setSandboxTile(world: SandboxWorld, tx: number, ty: number, tile: SB_TILE): void {
  if (tx < 0 || tx >= world.cols || ty < 0 || ty >= world.rows) return;
  const idx = ty * world.cols + tx;
  world.tiles[idx] = tile;
  world.tileDamage[idx] = 0;
  world.modifiedCells.set(idx, { tile, wall: world.walls[idx] });
}

export function setSandboxWall(world: SandboxWorld, tx: number, ty: number, wall: SB_WALL): void {
  if (tx < 0 || tx >= world.cols || ty < 0 || ty >= world.rows) return;
  const idx = ty * world.cols + tx;
  world.walls[idx] = wall;
  world.modifiedCells.set(idx, { tile: world.tiles[idx], wall });
}

export function mineSandboxTile(
  world: SandboxWorld,
  tx: number,
  ty: number,
  toolTier: number
): {
  status: 'empty' | 'too_hard' | 'damaged' | 'broken';
  tileName?: string;
  materialDrop?: MaterialId;
  dropQty?: number;
  selfTileDrop?: SB_TILE;
} {
  if (tx < 0 || tx >= world.cols || ty < 0 || ty >= world.rows) return { status: 'empty' };
  const idx = ty * world.cols + tx;
  const tile = world.tiles[idx];
  if (tile === SB_TILE.AIR) return { status: 'empty' };
  const meta = SANDBOX_TILE_META[tile];
  if (!meta) return { status: 'empty' };
  if (toolTier < meta.minToolTier) {
    return { status: 'too_hard', tileName: meta.name };
  }

  const dmgPower = Math.max(1, toolTier);
  const nextDmg = world.tileDamage[idx] + dmgPower;
  if (nextDmg < meta.hitsRequired) {
    world.tileDamage[idx] = nextDmg;
    return { status: 'damaged', tileName: meta.name };
  }

  setSandboxTile(world, tx, ty, SB_TILE.AIR);
  if (tile === SB_TILE.WOOD_TRUNK || tile === SB_TILE.PLANK) {
    world.progress.woodGathered += 1;
  }
  if (
    tile === SB_TILE.COPPER_ORE ||
    tile === SB_TILE.IRON_ORE ||
    tile === SB_TILE.GOLD_ORE ||
    tile === SB_TILE.MITHRIL_ORE ||
    tile === SB_TILE.ETHER_ORE ||
    tile === SB_TILE.HELLSTONE
  ) {
    world.progress.oresMined += 1;
  }
  return {
    status: 'broken',
    tileName: meta.name,
    materialDrop: meta.materialDrop,
    dropQty: meta.dropQty ?? 1,
    selfTileDrop: meta.selfTileDrop,
  };
}

export interface HouseValidationResult {
  valid: boolean;
  reason: string;
  interiorCount: number;
  wallCoverage: number;
  hasDoor: boolean;
  hasTorch: boolean;
  hasTable: boolean;
  hasChair: boolean;
  centerTx: number;
  centerTy: number;
}

export function validateHouseAt(world: SandboxWorld, startTx: number, startTy: number): HouseValidationResult {
  if (startTx < 1 || startTx >= world.cols - 1 || startTy < 1 || startTy >= world.rows - 1) {
    return { valid: false, reason: 'Fora dos limites do mundo', interiorCount: 0, wallCoverage: 0, hasDoor: false, hasTorch: false, hasTable: false, hasChair: false, centerTx: startTx, centerTy: startTy };
  }
  const startTile = world.tiles[startTy * world.cols + startTx];
  if (isSandboxBlockingHouse(startTile)) {
    return { valid: false, reason: 'Clique no interior vazio da casa', interiorCount: 0, wallCoverage: 0, hasDoor: false, hasTorch: false, hasTable: false, hasChair: false, centerTx: startTx, centerTy: startTy };
  }

  const maxInterior = 180;
  const visited = new Set<number>();
  const queue: number[] = [startTx, startTy];
  let head = 0;
  let leaked = false;
  let wallCount = 0;
  let hasDoor = false;
  let hasTorch = false;
  let hasTable = false;
  let hasChair = false;
  let sumX = 0;
  let sumY = 0;

  while (head < queue.length) {
    const cx = queue[head++];
    const cy = queue[head++];
    const idx = cy * world.cols + cx;
    if (visited.has(idx)) continue;
    if (cx <= 0 || cx >= world.cols - 1 || cy <= 0 || cy >= world.rows - 1) {
      leaked = true;
      break;
    }

    const tile = world.tiles[idx];
    if (tile === SB_TILE.DOOR_CLOSED || tile === SB_TILE.DOOR_OPEN) {
      hasDoor = true;
      continue;
    }
    if (isSandboxBlockingHouse(tile)) {
      continue;
    }

    visited.add(idx);
    if (visited.size > maxInterior) {
      leaked = true;
      break;
    }

    sumX += cx;
    sumY += cy;
    if (world.walls[idx] !== SB_WALL.NONE) wallCount++;
    if (tile === SB_TILE.TORCH) hasTorch = true;
    if (tile === SB_TILE.TABLE || tile === SB_TILE.WORKBENCH) hasTable = true;
    if (tile === SB_TILE.CHAIR || tile === SB_TILE.BED_SPAWN) hasChair = true;

    queue.push(cx + 1, cy, cx - 1, cy, cx, cy + 1, cx, cy - 1);
  }

  const count = visited.size;
  const wallCoverage = count > 0 ? wallCount / count : 0;
  const centerTx = count > 0 ? Math.round(sumX / count) : startTx;
  const centerTy = count > 0 ? Math.round(sumY / count) : startTy;

  if (leaked || count < 12) {
    return {
      valid: false,
      reason: leaked ? 'Casa não está totalmente fechada por paredes/blocos!' : 'Casa muito pequena (mín. 12 blocos internos).',
      interiorCount: count,
      wallCoverage,
      hasDoor,
      hasTorch,
      hasTable,
      hasChair,
      centerTx,
      centerTy,
    };
  }
  if (wallCoverage < 0.6) {
    return { valid: false, reason: 'Preencha ao menos 60% das paredes de fundo.', interiorCount: count, wallCoverage, hasDoor, hasTorch, hasTable, hasChair, centerTx, centerTy };
  }
  if (!hasDoor) {
    return { valid: false, reason: 'Falta uma Porta na parede da casa.', interiorCount: count, wallCoverage, hasDoor, hasTorch, hasTable, hasChair, centerTx, centerTy };
  }
  if (!hasTorch) {
    return { valid: false, reason: 'Falta uma Tocha para iluminação.', interiorCount: count, wallCoverage, hasDoor, hasTorch, hasTable, hasChair, centerTx, centerTy };
  }
  if (!hasTable || !hasChair) {
    return { valid: false, reason: 'Coloque uma Mesa/Bancada e uma Cadeira/Cama dentro.', interiorCount: count, wallCoverage, hasDoor, hasTorch, hasTable, hasChair, centerTx, centerTy };
  }

  return {
    valid: true,
    reason: 'Casa válida para moradia!',
    interiorCount: count,
    wallCoverage,
    hasDoor,
    hasTorch,
    hasTable,
    hasChair,
    centerTx,
    centerTy,
  };
}

export function registerValidatedHouse(
  world: SandboxWorld,
  res: HouseValidationResult
): { registered: boolean; newNpc?: SandboxNpc } {
  if (!res.valid) return { registered: false };
  const duplicate = world.houses.some(
    (h) => Math.abs(h.centerTx - res.centerTx) < 6 && Math.abs(h.centerTy - res.centerTy) < 5
  );
  if (duplicate) return { registered: false };

  const assignedIds = new Set(world.npcs.map((n) => n.id));
  const nextRoster = NPC_ROSTER.find((r) => !assignedIds.has(r.id));
  const houseId = `house_${world.houses.length + 1}`;
  let spawnedNpc: SandboxNpc | undefined;

  if (nextRoster) {
    spawnedNpc = {
      ...nextRoster,
      x: res.centerTx * TILE_SIZE,
      y: res.centerTy * TILE_SIZE,
      vx: 0,
      homeTx: res.centerTx,
      homeTy: res.centerTy,
      dir: 1,
    };
    world.npcs.push(spawnedNpc);
  }
  world.houses.push({
    id: houseId,
    centerTx: res.centerTx,
    centerTy: res.centerTy,
    npcId: spawnedNpc?.id,
  });
  world.progress.housesBuilt = world.houses.length;
  return { registered: true, newNpc: spawnedNpc };
}

export function isSandboxNight(dayTime: number): boolean {
  const h = ((dayTime % 24) + 24) % 24;
  return h >= 18.5 || h < 5.5;
}

export function spawnSandboxBoss(world: SandboxWorld, nearPxX: number, nearPxY: number): SandboxEnemy {
  const existing = world.enemies.find((e) => e.isBoss && e.hp > 0);
  if (existing) return existing;
  const boss: SandboxEnemy = {
    id: `sb_boss_${Date.now()}`,
    kind: 'core_boss',
    spriteKind: 'boss_ignis_rex',
    name: 'Guardião do Núcleo Sandbox',
    x: Math.max(32, Math.min(SANDBOX_WORLD_WIDTH_PX - 64, nearPxX + 70)),
    y: Math.max(24, nearPxY - 56),
    vx: 0,
    vy: 0,
    hp: 18,
    maxHp: 18,
    w: 24,
    h: 18,
    color: '#ff2e63',
    timer: 0,
    flash: 0,
    isBoss: true,
  };
  world.enemies.push(boss);
  return boss;
}

export function exportSandboxDelta(world: SandboxWorld): SandboxDeltaSave {
  const changes: [number, number, number][] = [];
  for (const [idx, val] of world.modifiedCells.entries()) {
    changes.push([idx, val.tile, val.wall]);
    if (changes.length >= 6000) break;
  }
  return {
    seed: world.seed,
    dayTime: world.dayTime,
    spawnTx: world.spawnTx,
    spawnTy: world.spawnTy,
    changes,
    houses: world.houses,
    openedChests: Array.from(world.openedChests),
    progress: { ...world.progress },
  };
}

export function applySandboxDelta(world: SandboxWorld, delta: SandboxDeltaSave): void {
  if (typeof delta.dayTime === 'number') world.dayTime = delta.dayTime;
  if (typeof delta.spawnTx === 'number') world.spawnTx = delta.spawnTx;
  if (typeof delta.spawnTy === 'number') world.spawnTy = delta.spawnTy;
  if (Array.isArray(delta.changes)) {
    for (const [idx, tile, wall] of delta.changes) {
      if (idx >= 0 && idx < world.tiles.length) {
        world.tiles[idx] = tile;
        world.walls[idx] = wall;
        world.modifiedCells.set(idx, { tile, wall });
      }
    }
  }
  if (Array.isArray(delta.openedChests)) {
    world.openedChests = new Set(delta.openedChests);
  }
  if (Array.isArray(delta.houses)) {
    world.houses = delta.houses;
    for (const h of world.houses) {
      if (h.npcId && !world.npcs.some((n) => n.id === h.npcId)) {
        const meta = NPC_ROSTER.find((r) => r.id === h.npcId);
        if (meta) {
          world.npcs.push({
            ...meta,
            x: h.centerTx * TILE_SIZE,
            y: h.centerTy * TILE_SIZE,
            vx: 0,
            homeTx: h.centerTx,
            homeTy: h.centerTy,
            dir: 1,
          });
        }
      }
    }
  }
  if (delta.progress) {
    world.progress = { ...world.progress, ...delta.progress };
  }
}
