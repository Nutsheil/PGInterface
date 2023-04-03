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

    updateStopTrans(shift_id, mach_no) {
        return getStopTrans(shift_id, mach_no).then(response => {
            this.#setStopTrans(response)
        }).catch(error => {
            console.log(error)
        })
    }

    needUpdate: false
}

export default new StopTransStore()