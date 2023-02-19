import {getStopCodes} from "../http/api";

class StopCodesStore {
    setStopCodes(stopCodes) {
        sessionStorage.setItem('StopCodes', JSON.stringify(stopCodes))
    }
    setStopCodesMachine(stopCodes) {
        sessionStorage.setItem('StopCodesMachine', JSON.stringify(stopCodes))
    }

    getStopCodes() {
        return sessionStorage.getItem('StopCodes') ?
            JSON.parse(sessionStorage.getItem('StopCodes')) : []
    }
    getStopCodesMachine() {
        return sessionStorage.getItem('StopCodesMachine') ?
            JSON.parse(sessionStorage.getItem('StopCodesMachine')) : []
    }

    updateStopCodes() {
        return getStopCodes().then(response => {
            this.setStopCodes(response)
        }).catch(error => {
            console.log(error)
        })
    }
}

export default new StopCodesStore()