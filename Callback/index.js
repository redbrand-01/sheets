const json = require('../index')

module.exports.gettable = async (req, res) => {
    const dateNow = req.body.dateNow.split(".")
    const datePast = req.body.datePast.split(".")

    const result = await json.get('table')
    const result2 = await json.get('balance')

    const st = new Date(datePast[2], datePast[1], datePast[0]).getTime()
    const end = new Date(dateNow[2], dateNow[1], dateNow[0]).getTime()
    const tableResult = {
        label: result.label,
        cell: []
    }
    for(let i = 0; i < result.cell.length; i++) {
        const date = result.cell[i].startDate
        const split = date.split(".")

        const newDate = new Date(split[2], split[1], split[0]).getTime()

        if(newDate >= st && newDate <= end) {
            tableResult.cell.push(result.cell[i])
        }
    }

    res.status(200).json({table: tableResult, balance: result2})
}