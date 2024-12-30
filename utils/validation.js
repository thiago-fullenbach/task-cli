const { ERROR_INVALID_ARG_VALUE, ERROR_INVALID_DESC_SIZE } = require("./constants/strings")
const { INVALID_ID } = require("./constants/values")

const isNullOrEmpty = (text) => {
    return !text || !text.trim()
}

const areStringsEqual = (textA, textB) => {
    if(isNullOrEmpty(textA) || isNullOrEmpty(textB)) {
        return isNullOrEmpty(textA) && isNullOrEmpty(textB)
    }

    return textA.trim().toUpperCase() === textB.trim().toUpperCase()
}

const formatString = (text) => {
    return text.replace(/['"]/g, '').trim()
}

const validateId = (id) => {
    if(!id)
        throw { message: ERROR_MISSING_ARGS('id') }

    id = Number.parseInt(id)

    if(isNaN(id))
        throw { message: ERROR_INVALID_ARG_TYPE(id, 'Number') }

    if(id === INVALID_ID)
        throw { message: ERROR_INVALID_ARG_VALUE(id) }

    return id
}

const validateDesc = (description) => {
    if(isNullOrEmpty(description))
        throw { message: ERROR_MISSING_ARGS('description') }

    const length = description.length

    if(length > 100)
        throw { message: ERROR_INVALID_DESC_SIZE() }

    return formatString(description)
}

module.exports = {
    isNullOrEmpty,
    areStringsEqual,
    validateId,
    validateDesc
}