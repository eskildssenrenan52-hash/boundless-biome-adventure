import type { GameEngine } from './engine';
import {
  SANDBOX_COLS,
  SANDBOX_ROWS,
  SANDBOX_TILE_META,
  SB_TILE,
  SB_WALL,
  SandboxScenicProp,
  getSandboxBiomeAt,
  isSandboxNight,
  isSandboxSolid,
} from './sandboxWorld';
import {
  ENEMY_SPRITES,
  NPC_SPRITES,
  PROP_SPRITES,
  PixelPalette,
  drawPixelSprite,
} from './sprites';
import { TILE_SIZE, VIRTUAL_HEIGHT, VIRTUAL_WIDTH } from './types';
import { drawCachedGlow } from './visualFx';

const WALL_COLORS: Record<number, { base: string; seam: string }> = {
  [SB_WALL.DIRT_WALL]: { base: '#3d271a', seam: '#2b190f' },
  [SB_WALL.WOOD_WALL]: { base: '#54351e', seam: '#3b2413' },
  [SB_WALL.STONE_WALL]: { base: '#343a47', seam: '#232833' },
  [SB_WALL.BRICK_WALL]: { base: '#4a333c', seam: '#2e1e25' },
  [SB_WALL.GLASS_WALL]: { base: '#2c5a6e', seam: '#6be0ff' },
  [SB_WALL.DUNGEON_WALL]: { base: '#1a2338', seam: '#101626' },
};

// Terraria-quality baked multi-frame pixel-art sprites for Sandbox objects
export const SANDBOX_OBJECT_SPRITES: Record<string, { palette: PixelPalette; frames: string[][] }> = {
  workbench: {
    palette: { o: '#090712', w: '#d49966', m: '#9c6334', d: '#633c1c', s: '#cbd5e1' },
    frames: [
      [
        'oo..oooooooooo',
        'ossoowwwwwwwwo',
        'oooooooooooooom',
        '.ommmmmmmmmmmo',
        '.oodmmo..ommdo',
        '..oddo....oddo',
        '..oddo....oddo',
        '..oooo....oooo',
      ].map((r) => (r.length > 14 ? r.slice(0, 14) : r.padEnd(14, '.'))),
    ],
  },
  forge: {
    palette: {
      o: '#090712',
      s: '#6a6280',
      h: '#a89ec2',
      d: '#38324a',
      f: '#ff4d1c',
      y: '#ffe066',
      w: '#ffffff',
    },
    frames: [
      [
        '..oooooooooo..',
        '.ohhhhhhhhhho.',
        '.osssssssssso.',
        'oossddddddssso',
        'oshddofffodddo',
        'oshdofyywfdddo',
        'ossdofwwwwdddo',
        'osddoffffodddo',
        'oddddddddddddd'.slice(0, 14),
        '.oooooooooooo.',
      ].map((r) => r.padEnd(14, '.')),
      [
        '..oooooooooo..',
        '.ohhhhhhhhhho.',
        '.osssssssssso.',
        'oossddddddssso',
        'oshddoffyodddo',
        'oshdofwwwfdddo',
        'ossdofyyffdddo',
        'osddoffffodddo',
        'oddddddddddddd'.slice(0, 14),
        '.oooooooooooo.',
      ].map((r) => r.padEnd(14, '.')),
    ],
  },
  cauldron: {
    palette: { o: '#061210', m: '#365e5e', l: '#649e9e', d: '#1a3030', g: '#4df0c0', w: '#ffffff' },
    frames: [
      [
        '..oo..w..oo.',
        '..ogggggggo.',
        '.olmmmmmmmlo',
        '.ommmmmmmmmo',
        'ommmmlmmmmmo',
        'ommdddddddmo',
        '.omddddddmo.',
        '.ooddddddoo.',
        '..oo....oo..',
      ],
      [
        '.w..oo..o...',
        '..oggwggggo.',
        '.olmmmmmmmlo',
        '.ommmmmmmmmo',
        'ommmmlmmmmmo',
        'ommdddddddmo',
        '.omddddddmo.',
        '.ooddddddoo.',
        '..oo....oo..',
      ],
    ],
  },
  chest: {
    palette: { o: '#0c0806', g: '#ffd24d', w: '#ffffff', b: '#a86e22', d: '#663f0e' },
    frames: [
      [
        '.oooooooooo.',
        'obggggggggbo',
        'obbbwwwwbbbo',
        'oooooooooooo',
        'odddggggdddo',
        'odddgwwgdddo',
        'oddddddddddo',
        '.oooooooooo.',
      ],
    ],
  },
  bed: {
    palette: { o: '#090712', w: '#ffffff', c: '#d9c8e8', r: '#e0365f', d: '#8c1b39', b: '#8f5932' },
    frames: [
      [
        '.oooo...........',
        'owwwcooooooooo..',
        'occccorrrrrrrro.',
        'obbbborrrrddddoo',
        'obbbbbbbbbbbbbbo',
        'obb..ooooo..bbbo',
        'ooo..........ooo',
      ],
    ],
  },
  door_closed: {
    palette: { o: '#090712', w: '#b57845', m: '#855128', d: '#522f14', g: '#ffe066' },
    frames: [
      [
        '.oooooo.',
        'owmmmmwo',
        'omddddmo',
        'omddddmo',
        'owmmmmwo',
        'omddddmo',
        'omdddggo',
        'owmmmggo',
        'omddddmo',
        'omddddmo',
        'owmmmmwo',
        'omddddmo',
        'omddddmo',
        'oooooooo',
      ],
    ],
  },
  table: {
    palette: { o: '#090712', h: '#d49966', m: '#995f32', d: '#5c3518' },
    frames: [
      [
        'oooooooooooooo',
        'ohhhhhhhhhhhho',
        'ommmmmmmmmmmmo',
        '.ooddddddddoo.',
        '..odd....ddo..',
        '..odd....ddo..',
        '..odd....ddo..',
        '..ooo....ooo..',
      ],
    ],
  },
  chair: {
    palette: { o: '#090712', h: '#d49966', m: '#995f32', d: '#5c3518' },
    frames: [
      [
        '.ooo....',
        'ohmo....',
        'ommo....',
        'ommooooo',
        'ohhhhhho',
        'omddddmo',
        '.od..do.',
        '.od..do.',
        '.oo..oo.',
      ],
    ],
  },
  altar: {
    palette: { o: '#0a0414', p: '#c084fc', w: '#ffffff', s: '#584b75', d: '#312747' },
    frames: [
      [
        '.....oooo.....',
        '....opwwpo....',
        '....oppppo....',
        '.....oppo.....',
        '..oossssssoo..',
        '.oshhsppshhso.',
        '.osddddddddso.',
        'oosddddddddsoo',
        'oooooooooooooo',
      ],
      [
        '.....owwo.....',
        '....owppwo....',
        '....opwwpo....',
        '.....oppo.....',
        '..oossssssoo..',
        '.oshhsppshhso.',
        '.osddddddddso.',
        'oosddddddddsoo',
        'oooooooooooooo',
      ],
    ],
  },
  life_crystal: {
    palette: { o: '#14040a', r: '#ff3864', l: '#ff94b2', w: '#ffffff', d: '#961233' },
    frames: [
      [
        '..oooo..oooo..',
        '.olllroorlllo.',
        'olwwrrrrrllrho'.replace('h', 'r'),
        'orwrrrrrrrrrdo',
        'orrrrrrrrrdddo',
        '.orrrrrrrdddo.',
        '..orrrrrdddo..',
        '...orrrdddo...',
        '....orrddo....',
        '.....oodo.....',
        '......oo......',
      ],
      [
        '..oooo..oooo..',
        '.orllroorllro.',
        'olwwwrrrrwwrro',
        'orwwrrrrrrrwdo',
        'orrrrrrrrrdddo',
        '.orrrrrrrdddo.',
        '..orrrrrdddo..',
        '...orrrdddo...',
        '....orrddo....',
        '.....oodo.....',
        '......oo......',
      ],
    ],
  },
  pot: {
    palette: { o: '#120806', h: '#e08e67', m: '#b35f39', d: '#6e321a', g: '#ffd27d' },
    frames: [
      [
        '..oooooo..',
        '.ohhhhhho.',
        '..oooooo..',
        '.ohmggmho.',
        'ohmmmmmmmo',
        'ommmmmdddo',
        'ommdddddoo',
        '.ooddddoo.',
        '..oooooo..',
      ],
    ],
  },
  teleport_pylon: {
    palette: {
      o: '#060c18',
      c: '#52e5ff',
      w: '#ffffff',
      b: '#2378ab',
      g: '#ffd27d',
      s: '#696285',
      d: '#36304a',
    },
    frames: [
      [
        '......oo......',
        '.....occo.....',
        '....ocwwco....',
        '...ocwccwbo...',
        '...occcccbo...',
        '....obbbbo....',
        '.....obbo.....',
        '......oo......',
        '...ooggggoo...',
        '..osssssssso..',
        '..osddddddso..',
        '.oosddddddsoo.',
        '.oooooooooooo.',
      ],
      [
        '.....oooo.....',
        '....ocwwco....',
        '...ocwccwbo...',
        '...occcccbo...',
        '....occcbo....',
        '.....obbo.....',
        '......oo......',
        '..............',
        '...ooggggoo...',
        '..osssssssso..',
        '..osddddddso..',
        '.oosddddddsoo.',
        '.oooooooooooo.',
      ],
    ],
  },
  banner: {
    palette: { o: '#090712', w: '#d4a359', r: '#e02853', d: '#851430', g: '#ffe066' },
    frames: [
      [
        'oooooooo',
        'owwwwwwo',
        '.orrrro.',
        '.orggro.',
        '.orggro.',
        '.orrrro.',
        '.odrrdo.',
        '.oddddo.',
        '..oddo..',
        '...oo...',
      ],
      [
        'oooooooo',
        'owwwwwwo',
        '.orrrro.',
        '..oggro.',
        '..oggrdo'.slice(0, 8),
        '.orrrdo.',
        '.oddddo.',
        '.ooddoo.',
        '..oddo..',
        '...oo...',
      ],
    ],
  },
};

