import { useState} from "react"
import { useEffect} from "react"
import { ItemList } from '../itemList/itemList'
import { useParams } from 'react-router-dom'
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../../firebase/config"

const ItemListContainer = ( ) => {
    
    const [product, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const { categoryId } = useParams()
    
    useEffect (() => {
      setLoading(true)

      const productosRef = collection(db, "productos")

      const q = categoryId
                ? query(productosRef, where("category", "==", categoryId))
                : productosRef

      getDocs(q)
        .then((res) => {
            const docs = res.docs.map((doc) => {
                    return {...doc.data(), id: doc.id}
            })
        
            setProducts(docs)
        })
        .finally (() => {
            setLoading(false)
        })
    }, [categoryId])

    return (
        <div>
            <div className='max-w-[900px] max-sm:mt-[20px] mt-[50px] mb-[100px] mx-auto'>
                { loading ? <p className="text-gray-200 text-lg text-center">Cargando items..</p>
                    : <ItemList items={product}/>                   
                }
            </div>
        </div>
    )
}

export default ItemListContainer