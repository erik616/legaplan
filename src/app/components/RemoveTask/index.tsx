'use client'

import { useContext, useState } from "react"
import { Button } from "../Button"
import { Card } from "../Card"
import { Modal } from "../Modal"
import styles from "./style.module.scss"
import { MyContext } from "@/app/context/context"

interface Props {
    id: string
    handleModal?: () => void
}

export function RemoveTask({ id, handleModal }: Props) {
    const { deleteTask } = useContext(MyContext)

    function handleDeletTask() {
        deleteTask(id)
    }

    return (
        <Modal>
            <Card floating>
                <form className={styles.formCreate}>
                    <h2>Deletar tarefa</h2>

                    <p>Tem certeza que deseja deletar esta tarefa?</p>

                    <div className={styles.buttons}>
                        <Button type="default" text="Cancelar" action={handleModal} />
                        <Button type="secondary" text="Deletar" action={handleDeletTask} />
                    </div>
                </form>
            </Card>
        </Modal>
    )
}