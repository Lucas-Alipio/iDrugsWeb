//styles
import styles from "./Products.module.css";

//layout
import Message from "../layout/Message";
import Loading from "../layout/Loading";
import Modal from "../layout/Modal";

//products
import ProdCard from "../products/ProdCard";
import ProdForm from "../products/ProdForm";

//Hooks
import { useState, useEffect } from "react";

function Products() {

	//products's data
	const [products, setProducts] = useState([])
	//symbol loading page
	const [removeLoading, setRemoveLoading] = useState(false)

	//Messages
	const [addMessage, setAddMessage] = useState('')

	//GET all employees
	useEffect(() => {

		fetch('https://idrugs-app.herokuapp.com/idrugs-app/pharma/product', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((data) => {
				setProducts(data)
				setRemoveLoading(true)
			})
			.catch((err) => console.log(err))

	}, [])

	//CREATE - method POST
	function createProduct(prod) {
		fetch("https://idrugs-app.herokuapp.com/idrugs-app/pharma/product", {
			method: 'POST',
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			},
			body: JSON.stringify(prod),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data)
				setAddMessage("Produto Adicionado com Sucesso!")
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

	return (
		<div className={styles.control}>
			<h1 className={styles.title}>Todos os Produtos</h1>

			<div className={styles.control_modal}>
				<button onClick={openAddModal}>Cadastrar</button>
				<Modal open={addModal} >
					<div>
						<ProdForm 
							btnText="Cadastrar"
							handleSubmit={createProduct}
							empData={{}}
							close={closeAddModal}
						/>
						<button onClick={closeAddModal}>Cancelar</button>
					</div>
				</Modal>
			</div>

			<div className={styles.control_div_emp}>

				{addMessage && <Message msg={addMessage} type={"success"} />}

				<div className={styles.control_list}>
					{products.length > 0 &&
						products.map((prod) => (
							<ProdCard
								product={prod}
								key={prod._id.$oid}
							/>
						))}
					{!removeLoading && <Loading />}
				</div>
			</div>
		</div>
	)
}

export default Products;