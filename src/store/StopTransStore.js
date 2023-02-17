import {getStopTrans} from "../http/api";

class StopTransStore {
    #setStopTrans(stopTrans) {
        sessionStorage.setItem('StopTrans', JSON.stringify(stopTrans))
    }

    getStopTrans() {
        return sessionStorage.getItem('StopTrans') ?
            JSON.parse(sessionStorage.getItem('StopTrans')) : []
    }

    getStopTran(id) {
        const stopTrans = sessionStorage.getItem('StopTrans') ?
            JSON.parse(sessionStorage.getItem('StopTrans')) : []
        return stopTrans.find(stopTran => stopTran.stop_id === id)
    }

    updateStopTrans(shift_id) {
        return getStopTrans(shift_id).then(response => {
            this.#setStopTrans(response)
        }).catch(error => {
            console.log(error)
        })
    }

    getNewStopTrans(shift_id) {
        getStopTrans(shift_id).then(response => {
            this.#setStopTrans(response)
            return response
        }).catch(error => {
            console.log(error)
        })
        return []
    }
}

export default new StopTransStore()