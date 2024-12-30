const { INVALID_POS } = require("./constants/values");

const taskBinarySearch = (id, taskList) => {
    let low = 0;
    let high = taskList.length - 1;
    while(low <= high) {
        let mid = low + Math.floor((high - low) / 2)
        let currentValue = taskList[mid] ? taskList[mid].id : 0
        if(id > currentValue) low = ++mid
        else if(id < currentValue) high = --mid
        else return mid
    }

    return INVALID_POS
}

module.exports = {
    taskBinarySearch
}