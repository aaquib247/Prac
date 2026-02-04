Class Operation{
    constructor(){
        let Minimum = -Infinity;
        let Maximum = Infinity;
        let map = new Map();
        let arr = []
    }

    update(data){
        if(!map.has(data)){
            map.set(data.timeStamp, data.score);
      }
      map.set(data.timeStamp, data.score);
      arr.push({data.timeStamp, data.score})
     
      Minimum = Math.min(Minimum, data.score)
      Maximum = Math.max(Maximum, data.score)
}

getMin(){
    return Minimum
}

getMaximum(){
    return Maximum
}    

getLatest(){
    arr.sort((a,b) => b.timeStamp - a.timeStamp)
    return arr[arr.length - 1].score
}

getAverage(t1,t2){
    let sum = 0;
    for( const [time,score] of arr){
        if(time >= t1 && time <= t2){
            sum += score
        }
    }
    return sum / arr.length
}

