import './index.less'
import { SwiperDomo } from '../SwiderDomo'
import {titleList} from '../../Array.tsx'
export function SwiperDomoList() {
    return (
        <div className="swiper-domo-list">
            {
                titleList.map((title,index) => (
                    <SwiperDomo title={title} key={index} number={index}></SwiperDomo>
                ))
            }
       </div>
    )
}
