import styles from '@/style'
import React from 'react'

const SectionLayout = ({ size ,bgColor, title, style , children }) => {
    return (
        <section className={`w-full ${size} flex flex-col justify-between ${styles.padding} ${bgColor}`}>
            <h3 className="text-5xl font-medium text-center mb-12">{title}</h3>
            <div className={`${style}`}>
                {children}
            </div>
        </section>
    )
}

export default SectionLayout