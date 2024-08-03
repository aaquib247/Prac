let arr = [4,1,8,3,-9]
let insertionSort = sort(arr)
console.log(insertionSort)

function sort(arr){

    let i,j;

    for(i=0;i<arr.length-1;i++){
        for(j=i+1;j>0;j--){
            if(arr[j]<arr[j-1]){
                let temp = arr[j]
                arr[j]=arr[j-1]
                arr[j-1]=temp
            }
            else
            break;
        }
    }

    return arr;

}