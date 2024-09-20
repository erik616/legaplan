'use client'

import { DataProps } from "@/app/page"
import { Task } from "../Task"
import styles from "./list.module.scss"
import { useContext, useState } from "react"
import { Modal } from "../Modal"
import { Card } from "../Card"
import { Button } from "../Button"
import { MyContext } from "@/app/context/context"

interface Props {
    data: DataProps[]
}

export function ListTask({ data }: Props) {
    const [id, setId] = useState<string>('')
    const [show, setShow] = useState<boolean>(false)
    const { deleteTask } = useContext(MyContext)

    function handleModal() {
        setShow(!show)
    }

    function handleDelet(id: string) {
        setShow(true)
        setId(id)
    }

    function handleDeletTask() {
        try {
            deleteTask(id)
        } catch (error) { }
        finally {
            setShow(false)
        }
    }

    return (
        <div className={styles.listStaks}>
            <p>
                Suas tarefas de hoje
            </p>
            {data.length > 0 ? (
                data
                    .filter((task) => task.active !== false)
                    .map(task => (<Task id={task.id} delet={() => handleDelet(task.id)} key={task.id} active={task.active} name={task.name} />))
            ) : (
                <p>
                    Ainda não há tarefas
                </p>
            )}

            {data.find(task => task.active === false) && (
                <p className={styles.msg}>
                    Tarefas Finalizadas
                </p>
            )}
            {!data.find(task => task.active === false)?.active &&
                data
                    .filter((task) => task.active === false)
                    .map(task => (<Task id={task.id} delet={() => handleDelet(task.id)} key={task.id} active={task.active} name={task.name} />))

            }

            {show && (
                <Modal >
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
            )}
        </div >
    )
}
