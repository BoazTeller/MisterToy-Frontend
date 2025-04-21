import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toyService } from '../services/toy.service.local.js'

export function ToyDetails() {
    const [toy, setToy] = useState(null)

    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        toyService.getById(toyId)
            .then(setToy)
            .catch(err => {
                console.error('ToyDetails → Cannot load toy', err)
                navigate('/toy')
            })
    }, [toyId])

    if (!toy) return <div>Loading...</div>

    return (
        <section className="toy-details">
            <h2>Toy Details</h2>

            <pre>{JSON.stringify(toy, null, 4)}</pre>
        </section>
    )
}