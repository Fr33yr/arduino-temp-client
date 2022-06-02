export function chunkArray(arr, chunkSize) {
    
    if(chunkSize <= 0 || !Number.isInteger(chunkSize)){
        return console.log(`Chunk size most be higher than 0
        and an integer`);
    }

    if(arr === []){
        return console.log('Empty Array');
    }
  
    let slicedArr = []
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize)
        slicedArr.push(chunk)
    }

    return slicedArr
}