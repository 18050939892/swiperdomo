import './index.less'
import {titleList} from '../../Array.tsx'

export function SwiperList() {

    return (
        <div className="swiper-list">
            <ul>
                {titleList.map((title,index) => (
                    <li key={index}><a href={`#${index}`} onClick={(event)=>{
                        const a:HTMLElement= event.currentTarget.parentElement as HTMLElement
                        const b:HTMLElement =   a.parentElement as HTMLElement
                        b.querySelectorAll('a').forEach((element:HTMLElement) => {
                            element.classList.remove('check')
                        })
                        event.currentTarget.classList.toggle('check')
                    }} className={title=='Default'?'check':''}>{title}</a></li>
                ))}
            </ul>
        </div>
    )
}
