const isNullOrEmpty = (text) => {
    return !text || text.trim() === ""
}

const isValidId = (id) => {
    return id > 0
}

const areStringsEqual = (textA, textB) => {
    if(isNullOrEmpty(textA) || isNullOrEmpty(textB)) {
        return isNullOrEmpty(textA) && isNullOrEmpty(textB)
    }

    return textA.trim().toUpperCase() === textB.trim().toUpperCase()
}

module.exports = {
    isNullOrEmpty,
    isValidId,
    areStringsEqual
}