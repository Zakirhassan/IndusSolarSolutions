"""Generate responsive WebP variants for every photo under public/images.

For each `name.jpg` (the untouched source kept for OG/schema use) this writes:
  name.webp      full size (max 1600px wide), q72
  name-960.webp  960px wide, q64
  name-720.webp  720px wide, q64
  name-480.webp  480px wide, q62
Variants are only written when the source is wider than the target width.
SizedImage.tsx and Hero.tsx build `srcset` from these, so phones download a
480-960px file instead of the 1200-1600px original.

Re-run after adding a new photo:  python scripts/optimize-images.py
"""
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent / "public" / "images"
SKIP_DIRS = {"brand", "brands"}
VARIANTS = [(960, 64), (720, 64), (480, 62)]
FULL_MAX, FULL_Q = 1600, 72


def save(img: Image.Image, dest: Path, quality: int) -> None:
    img.save(dest, "WEBP", quality=quality, method=6)


def main() -> None:
    before = after = 0
    for src in sorted(ROOT.rglob("*.jpg")):
        if SKIP_DIRS & set(src.relative_to(ROOT).parts):
            continue
        full = src.with_suffix(".webp")
        before += full.stat().st_size if full.exists() else 0
        img = Image.open(src).convert("RGB")
        if img.width > FULL_MAX:
            img = img.resize((FULL_MAX, round(img.height * FULL_MAX / img.width)), Image.LANCZOS)
        save(img, full, FULL_Q)
        after += full.stat().st_size
        for width, quality in VARIANTS:
            dest = src.with_name(f"{src.stem}-{width}.webp")
            if img.width <= width:
                dest.unlink(missing_ok=True)
                continue
            save(img.resize((width, round(img.height * width / img.width)), Image.LANCZOS), dest, quality)
        print(f"{src.relative_to(ROOT)}: {img.width}x{img.height}")
    print(f"full-size webp total: {before // 1024}KB -> {after // 1024}KB")


if __name__ == "__main__":
    main()
