interface Location {
  latitude: number,
  longitude: number,
  zoom: number
}

export interface Offer {
  city: {
    name: string,
    location: Location
  },

  preview_image: string,

  images: string[],
  title: string,
  is_favorite: string,
  is_premium: string,
  rating: number,
  type: string,
  bedrooms: number,
  max_adults: number,
  price: number,
  goods: string[],

  host: {
    id: number,
    name: string,
    is_pro: boolean,
    avatar_url: string
  },

  description: string,
  location: Location,
  id: number
}

export interface Credentials {
  avatar_url: string,
  email: string,
  id: null | number,
  is_pro: false,
  name: string
}

export interface Match {
  path: string,
  url: string,
  isExact: boolean,
  params: {
    [key: string]: string
  }
}

export interface Comments {
  id: number,
  rating: number,
  comment: string
}

export interface CityName {
  cityName: string
}

interface City {
  city: number
}
