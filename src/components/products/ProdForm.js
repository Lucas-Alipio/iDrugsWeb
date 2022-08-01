//FORM
import Input from "../form/Input";
import SubmitButton from "../form/SubmitButton";
import Select from "../form/Select";
//hooks
import { useState, useEffect } from "react";
//styles
import styles from "./ProdForm.module.css";


function ProdForm({ btnText, handleSubmit, empData, close }) {

  //product
  const [data, setData] = useState(empData || {})

  //departments
  const [type, setType] = useState([])
  useEffect(() => {
    fetch(`https://idrugs-app.herokuapp.com/idrugs-app/pharma/type`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((dat) => {
        setType(dat)
      })
      .catch((err) => console.log(err))
  }, [])

  const submit = (e) => {
    e.preventDefault()
    if(data._id) {
      data._id = data._id.$oid
      handleSubmit(data)
    }
    else {
      handleSubmit(data)
    }
    close()
  }

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value })
    console.log(data)
  }

  function handleType(e) {
    setData({
      ...data,
      type: e.target.value,
    })
  }


  return (
    <form onSubmit={submit} className={styles.form} >
      <Input
        type="text"
        text="Nome do produto"
        name="name"
        placeholder="Digite nome do produto"
        value={data.name}
        handleOnChange={handleChange}
      />
      <Input
        type="text"
        text="Marca"
        name="brand"
        placeholder="Digite a marca"
        value={data.brand}
        handleOnChange={handleChange}
      />
      <Input
        type="text"
        text="Preço"
        name="price"
        placeholder="Digite o preço"
        value={data.price}
        handleOnChange={handleChange}
      />
      <Select
        name="type"
        text="Departamento"
        options={type}
        handleOnChange={handleType}
        value={data.type ? data.type : ''}
      />
      <Input
        type="text"
        text="Prescrição"
        name="prescription"
        placeholder="Digite prescrição"
        value={data.prescription}
        handleOnChange={handleChange}
      />
      <Input
        type="text"
        text="Descrição"
        name="description"
        placeholder="Digite descrição"
        value={data.description}
        handleOnChange={handleChange}
      />
      <Input
        type="text"
        text="Link Foto"
        name="photo"
        placeholder="Digite link para foto"
        value={data.photo}
        handleOnChange={handleChange}
      />
      <Input
        type="text"
        text="Bula"
        name="leaflet"
        placeholder="bula"
        value={data.leaflet}
        handleOnChange={handleChange}
      />
      <SubmitButton text={btnText} />
    </form>
  )
}

export default ProdForm;