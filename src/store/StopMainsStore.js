import {getStopMains} from "../http/api";

class StopMainsStore {
    #setStopMains(stopMains) {
        sessionStorage.setItem('StopMains', JSON.stringify(stopMains))
    }

    getStopMains() {
        return sessionStorage.getItem('StopMains') ?
            JSON.parse(sessionStorage.getItem('StopMains')) : []
    }

    updateStopMains() {
        return getStopMains().then(response => {
            this.#setStopMains(response)
        }).catch(error => {
            console.log(error)
        })
    }
}

export default new StopMainsStore()