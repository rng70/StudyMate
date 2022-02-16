import './App.css';
import store from './store';
import { Provider } from 'react-redux';
import { loadUser } from './actions/auth';
import { Fragment, useEffect } from 'react';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import { Navbar, Landing } from './components';
import setAuthToken from './utils/setAuthToken';
import Register from './components/auth/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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
