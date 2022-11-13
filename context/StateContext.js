import {createContext, useContext, useState, useEffect} from 'react'
import {toast} from "react-hot-toast"

const Context = createContext()

export const StateContext = ({children}) => {
    const initial = {qty: 0, price: 0, cart: []}

    const [showCart, setShowCart] = useState(false)
    const [cartItems, setCartItems] = useState(initial.cart)
    const [totalPrice, setTotalPrice] = useState(initial.price)
    const [totalQty, setTotalQty] = useState(initial.qty)

    const [qty, setQty] = useState(1)


    // localStorage
// ***************

//  useEffect(() => {
//       localStorage.clear()
 
//   }, [])

useEffect(() => {
        const localQty = JSON.parse(localStorage.getItem("qty"))
        const price = JSON.parse(localStorage.getItem("price"))
        const cart = JSON.parse(localStorage.getItem("cart"))

         if (cart){
            setTotalQty(localQty)
            setTotalPrice(price)
            setCartItems(cart)
        } 
}, [])

useEffect(() => {

    if (totalQty !== initial.qty && totalPrice !== initial.price && cartItems !== initial.cart){
        localStorage.setItem('qty', JSON.stringify(totalQty))
        localStorage.setItem('price', JSON.stringify(totalPrice))
        localStorage.setItem('cart', JSON.stringify(cartItems))
    } else {
        return
    }
 }, [cartItems])

 // ***********

    let foundProduct

    const incQty = () => {
        setQty(prev => prev + 1)
    }
    const decQty = () => {
        setQty(prev => {
            if (prev == 1) return 1
            // if (prev - 1 < 1) return 1
            return prev - 1
        })
    }

    const onAdd = (product, quantity) => {
        try {
        const checkProductInCart = cartItems.find(item => item._id === product._id)

        setTotalPrice(prev => prev + product.price * quantity)
        setTotalQty(prev => prev + quantity)

        if(checkProductInCart){
            setCartItems(prev => prev.map(item => item._id === product._id 
                ? {...item, quantity: item.quantity + quantity}
                : item))
        } else {
            product.quantity = quantity 
            setCartItems(prev => [...prev, {...product}])
        }

        toast.success(`${qty} ${product.name} added to the cart`)
            
        } catch (error) {
            console.log(error)
            setCartItems([])
            setTotalPrice(0)
            setTotalQty(0)
        }
    }

    const toggleCartItemQty = (id, value) => {
        foundProduct = cartItems.find(item => item._id === id)

        if (value === "inc"){
            setCartItems(prev => prev.map(product => {
                if (product._id === id){
                    return {...product, quantity: product.quantity + 1}
                } else {
                    return {...product}
                }
            }))
            setTotalPrice(prev => prev + foundProduct.price)
            setTotalQty(prev => prev + 1)
        } else if (value === "dec"){
            if (foundProduct.quantity > 1){
                setCartItems(prev => prev.map(item => {
                    if (item._id === id) return {...item, quantity: item.quantity - 1}
                    else return {...item}
                }))
                setTotalPrice(prev => prev - foundProduct.price)
                setTotalQty(prev => prev - 1)
            }
        }
    }

    const onRemove = (id) => {
        const foundProduct = cartItems.find(item => item._id === id)
        setTotalPrice(prev => prev - foundProduct.price * foundProduct.quantity)
        setTotalQty(prev => prev - foundProduct.quantity)
        setCartItems(prev => prev.filter(item => item._id !== id))
    }

    return (
        <Context.Provider 
            value={{
                showCart, 
                cartItems, 
                totalPrice, 
                totalQty, 
                qty, 
                incQty, 
                decQty,
                onAdd,
                setShowCart,
                showCart,
                toggleCartItemQty,
                onRemove,
                setCartItems,
                setTotalPrice,
                setTotalQty,
            }}
        >
            {children}
        </Context.Provider>
    )
}

// export const useStateContext = () => {
//     const context = useContext(Context)
//     return context
// }
export const useStateContext = () => useContext(Context)