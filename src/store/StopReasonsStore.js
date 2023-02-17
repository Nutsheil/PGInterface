import {getStopReasons} from "../http/api";

class StopReasonsStore {
    #setStopReasons(stopReasons) {
        sessionStorage.setItem('StopReasons', JSON.stringify(stopReasons))
    }

    getStopReasons() {
        return sessionStorage.getItem('StopReasons') ?
            JSON.parse(sessionStorage.getItem('StopReasons')) : []
    }

    updateStopReasons() {
        return getStopReasons().then(response => {
            this.#setStopReasons(response)
        }).catch(error => {
            console.log(error)
        })
    }
}

export default new StopReasonsStore()