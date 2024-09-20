'use client'

import Image from "next/image";
import styles from "./styles/page.module.scss"
import logo from "@/app/assets/img/logo.svg"
import { useContext, useState } from "react";
import { Button } from "./components/Button";
import { Card } from "./components/Card";
import { ListTask } from "./components/ListTask";
import { AddTask } from "./components/AddTask";
import { MyContext } from "./context/context";

export interface DataProps {
  id: string
  name: string
  active: boolean
}

export default function Home() {
  const [show, setShow] = useState<boolean>(false)
  const { data } = useContext(MyContext)

  const day = createDate();

  function handleModal() {
    setShow(true)
  }

  return (
    <section className={styles.page}>
      <header>
        <nav className={styles.nav}>
          <ul>
            <li>
              <Image src={logo} alt="logo" height={36} width={150} />
            </li>
            <li>
              <h1>Bem Vindo de volta, Erik!</h1>
            </li>
            <li>
              <p>{day}</p>
            </li>
          </ul>
        </nav>
      </header>

      <Card>
        <ListTask data={data} />
      </Card>

      <Button text="Adicionar nova tarefa" type="primary" action={handleModal} />

      {show && <AddTask setShow={setShow} show={show} />}
    </section>
  );
}


function createDate() {
  const data = new Date()
  const day = data.toLocaleDateString('pt-br', {
    weekday: "long", year: "numeric", month: "long", day: "numeric"
  }).replace("-feira", "")
  return day

}