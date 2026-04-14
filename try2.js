function bk(s){
    let n = s.length;

     function isPalin(s){
            let l = 0;
            let r = s.length - 1;
            while(l<r){
                if(s[l] !== s[r])
                 return false;
            l++;r--;
            }
            return true;
        }
    
    
    function f(start){
        if(start === s.length) return 0;
        
        let max = -Infinity;

        for(let end=start;end<n;end++){
            let str = s.slice(start,end+1);
            if(isPalin(str)){
                max = Math.max(max, 1 + f(end+1));
            }      
        }
        return max;
    }
    return f(0) - 1;
}

console.log(bk('aab'));