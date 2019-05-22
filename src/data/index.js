export const TOP_RATING = 5;

export const MapParams = {
  ZOOM: 11,
  CITY: [52.38333, 4.9],
  ICON: {
    URL: `img/pin.svg`,
    SIZE: [30, 30]
  },
  TILE_LAYER: {
    URL: `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`,
    OPTIONS: {
      ATTRIBUTION: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
    }
  }
};
