"""Génère public/images/og-cover.jpg (1200×630) pour Open Graph / Twitter.

Usage : python scripts/og-cover.py   (Pillow requis ; polices Windows Georgia / Segoe UI)
"""
from PIL import Image, ImageDraw, ImageFont, ImageFilter

W, H = 1200, 630
F = 'C:/Windows/Fonts/'
GOLD, CREME, SABLE = '#e7b75a', '#f6eddc', '#e9d8b9'

img = Image.new('RGB', (W, H), '#140d08')
glow = Image.new('L', (W, H), 0)
ImageDraw.Draw(glow).ellipse((560, -200, 1500, 700), fill=150)
img.paste(Image.new('RGB', (W, H), '#5a3618'), (0, 0), glow.filter(ImageFilter.GaussianBlur(160)))
d = ImageDraw.Draw(img)

serif = ImageFont.truetype(F + 'georgiab.ttf', 64)
sans = ImageFont.truetype(F + 'seguisb.ttf', 28)
sans_s = ImageFont.truetype(F + 'segoeui.ttf', 23)
eyebrow = ImageFont.truetype(F + 'segoeuib.ttf', 19)

x = 72
d.text((x, 70), 'LE BAOBAB  ·  PORTFOLIO', font=eyebrow, fill=GOLD)
d.text((x, 112), 'Toumany dit', font=serif, fill=CREME)
d.text((x, 186), 'Christophe', font=serif, fill=CREME)
d.text((x, 260), 'Diarra', font=serif, fill=GOLD)
d.line([(x + i * 14, 360 if i % 2 == 0 else 348) for i in range(17)], fill='#cf8a3e', width=3)
d.text((x, 388), 'Développeur Web & Mobile', font=sans, fill=SABLE)
d.text((x, 426), 'Consultant IA · Formateur', font=sans, fill=SABLE)
d.text((x, 476), 'Applications de gestion · Bases de données', font=sans_s, fill='#cdb894')
d.text((x, 506), 'Tableaux de bord · Support SI', font=sans_s, fill='#cdb894')
d.text((x, 560), 'toumanyditchristophe.web.app  ·  Kati, Mali', font=sans_s, fill=GOLD)

p = Image.open('public/images/1.png').convert('RGB')
pw, ph = 380, 520
p = p.resize((pw, round(p.size[1] * pw / p.size[0])), Image.LANCZOS).crop((0, 0, pw, ph))
mask = Image.new('L', (pw, ph), 0)
ImageDraw.Draw(mask).rounded_rectangle((0, 0, pw - 1, ph - 1), 28, fill=255)
px, py = W - pw - 70, (H - ph) // 2
d.rounded_rectangle((px - 4, py - 4, px + pw + 3, py + ph + 3), 32, outline=GOLD, width=3)
img.paste(p, (px, py), mask)
img.save('public/images/og-cover.jpg', quality=86, optimize=True, progressive=True)
