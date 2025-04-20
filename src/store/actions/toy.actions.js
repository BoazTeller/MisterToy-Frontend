import { toyService } from '../../services/toy.service.local.js'

import {
    SET_TOYS,
    ADD_TOY,
    UPDATE_TOY,
    REMOVE_TOY,
    UNDO_TOY
} from '../reducers/toy.reducer.js'

export function loadToys(pageIdx) {
    return toyService.query({ filterBy, sortBy, pagination: { pageIdx } })
        .then(toys => {
            store.dispatch({ type: SET_TOYS, toys })
        })
        .catch(err => {
            console.error('ToyActions → Cannot load toys', err)
            throw err
        })
}

export function saveToy(toy) {
    const type = toy._id ? UPDATE_TOY : ADD_TOY

    return toyService.save(toy)
        .then(savedToy => {
            store.dispatch({ type, toy: savedToy })
            return savedToy
        })
        .catch(err => {
            console.error('ToyActions → Cannot save toy', err)
            throw err
        })
}

export function removeToy(toyId) {
    return toyService.remove(toyId)
        .then(() => {
            store.dispatch({ type: REMOVE_TOY, toyId })
        })
        .catch(err => {
            console.error('ToyActions → Cannot remove toy', err)
            throw err
        })
}