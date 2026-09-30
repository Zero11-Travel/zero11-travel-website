// Curated client photography. Files live in public/images/photos/ as
// <slug>.webp (<=1280px) and <slug>-sm.webp (640px). Captions are
// deliberately generic where the exact location isn't confirmed by the client.
export interface Photo {
  slug: string
  alt: string
  caption: string
  width: number
  height: number
  category: 'Johannesburg & Soweto' | 'Heritage' | 'Safari & Wildlife' | 'Scenery' | 'Our Fleet'
}

export const photos: Photo[] = [
  { slug: 'johannesburg-skyline', alt: 'Johannesburg city skyline seen from a high-rise viewpoint', caption: 'Johannesburg skyline', width: 1280, height: 960, category: 'Johannesburg & Soweto' },
  { slug: 'soweto-towers', alt: 'Aerial view of the painted Soweto cooling towers', caption: 'Soweto cooling towers', width: 960, height: 640, category: 'Johannesburg & Soweto' },
  { slug: 'maropeng-cradle-of-humankind', alt: 'The grass-covered Maropeng visitor centre at the Cradle of Humankind', caption: 'Cradle of Humankind', width: 1280, height: 960, category: 'Heritage' },
  { slug: 'cave-exploration', alt: 'Lit walkway winding through a deep limestone cave', caption: 'Cave exploration', width: 960, height: 1152, category: 'Heritage' },
  { slug: 'blyde-three-rondavels', alt: 'The Three Rondavels rock formations above the Blyde River Canyon', caption: 'Three Rondavels, Mpumalanga', width: 1280, height: 960, category: 'Scenery' },
  { slug: 'blyde-river-canyon', alt: 'Blyde River winding through a green canyon', caption: 'Blyde River Canyon', width: 960, height: 1280, category: 'Scenery' },
  { slug: 'bourkes-luck-potholes', alt: 'Water-carved rock potholes and a green pool at Bourke\'s Luck', caption: 'Bourke\'s Luck Potholes', width: 1280, height: 960, category: 'Scenery' },
  { slug: 'mpumalanga-waterfall', alt: 'A waterfall dropping into a green pool below a rock cliff', caption: 'Waterfall, Mpumalanga', width: 960, height: 1280, category: 'Scenery' },
  { slug: 'mpumalanga-waterfall-2', alt: 'A tall waterfall running down a forested cliff', caption: 'Forest waterfall', width: 960, height: 1280, category: 'Scenery' },
  { slug: 'game-drive-vehicle', alt: 'Open-sided safari game-drive vehicle carrying guests on a bush track', caption: 'On a game drive', width: 1080, height: 771, category: 'Safari & Wildlife' },
  { slug: 'rhino-game-viewing', alt: 'A white rhino grazing in dry bushveld', caption: 'Rhino in the bushveld', width: 960, height: 1280, category: 'Safari & Wildlife' },
  { slug: 'elephants', alt: 'Elephants gathered at a waterhole in the bush', caption: 'Elephants at the waterhole', width: 960, height: 1280, category: 'Safari & Wildlife' },
  { slug: 'giraffe', alt: 'A giraffe looking over green bush against a blue sky', caption: 'Giraffe', width: 960, height: 1280, category: 'Safari & Wildlife' },
  { slug: 'lionesses', alt: 'Two lionesses resting in the long grass', caption: 'Lionesses', width: 960, height: 1280, category: 'Safari & Wildlife' },
  { slug: 'lion-resting', alt: 'A male lion asleep in the grass', caption: 'Resting lion', width: 1280, height: 947, category: 'Safari & Wildlife' },
  { slug: 'fleet-shuttle-vans', alt: 'Row of white Zero11 passenger shuttle vans parked on a brick forecourt', caption: 'Shuttle vans', width: 1280, height: 960, category: 'Our Fleet' },
  { slug: 'fleet-sedans', alt: 'Zero11 sedans and wagons parked in a row on a brick forecourt', caption: 'Sedans and wagons', width: 1280, height: 960, category: 'Our Fleet' },
]

const bySlug = new Map(photos.map(p => [p.slug, p]))

export function getPhoto(slug: string): Photo {
  const photo = bySlug.get(slug)
  if (!photo) throw new Error(`Unknown photo slug: ${slug}`)
  return photo
}
