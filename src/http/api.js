import {$host} from "./index";

export const getStopTrans = async (shift_id) => {
    const {data} = await $host.get(`/api/v1/stop-trans-full/${shift_id}/`)
    console.log("get all StopTrans")
    console.log(data)
    return data
}

export const getStopTran = async (id) => {
    const {data} = await $host.get(`/api/v1/stop-trans-full/${id}/`)
    console.log("get StopTran id: ", id)
    console.log(data)
    return data
}

export const getStopCodes = async () => {
    const {data} = await $host.get(`/api/v1/stop-code/`)
    console.log("get all StopCodes")
    console.log(data)
    return data
}

export const getStopCode = async (id) => {
    const {data} = await $host.get(`/api/v1/stop-code/${id}/`)
    console.log("get StopCode id: ", id)
    console.log(data)
    return data
}

export const getMachines = async () => {
    const {data} = await $host.get(`/api/v1/machines/`)
    console.log("get all Machines")
    console.log(data)
    return data
}

export const getMachine = async (id) => {
    const {data} = await $host.get(`/api/v1/machines/${id}/`)
    console.log("get Machine id: ", id)
    console.log(data)
    return data
}

export const getShiftCodes = async (mach_no, count=50) => {
    const {data} = await $host.get(`/api/v1/shift-codes/${mach_no}/${count}/`)
    console.log("get last ", count, " shift codes on machine ", mach_no)
    console.log(data)
    return data
}

export const getStopMains = async () => {
    const {data} = await $host.get(`/api/v1/stop-main/`)
    console.log("get all StopMains")
    console.log(data)
    return data
}

export const getStopMain = async (id) => {
    const {data} = await $host.get(`/api/v1/stop-main/${id}/`)
    console.log("get StopMain id: ", id)
    console.log(data)
    return data
}

export const getStopPlaces = async () => {
    const {data} = await $host.get(`/api/v1/stop-place/`)
    console.log("get all StopPlaces")
    console.log(data)
    return data
}

export const getStopPlace = async (id) => {
    const {data} = await $host.get(`/api/v1/stop-place/${id}/`)
    console.log("get StopPlace id: ", id)
    console.log(data)
    return data
}

export const getStopReasons = async () => {
    const {data} = await $host.get(`/api/v1/stop-reason/`)
    console.log("get all StopReasons")
    console.log(data)
    return data
}

export const getStopReason = async (id) => {
    const {data} = await $host.get(`/api/v1/stop-reason/${id}/`)
    console.log("get StopReason id: ", id)
    console.log(data)
    return data
}