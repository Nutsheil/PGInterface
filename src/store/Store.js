import StopMainsStore from "./StopMainsStore";
import StopPlacesStore from "./StopPlacesStore";
import StopReasonsStore from "./StopReasonsStore";
import StopCodesStore from "./StopCodesStore";
import StopTransStore from "./StopTransStore";
import stopCodesStore from "./StopCodesStore";

const updateStore = () => {
    const p1 = StopMainsStore.updateStopMains()
    const p2 = StopPlacesStore.updateStopPlaces()
    const p3 = StopReasonsStore.updateStopReasons()
    const p4 = StopCodesStore.updateStopCodes()
    return [p1, p2, p3, p4]
}

const filterStoreByMachine = (mach_no) => {
    const dataStopCodes = StopCodesStore.getStopCodes().filter(stopCode => stopCode.mach_no === mach_no || stopCode.mach_no === 999)

    const stopReasonsCodes = []
    const stopPlacesCodes = []
    dataStopCodes.forEach(stopCode => {
        if (!stopReasonsCodes.includes(stopCode.stop_reason))
            stopReasonsCodes.push(stopCode.stop_reason)

        if (!stopPlacesCodes.includes(stopCode.stop_place))
            stopPlacesCodes.push(stopCode.stop_place)
    })
    const dataStopReasons = StopReasonsStore.getStopReasons().filter(stopReason => stopReasonsCodes.includes(stopReason.stop_reason))
    const dataStopPlaces = StopPlacesStore.getStopPlaces().filter(stopPlace => stopPlacesCodes.includes(stopPlace.stop_place))

    const stopMainsCodes = []
    dataStopPlaces.forEach(stopPlace => {
        if (!stopMainsCodes.includes(stopPlace.stop_main))
            stopMainsCodes.push(stopPlace.stop_main)
    })
    const dataStopMains = StopMainsStore.getStopMains().filter(stopMain => stopMainsCodes.includes(stopMain.stop_main))

    console.log("C, R, P, M: ", dataStopCodes.length, dataStopReasons.length, dataStopPlaces.length, dataStopMains.length)

    StopCodesStore.setStopCodesMachine(dataStopCodes)
    StopReasonsStore.setStopReasonsMachine(dataStopReasons)
    StopPlacesStore.setStopPlacesMachine(dataStopPlaces)
    StopMainsStore.setStopMainsMachine(dataStopMains)
}

const store = {
    stopMains: StopMainsStore,
    stopPlaces: StopPlacesStore,
    stopReasons: StopReasonsStore,
    stopCodes: StopCodesStore,
    stopTrans: StopTransStore,
    machine: null,
    update: updateStore,
    filterStore: filterStoreByMachine
}

export default store