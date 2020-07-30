let arr = [
    [1, 2, 4, 6],   
    [2, 3, 6, 8],   
    [4, 5, 8, 9],   
    [5, 6, 9, 10]   
]

function find(target, array) {
    let row = 0, col = array[0].length - 1;
    while(row < array[0].length && col >= 0) {
        if(array[row][col] === target) {
            return true
        }else {
            array[row][col] > target
            ? --col
            : ++row
        } 
    }
    return false


}
console.log(find(11, arr));

