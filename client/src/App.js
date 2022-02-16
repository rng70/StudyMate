import './App.css';
import { Fragment } from 'react';
import { Navbar, Landing, Login, Register } from './components/index';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


const App = () => (
    <BrowserRouter>
        <Fragment>
            <Navbar />
            <section>
                <Routes>
                    <Route path='/' element={<Landing/>} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/login" element={<Login/>}/>
                </Routes>
            </section>
        </Fragment>
    </BrowserRouter>
);

export default App;
