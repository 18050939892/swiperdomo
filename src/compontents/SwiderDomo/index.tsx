import './index.less'
import { useRef } from 'react'
import { Left, State } from '../../jotal/store.tsx'
import { useAtom } from 'jotai'

interface prop {
    title: string,
    number: number
}


export function SwiperDomo(props: prop) {
    const {title, number} = props
    const SlideList = ['Slide1', 'Slide2', 'Slide3', 'Slide4', 'Slide5', 'Slide6', 'Slide7', 'Slide8', 'Slide9']
    const mousePosition = useRef([0, 0, 0])
    const [state, setState] = useAtom(State)
    const [left, setLeft] = useAtom(Left)
    
    function  enter(event: { clientY: number; clientX: number }):void {
        mousePosition.current[2] = mousePosition.current[1] + ((title == 'Vertical' ? event.clientY : event.clientX) - mousePosition.current[0])
        setLeft(prev => {
            const s = [...prev]
            s[number] = mousePosition.current[2]
            return s
        })
    }
    
    function leave() {
        window.removeEventListener('mousemove', enter)
        const c = Math.round(parseFloat(String(mousePosition.current[2])) / (title == 'Vertical' ? 500 : title == 'Slides per view' ? 280 : 800))
        setLeft(prev => {
                const s = [...prev]
                s[number] = c > 0 ? 0 : (c < -8 ? (-8 * (title == 'Vertical' ? 500 : title == 'Slides per view' ? 280 : (title == 'Space between' ? 820 : 800))) : (c * (title == 'Vertical' ? 500 : title == 'Slides per view' ? 280 : (title == 'Space between' ? 820 : 800))))
                return s
            }
        )
        setState('1s left')
        
    }
    return (
        <div className="swipwer-domo" id={number.toString()}>
            <h1>{title}</h1>
            <div
                className="swiper-container"
            >
                <div
                    className="swiper-container-top" style={{
                    display: title == 'Pagination progress' ? 'block' : 'none',
                }}
                >
                    <div className="top-one" style={{width: (Math.abs(left[number] / 800) + 1) / 9 * 800 + 'px'}}></div>
                    <div
                        className="top-two" style={{
                        width: 800 - (Math.abs(left[number] / 800) + 1) / 9 * 800 + 'px',
                    }}
                    ></div>
                </div>
                
                <svg
                    // t="1744209942982"
                    className="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="14800" width="200" height="200"
                    onClick={() => {
                        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                        left[number] != 0 ? setLeft(prev => {
                            const s = [...prev]
                            s[number] += 800
                            return s
                        }) : ''
                    }}
                    style={{
                        display: title == 'Navigation' || title == 'Pagination progress' || title == 'Pagination fraction' ? 'block' : 'none',
                    }}
                >
                    <path
                        d="M729.6 931.2l-416-425.6 416-416c9.6-9.6 9.6-25.6 0-35.2-9.6-9.6-25.6-9.6-35.2 0l-432 435.2c-9.6 9.6-9.6 25.6 0 35.2l432 441.6c9.6 9.6 25.6 9.6 35.2 0C739.2 956.8 739.2 940.8 729.6 931.2z"
                        p-id="14801"
                    ></path>
                </svg>
                
                <ul
                    style={{
                        left: title != 'Vertical' ? left[number] + 'px' : 0,
                        top: title == 'Vertical' ? left[number] + 'px' : 0,
                        transition: state
                    }}
                    onMouseDown={(event) => {
                        setState('')
                        mousePosition.current[0] = (title != 'Vertical' ? event.clientX : event.clientY)
                        mousePosition.current[1] = left[number]
                        window.addEventListener('mousemove', enter)
                        window.addEventListener('mouseup', leave)
                    }}
                >
                    
                    {SlideList.map((item, index) => {
                        return <li
                            key={index}
                            className={title == 'Vertical' ? 'vertical-main' : (title == 'Slides per view' ? 'slides-per-view-main' : (title == 'Space between' ? 'space-between-main' : ''))}
                        >{item}</li>
                    })}
                
                </ul>
                <div
                    className="swiper-container-bottom-number" style={{
                    display: title == 'Pagination fraction' ? 'block' : 'none',
                }}
                >{(Math.round(Math.abs(left[number] / 800)) + 1)}/9
                </div>
                <div
                    className={`swiper-container-bottom-circle ${title == 'Pagination dynamic' ? 'pagination-dynamic-f' :
                        title == 'Vertical' ? 'vertical-f' : title == 'Pagination custom' ? 'pagination-custom-f' : ''} `}
                    style={{
                        display: title == 'Pagination' || title == 'Space between' || title == 'Slides per view' ? 'block' : 'none',
                    }}
                >
                    {
                        SlideList.map((_item, index) => {
                            return <div
                                className={
                                    `${(index == Math.abs(left[number] / (title == 'Vertical' ? 500 : title == 'Slides per view' ? 280 : (title == 'Space between' ? 820 : 800))) ? (title == 'Pagination custom' ? 'buttom-circle check-circle pagination-custom-n' : 'buttom-circle check-circle') : (title == 'Pagination custom' ? 'buttom-circle pagination-custom-n' : 'buttom-circle'))}`
                                }
                                style={{
                                    display: title == 'Pagination dynamic' ? (index <= (Math.abs(left[number] / 800) + 2) && index >= (Math.abs(left[number] / 800) - 2) ? 'block' : 'none') : ''
                                }}
                                key={index}
                            >{title == 'Pagination custom' && (index + 1)}</div>
                        })
                    }
                </div>
                <svg
                    // t="1744209604715"
                    className="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="12149" width="200" height="200"
                    onClick={() => {
                        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                        left[number] >= -5600 ? setLeft(prev => {
                            const s = [...prev]
                            s[number] -= 800
                            return s
                        }) : ''
                    }}
                    style={{
                        display: title == 'Navigation' || title == 'Pagination progress' || title == 'Pagination fraction' ? 'block' : 'none',
                    }}
                >
                    <path
                        d="M761.6 489.6l-432-435.2c-9.6-9.6-25.6-9.6-35.2 0-9.6 9.6-9.6 25.6 0 35.2l416 416-416 425.6c-9.6 9.6-9.6 25.6 0 35.2s25.6 9.6 35.2 0l432-441.6C771.2 515.2 771.2 499.2 761.6 489.6z"
                        p-id="12150"
                    
                    
                    ></path>
                </svg>
                <div
                    className="swiper-container-bottom" style={{
                    display: title == 'Scrollbar' ? 'block' : 'none',
                }}
                >
                    <div
                        style={{width: 800 / 9 + 'px', marginLeft: (Math.abs(left[number] / 800)) / 9 * 800 + 'px'}}
                    ></div>
                </div>
            </div>
        </div>
    )
}
