# Pulse Design System

## Colors

Defined as Tailwind theme tokens in `src/styles/globals.css`.

| Token | Hex | Usage |
|-------|-----|-------|
| `primary` | #10b981 | Accent green (links, active states, mood "good") |
| `foreground` | #1a1a1a | Body text, dark CTA buttons |
| `background` | #fafaf7 | Warm off-white page background |
| `card` | #ffffff | White surface (right panels, cards) |
| `muted` | #edeae1 | Warm gray fills, disabled button backgrounds |
| `muted-foreground` | #8a8780 | Secondary text, placeholders, labels |
| `border` / `input` | #d8d6cf | Borders, input outlines |
| `secondary` | #edeae1 | Hover backgrounds on outline buttons |
| `destructive` | #c75450 | Errors, mood "rough" |
| `warning` | #d4a017 | Mood "okay" |
| `accent` | #d6f0e4 | Light green tint |

### Mood Colors (hardcoded in mood components)
| Mood | Color |
|------|-------|
| Rest | #b8b5ad (gray) |
| Rough | #c75450 (red) |
| Okay | #d4a017 (gold) |
| Good | #10b981 (green) |
| Crushed it | #10b981 (green) |

## Typography

**Inter** is the only UI typeface. Loaded from Google Fonts at weights 400 and 500.
- `font-feature-settings: 'ss01', 'cv11'` for single-storey a/g alternates.
- No bold (600/700) anywhere in the UI.

**Caveat** 500/600 is loaded for the branding panel headline only (`font-display` class). Not used in product UI.

### Scale

| Role | Size / weight | Tailwind |
|------|--------------|----------|
| Page heading (H1) | 25px / 500, −0.6 tracking | `text-[25px] font-medium tracking-[-0.6px]` |
| Branding headline | 38–44px / 500, −1.2 to −1.4 tracking | `text-[42px] font-medium tracking-[-1.3px] font-display` |
| Wordmark ("Pulse") | 17px / 500, −0.3 tracking | `text-[17px] font-medium tracking-[-0.3px]` |
| Body / base | 14px / 400, line-height 1.45 | `text-[14px]` (default) |
| Secondary text | 13.5px / 400 | `text-[13.5px] text-muted-foreground` |
| Buttons | 13.5px / 500 | `text-[13.5px] font-medium` |
| Meta / captions | 12–12.5px / 400 | `text-[12px]` |
| Field labels | 11px / 500, uppercase, +0.8 tracking | `text-[11px] font-medium uppercase tracking-[0.8px]` |

**Rules:** Display sizes get negative tracking. Small uppercase labels get positive tracking. Numbers in timers use `font-variant-numeric: tabular-nums`.

## Components

### Buttons

**Primary (dark CTA):**
```
h-12 rounded-xl bg-foreground text-[13.5px] font-medium text-card hover:bg-foreground/90 disabled:opacity-50
```

**Secondary (outline):**
```
h-12 rounded-xl border border-border bg-card text-[13.5px] font-medium text-foreground hover:bg-secondary
```

**Disabled state (verify button):**
```
enabled:bg-foreground enabled:text-card disabled:bg-muted disabled:text-muted-foreground
```

### Inputs

```
h-12 rounded-xl border border-input bg-card px-4 text-[14px] text-foreground
placeholder:text-muted-foreground focus:border-foreground focus:ring-1 focus:ring-foreground/10
```

### Border Radius

| Token | Value |
|-------|-------|
| `radius-sm` | 0.375rem (6px) |
| `radius-md` | 0.625rem (10px) |
| `radius-lg` | 0.875rem (14px) |
| `radius-xl` | 1.25rem (20px) |

Most interactive elements use `rounded-xl`.
