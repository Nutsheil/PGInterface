const applyFilterMachine = (data, filter) => {
    if (filter === 0)
        return data

    return data.filter((v) => v.mach_no.mach_no === filter)
}

const applyFilterShift = (data, filter) => {

}

const applyFilters = (data, filters) => {
    let filteredData = []
    filteredData = applyFilterMachine(data, filters.machine.filter)
    return filteredData
}

export {applyFilters}