var minEatingSpeed = function(piles, h) {
    let left = 1;
    let right = Math.max(...piles);

    while (left < right) {
        let mid = Math.floor((left + right) / 2);

        if (canEatAll(piles, h, mid)) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }

    return left;
};

function canEatAll(piles, h, k) {
    let hours = 0;

    for (let bananas of piles) {
        hours += Math.ceil(bananas / k);
    }

    return hours <= h;
}
