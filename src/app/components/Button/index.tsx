import styles from "./button.module.scss"

interface Props {
    text: string
    type: Button
    action?: () => void
}

type Button = "default" | "primary" | "secondary"

export function Button({text, type, action}: Props){
    return (
        <button type="button" className={`${styles[type]} ${styles.button}`} onClick={action}>{text}</button>
    )
}