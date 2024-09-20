'use client'

import styles from "./modal.module.scss"

interface Props {
    children: React.ReactNode
}

export function Modal({ children }: Props) {

    return (
        <div className={styles.modal}>
            {children}
        </div>
    )
}