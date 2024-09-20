'use client'

import styles from "./card.module.scss"

interface Props {
    children: React.ReactNode
    floating?: boolean
}

export function Card({ children, floating }: Props) {
    return (
        <div className={`${floating ? styles.shadow : null} ${styles.card}`}>
            {children}
        </div>
    )
}