// STORAGE
const drivers = new Map();   // driverId → {lat, lng, available}
const rides = new Map();     // rideId → { state, userId, driverId }

// UPDATE DRIVER LOCATION
function updateLocation(driverId, lat, lng) {
  drivers.set(driverId, { lat, lng, available: true });
}

// FIND NEAREST DRIVER
function findNearest(userLat, userLng) {
  let nearest = null;
  let minDist = Infinity;

  for (let [driverId, loc] of drivers) {
    if (!loc.available) continue; // skip busy drivers
    const dist = getDistance(userLat, userLng, loc.lat, loc.lng);
    if (dist < minDist) {
      minDist = dist;
      nearest = driverId;
    }
  }
  return nearest;
}

// BOOK RIDE
function bookRide(rideId, userId, userLat, userLng) {
  const driver = findNearest(userLat, userLng);
  if (!driver) return 'No driver available';

  drivers.get(driver).available = false; // mark busy
  rides.set(rideId, {
    state: 'REQUESTED',
    userId,
    driverId: driver
  });
  console.log(`Ride ${rideId} assigned to ${driver}`);
}

// UPDATE STATE
function updateState(rideId, state) {
  const ride = rides.get(rideId);
  ride.state = state;
  // REQUESTED → STARTED → COMPLETED

  if (state === 'COMPLETED') {
    drivers.get(ride.driverId).available = true; // free driver
  }
}

// DISTANCE HELPER
function getDistance(lat1, lng1, lat2, lng2) {
  return Math.sqrt(
    Math.pow(lat2 - lat1, 2) +
    Math.pow(lng2 - lng1, 2)
  ); // real = Haversine formula
}

// TEST
updateLocation('driver1', 18.5, 73.8);
updateLocation('driver2', 18.6, 73.9);
bookRide('ride1', 'u1', 18.5, 73.8);
updateState('ride1', 'STARTED');
updateState('ride1', 'COMPLETED'); // driver available again
