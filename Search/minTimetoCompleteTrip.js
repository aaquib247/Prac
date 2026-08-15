var minimumTime = function(time, totalTrips) {

    let left = 1;
    let right = Math.min(...time) * totalTrips;
    let ans = -1;

    while (left <= right) {

        let mid = Math.floor((left + right) / 2);

        if (canComplete(time, totalTrips, mid)) {
            ans = mid;        // possible answer
            right = mid - 1;  // try to find smaller time
        } else {
            left = mid + 1;
        }
    }

    return ans;
};


function canComplete(time, totalTrips, currentTime) {

    let trips = 0;

    for (let t of time) {
        trips += Math.floor(currentTime / t);

        if (trips >= totalTrips) {
            return true;
        }
    }

    return false;
}
