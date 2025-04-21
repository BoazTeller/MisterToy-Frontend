import { Provider } from 'react-redux'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'

import './assets/style/main.css'

import { store } from './store/store'

import { AppHeader } from './cmps/AppHeader'
import { ToyIndex } from './pages/ToyIndex'
import { ToyDetails } from './pages/ToyDetails'
import { ToyEdit } from './pages/ToyEdit'

export function App() {
    return (
        <Provider store={store}>
            <Router>
                <section className="app main-layout">
                    <AppHeader />
                    
                    <main>
                        <Routes>
                            <Route path="/" element={<ToyIndex />} />
                            <Route path="/toy" element={<ToyIndex />} />
                            <Route path="/toy/:toyId" element={<ToyDetails />} />
                            <Route path="/toy/edit" element={<ToyEdit />} />
                            <Route path="/toy/edit/:toyId" element={<ToyEdit />} />
                        </Routes>
                    </main>
                </section>
            </Router>
        </Provider>
    )
}
