import { toyService } from "../../services/toy.service.local.js"

export const SET_TOYS = 'SET_TOYS'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'
export const REMOVE_TOY = 'REMOVE_TOY'
export const UNDO_TOY = 'UNDO_TOY'

export const SET_FILTER_BY = 'SET_FILTER_BY'
export const SET_SORT_BY = 'SET_SORT_BY'

const initialState = {
    toys: [],
    lastToys: null,
    filterBy: toyService.getDefaultFilter(),
    sortBy: toyService.getDefaultSort()
}

export function toyReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_TOYS:
            return { 
                ...state, 
                lastToys: state.toys,
                toys: action.toys 
            }

        case REMOVE_TOY:
            return {
                ...state,
                lastToys: state.toys,
                toys: state.toys.filter(toy => toy._id !== action.toyId)
            }

        case ADD_TOY:
            return {
                ...state,
                lastToys: state.toys,
                toys: [...state.toys, action.toy]
            }

        case UPDATE_TOY:
            return {
                ...state,
                lastToys: state.toys,
                toys: state.toys.map(toy =>
                    toy._id === action.toy._id ? action.toy : toy
                )
            }

        case UNDO_TOY:
            return {
                ...state,
                toys: state.lastToys
            }

        case SET_FILTER_BY:
            return {
                ...state,
                filterBy: { ...state.filterBy, ...action.filterBy } 
            }

        case SET_SORT_BY:
            return {
                ...state,
                sortBy: { ...state.sortBy, ...action.sortBy } 
            }

        default:
            return state
    }
}
