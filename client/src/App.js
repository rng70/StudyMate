import './App.css';
import { Fragment, useEffect } from 'react';
import { Navbar, Landing, Login } from './components';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import { setAuthToken } from './utils/setAuthToken';

if (localStorage.token) {
        setAuthToken(localStorage.token);
}

const App = () => {
    useEffect(() => {
        store.dispatch(loadUser);
    }, []);

    return (
        <Provider store={store}>
            <BrowserRouter>
                <Fragment>
                    <Navbar />
                    <section>
                        <Alert />
                        <Routes>
                            <Route path='/' element={<Landing />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/login" element={<Login />} />
                        </Routes>
                    </section>
                </Fragment>
            </BrowserRouter>
        </Provider>
    )
};

export default App;
