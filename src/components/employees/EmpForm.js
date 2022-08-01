import styles from "./EmpForm.module.css";

//FORM
import Input from "../form/Input";
import SubmitButton from "../form/SubmitButton";
//hooks
import { useState } from "react";

function EmpForm({btnText, handleSubmit, empData, close}) {
    
    const [data, setData] = useState(empData || {})

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(data)
        close()
    }

    function handleChange(e) {
        setData({ ...data, [e.target.name]: e.target.value})
        console.log(data)
    }

    return (
        <form onSubmit={submit} className={styles.form} >
            <Input
                type="text" 
                text="Nome do Funcionario"
                name="name"
                placeholder="Digite nome do funcionário"
                value={data.name}
                handleOnChange={handleChange}
            />
            <Input
                type="text" 
                text="Ultimo Nome do Funcionario"
                name="last_name"
                placeholder="Digite último nome do funcionário"
                value={data.last_name}
                handleOnChange={handleChange}
            />
            <Input
                type="text" 
                text="Cargo"
                name="office"
                placeholder="Digite cargo do funcionário"
                value={data.office}
                handleOnChange={handleChange}
            />
            <Input
                type="text" 
                text="Link para foto"
                name="photo_link"
                placeholder="Digite link para foto"
                value={data.photo_link}
                handleOnChange={handleChange}
            />
            <Input
                type="text"
                text="Email"
                name="email"
                placeholder="Digite email do funcionário"
                value={data.email}
                handleOnChange={handleChange}
            />
            <Input
                type="password"
                text="Senha"
                name="password"
                placeholder="Digite senha do funcionário"
                handleOnChange={handleChange}
            />
            <SubmitButton text={btnText}/>
        </form>
    )
}

export default EmpForm;