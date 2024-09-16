
function isPalin(str){

    function checkPalin(i){

        if(i >= str.length/2){
            return true;
        }

        if(str[i] != str[str.length - i - 1])
            return false;
        else
          return checkPalin(i+1)
    }

   return  checkPalin(0)
 
}


console.log(isPalin('MADA'))