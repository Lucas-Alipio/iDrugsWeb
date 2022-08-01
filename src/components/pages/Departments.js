//FORM
import Input from "../form/Input";
import SubmitButton from "../form/SubmitButton";
//layout
import Message from "../layout/Message";
import Loading from "../layout/Loading";
import Modal from "../layout/Modal";
//styles
import styles from "./Departments.module.css"
//hooks
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

function Departments() {

  //departments's data
  const [departments, setDepartments] = useState([])
  //department's data
  const [data, setData] = useState({})

  //symbol loading page
  const [removeLoading, setRemoveLoading] = useState(false)

  //Messages
  //const [deleteMessage, setDeleteMessage] = useState('')
  const [addMessage, setAddMessage] = useState('')


  //GET all employees
  useEffect(() => {

    fetch('https://idrugsapi.herokuapp.com/idrugs-api/type', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setDepartments(data)
        setRemoveLoading(true)
      })
      .catch((err) => console.log(err))

  }, [])

  //CREATE - method POST
  function createDepartment(dep) {
    console.log(dep.department)
    fetch("https://idrugsapi.herokuapp.com/idrugs-api/type", {
      method: 'POST',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({ "name": dep.department }),
    })
      .then((res) => res.json())
      .then((data) => {

        console.log(data)
        setAddMessage("Departamento Adicionado com Sucesso!")
      })
  }

  //Add Modal
  const [addModal, setAddModal] = useState(false);
  function openAddModal() {
    setAddModal(true);
  }
  function closeAddModal() {
    setAddModal(false);
  }

  //submit
  const submit = (e) => {
    e.preventDefault();
    createDepartment(data);
    closeAddModal();
  }

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value })
    //console.log(data)
  }

  return (
    <div className={styles.control}>
      <div>
        <h1>Departamentos</h1>
      </div>

      <div className={styles.control_modal}>
        <button onClick={openAddModal}>Cadastrar</button>
        <Modal open={addModal} >
          <div>
            <form onSubmit={submit}>
              <Input
                type="text"
                text="Novo Departamento"
                name="department"
                placeholder="Digite nome de um novo departamento"
                handleOnChange={handleChange}
              />
              <SubmitButton text="Cadastrar" />
            </form>
            <button onClick={closeAddModal}>Cancelar</button>
          </div>
        </Modal>
      </div>


      {addMessage && <Message msg={addMessage} type="success" />}

      <div className={styles.control_list}>
        {departments.length > 0 &&
          departments.map((dep) => (
            <div key={dep._id.$oid}>
              <Link to={`/Departments/${dep._id.$oid}`}>
                <button>{dep.name}</button>
              </Link>
            </div>
          ))}
        {!removeLoading && <Loading />}
      </div>


    </div>
  )

}

export default Departments;