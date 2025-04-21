import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toyService } from '../services/toy.service.local.js'
import { saveToy } from '../store/actions/toy.actions.js'

export function ToyEdit() {
    const [toy, setToy] = useState(toyService.getEmptyToy())
    
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (!toyId) return

        toyService.getById(toyId)
            .then(setToy)
            .catch(err => {
                console.error('ToyEdit → Cannot load toy', err)
                navigate('/toy')
            })
    }, [toyId])

    function handleChange({ target }) {
        const { name, value, type, checked } = target
        const val = type === 'checkbox' ? checked : type === 'number' ? +value : value
        setToy(prevToy => ({ ...prevToy, [name]: val }))
    }

    function onSubmit(ev) {
        ev.preventDefault()

        saveToy(toy)
            .then(() => {
                navigate('/toy')}
            )
    }

    return (
        <section className="toy-edit">
            <h2>{toyId ? 'Edit Toy' : 'Add Toy'}</h2>

            <form onSubmit={onSubmit}>
                <label>Name:
                    <input type="text" name="name" value={toy.name} onChange={handleChange} required />
                </label>

                <label>Price:
                    <input type="number" name="price" value={toy.price} onChange={handleChange} required />
                </label>

                <label>In Stock:
                    <input type="checkbox" name="inStock" checked={toy.inStock || false} onChange={handleChange} />
                </label>

                <button>Save</button>
            </form>
        </section>
    )
}
