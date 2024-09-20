'use client'

import { createContext, useEffect, useState } from "react"
import { DataProps } from "../page"

interface ContextProps {
    data: DataProps[]
    createTask: (task: any) => void
    deleteTask: (id: string) => void
    updateTask: (id: string) => void
}

export const MyContext = createContext({} as ContextProps)

export function ContextProvider({ children }: { children: React.ReactNode }) {
    const [data, setData] = useState<DataProps[]>([])

    useEffect(() => {
        setData(getAllTasks())
    },[])



    function createTask(task: any) {
        const tasks = [];
        const data = localStorage.getItem("@data-tasks");
        if (data) {
            const result = JSON.parse(data);
            tasks.push(...result, task);
        } else {
            tasks.push(task);
        }

        localStorage.setItem("@data-tasks", JSON.stringify(tasks));
        setData(tasks)
    }

    function getAllTasks() {
        const data = localStorage.getItem("@data-tasks");
        const list = data ? JSON.parse(data) : [];
        return list;
    }

    function updateTask(id: string) {
        const data: [] = getAllTasks();

        const result = data.map((item: any) => {
            if (item.id === id) {
                const status = item.active
                return { ...item, active: !status }
            }
            return item
        })

        localStorage.setItem("@data-tasks", JSON.stringify(result))
        setData(result)
    }

    function deleteTask(id: string) {
        const data: [] = getAllTasks();
        const result = data.filter((item: any) => item.id !== id);

        localStorage.setItem("@data-tasks", JSON.stringify(result));
        setData(result)
    }

    return (
        <MyContext.Provider value={{
            data, createTask, deleteTask, updateTask
        }}>
            {children}
        </MyContext.Provider>
    )
}



// export interface PropsModal {
//     show: boolean
//     setShow: (value: boolean) => void
// }

// export const ModalContext = createContext({
//     show: false
// } as PropsModal)