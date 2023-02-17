import {getStopCodes} from "../http/api";

class StopCodesStore {
    #setStopCodes(stopCodes) {
        sessionStorage.setItem('StopCodes', JSON.stringify(stopCodes))
    }

    getStopCodes() {
        return sessionStorage.getItem('StopCodes') ?
            JSON.parse(sessionStorage.getItem('StopCodes')) : []
    }

    updateStopCodes() {
        return getStopCodes().then(response => {
            this.#setStopCodes(response)
        }).catch(error => {
            console.log(error)
        })
    }
}

export default new StopCodesStore()