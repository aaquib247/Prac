var groupAnagrams = function (strs) {

    let map = new Map();
    let res = [];

    for (let str of strs) {
        const nstr = str.split('').sort().join('');
        if (!map.has(nstr)) {
            map.set(nstr, [])
        }
        map.get(nstr).push(str);
    }

    for (let [key, value] of map) {
        res.push(value);
    }

    return res;

};

console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));
