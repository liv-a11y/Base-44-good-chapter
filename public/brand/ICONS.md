# Good Chapter icon and visuals suite

First full pass, 22 Nov 2026. All artwork is original and drawn for Good Chapter.

## What is here

| Folder | Contents |
| --- | --- |
| `icons/chapters/` | 15 block-print silhouettes: 12 chapter symbols plus toaster, lamp, and mug. SVG, and 512px PNG in burgundy, paper, and clay. |
| `icons/objects/` | 20 brush-ink object icons, prefixed by room (kitchen, living-room, bedroom, bath, office). SVG, and 512px PNG in burgundy and paper. |
| `visuals/heroes/` | 8 hero images, 1920x1080 WebP, no text. |
| `visuals/patterns/` | 2 square patterns, 1440px WebP. |
| `visuals/stickers/` | 6 chapter stickers, 600px transparent PNG. |
| `overview/` | Contact sheets of the full suite. |

## Using the SVGs

Every SVG uses `fill="currentColor"`, so it takes the text color of its parent.
Inline it, or use it as a CSS mask, and set the color with the existing tokens
(`text-foreground` for burgundy, `text-primary` for cobalt, `text-destructive` for clay).

## Rules

- One shape color on one ground color.
- Cobalt is a shape color, never a full ground.
- Block print for symbols and hero art. Brush ink for literal objects.
- Labels on the stickers and overview sheets are set in Raw Serif (Shoom House).
  The font files are licensed separately and are not in this repo.

## Working names

The chapter names (Fresh Start, New Arrival, Recovery, Service to Civilian, and so on)
are working labels. Rename the files when the chapter list is final.
