import {getStopPlaces} from "../http/api";

class StopPlacesStore {
    #setStopPlaces(stopPlaces) {
        sessionStorage.setItem('StopPlaces', JSON.stringify(stopPlaces))
    }

    getStopPlaces() {
        return sessionStorage.getItem('StopPlaces') ?
            JSON.parse(sessionStorage.getItem('StopPlaces')) : []
    }

    updateStopPlaces() {
        return getStopPlaces().then(response => {
            this.#setStopPlaces(response)
        }).catch(error => {
            console.log(error)
        })
    }
}

export default new StopPlacesStore()