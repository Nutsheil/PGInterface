import StopMainsStore from "./StopMainsStore";
import StopPlacesStore from "./StopPlacesStore";
import StopReasonsStore from "./StopReasonsStore";
import StopCodesStore from "./StopCodesStore";
import StopTransStore from "./StopTransStore";

const updateStore = () => {
    const p1 = StopMainsStore.updateStopMains()
    const p2 = StopPlacesStore.updateStopPlaces()
    const p3 = StopReasonsStore.updateStopReasons()
    const p4 = StopCodesStore.updateStopCodes()
    return [p1, p2, p3, p4]
}

const store = {
    stopMains: StopMainsStore,
    stopPlaces: StopPlacesStore,
    stopReasons: StopReasonsStore,
    stopCodes: StopCodesStore,
    stopTrans: StopTransStore,
    update: updateStore()
}

export default store