import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {Header} from "./components/header/Header.tsx";
import {Footer} from "./components/footer/Footer.tsx";
import Button from "./components/button/Button.tsx";



createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Header/>
        <main>
            <div className='buttons_container'>
                <div>
                <Button label={'login'} onClick={function(): void {
                        throw new Error('Function not implemented.');
                    } } />
                </div>
                <div>
                    <Button label={'registration'} onClick={function(): void {
                        throw new Error('Function not implemented.');
                    } } />
                </div>
            </div>
            <p>Main content goes here...</p>
        </main>
        <Footer/>
    </StrictMode>,
)