function lerpHexColor(a: string, b: string, t: number): string {
  const ct = Math.max(0, Math.min(1, t));
  const pa = parseInt(a.slice(1), 16);
  const pb = parseInt(b.slice(1), 16);
  const r1 = (pa >> 16) & 255;
  const g1 = (pa >> 8) & 255;
  const b1 = pa & 255;
  const r2 = (pb >> 16) & 255;
  const g2 = (pb >> 8) & 255;
  const b2 = pb & 255;
  const r = Math.round(r1 + (r2 - r1) * ct);
  const g = Math.round(g1 + (g2 - g1) * ct);
  const bl = Math.round(b1 + (b2 - b1) * ct);
  return `rgb(${r},${g},${bl})`;
}

function drawSandboxScenicProp(
  ctx: CanvasRenderingContext2D,
  pr: SandboxScenicProp,
  camX: number,
  camY: number,
  time: number
): void {
  const sx = Math.round(pr.tx * TILE_SIZE - camX);
  const sy = Math.round(pr.ty * TILE_SIZE - camY);
  if (sx < -48 || sx > VIRTUAL_WIDTH + 48 || sy < -64 || sy > VIRTUAL_HEIGHT + 48) return;

  const sway = Math.round(Math.sin(time * 2.1 + pr.tx * 0.2) * 1);
  if (pr.kind === 'sakura_tree') {
    ctx.fillStyle = '#12050b';
    ctx.fillRect(sx - 2, sy - 26, 8, 26);
    ctx.fillStyle = '#6b333e';
    ctx.fillRect(sx - 1, sy - 25, 6, 25);
    ctx.fillStyle = '#a32856';
    ctx.fillRect(sx - 15 + sway, sy - 40, 34, 16);
    ctx.fillStyle = '#ff70a6';
    ctx.fillRect(sx - 13 + sway, sy - 43, 30, 14);
    ctx.fillStyle = '#ffd1dc';
    ctx.fillRect(sx - 9 + sway, sy - 41, 14, 5);
    ctx.fillRect(sx + 6 + sway, sy - 37, 9, 4);
  } else if (pr.kind === 'tree_pine') {
    ctx.fillStyle = '#090712';
    ctx.fillRect(sx, sy - 20, 6, 20);
    ctx.fillStyle = '#633c1e';
    ctx.fillRect(sx + 1, sy - 19, 4, 19);
    for (let tier = 0; tier < 3; tier++) {
      const w = 22 - tier * 5;
      const ty = sy - 18 - tier * 8;
      ctx.fillStyle = '#061712';
      ctx.fillRect(sx + 3 - w * 0.5 - 1, ty - 7, w + 2, 9);
      ctx.fillStyle = tier === 2 ? '#4df0a8' : '#1e7356';
      ctx.fillRect(sx + 3 - w * 0.5, ty - 6, w, 7);
      ctx.fillStyle = '#8effdb';
      ctx.fillRect(sx + 3 - w * 0.5 + 1, ty - 6, Math.max(2, w * 0.4), 2);
    }
  } else if (pr.kind === 'cactus_saguaro') {
    ctx.fillStyle = '#08170b';
    ctx.fillRect(sx, sy - 22, 8, 22);
    ctx.fillRect(sx - 6, sy - 15, 6, 4);
    ctx.fillRect(sx - 6, sy - 21, 4, 9);
    ctx.fillRect(sx + 8, sy - 12, 6, 4);
    ctx.fillRect(sx + 10, sy - 18, 4, 9);
    ctx.fillStyle = '#2d9c4b';
    ctx.fillRect(sx + 1, sy - 21, 6, 21);
    ctx.fillRect(sx - 5, sy - 20, 2, 8);
    ctx.fillRect(sx + 11, sy - 17, 2, 8);
    ctx.fillStyle = '#8ef5a7';
    ctx.fillRect(sx + 2, sy - 20, 2, 18);
  } else if (pr.kind === 'giant_shroom') {
    ctx.fillStyle = '#061214';
    ctx.fillRect(sx + 1, sy - 16, 6, 16);
    ctx.fillStyle = '#c8ebe3';
    ctx.fillRect(sx + 2, sy - 15, 4, 15);
    ctx.fillStyle = '#061214';
    ctx.fillRect(sx - 8, sy - 24, 24, 10);
    ctx.fillStyle = '#18b88c';
    ctx.fillRect(sx - 7, sy - 23, 22, 8);
    ctx.fillStyle = '#a8ffea';
    ctx.fillRect(sx - 4, sy - 22, 4, 3);
    ctx.fillRect(sx + 5, sy - 20, 5, 3);
  } else if (pr.kind === 'crystal_spire') {
    ctx.fillStyle = '#071424';
    ctx.fillRect(sx - 2, sy - 20, 10, 20);
    ctx.fillStyle = '#52e5ff';
    ctx.fillRect(sx - 1, sy - 19, 8, 19);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(sx, sy - 18, 2, 14);
    drawCachedGlow(ctx, sx + 3, sy - 12, 16, '#52e5ff', 0.25, 1, true);
  } else if (pr.kind === 'ruin_statue') {
    ctx.fillStyle = '#090712';
    ctx.fillRect(sx - 2, sy - 24, 14, 24);
    ctx.fillStyle = '#574e70';
    ctx.fillRect(sx - 1, sy - 23, 12, 23);
    ctx.fillStyle = '#8b80ab';
    ctx.fillRect(sx, sy - 22, 3, 20);
    ctx.fillStyle = '#52e5ff';
    ctx.fillRect(sx + 3, sy - 18, 2, 2);
    ctx.fillRect(sx + 7, sy - 18, 2, 2);
  } else if (pr.kind === 'sun_brazier') {
    ctx.fillStyle = '#0c0806';
    ctx.fillRect(sx - 1, sy - 14, 10, 14);
    ctx.fillStyle = '#785a32';
    ctx.fillRect(sx, sy - 13, 8, 13);
    const fl = Math.floor(time * 10 + pr.tx) % 2;
    ctx.fillStyle = '#ff6b2b';
    ctx.fillRect(sx, sy - 19 - fl, 8, 6);
    ctx.fillStyle = '#ffe066';
    ctx.fillRect(sx + 2, sy - 18, 4, 4);
    drawCachedGlow(ctx, sx + 4, sy - 16, 18, '#ff9933', 0.3, 1, true);
  } else if (pr.kind === 'coral_pillar') {
    ctx.fillStyle = '#081822';
    ctx.fillRect(sx, sy - 18, 8, 18);
    ctx.fillStyle = '#ff6b9d';
    ctx.fillRect(sx + 1, sy - 17, 6, 17);
    ctx.fillRect(sx - 4, sy - 13, 4, 4);
    ctx.fillRect(sx + 8, sy - 10, 4, 4);
    ctx.fillStyle = '#ffd1e3';
    ctx.fillRect(sx + 2, sy - 16, 2, 10);
  } else {
    // obelisk
    ctx.fillStyle = '#0a0514';
    ctx.fillRect(sx, sy - 26, 10, 26);
    ctx.fillStyle = '#3c2661';
    ctx.fillRect(sx + 1, sy - 25, 8, 25);
    ctx.fillStyle = '#c084fc';
    ctx.fillRect(sx + 4, sy - 20, 2, 12);
  }
}

