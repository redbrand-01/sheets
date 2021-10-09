const fs = require('fs')

module.exports.get = async (__dirname) => { 
    const result = await fs.readFileSync(__dirname, {encoding: 'utf-8'});
    return JSON.parse(result)
}

module.exports.set = async (__dirname, tableResult, file) => { 
    await fs.writeFileSync(__dirname, tableResult, {encoding: 'utf-8'});
    console.log("Данные таблицы обновлены")
    return true
}