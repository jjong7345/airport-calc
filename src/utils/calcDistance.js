const milesToNauticalMiles = 0.868976;
const statuteMilesInNauticalMile = 1.15078;

const calcDistance = (lat1, lon1, lat2, lon2) => {
  // using Haversine formula to calculate nautical distance between 2 lat/lon points
  let dist;
  try {
    const radLat1 = Math.PI * lat1 / 180;
    const radLat2 = Math.PI * lat2 / 180;
    const theta = lon1 - lon2;
    const radTheta = Math.PI * theta / 180;
    dist =
      Math.sin(radLat1) * Math.sin(radLat2) +
      Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);
    dist = Math.acos(dist);
    dist *= 180 / Math.PI;
    dist *= 60 * statuteMilesInNauticalMile;
    dist *= milesToNauticalMiles;
  } catch (e) {}

  return dist || 0;
};

export { calcDistance };