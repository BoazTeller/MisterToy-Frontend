
import { toyService } from '../../services/toy.service.local.js'
import { store } from '../store.js'
import { SET_TOYS, REMOVE_TOY, UPDATE_TOY, ADD_TOY } from '../reducers/toy.reducer.js'

export function loadToys() {
    return toyService.query()
        .then(toys => {
            store.dispatch({ type: SET_TOYS, toys })
        })
        .catch(err => {
            console.error('Cannot load toys:', err)
            throw err
        })
}

export function removeToy(toyId) {
    return toyService.remove(toyId)
        .then(() => {
            store.dispatch({ type: REMOVE_TOY, toyId })
        })
        .catch(err => {
            console.error('Cannot remove toy:', err)
            throw err
        })
}

export function saveToy(toy) {
    const type = toy._id ? UPDATE_TOY : ADD_TOY

    return toyService.save(toy)
        .then(saveToy => {
            store.dispatch({ type, toy: saveToy })
        })
        .catch(err => {
            console.error('Cannot save toy:', err)
            throw eww
        })
}