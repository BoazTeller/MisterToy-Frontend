import { store } from '../store.js'
import { toyService } from '../../services/toy.service.local.js'

import {
    SET_TOYS,
    ADD_TOY,
    UPDATE_TOY,
    REMOVE_TOY,
    UNDO_TOY,
    SET_FILTER_BY,
    SET_SORT_BY,
} from '../reducers/toy.reducer.js'

export function loadToys(pageIdx) {
    const { filterBy, sortBy } = store.getState().toyModule

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

export function removeToyOptimistic(toyId) {
    store.dispatch({ type: REMOVE_TOY, toyId })

    return toyService.remove(toyId)
        .catch(err => {
            store.dispatch({ type: UNDO_TOY })
            console.error('ToyActions → Optimistic remove failed', err)
            throw err
        }   
    )
}

export function setFilter(filterBy = toyService.getDefaultFilter()) {
    store.dispatch({ type: SET_FILTER_BY, filterBy })
}

export function setSort(sortBy = toyService.getDefaultSort()) {
    store.dispatch({ type: SET_SORT_BY, sortBy })
}
