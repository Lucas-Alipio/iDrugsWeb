import styles from "./Department.module.css"
//layout
import Loading from "../layout/Loading";
//products
import ProdCard from "../products/ProdCard";
//Hooks
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


function Department() {

  //department name
  const { id } = useParams()

  // all products from department 
  const [products, setProducts] = useState({})
  //symbol loading page
  const [removeLoading, setRemoveLoading] = useState(false)

  //GET all employees
  useEffect(() => {
    fetch(`https://idrugs-app.herokuapp.com/idrugs-app/pharma/product/type/${id}`, {
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

  }, [id])

  //name type of product
  const [typeName, setTypeName] = useState("")

  useEffect(() => {
    fetch(`https://idrugs-app.herokuapp.com/idrugs-app/pharma/type/${id}`, {
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
  }, [id])




  return (
    <div className={styles.control}>
      <h1 className={styles.title}>{typeName}</h1>

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
  )
}

export default Department;