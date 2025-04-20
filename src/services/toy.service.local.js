import { utilService } from "./util.service.js"
import { storageService } from "./async-storage.service.js"

const TOY_KEY = 'toyDB'
const gLabels = [
    'On wheels',
    'Box game',
    'Art',
    'Baby',
    'Doll',
    'Puzzle',
    'Outdoor',
    'Battery Powered',
]

_createToys()

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
}

function query() {
    return storageService.query(TOY_KEY)
}

function getById(toyId) {
    return storageService.get(TOY_KEY, toyId)
}

function remove(toyId) {
    return storageService.remove(TOY_KEY, toyId)
}

function save(toy) {
    if (toy._id) {
        return storageService.put(TOY_KEY, toy)
    } else {
        toy._id = utilService.makeId()
        toy.createdAt = Date.now()
        toy.inStock = true

        return storageService.post(TOY_KEY, toy)
    }
}

function getEmptyToy() {
    return {
        name: '',
        price: 0,
        labels: [],
        inStock: null,
    }
}

// === Internal helper functions ===

function _createToys() {
    let toys = utilService.loadFromStorage(TOY_KEY)

    if (!toys || !toys.length) {
        toys = [
            _createToy('Bobo'),
            _createToy('Popo'),
            _createToy('Lala'),
            _createToy('Iron man'),
            _createToy('Superman'),
        ]

        utilService.saveToStorage(TOY_KEY, toys)
    }
}

function _createToy(name = '') {
    const toy = getEmptyToy()

    toy.name = name
    toy._id = utilService.makeId()
    toy.price = utilService.getRandomIntInclusive(20, 150)
    toy.createdAt = Date.now()
    toy.inStock = Math.random() > 0.3
    toy.labels = _getRandomLabels()

    return toy
}

function _getRandomLabels() {
    const labels = [...gLabels]
    const randomLabels = []

    while (randomLabels.length < 3 && labels.length) {
        const idx = utilService.getRandomIntInclusive(0, labels.length - 1)
        randomLabels.push(labels.splice(idx, 1)[0])
    }

    return randomLabels
}
