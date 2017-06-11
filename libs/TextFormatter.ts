export function distanceText(distance: number | undefined): string {
  if (distance == undefined) {
    return "";
  }

  // Distance needs to be in metres
  var units = undefined
  if(distance > 1000) {
    distance /= 1000;
    units = "km";
  }
  else {
    units = "m"
  }
  return(distance.toFixed(0) + " " + units);
}

export function bearingText(bearing: number | undefined): string {
  if (bearing == undefined) {
    return "";
  }
  // Dividing the compass into 8 sectors that are centred on north
  var sector = Math.floor(((bearing + 22.5) % 360.0) / 45.0);
  var sectorNames = [ "N", "NE", "E", "SE", "S", "SW", "W", "NW" ];
  return sectorNames[sector];
}
