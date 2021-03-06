export const TOP_RATING = 5;

export const MapParams = {
  CITY_ZOOM: 12,
  OFFER_ZOOM: 15,
  CITY: [52.38333, 4.9],
  ICON: {
    URL: `img/pin.svg`,
    SIZE: [30, 30]
  },
  ICON_FOCUS: {
    URL: `img/pin-orange.svg`,
    SIZE: [40, 40]
  },
  TILE_LAYER: {
    URL: `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`,
    OPTIONS: {
      ATTRIBUTION: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
    }
  }
};

export const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  LOAD_CITIES: `LOAD_CITIES`,
  BOOKMARK_ADDITION_FAILED: `BOOKMARK_ADDITION_FAILED`,
  AUTHORIZATION_FAILED: `AUTHORIZATION_FAILED`,
  AUTHORIZATION_REQUIRED: `AUTHORIZATION_REQUIRED`,
  SET_CREDENTIALS: `SET_CREDENTIALS`,
  GET_COMMENTS: `GET_COMMENTS`,
  COMMENTS_DEPLOY_FAILED: `COMMENTS_DEPLOY_FAILED`,
  RESET_COMMENTS_DEPLOY: `RESET_COMMENTS_DEPLOY`,
  UPDATE_OFFERS: `UPDATE_OFFERS`,
  UPDATE_CURRENT_OFFERS: `UPDATE_CURRENT_OFFERS`,
  UPDATE_CITY_NAMES: `UPDATE_CITY_NAMES`,
  FILTER_PARAM: `FILTER_PARAM`
};

export const SortingParams = {
  POPULAR: `Popular`,
  LOW_TO_HIGH: `Price: low to high`,
  HIGH_TO_LOW: `Price: high to low`,
  TOP_RATED: `Top rated first`
};

export const ApiParams = {
  BASE_URL: `https://es31-server.appspot.com/six-cities`,
  TIME_OUT: 1000 * 5,
  WITH_CREDENTIALS: true
};
