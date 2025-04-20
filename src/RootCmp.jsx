import { Provider } from 'react-redux'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'

import './assets/style/main.css'

import { store } from './store/store'

import { AppHeader } from './cmps/AppHeader'
import { ToyIndex } from './pages/ToyIndex'

export function App() {
    return (
        <Provider store={store}>
            <Router>
                <section className="app main-layout">
                    <AppHeader />
                    <main>
                        <Routes>
                            <Route path="/" element={<ToyIndex />} />
                        </Routes>
                    </main>
                </section>
            </Router>
        </Provider>
    )
}
