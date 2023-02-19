import {getStopReasons} from "../http/api";

class StopReasonsStore {
    setStopReasons(stopReasons) {
        sessionStorage.setItem('StopReasons', JSON.stringify(stopReasons))
    }
    setStopReasonsMachine(stopReasons) {
        sessionStorage.setItem('StopReasonsMachine', JSON.stringify(stopReasons))
    }

    getStopReasons() {
        return sessionStorage.getItem('StopReasons') ?
            JSON.parse(sessionStorage.getItem('StopReasons')) : []
    }
    getStopReasonsMachine() {
        return sessionStorage.getItem('StopReasonsMachine') ?
            JSON.parse(sessionStorage.getItem('StopReasonsMachine')) : []
    }

    updateStopReasons() {
        return getStopReasons().then(response => {
            this.setStopReasons(response)
        }).catch(error => {
            console.log(error)
        })
    }
}

export default new StopReasonsStore()