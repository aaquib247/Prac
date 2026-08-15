// STORAGE
const locations = new Map();  // driverId/deliveryId → {lat, lng}
const orders = new Map();     // orderId → { state, userId, assignedTo }

// UPDATE LOCATION (driver/delivery agent)
function updateLocation(agentId, lat, lng) {
  locations.set(agentId, { lat, lng });
}

// FIND NEAREST AGENT
function findNearest(userLat, userLng) {
  let nearest = null;
  let minDist = Infinity;

  for (let [agentId, loc] of locations) {
    const dist = getDistance(userLat, userLng, loc.lat, loc.lng);
    if (dist < minDist) {
      minDist = dist;
      nearest = agentId;
    }
  }
  return nearest;
}

// PLACE ORDER + ASSIGN
function placeOrder(orderId, userId, userLat, userLng) {
  const agent = findNearest(userLat, userLng);
  orders.set(orderId, {
    state: 'ASSIGNED',
    userId,
    assignedTo: agent
  });
  console.log(`Order ${orderId} assigned to ${agent}`);
}

// UPDATE STATE
function updateState(orderId, state) {
  const order = orders.get(orderId);
  order.state = state;
  // PENDING → ASSIGNED → PICKED → DELIVERED
}

// DISTANCE HELPER
function getDistance(lat1, lng1, lat2, lng2) {
  return Math.sqrt(
    Math.pow(lat2 - lat1, 2) +
    Math.pow(lng2 - lng1, 2)
  ); // simplified, real = Haversine formula
}

// TEST
updateLocation('driver1', 18.5, 73.8);
updateLocation('driver2', 18.6, 73.9);
placeOrder('ord1', 'u1', 18.5, 73.8);
updateState('ord1', 'PICKED');
updateState('ord1', 'DELIVERED');
