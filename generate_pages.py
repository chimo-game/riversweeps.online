#!/usr/bin/env python3
"""Generate all game signup pages from vegas-sweeps.html template."""

import os

PAGES_DIR = os.path.join(os.path.dirname(__file__), "pages")
TEMPLATE = os.path.join(PAGES_DIR, "vegas-sweeps.html")

# Game definitions: (filename, display_name, image_slug, page_slug)
GAMES = [
    ("black-jack.html",    "Black Jack",      "blackjack",     "black-jack"),
    ("blue-dragon.html",   "Blue Dragon",     "bluedragon",    "blue-dragon"),
    ("firekirin.html",     "Fire Kirin",      "firekirin",     "firekirin"),
    ("game-vault.html",    "Game Vault",      "gamevault",     "game-vault"),
    ("magic-city.html",    "Magic City",      "magiccity",     "magic-city"),
    ("milkyways.html",     "Milky Ways",      "milkyways",     "milkyways"),
    ("orionstars.html",    "Orion Stars",     "orionstars",    "orionstars"),
    ("panda-master.html",  "Panda Master",    "pandamaster",   "panda-master"),
    ("riversweeps.html",   "River Sweeps",    "riversweeps",   "riversweeps"),
    ("slotsofvegas.html",  "Slots of Vegas",  "slotsofvegas",  "slotsofvegas"),
    ("ultrapanda.html",    "Ultra Panda",     "ultrapanda",    "ultrapanda"),
    ("v-power.html",       "V Power",         "vpower",        "v-power"),
    ("vblink.html",        "VBlink",          "vblink",        "vblink"),
    ("vegasx.html",        "Vegas X",         "vegasx",        "vegasx"),
]

# Template values (what to find in vegas-sweeps.html)
TEMPLATE_NAME = "Vegas Sweeps"
TEMPLATE_IMAGE_SLUG = "vegas-sweeps"
TEMPLATE_PAGE_SLUG = "vegas-sweeps"

def generate():
    with open(TEMPLATE, "r", encoding="utf-8") as f:
        template_content = f.read()

    for filename, display_name, image_slug, page_slug in GAMES:
        content = template_content

        # Replace page slug in URLs (canonical, og:url, schema URLs)
        content = content.replace(
            f"pages/{TEMPLATE_PAGE_SLUG}.html",
            f"pages/{page_slug}.html"
        )

        # Replace image slug in og:image, twitter:image, logo URLs
        content = content.replace(
            f"uploads/2023/09/{TEMPLATE_IMAGE_SLUG}.gif",
            f"uploads/2023/09/{image_slug}.gif"
        )

        # Replace display name everywhere (titles, headings, meta, schema)
        content = content.replace(TEMPLATE_NAME, display_name)

        # Replace og:image:alt
        content = content.replace(
            f"{display_name} logo",
            f"{display_name} logo"
        )  # Already handled by name replacement above

        out_path = os.path.join(PAGES_DIR, filename)
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"  Generated {filename} ({len(content)} chars)")

    print(f"\nDone! Generated {len(GAMES)} pages from template.")

if __name__ == "__main__":
    generate()
