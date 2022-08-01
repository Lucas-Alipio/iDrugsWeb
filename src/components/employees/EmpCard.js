import styles from "./EmpCard.module.css"
import EmpForm from "./EmpForm";

import { BsPencil, BsFillTrashFill } from "react-icons/bs";
//hooks
import { useState } from "react";
//LAYOUT
import Modal from "../layout/Modal";

function EmpCard({employee, id, name, last_name, office, photo_link, email, handleRemove, handleEdit}) {

    function photo(photo_link) {
        if(photo_link){
            console.log(photo_link)
            return photo_link
        }
        console.log(photo_link)
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
        handleRemove(id)
    }

    //Edit Modal
    const [editModal, setEditModal] = useState(false);

    function openEditModal() {
        setEditModal(true);
        console.log(employee)
    }
    function closeEditModal() {
        setEditModal(false);
    }

    return(
        <>
            <div className={styles.emp_card}>
                <div className={styles.emp_card_height}>
                    <img src={photo(photo_link)} alt=""/>
                </div>

                <h4>{name} {last_name}</h4>

                <p> <span>Email:</span> {email}     </p>

                <p> <span>Cargo:</span> {office}    </p>

                <div className={styles.emp_card_actions}>
                    {/*UPDATE */}
                    <button onClick={openEditModal}>
                        <BsPencil /> Editar
                    </button>
                    <Modal open={editModal} >
                        <div>
                            <EmpForm 
                                handleSubmit={handleEdit} 
                                btnText="Salvar" 
                                empData={employee} 
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
                            <p>Tem certeza que deseja excluir esse funcionário ?</p>
                            <button onClick={closeDeleteModal}>Cancelar</button>
                            <button onClick={remove}>Deletar</button>
                        </div>
                    </Modal>
                </div>
            </div>
        </>
    )
}

export default EmpCard;