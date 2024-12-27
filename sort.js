// Merge sort function
function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    return merge(mergeSort(left), mergeSort(right));
}

// Merge function
function merge(left, right) {
    let result = [];
    let i = 0;
    let j = 0;

    while (i < left.length && j < right.length) //如果左側和右側都有元素且
        if (left[i] < right[j]) {//如果左側的第一個元素小於右側的第一個元素
            result.push(left[i]);//將左側的第一個元素推入result
            i++;
        } else {
            result.push(right[j]);//將右側的第一個元素推入result
            j++;
        }
    }

    return result.concat(left.slice(i)).concat(right.slice(j));

// Example usage
const arr = [5, 2, 8, 3, 1, 9, 4, 7, 6];
const sortedArr = mergeSort(arr);
console.log(sortedArr);