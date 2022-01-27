// Google Place ID for Washington DC from https://developers.google.com/places/place-id
export const googlePlaceId = 'ChIJW-T2Wt7Gt4kRKl2I1CJFUsI';

// Coordinates for central Washington DC
export const initialRegion = {
  latitude: 38.905548,
  longitude: -77.036623,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

export const deltas = {
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

export const INITIAL_MAP_FILTER_STATE = {
  snapOrEbtAccepted: false,
  wic: false,
};

export const INITIAL_FILTER_STATE = {
  openNow: false,
  productsInStock: false,
  couponProgramPartner: false,
  rewardsAccepted: false,
  ...INITIAL_MAP_FILTER_STATE,
};
