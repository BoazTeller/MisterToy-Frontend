import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadToys } from '../store/actions/toy.actions.js'

export function ToyIndex() {
    const toys = useSelector(storeState => storeState.toyModule.toys)

    useEffect(() => {
        loadToys()
    }, [])

    if (!toys.length) return <div>Loading toys...</div>

    return (
        <section className="toy-index">
            <h2>Toy List</h2>
            
            <ul>
                {toys.map(toy => (
                    <li key={toy._id}>
                        {toy.name} - ${toy.price}
                    </li>
                ))}
            </ul>
        </section>
    )
}
