const tableNames = [
    {id: 1, name: "Стопы"},
    {id: 2, name: "Ордер"},
    {id: 3, name: "Простои"},
    {id: 4, name: "Артикул"}
]

const getTableName = (id) => {
    let name = "UNKNOWN"
    tableNames.map(t => {
        if (t.id === id)
            name = t.name
    })
    return name
}

export {getTableName}