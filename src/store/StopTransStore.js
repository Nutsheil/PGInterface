import {getStopTrans} from "../http/api";

class StopTransStore {
    #setStopTrans(stopTrans) {
        sessionStorage.setItem('StopTrans', JSON.stringify(stopTrans))
    }

    getStopTrans() {
        return sessionStorage.getItem('StopTrans') ?
            JSON.parse(sessionStorage.getItem('StopTrans')) : []
    }

    updateStopTrans(shift_id) {
        return getStopTrans(shift_id).then(response => {
            this.#setStopTrans(response)
        }).catch(error => {
            console.log(error)
        })
    }
}

export default new StopTransStore()