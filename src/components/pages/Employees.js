//styles
import styles from "./Employees.module.css";

//employees
import EmpForm from "../employees/EmpForm";
import EmpCard from "../employees/EmpCard";

//layout
import Message from "../layout/Message";
import Loading  from "../layout/Loading";

//Hooks
import { useState, useEffect } from "react";

function Employees() {

    //employees's data
    const [employees, setEmployees] = useState([])
    //symbol loading page
    const [removeLoading, setRemoveLoading] = useState(false)

    //Messages
    const [deleteMessage, setDeleteMessage] = useState('')
    const [addMessage, setAddMessage] = useState('')

    //GET all employees
    useEffect(() => {

        fetch('https://idrugs-app.herokuapp.com/idrugs-app/pharma/user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((res) => res.json())
        .then((data) => {
            setEmployees(data)
            setRemoveLoading(true)
        })
        .catch((err) => console.log(err))

    }, [])

    //CREATE - method POST
    function create(emp) {
        fetch("https://idrugs-app.herokuapp.com/idrugs-app/pharma/user", {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(emp),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            setAddMessage("Funcionário Adicionado com Sucesso!")
        })
    }

    //UPDATE (PUT) Employee
    function updateEmployee(emp) {
        fetch("https://idrugs-app.herokuapp.com/idrugs-app/pharma/user", {
            method: 'PUT',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({"_id": emp._id.$oid,
            "name": emp.name,
            "email": emp.email,
            "last_name": emp.last_name,
            "office": emp.office,
            "photo_link": emp.photo_link}),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            setAddMessage("Funcionário Modificado com Sucesso!")
        }).catch((err) => console.log(err))
    }

    //DELETE Employee
    function removeEmployee(id) {
        fetch("https://idrugs-app.herokuapp.com/idrugs-app/pharma/user", {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({_id: `${id}`}),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            setEmployees(employees.filter((employee) => employee._id.$oid !== id))
            setDeleteMessage('Funcionário Removido com Sucesso!')
        }).catch((err) => console.log(err))
    }


    return (
        <div className={styles.control}>
            <div className={styles.control_div_emp}>
                <h1 className={styles.title}>Todos os Funcionários</h1>

                {addMessage && <Message msg={addMessage} type="success" /> }
                {deleteMessage && <Message type={"error"} msg={deleteMessage}/>}

                <div className={styles.control_list}>
                     {employees.length > 0 && 
                        employees.map((emp) => (
                            <EmpCard 
                                employee={emp}
                                id={emp._id.$oid}
                                name={emp.name}
                                last_name={emp.last_name}
                                office={emp.office}
                                photo_link={emp.photo_link}
                                email={emp.email}
                                key={emp._id.$oid}
                                handleRemove={removeEmployee}
                                handleEdit={updateEmployee}
                            />
                        ))}
                        {!removeLoading && <Loading />}
                </div>
            </div>

            <div className={styles.control_add}>
                <h2 className={styles.title}>Adicionar Novos Funcionários</h2>
                <EmpForm handleSubmit={create} btnText="Adicionar Funcionário"/>
            </div>        
        </div>
    )
}

export default Employees;