import { LIST_NAVBAR } from '@/constants/listNavbar'
import styles from '@/style'
import EachUtils from '@/utils/EachUtils'
import React from 'react'

const Navbar = () => {
    return (
        <header className="w-full py-5">
            <nav className={`w-full h-full ${styles.flexBetween}`}>
                <a href="/">
                    <img src="/logo2.png" alt="" className="w-30" />
                </a>

                <ul className={`w-[40%] h-full text-gray-700 ${styles.flexBetween}`}>
                    <EachUtils
                        of={LIST_NAVBAR}
                        render={(item, index) => (
                            <li key={index}>
                                <a href={item.url}>
                                    {item.title}
                                </a>
                            </li>
                        )}
                    />
                </ul>
            </nav>
        </header>
    )
}

export default Navbar