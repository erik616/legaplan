'use client'

import { useContext, useState } from "react"
import { Button } from "../Button"
import { Card } from "../Card"
import { Modal } from "../Modal"
import styles from "./style.module.scss"
import { MyContext } from "@/app/context/context"

interface Props {
    show: boolean
    setShow: (t: boolean) => void
}

export function AddTask({ show, setShow }: Props) {
    const [task, setTask] = useState<string | undefined>(undefined)

    const { createTask } = useContext(MyContext)

    function handleModal() {
        setShow(false)
    }

    function handleCreate() {
        const id = new Date().getMilliseconds().toString()

        const data = { id, name: task, active: true }

        try {
            createTask(data)
        }
        catch (e) { }
        finally {
            setShow(false)
        }
    }

    if (!show) return
    return (
        <Modal>
            <Card floating>
                <form className={styles.formCreate}>
                    <h2>Nova tarefa</h2>

                    <div>
                        <label>Titulo</label>
                        <input placeholder="Digite" type="text" onChange={(e) => setTask(e.target.value)} />
                    </div>

                    <div className={styles.buttons}>
                        <Button type="default" text="Cancelar" action={handleModal} />
                        <Button type="primary" text="Adicionar" action={handleCreate} />
                    </div>
                </form>
            </Card>
        </Modal>
    )
}