function drawSandboxMinimap(
  ctx: CanvasRenderingContext2D,
  engine: GameEngine,
  playerTx: number,
  playerTy: number
): void {
  const world = engine.sandboxWorld;
  if (!world) return;
  const mw = 84;
  const mh = 28;
  const mx = VIRTUAL_WIDTH - mw - 6;
  const my = 18;

  ctx.save();
  ctx.fillStyle = 'rgba(7, 5, 13, 0.86)';
  ctx.fillRect(mx - 1, my - 1, mw + 2, mh + 2);
  ctx.strokeStyle = '#4df0c0aa';
  ctx.lineWidth = 1;
  ctx.strokeRect(mx - 0.5, my - 0.5, mw + 1, mh + 1);

  // Sample world biome/terrain onto 84x28 minimap cells
  const stepX = Math.floor(SANDBOX_COLS / mw);
  const stepY = Math.floor(SANDBOX_ROWS / mh);
  for (let gx = 0; gx < mw; gx++) {
    const tx = Math.min(SANDBOX_COLS - 1, gx * stepX);
    for (let gy = 0; gy < mh; gy++) {
      const ty = Math.min(SANDBOX_ROWS - 1, gy * stepY);
      const t = world.tiles[ty * world.cols + tx];
      if (t !== SB_TILE.AIR) {
        const meta = SANDBOX_TILE_META[t];
        ctx.fillStyle = meta?.color && meta.color !== 'transparent' ? meta.color : '#4d4666';
        ctx.fillRect(mx + gx, my + gy, 1, 1);
      } else if (ty >= 260) {
        ctx.fillStyle = '#290b0b';
        ctx.fillRect(mx + gx, my + gy, 1, 1);
      }
    }
  }

  // Pylon markers (cyan)
  for (const py of world.pylons) {
    const px = mx + Math.floor((py.tx / SANDBOX_COLS) * mw);
    const ppy = my + Math.floor((py.ty / SANDBOX_ROWS) * mh);
    ctx.fillStyle = py.color;
    ctx.fillRect(px, ppy, 2, 2);
  }
  // Houses markers (gold)
  for (const h of world.houses) {
    const hx = mx + Math.floor((h.centerTx / SANDBOX_COLS) * mw);
    const hy = my + Math.floor((h.centerTy / SANDBOX_ROWS) * mh);
    ctx.fillStyle = '#ffe066';
    ctx.fillRect(hx - 1, hy - 1, 2, 2);
  }
  // Boss marker (crimson)
  for (const e of world.enemies) {
    if (e.isBoss && e.hp > 0) {
      const bx = mx + Math.floor((e.x / TILE_SIZE / SANDBOX_COLS) * mw);
      const by = my + Math.floor((e.y / TILE_SIZE / SANDBOX_ROWS) * mh);
      ctx.fillStyle = '#ff2e63';
      ctx.fillRect(bx - 1, by - 1, 3, 3);
    }
  }
  // Player marker (white)
  const plx = mx + Math.floor((playerTx / SANDBOX_COLS) * mw);
  const ply = my + Math.floor((playerTy / SANDBOX_ROWS) * mh);
  ctx.fillStyle = '#090712';
  ctx.fillRect(plx - 1, ply - 1, 4, 4);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(plx, ply, 2, 2);

  ctx.restore();
}

