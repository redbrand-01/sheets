const { GoogleSpreadsheet } = require('google-spreadsheet')
const creds = require('../db/keys.json')
const methodJson = require('../db/method/json')

const setting = require('../Setting')

module.exports.run = (filePath) => {
    const table = async () => {
        const trade = { 
            label: 
                [
                    {
                        title: 'Trade №', index: "trade"
                    },
                    {
                        title: 'Pair', index: "pair"
                    }, 
                    {
                        title: 'Start Date', index: "startDate"
                    }, 
                    {
                        title: 'End Date', index: "endDate"
                    }, 
                    {
                        title: 'Duration (Hours)', index: "dur"
                    },
                    {
                        title: 'Safeties', index: "safeties"
                    },
                    {
                        title: 'Profit, USDT', index: "profit"
                    },
                    {
                        title: 'Accumulated profit, Total', index: "total"
                    }, 
                ],
                cell: []
            }
        const doc = new GoogleSpreadsheet('1_GL0JplVqC4M4DLtd3A1BhQtAvoH0rscxQcdD6ezylQ');

        await doc.useServiceAccountAuth({
            client_email: creds.client_email,
            private_key: creds.private_key,
        });

        await doc.loadInfo()
        
        const sheet = doc.sheetsByIndex[0]
        const tableRow = await sheet.getRows()

        tableRow.forEach(v => {
            const cell = {
                trade: v['Trade №'],
                pair: v['Pair'],
                startDate: v['Start Date'],
                endDate: v['End Date'],
                dur: v['Duration (Hours)'],
                safeties: v['Safeties'],
                profit: v['Profit, USDT'],
                total: v['Accumulated profit, Total'],
            }
            trade.cell.push(cell)
        })
        const balance = {
            start: tableRow[0]["Start balance"],
            current: tableRow[0]["Current balance"]
        }
          
        await methodJson.set(filePath + `/db/table.json`, JSON.stringify(trade))
        await methodJson.set(filePath + `/db/balance.json`, JSON.stringify(balance))
    }

    table()
    setInterval(() => {
        table()
    }, setting.dateUpdate)
}
