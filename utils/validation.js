const isNullOrEmpty = (text) => {
    return !text || text.trim() === ""
}

const isValidId = (id) => {
    return id > 0
}

module.exports = {
    isNullOrEmpty,
    isValidId
}