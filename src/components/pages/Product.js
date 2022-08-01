import styles from "./Product.module.css";
import ProdForm from "../products/ProdForm";
//layout
import Message from "../layout/Message";
import Loading from "../layout/Loading";
import Modal from "../layout/Modal";
//Hooks
import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
//icons
import { BsPencil, BsFillTrashFill } from "react-icons/bs";

function Product() {

  const { id } = useParams()

  //product's data
  const [product, setProduct] = useState([])

  //symbol loading page
  const [removeLoading, setRemoveLoading] = useState(false)
  //Messages
  const [deleteMessage, setDeleteMessage] = useState('')
  const [addMessage, setAddMessage] = useState('')
  //reloading
  const [re, setRe] = useState(false)

  //GET product with 'name'
  useEffect(() => {
    fetch(`https://idrugs-app.herokuapp.com/idrugs-app/pharma/product/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProduct(data)
        setRemoveLoading(true)
      })
      .catch((err) => console.log(err))

  }, [id])

  //UPDATE (PUT) Product
  function updateProduct(prod) {
    fetch("https://idrugs-app.herokuapp.com/idrugs-app/pharma/product", {
      method: 'PUT',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(prod),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setAddMessage('Funcionário Modificado com Sucesso!')
      }).catch((err) => console.log(err))
  }

  //DELETE Employee
  function removeProduct(id) {
    fetch("https://idrugs-app.herokuapp.com/idrugs-app/pharma/product", {
      method: 'DELETE',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({ _id: `${id}` }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setRe(true)
        setDeleteMessage('Produto Removido com Sucesso!')
      }).catch((err) => console.log(err))
  }


  function photo(photo_link) {
    if (photo_link) {
      return photo_link
    }
    return "https://cityhighschool.org/files/nophoto.png"
  }

  //Delete Modal
  const [deleteModal, setDeleteModal] = useState(false);

  function openDeleteModal() {
    setDeleteModal(true);
  }
  function closeDeleteModal() {
    setDeleteModal(false);
  }
  const remove = (e) => {
    e.preventDefault()
    removeProduct(id)
  }

  //Edit Modal
  const [editModal, setEditModal] = useState(false);

  function openEditModal() {
    setEditModal(true);
  }
  function closeEditModal() {
    setEditModal(false);
  }

  //name type of product
  const [typeName, setTypeName] = useState("")

  useEffect(() => {
    fetch(`https://idrugs-app.herokuapp.com/idrugs-app/pharma/type/${product.type}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTypeName(data.name)
        console.log(data)
      })
      .catch((err) => console.log(err))
  }, [product.type])

  return (
    <div className={styles.control}>
      <div>

        {addMessage && <Message msg={addMessage} type={"success"} />}
        {deleteMessage && <Message type={"error"} msg={deleteMessage} />}

        <div>
          <div>
            <img src={photo(product.photo)} alt="" />
          </div>
          <div>
            <p> <span>Nome:</span> {product.name} </p>
            <p> <span>Marca:</span> {product.brand} </p>
            <p> <span>Valor:</span> {product.price} </p>
            <p> <span>Departamento:</span> {typeName} </p>
            <p> <span>Prescrição:</span> {product.prescription} </p>
            <p> <span>Descrição:</span> {product.description} </p>
            <p> <span>Bula:</span> {product.leaflet} </p>
          </div>
          {!removeLoading && <Loading />}
        </div>

        <div className={styles.prod_actions}>
          {/*UPDATE */}
          <button onClick={openEditModal}>
            <BsPencil /> Editar
          </button>
          <Modal open={editModal} >
            <div>
              <ProdForm
                btnText="Salvar"
                handleSubmit={updateProduct}
                empData={product}
                close={closeEditModal}
              />
              <button onClick={closeEditModal}>Cancelar</button>
            </div>
          </Modal>

          {/*DELETE */}
          <button onClick={openDeleteModal}>
            <BsFillTrashFill /> Excluir
          </button>
          <Modal open={deleteModal} >
            <div>
              <p>Tem certeza que deseja excluir esse produto ?</p>
              <button onClick={closeDeleteModal}>Cancelar
              </button>
              {re && <Navigate to="/Products" replace={true} />}
              <button onClick={remove}>Deletar</button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  )
}

export default Product;