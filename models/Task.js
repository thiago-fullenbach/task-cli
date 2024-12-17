const { INVALID_ID, INVALID_STATUS } = require('../utils/constants/values')

// Task Model
const Task = {
    id: INVALID_ID,
    description: "",
    status: INVALID_STATUS,
    createdAt: "",
    updatedAt: ""
}

module.exports = {
    Task
}