import {getStopPlaces} from "../http/api";

class StopPlacesStore {
    setStopPlaces(stopPlaces) {
        sessionStorage.setItem('StopPlaces', JSON.stringify(stopPlaces))
    }
    setStopPlacesMachine(stopPlaces) {
        sessionStorage.setItem('StopPlacesMachine', JSON.stringify(stopPlaces))
    }

    getStopPlaces() {
        return sessionStorage.getItem('StopPlaces') ?
            JSON.parse(sessionStorage.getItem('StopPlaces')) : []
    }
    getStopPlacesMachine() {
        return sessionStorage.getItem('StopPlacesMachine') ?
            JSON.parse(sessionStorage.getItem('StopPlacesMachine')) : []
    }

    updateStopPlaces() {
        return getStopPlaces().then(response => {
            this.setStopPlaces(response)
        }).catch(error => {
            console.log(error)
        })
    }
}

export default new StopPlacesStore()