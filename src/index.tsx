import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {Header} from "./components/header/Header.tsx";
import {Footer} from "./components/footer/Footer.tsx";
import Button from "./components/button/Button.tsx";
import ProductCard from "./components/productCard/ProductCard.tsx";


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
            <div className='product_Card_Container'>
                <div>
                    <ProductCard title={'English'}
                                 description={'Для тех людей, кто всегда мечтал, однако не имел такой ' +
                                     'возможности раньше изучать иностранный язык, в частности английский, был разработан специальный ' +
                                     'цикл занятий по особенной программе. Это не что иное, как курсы английского языка для начинающих, ' +
                                     'то есть с нуля.'}
                                 image={'https://elitestudent.ru/wp-content/uploads/2023/06/self-study.png'} price={0}/>
                </div>
                <div>
                    <ProductCard title={'English'}
                                 description={'Для тех людей, кто всегда мечтал, однако не имел такой ' +
                                     'возможности раньше изучать иностранный язык, в частности английский, был разработан специальный ' +
                                     'цикл занятий по особенной программе. Это не что иное, как курсы английского языка для начинающих, ' +
                                     'то есть с нуля.'}
                                 image={'https://elitestudent.ru/wp-content/uploads/2023/06/self-study.png'} price={0}/>
                </div>
                <div>
                    <ProductCard title={'English'}
                                 description={'Для тех людей, кто всегда мечтал, однако не имел такой ' +
                                     'возможности раньше изучать иностранный язык, в частности английский, был разработан специальный ' +
                                     'цикл занятий по особенной программе. Это не что иное, как курсы английского языка для начинающих, ' +
                                     'то есть с нуля.'}
                                 image={'https://elitestudent.ru/wp-content/uploads/2023/06/self-study.png'} price={0}/>
                </div>
            </div>
        </main>
        <Footer/>
    </StrictMode>,
)