export function renderSandboxWorld(
  ctx: CanvasRenderingContext2D,
  engine: GameEngine,
  time: number,
  drawPlayerAndFx: () => void
): void {
  const world = engine.sandboxWorld;
  if (!world) return;

  const camX = Math.round(engine.cameraX);
  const camY = Math.round(engine.cameraY);
  const playerTx = Math.floor((engine.player.x + 4) / TILE_SIZE);
  const playerTy = Math.floor((engine.player.y + 5) / TILE_SIZE);
  const biome = getSandboxBiomeAt(playerTx, playerTy);
  const dayTime = ((world.dayTime % 24) + 24) % 24;
  const night = isSandboxNight(dayTime);

  // 1. Sky & Underground Depth Gradient
  const depthRatio = Math.max(0, Math.min(1, (playerTy - 95) / 140));
  const hellRatio = Math.max(0, Math.min(1, (playerTy - 235) / 45));

  let skyTop = '#18549c';
  let skyBot = '#73c6f5';
  if (dayTime >= 5 && dayTime < 7.5) {
    const t = (dayTime - 5) / 2.5;
    skyTop = lerpHexColor('#0b1026', '#2b4f8c', t);
    skyBot = lerpHexColor('#1c1b3a', '#f79d65', t);
  } else if (dayTime >= 7.5 && dayTime < 16.5) {
    skyTop = biome.id === 'abyss_surface' ? '#23163b' : biome.id === 'tundra' ? '#245d8c' : '#18549c';
    skyBot = biome.id === 'desert' ? '#f0c784' : biome.id === 'abyss_surface' ? '#58337a' : '#73c6f5';
  } else if (dayTime >= 16.5 && dayTime < 19) {
    const t = (dayTime - 16.5) / 2.5;
    skyTop = lerpHexColor('#18549c', '#120e29', t);
    skyBot = lerpHexColor('#73c6f5', '#d95763', t);
  } else {
    skyTop = '#070917';
    skyBot = '#151833';
  }

  if (depthRatio > 0.15) {
    skyTop = lerpHexColor(skyTop.startsWith('#') ? skyTop : '#18549c', '#12101a', depthRatio);
    skyBot = lerpHexColor(skyBot.startsWith('#') ? skyBot : '#73c6f5', '#1d1829', depthRatio);
  }
  if (hellRatio > 0.05) {
    skyTop = lerpHexColor('#12101a', '#24090d', hellRatio);
    skyBot = lerpHexColor('#1d1829', '#591612', hellRatio);
  }

  const grad = ctx.createLinearGradient(0, 0, 0, VIRTUAL_HEIGHT);
  grad.addColorStop(0, skyTop);
  grad.addColorStop(1, skyBot);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, VIRTUAL_WIDTH, VIRTUAL_HEIGHT);

  // Twinkling stars at night (above ground)
  if (depthRatio < 0.45 && (night || dayTime < 6.5 || dayTime > 17.5)) {
    ctx.fillStyle = '#ffffffcc';
    for (let i = 0; i < 36; i++) {
      const sx = ((i * 73 + Math.round(camX * 0.08)) % VIRTUAL_WIDTH + VIRTUAL_WIDTH) % VIRTUAL_WIDTH;
      const sy = (i * 29) % 105;
      const tw = Math.sin(time * 2.5 + i) > 0.2 ? 1 : 0.4;
      ctx.globalAlpha = tw * (1 - depthRatio * 2);
      ctx.fillRect(sx, sy, 1, 1);
    }
    ctx.globalAlpha = 1;
  }

  // Orbiting Sun or Moon
  if (depthRatio < 0.4) {
    const isSun = dayTime >= 6 && dayTime <= 18;
    const progress = isSun ? (dayTime - 6) / 12 : ((dayTime + 6) % 24) / 12;
    const ox = Math.round(28 + progress * (VIRTUAL_WIDTH - 56));
    const oy = Math.round(92 - Math.sin(progress * Math.PI) * 68);
    drawCachedGlow(ctx, ox, oy, isSun ? 22 : 16, isSun ? '#ffe066' : '#a8d5ff', 0.45, 1, true);
    ctx.fillStyle = isSun ? '#fff199' : '#e6f4ff';
    ctx.fillRect(ox - 5, oy - 5, 10, 10);
    if (!isSun) {
      ctx.fillStyle = skyTop;
      ctx.fillRect(ox, oy - 4, 4, 7);
    }
  }

  // Distant Biome Hills Silhouette (surface only)
  if (depthRatio < 0.55) {
    ctx.fillStyle = night ? '#111629' : biome.id === 'desert' ? '#9e7442' : biome.id === 'tundra' ? '#4f7a96' : '#244d47';
    for (let x = 0; x < VIRTUAL_WIDTH; x += 4) {
      const wx = x + camX * 0.18;
      const h = Math.round(28 + Math.sin(wx * 0.025) * 14 + Math.cos(wx * 0.06) * 7);
      ctx.fillRect(x, VIRTUAL_HEIGHT - h, 4, h);
    }
  }

  // Scenic Biome Props (Trees, Sakuras, Statues, Crystals, Obelisks) behind interactive grid
  for (const pr of world.scenicProps) {
    drawSandboxScenicProp(ctx, pr, camX, camY, time);
  }

  // 2. Visible Tile Grid Window
  ctx.save();
  const minTx = Math.max(0, Math.floor(camX / TILE_SIZE) - 1);
  const maxTx = Math.min(world.cols - 1, Math.ceil((camX + VIRTUAL_WIDTH) / TILE_SIZE) + 1);
  const minTy = Math.max(0, Math.floor(camY / TILE_SIZE) - 1);
  const maxTy = Math.min(world.rows - 1, Math.ceil((camY + VIRTUAL_HEIGHT) / TILE_SIZE) + 1);

  const torchesToGlow: { sx: number; sy: number; color: string; rad: number }[] = [];

  for (let ty = minTy; ty <= maxTy; ty++) {
    const sy = ty * TILE_SIZE - camY;
    const rowOff = ty * world.cols;
    for (let tx = minTx; tx <= maxTx; tx++) {
      const idx = rowOff + tx;
      const sx = tx * TILE_SIZE - camX;
      const wall = world.walls[idx];
      const tile = world.tiles[idx];

      // Background wall
      if (wall !== SB_WALL.NONE) {
        const wCol = WALL_COLORS[wall] ?? WALL_COLORS[SB_WALL.DIRT_WALL];
        ctx.fillStyle = wCol.base;
        ctx.fillRect(sx, sy, TILE_SIZE, TILE_SIZE);
        ctx.fillStyle = wCol.seam;
        if ((tx + ty) % 2 === 0) {
          ctx.fillRect(sx, sy, TILE_SIZE, 1);
          ctx.fillRect(sx, sy, 1, TILE_SIZE);
        }
      }

      if (tile === SB_TILE.AIR) continue;
      const meta = SANDBOX_TILE_META[tile];
      if (!meta) continue;

      if (tile === SB_TILE.PLATFORM) {
        ctx.fillStyle = '#090712';
        ctx.fillRect(sx, sy, TILE_SIZE, 3);
        ctx.fillStyle = meta.color;
        ctx.fillRect(sx, sy, TILE_SIZE, 2);
        ctx.fillStyle = meta.highlightColor;
        ctx.fillRect(sx, sy, TILE_SIZE, 1);
      } else if (tile === SB_TILE.TORCH) {
        ctx.fillStyle = '#6e4526';
        ctx.fillRect(sx + 3, sy + 3, 2, 5);
        const flicker = Math.floor(time * 12 + tx) % 2;
        ctx.fillStyle = '#ff7733';
        ctx.fillRect(sx + 2, sy + 1 - flicker, 4, 3);
        ctx.fillStyle = '#fff5b8';
        ctx.fillRect(sx + 3, sy + 1, 2, 2);
        torchesToGlow.push({ sx: sx + 4, sy: sy + 2, color: '#ffae42', rad: 22 });
      } else if (tile === SB_TILE.WOOD_TRUNK) {
        ctx.fillStyle = '#29170a';
        ctx.fillRect(sx + 1, sy, 6, TILE_SIZE);
        ctx.fillStyle = meta.color;
        ctx.fillRect(sx + 2, sy, 4, TILE_SIZE);
        ctx.fillStyle = meta.highlightColor;
        ctx.fillRect(sx + 2, sy, 1, TILE_SIZE);
      } else if (tile === SB_TILE.LEAVES) {
        ctx.fillStyle = '#091f11';
        ctx.fillRect(sx, sy, TILE_SIZE, TILE_SIZE);
        ctx.fillStyle = meta.color;
        ctx.fillRect(sx + 1, sy + 1, TILE_SIZE - 2, TILE_SIZE - 2);
        ctx.fillStyle = meta.highlightColor;
        ctx.fillRect(sx + 1, sy + 1, 3, 2);
        ctx.fillRect(sx + 5, sy + 4, 2, 2);
      } else if (tile === SB_TILE.DOOR_CLOSED) {
        const sp = SANDBOX_OBJECT_SPRITES.door_closed;
        drawPixelSprite(ctx, 'sb_door_closed', sp.frames[0], sp.palette, sx + 4, sy + TILE_SIZE, false, 1, 1, true);
      } else if (tile === SB_TILE.DOOR_OPEN) {
        ctx.fillStyle = '#3b210e';
        ctx.fillRect(sx, sy - 6, 3, TILE_SIZE + 6);
        ctx.fillStyle = meta.color;
        ctx.fillRect(sx, sy - 5, 2, TILE_SIZE + 5);
      } else if (tile === SB_TILE.WORKBENCH) {
        const sp = SANDBOX_OBJECT_SPRITES.workbench;
        drawPixelSprite(ctx, 'sb_workbench', sp.frames[0], sp.palette, sx + 4, sy + TILE_SIZE, false, 1, 1, true);
      } else if (tile === SB_TILE.FORGE) {
        const sp = SANDBOX_OBJECT_SPRITES.forge;
        const fi = Math.floor(time * 7 + tx) % sp.frames.length;
        drawPixelSprite(ctx, `sb_forge_${fi}`, sp.frames[fi], sp.palette, sx + 4, sy + TILE_SIZE, false, 1, 1, true);
        torchesToGlow.push({ sx: sx + 4, sy: sy + 3, color: '#ff6622', rad: 22 });
      } else if (tile === SB_TILE.CAULDRON) {
        const sp = SANDBOX_OBJECT_SPRITES.cauldron;
        const fi = Math.floor(time * 5 + tx) % sp.frames.length;
        drawPixelSprite(ctx, `sb_cauldron_${fi}`, sp.frames[fi], sp.palette, sx + 4, sy + TILE_SIZE, false, 1, 1, true);
        torchesToGlow.push({ sx: sx + 4, sy: sy + 2, color: '#4df0c0', rad: 18 });
      } else if (tile === SB_TILE.TABLE) {
        const sp = SANDBOX_OBJECT_SPRITES.table;
        drawPixelSprite(ctx, 'sb_table', sp.frames[0], sp.palette, sx + 4, sy + TILE_SIZE, false, 1, 1, true);
      } else if (tile === SB_TILE.CHAIR) {
        const sp = SANDBOX_OBJECT_SPRITES.chair;
        drawPixelSprite(ctx, 'sb_chair', sp.frames[0], sp.palette, sx + 4, sy + TILE_SIZE, false, 1, 1, true);
      } else if (tile === SB_TILE.CHEST) {
        const sp = SANDBOX_OBJECT_SPRITES.chest;
        drawPixelSprite(ctx, 'sb_chest', sp.frames[0], sp.palette, sx + 4, sy + TILE_SIZE, false, 1, 1, true);
        if (!world.openedChests.has(`${tx},${ty}`)) {
          torchesToGlow.push({ sx: sx + 4, sy: sy + 3, color: '#ffe066', rad: 14 });
        }
      } else if (tile === SB_TILE.BED_SPAWN) {
        const sp = SANDBOX_OBJECT_SPRITES.bed;
        drawPixelSprite(ctx, 'sb_bed', sp.frames[0], sp.palette, sx + 4, sy + TILE_SIZE, false, 1, 1, true);
      } else if (tile === SB_TILE.ALTAR) {
        const sp = SANDBOX_OBJECT_SPRITES.altar;
        const fi = Math.floor(time * 4 + tx) % sp.frames.length;
        drawPixelSprite(ctx, `sb_altar_${fi}`, sp.frames[fi], sp.palette, sx + 4, sy + TILE_SIZE, false, 1, 1, true);
        torchesToGlow.push({ sx: sx + 4, sy: sy + 1, color: '#e88aff', rad: 22 });
      } else if (tile === SB_TILE.CAMPFIRE) {
        // Real game campfire sprite!
        const sp = PROP_SPRITES.campfire;
        const fi = Math.floor(time * 8 + tx) % sp.frames.length;
        drawPixelSprite(ctx, `sb_campfire_${fi}`, sp.frames[fi], sp.palette, sx + 4, sy + TILE_SIZE, false, 1, 1, true);
        torchesToGlow.push({ sx: sx + 4, sy: sy + 3, color: '#ff9922', rad: 28 });
      } else if (tile === SB_TILE.BOUNCE_SHROOM) {
        const sp = PROP_SPRITES.bounce_shroom;
        drawPixelSprite(ctx, 'sb_shroom', sp.frames[0], sp.palette, sx + 4, sy + TILE_SIZE, false, 1, 1, true);
        torchesToGlow.push({ sx: sx + 4, sy: sy + 3, color: '#4df0c0', rad: 14 });
      } else if (tile === SB_TILE.DASH_CRYSTAL) {
        const sp = PROP_SPRITES.crystal;
        const fi = Math.floor(time * 5 + tx) % sp.frames.length;
        const bob = Math.round(Math.sin(time * 5 + tx) * 1.5);
        drawPixelSprite(ctx, `sb_crystal_${fi}`, sp.frames[fi], sp.palette, sx + 4, sy + TILE_SIZE + bob, false, 1, 1, true);
        torchesToGlow.push({ sx: sx + 4, sy: sy + 3 + bob, color: '#4df099', rad: 16 });
      } else if (tile === SB_TILE.LIFE_CRYSTAL) {
        const sp = SANDBOX_OBJECT_SPRITES.life_crystal;
        const fi = Math.floor(time * 4 + tx) % sp.frames.length;
        drawPixelSprite(ctx, `sb_life_${fi}`, sp.frames[fi], sp.palette, sx + 4, sy + TILE_SIZE, false, 1, 1, true);
        torchesToGlow.push({ sx: sx + 4, sy: sy + 2, color: '#ff3864', rad: 18 });
      } else if (tile === SB_TILE.POT) {
        const sp = SANDBOX_OBJECT_SPRITES.pot;
        drawPixelSprite(ctx, 'sb_pot', sp.frames[0], sp.palette, sx + 4, sy + TILE_SIZE, false, 1, 1, true);
      } else if (tile === SB_TILE.SHRINE) {
        const sp = PROP_SPRITES.elemental_totem;
        const fi = Math.floor(time * 4 + tx) % sp.frames.length;
        drawPixelSprite(ctx, `sb_totem_${fi}`, sp.frames[fi], sp.palette, sx + 4, sy + TILE_SIZE, false, 1, 1, true);
        torchesToGlow.push({ sx: sx + 4, sy: sy + 2, color: '#52e5ff', rad: 22 });
      } else if (tile === SB_TILE.TELEPORT_PYLON) {
        const sp = SANDBOX_OBJECT_SPRITES.teleport_pylon;
        const fi = Math.floor(time * 4 + tx) % sp.frames.length;
        drawPixelSprite(ctx, `sb_pylon_${fi}`, sp.frames[fi], sp.palette, sx + 4, sy + TILE_SIZE, false, 1, 1, true);
        torchesToGlow.push({ sx: sx + 4, sy: sy + 1, color: '#66eeff', rad: 26 });
      } else if (tile === SB_TILE.BANNER) {
        const sp = SANDBOX_OBJECT_SPRITES.banner;
        const fi = Math.floor(time * 3 + tx) % sp.frames.length;
        drawPixelSprite(ctx, `sb_banner_${fi}`, sp.frames[fi], sp.palette, sx + 4, sy + TILE_SIZE, false, 1, 1, true);
      } else {
        // Textured Auto-Bordered Solid Terrain & Glowing Ores
        ctx.fillStyle = meta.color;
        ctx.fillRect(sx, sy, TILE_SIZE, TILE_SIZE);

        const upSolid = ty > 0 && isSandboxSolid(world.tiles[(ty - 1) * world.cols + tx]);
        const dnSolid = ty < world.rows - 1 && isSandboxSolid(world.tiles[(ty + 1) * world.cols + tx]);
        const lfSolid = tx > 0 && isSandboxSolid(world.tiles[rowOff + tx - 1]);
        const rtSolid = tx < world.cols - 1 && isSandboxSolid(world.tiles[rowOff + tx + 1]);

        if (!upSolid) {
          ctx.fillStyle = '#090712';
          ctx.fillRect(sx, sy, TILE_SIZE, 1);
          ctx.fillStyle = meta.highlightColor;
          ctx.fillRect(sx, sy + 1, TILE_SIZE, 2);
          // Grass blades / tufts on top of exposed grass tiles
          if ((tile === SB_TILE.GRASS || tile === SB_TILE.JUNGLE_GRASS) && (tx + ty) % 2 === 0) {
            ctx.fillRect(sx + 2, sy - 1, 1, 1);
            ctx.fillRect(sx + 5, sy - 2, 1, 2);
          }
        }
        if (!dnSolid) {
          ctx.fillStyle = '#090712';
          ctx.fillRect(sx, sy + TILE_SIZE - 1, TILE_SIZE, 1);
        }
        if (!lfSolid) {
          ctx.fillStyle = '#090712';
          ctx.fillRect(sx, sy, 1, TILE_SIZE);
        }
        if (!rtSolid) {
          ctx.fillStyle = '#090712';
          ctx.fillRect(sx + TILE_SIZE - 1, sy, 1, TILE_SIZE);
        }

        if (
          tile === SB_TILE.COPPER_ORE ||
          tile === SB_TILE.IRON_ORE ||
          tile === SB_TILE.GOLD_ORE ||
          tile === SB_TILE.MITHRIL_ORE ||
          tile === SB_TILE.ETHER_ORE ||
          tile === SB_TILE.HELLSTONE
        ) {
          ctx.fillStyle = '#090712';
          ctx.fillRect(sx + 1, sy + 2, 3, 3);
          ctx.fillRect(sx + 4, sy + 5, 3, 2);
          ctx.fillStyle = meta.highlightColor;
          ctx.fillRect(sx + 1, sy + 2, 2, 2);
          ctx.fillRect(sx + 5, sy + 5, 2, 2);
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(sx + 1, sy + 2, 1, 1);
          if (tile === SB_TILE.MITHRIL_ORE || tile === SB_TILE.ETHER_ORE || tile === SB_TILE.HELLSTONE) {
            torchesToGlow.push({ sx: sx + 4, sy: sy + 4, color: meta.highlightColor, rad: 12 });
          }
        } else if (tile === SB_TILE.BRICK_BLOCK || tile === SB_TILE.DUNGEON_BRICK || tile === SB_TILE.PLANK) {
          ctx.fillStyle = meta.highlightColor;
          ctx.fillRect(sx, sy + 1, TILE_SIZE, 1);
          ctx.fillStyle = '#09071255';
          ctx.fillRect(sx, sy + 4, TILE_SIZE, 1);
          ctx.fillRect(sx + ((ty % 2) * 4), sy, 1, TILE_SIZE);
        } else if (tile === SB_TILE.GLASS) {
          ctx.fillStyle = '#ffffff99';
          ctx.fillRect(sx + 1, sy + 1, 2, 2);
          ctx.fillRect(sx + 5, sy + 5, 2, 2);
        } else if ((tx * 7 + ty * 13) % 5 === 0) {
          // Subtle inner stone/dirt/sand pebble speck
          ctx.fillStyle = '#09071233';
          ctx.fillRect(sx + ((tx * 3) % 5) + 1, sy + ((ty * 5) % 4) + 2, 2, 1);
        }
      }

      // Mining cracks
      const dmg = world.tileDamage[idx];
      if (dmg > 0 && meta.hitsRequired > 0) {
        const ratio = Math.min(1, dmg / meta.hitsRequired);
        ctx.fillStyle = 'rgba(9, 7, 18, 0.78)';
        ctx.fillRect(sx + 1, sy + 3, Math.ceil(6 * ratio), 2);
        ctx.fillStyle = '#ffe066';
        ctx.fillRect(sx + 2, sy + 1, 1, Math.ceil(5 * ratio));
      }
    }
  }

  for (const g of torchesToGlow) {
    drawCachedGlow(ctx, g.sx, g.sy, g.rad, g.color, 0.35, 1, true);
  }

  // Validated house beacons
  for (const h of world.houses) {
    const hsx = h.centerTx * TILE_SIZE - camX;
    const hsy = (h.centerTy - 2) * TILE_SIZE - camY;
    if (hsx < -20 || hsx > VIRTUAL_WIDTH + 20 || hsy < -20 || hsy > VIRTUAL_HEIGHT + 20) continue;
    drawPixelSprite(
      ctx,
      'sb_house_banner',
      SANDBOX_OBJECT_SPRITES.banner.frames[0],
      SANDBOX_OBJECT_SPRITES.banner.palette,
      hsx + 2,
      hsy + 6,
      false,
      0.85,
      0.85,
      true
    );
  }

  // Real NPC Sprites (matching Campaign NPCs!)
  for (const npc of world.npcs) {
    const nx = Math.round(npc.x - camX);
    const ny = Math.round(npc.y - camY);
    if (nx < -24 || nx > VIRTUAL_WIDTH + 24 || ny < -24 || ny > VIRTUAL_HEIGHT + 24) continue;
    const sp = npc.spriteKind ? NPC_SPRITES[npc.spriteKind] : undefined;
    if (sp && sp.frames.length > 0) {
      const fi = Math.floor(time * 3 + npc.homeTx) % sp.frames.length;
      drawPixelSprite(
        ctx,
        `sb_npc_${npc.spriteKind}_f${fi}`,
        sp.frames[fi],
        sp.palette,
        nx + 4,
        ny + 12,
        npc.dir < 0,
        1,
        1,
        true
      );
    } else {
      ctx.fillStyle = '#090712';
      ctx.fillRect(nx - 1, ny - 1, 10, 13);
      ctx.fillStyle = npc.accentColor;
      ctx.fillRect(nx + 1, ny + 4, 6, 7);
      ctx.fillStyle = '#ffd9bd';
      ctx.fillRect(nx + 2, ny, 4, 4);
    }
    // Crisp accent crest indicator above NPC when nearby
    if (Math.hypot(engine.player.x - npc.x, engine.player.y - npc.y) < 64) {
      ctx.fillStyle = '#090712cc';
      ctx.fillRect(nx - 6, ny - 14, 20, 4);
      ctx.fillStyle = npc.accentColor;
      ctx.fillRect(nx - 5, ny - 13, 18, 2);
    }
  }

  // Real ENEMY_SPRITES & BOSS_SPRITES for Sandbox Enemies & Boss
  for (const foe of world.enemies) {
    if (foe.hp <= 0) continue;
    const fx = Math.round(foe.x - camX);
    const fy = Math.round(foe.y - camY);
    if (fx < -40 || fx > VIRTUAL_WIDTH + 40 || fy < -40 || fy > VIRTUAL_HEIGHT + 40) continue;
    const spKey =
      foe.spriteKind ??
      (foe.isBoss
        ? 'boss_ignis_rex'
        : foe.kind === 'slime'
          ? 'enemy_slime_king'
          : foe.kind === 'demon_eye'
            ? 'enemy_laser_eye'
            : foe.kind === 'hell_imp'
              ? 'enemy_cinder_sentinel'
              : 'enemy_crypt_reaper');
    const sp = ENEMY_SPRITES[spKey];
    if (sp && sp.frames.length > 0) {
      const fi = Math.floor(time * 6) % sp.frames.length;
      if (foe.isBoss) {
        drawCachedGlow(ctx, fx + foe.w * 0.5, fy + foe.h * 0.5, 22, '#ff2e63', 0.35, 1, true);
      }
      drawPixelSprite(
        ctx,
        `sb_foe_${spKey}_f${fi}`,
        sp.frames[fi],
        sp.palette,
        fx + foe.w * 0.5,
        fy + foe.h,
        foe.vx < 0,
        1,
        1,
        true
      );
      if (foe.flash > 0) {
        ctx.fillStyle = '#ffffff88';
        ctx.fillRect(fx, fy, foe.w, foe.h);
      }
    } else {
      ctx.fillStyle = '#090712';
      ctx.fillRect(fx - 1, fy - 1, foe.w + 2, foe.h + 2);
      ctx.fillStyle = foe.flash > 0 ? '#ffffff' : foe.color;
      ctx.fillRect(fx, fy, foe.w, foe.h);
    }

    if (foe.isBoss) {
      ctx.strokeStyle = '#ffe066';
      ctx.beginPath();
      ctx.arc(fx + foe.w * 0.5, fy + foe.h * 0.5, foe.w * 0.72 + Math.sin(time * 6) * 2, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = '#090712';
      ctx.fillRect(fx - 4, fy - 9, foe.w + 8, 3);
      ctx.fillStyle = '#ff2e63';
      ctx.fillRect(fx - 3, fy - 8, Math.round((foe.w + 6) * Math.max(0, foe.hp / foe.maxHp)), 1);
    } else if (foe.hp < foe.maxHp) {
      ctx.fillStyle = '#090712';
      ctx.fillRect(fx, fy - 5, foe.w, 2);
      ctx.fillStyle = '#ff5c8a';
      ctx.fillRect(fx, fy - 5, Math.round(foe.w * Math.max(0, foe.hp / foe.maxHp)), 1);
    }
  }

  // World-space player + pet + particles + swings
  ctx.save();
  ctx.translate(-camX, -camY);
  drawPlayerAndFx();

  // Animated Terraria Pickaxe / Astral Sword Swing Arc
  if (engine.sandboxSwingTimer > 0) {
    const prog = 1 - engine.sandboxSwingTimer / 0.18;
    const baseAngle = engine.sandboxSwingAngle;
    const sweep = baseAngle + (prog - 0.5) * 1.9;
    const ox = engine.player.x + 4;
    const oy = engine.player.y + 4;
    const isBlade = engine.sandboxSwingKind === 'weapon';
    const len = isBlade ? 15 : 13;
    const tipX = ox + Math.cos(sweep) * len;
    const tipY = oy + Math.sin(sweep) * len;

    ctx.strokeStyle = isBlade ? '#ff5c8a' : '#52e5ff';
    ctx.lineWidth = isBlade ? 2.5 : 2;
    ctx.beginPath();
    ctx.arc(ox, oy, len - 2, sweep - 0.7, sweep + 0.1);
    ctx.stroke();

    // Tool head highlight
    ctx.strokeStyle = '#6e4526';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(ox, oy);
    ctx.lineTo(tipX, tipY);
    ctx.stroke();
    ctx.fillStyle = isBlade ? '#ffe066' : '#a8f5ff';
    ctx.fillRect(Math.round(tipX) - 2, Math.round(tipY) - 2, 4, 4);
  }
  ctx.restore();

  // Target Hover Cursor Box
  if (engine.sandboxHoverTx >= 0 && engine.sandboxHoverTy >= 0) {
    const hx = engine.sandboxHoverTx * TILE_SIZE - camX;
    const hy = engine.sandboxHoverTy * TILE_SIZE - camY;
    ctx.strokeStyle = '#ffe066dd';
    ctx.lineWidth = 1;
    ctx.strokeRect(hx + 0.5, hy + 0.5, TILE_SIZE - 1, TILE_SIZE - 1);
  }

  ctx.restore();

  // Top-right Terraria-style Sandbox Minimap
  drawSandboxMinimap(ctx, engine, playerTx, playerTy);
}
