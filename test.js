function getCubeNumber(c) {
    // write code here
    let res = -1

    let half = Math.floor(Math.pow(c / 2, 1 / 2))
    for (let i = 0; i < half; i++) {
        let cur = c - Math.pow(i, 3)
        if (cur > 0) {
            if (Math.pow(cur, 1 / 3) % 1 === 0) {
                return Math.pow(cur, 1 / 3)
            }
        }
    }
    return res
}
// console.log(getCubeNumber(8))


function specialStr(inputStr, cList) {
    // write code here
    const set = new Set(cList)
    let len = inputStr.length
    const dp = new Array(len).fill(0).map(item => new Array(len).fill(true))
    for (let i = 0; i < len; i++) {
        for (j = i; j >= 0; j--) {
            if (i == j) {
                dp[j][i] = (inputStr[i] == inputStr[j]) && !set.has(inputStr[i])
            } else {
                dp[j][i] = (inputStr[i] == inputStr[j]) && !set.has(inputStr[i]) && dp[j + 1][i - 1]
            }
        }
    }
    let max = 1
    for (let i = 0; i < len; i++) {
        for (j = i; j >= 0; j--) {
            if (dp[j][i]) {
                max = Math.max(max, i - j + 1)
            }
        }
    }

    return max

}
// var cList = ['x', 'b']
// var inputStr = "abbaaacaaa"
// console.log(specialStr(inputStr, cList))


function bestSubCollection(nums, k) {
    let len = nums.length
    let result = -Infinity
    const ans = []
    const getComb = (i, res) => {
        let count = 0
        if (res.length !== 0) {
            count = res.reduce((sum, item) => {
                return sum + item
            })
        }
        ans.push(res)
        if (count % k === 0) {
            result = Math.max(result, count)
        }
        if (i > len - 1) {
            return
        } else {
            for (let j = i; j < len; j++) {
                getComb(j + 1, [...res, nums[j]])
            }
        }

    }

    getComb(0, [])
    console.log(ans)
    return result == -Infinity ? -1 : result
}
let nums = [5, 4, 2]
let k = 3

// console.log(bestSubCollection(nums, k))
// console.log(-Infinity == -Infinity)
let map = new Map([
    ['9', 2],
    ['3', 4]
])
let arr = Array.from(map)
arr.sort((a, b) => Number(a[0]) - Number(b[0]))
arr = arr.map(item => item[1])
console.log(arr)