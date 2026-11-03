import { h, type FunctionalComponent } from 'vue'

// Lightweight outline icons that fill gaps in the Heroicons set (which has no
// car or hotel glyph). They mirror the Heroicons outline style (24x24 viewBox,
// 1.5 stroke, currentColor) so they size and colour exactly like the imported
// Heroicons used elsewhere. Exported from app/utils so Nuxt auto-imports them —
// the service/fleet pages reference `SedanIcon`/`HotelIcon` with no import.
// Glyph paths from Tabler Icons (MIT).
function outlineIcon(paths: string[]): FunctionalComponent {
  const icon: FunctionalComponent = (_props, { attrs }) =>
    h(
      'svg',
      {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        'stroke-width': 1.5,
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        ...attrs,
      },
      paths.map(d => h('path', { d })),
    )
  icon.inheritAttrs = false
  return icon
}

// Sedan / car (side view) — for "Chauffeur Drive" and the fleet sedan card.
export const SedanIcon = outlineIcon([
  'M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0',
  'M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0',
  'M5 17h-2v-6l2 -5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0h-6m-6 -6h15m-6 0v-5',
])

// Bed — for "Hotel & Lodge Booking".
export const HotelIcon = outlineIcon([
  'M3 7v11m0 -4h18m0 4v-8a2 2 0 0 0 -2 -2h-8v6',
  'M7 10m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0',
])
