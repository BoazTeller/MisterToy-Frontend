export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    getRandomColor,
    padNum,
    getDayName,
    getMonthName,
    getFormattedDate,
    getNewSortDir,
    getTruthyValues,
    convertStrToNullableBool,
    loadFromStorage,
    saveToStorage
}

function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}

function loadFromStorage(key) {
    const val = localStorage.getItem(key)
    return JSON.parse(val)
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}

function padNum(num) {
    return (num > 9) ? num + '' : '0' + num
}

function getRandomColor() {
    const letters = '0123456789ABCDEF'
    var color = '#'
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

function getDayName(date, locale) {
    date = new Date(date)
    return date.toLocaleDateString(locale, { weekday: 'long' })
}


function getMonthName(date) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]
    return monthNames[date.getMonth()]
}

function getFormattedDate(timeStamp) {
    const sentDate = new Date(timeStamp)
    const now = new Date()
    const twentyFourHoursAgo  = new Date(now.getTime() - 86400000)

    if (sentDate > twentyFourHoursAgo) {
        return sentDate.getHours().toString().padStart(2, '0') + 
               ':' + 
               sentDate.getMinutes().toString().padStart(2, '0')
    }

    if (sentDate.getFullYear() >= now.getFullYear()) {
        return sentDate.getDate() + ' ' + 
               sentDate.toLocaleString('default', { month: 'short' })
    }

    return sentDate.toLocaleDateString('en-IL')
}

function getNewSortDir(currDir) {
    if (currDir === 1) {
        return -1
    } else if (currDir === -1) {
        return null
    } else {
        return 1
    }
}

function getTruthyValues(obj) {
    return Object.keys(obj).reduce((acc, key) => {
        const value = obj[key]
        if (value || value === 0) {
            acc[key] = value
        }
        return acc
    }, {})
}

function convertStrToNullableBool(str) {
    return str === 'true' 
        ? true 
        : str === 'false' 
            ? false 
            : null
}