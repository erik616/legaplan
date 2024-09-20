import Image from "next/image"
import trash from "@/app/assets/img/trash.svg"
import styles from "./task.module.scss"
import { useContext, useState } from "react"
import { MyContext } from "@/app/context/context"

interface Props {
    active: boolean
    name: string
    id: string
    delet: () => void
}

export function Task({ active, name, delet, id }: Props) {
    const [state, setState] = useState(active)
    const { updateTask } = useContext(MyContext)

    const handleValue = () => {
        updateTask(id)
        setState(prev => !prev)
    }

    return (
        <div className={styles.container}>
            <label className={styles.check}>
                <input type="checkbox" name="task" checked={!state} onChange={handleValue} />
                <span className={styles.title}>{name}</span>
                <span className={styles.checkbox}></span>
            </label>

            <Image alt="deletar" src={trash} width={24} height={24} onClick={delet} />

        </div>
    )
}