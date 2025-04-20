import { utilService } from "./util.service.js"
import { storageService } from "./async-storage.service.js"

const TOY_KEY = 'toyDB'
const PAGE_SIZE = 6
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
    createRandomToy,
    getDefaultFilter,
    getDefaultSort
}

function query(queryOptions = {}) {
    const {
        filterBy = {},
        sortBy = {},
        pagination = {}
    } = queryOptions || {}

    return storageService.query(TOY_KEY).then(toys => {
        let toysToReturn = [...toys]

        toysToReturn = _filterToys(toysToReturn, filterBy)
        toysToReturn = _sortToys(toysToReturn, sortBy)
        toysToReturn = _paginateToys(toysToReturn, pagination)

        return toysToReturn
    })
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

function getById(toyId) {
    return storageService.get(TOY_KEY, toyId)
}

function getEmptyToy() {
    return {
        name: '',
        price: 0,
        labels: [],
        inStock: null,
    }
}

function createRandomToy() {
    const randomNames = ['Zippy', 'WackyBot', 'DinoSmash', 'ColorCube', 'BuzzBlaster']
    const name = randomNames[utilService.getRandomIntInclusive(0, randomNames.length - 1)]
    const toy = _createToy(name)

    return save(toy)
}


function getDefaultFilter() {
    return {
        txt: '',
        inStock: null,
        labels: [],
    }
}

function getDefaultSort() {
    return {
        sortField: '',
        sortDir: 1
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

function _filterToys(toys, filterBy) {
    let filteredToys = [...toys]

    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        filteredToys = filteredToys.filter(toy => regex.test(toy.name))
    }

    if (typeof filterBy.inStock === 'boolean') {
        filteredToys = filteredToys.filter(toy => toy.inStock === filterBy.inStock)
    }

    if (Array.isArray(filterBy.labels) && filterBy.labels.length) {
        filteredToys = filteredToys.filter(toy =>
            filterBy.labels.every(label => toy?.labels?.includes(label))
        )
    }

    return filteredToys
}

function _sortToys(toys, sortBy) {
    const sortedToys = [...toys]
    const { sortField, sortDir } = sortBy

    if (sortDir !== 1 && sortDir !== -1) return sortedToys

    if (sortField === 'name') {
        sortedToys.sort((toy1, toy2) =>
            toy1.name.localeCompare(toy2.name) * sortDir
        )
    } else if (['price', 'createdAt'].includes(sortField)) {
        sortedToys.sort((toy1, toy2) =>
            (toy1[sortField] - toy2[sortField]) * sortDir
        )
    }

    return sortedToys
}

function _paginateToys(toys, pagination) {
    const pageIdx = pagination.pageIdx || 0
    const pageSize = pagination.pageSize || PAGE_SIZE
    const startIdx = pageIdx * pageSize

    return toys.slice(startIdx, startIdx + pageSize)
}
