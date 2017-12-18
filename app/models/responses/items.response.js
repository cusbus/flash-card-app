const SuccessResponse = require('./success.response')

class ItemsResponse extends SuccessResponse {

    constructor(data){
        super()
        this.item = data
    }
}

module.exports = ItemsResponse