from pathlib import Path
import re

from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets"
SOURCE_FILES = [
    ROOT / "index.html",
    ROOT / "tournaments.html",
    ROOT / "styles.css",
    ROOT / "script.js",
]


def create_webp(source: Path) -> Path:
    target = source.with_suffix(".webp")
    with Image.open(source) as image:
        image = ImageOps.exif_transpose(image)
        if image.mode not in ("RGB", "RGBA"):
            image = image.convert("RGBA" if "transparency" in image.info else "RGB")
        image.save(target, "WEBP", quality=82, method=6)
    return target


def image_dimensions(asset_url: str):
    asset_path = ROOT / asset_url
    if not asset_path.exists():
        return None
    with Image.open(asset_path) as image:
        return image.size


def add_dimensions(html: str) -> str:
    def update_tag(match):
        tag = match.group(0)
        source_match = re.search(r'\ssrc="(assets/[^"]+)"', tag)
        if not source_match:
            return tag
        dimensions = image_dimensions(source_match.group(1))
        if not dimensions:
            return tag
        width, height = dimensions
        attributes = ""
        if not re.search(r"\swidth=", tag):
            attributes += f' width="{width}"'
        if not re.search(r"\sheight=", tag):
            attributes += f' height="{height}"'
        if not re.search(r"\sloading=", tag):
            attributes += ' loading="lazy"'
        if not re.search(r"\sdecoding=", tag):
            attributes += ' decoding="async"'
        if not attributes:
            return tag
        suffix = " />" if tag.endswith(" />") else ">"
        return tag[: -len(suffix)] + attributes + suffix

    return re.sub(r"<img\b[^>]*>", update_tag, html, flags=re.DOTALL)


def main():
    replacements = {}
    for source in sorted(ASSETS.iterdir()):
        if source.suffix.lower() not in {".jpg", ".jpeg", ".png"}:
            continue
        target = create_webp(source)
        replacements[f"assets/{source.name}"] = f"assets/{target.name}"

    for file_path in SOURCE_FILES:
        content = file_path.read_text(encoding="utf-8")
        for old, new in replacements.items():
            content = content.replace(old, new)
        if file_path.suffix == ".html":
            content = add_dimensions(content)
        file_path.write_text(content, encoding="utf-8")

    remaining = []
    for file_path in SOURCE_FILES:
        content = file_path.read_text(encoding="utf-8")
        remaining.extend(re.findall(r"assets/[^\"')]+\.(?:jpg|jpeg|png)", content, flags=re.IGNORECASE))
    if remaining:
        raise SystemExit(f"Unoptimized references remain: {sorted(set(remaining))}")


if __name__ == "__main__":
    main()
