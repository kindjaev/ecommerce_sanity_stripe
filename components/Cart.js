// import React, {useEffect, useRef} from 'react'
import Link from "next/link"
import {AiOutlineMinus, AiOutlinePlus, AiOutlineShopping, AiOutlineLeft} from "react-icons/ai"
import {TiDeleteOutline} from 'react-icons/ti'
import {toast} from 'react-hot-toast'
import { useStateContext } from '../context/StateContext'
import {urlFor} from "../lib/client"
import getStripe from '../lib/getStripe'
 
function Cart() {
  // const cartRef = useRef()
  const {totalPrice, totalQty, setShowCart, cartItems, toggleCartItemQty, onRemove} = useStateContext()

  // const checkout = async () => {
  //   await getStripe();
  //   toast.loading('Redirecting...');
  // }

  const handleCheckout = async () => {

    const stripe = await getStripe();
    const response = await fetch('/api/stripe', {
      method: 'POST',
      body: JSON.stringify(cartItems),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if(response.statusCode === 500) return;
    const data = await response.json();

    toast.loading('Redirecting...');
    stripe.redirectToCheckout({ sessionId: data.id });
  }

  return (
    // <div className='cart-wrapper' ref={cartRef}>
    <div className='cart-wrapper'>
      <div className='cart-container'>
        <button className="cart-heading" onClick={() => setShowCart(false)}>
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">{totalQty} items</span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150}/>
            <h3>Your shopping bag is empty!</h3>
            <Link href="/">
              <button className='btn' onClick={() => setShowCart(false)}>Continue Shopping</button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {cartItems.length >= 1 && cartItems.map(item => {
            return (
              <div className="product" key={item._id}>
                <img src={urlFor(item?.image[0])} alt="product" className='cart-product-image'/>
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item.name}</h5>
                    <h4>${item.price}</h4>
                  </div>

                  <div className="flex bottom">
                    <div>
                      <p className="quantity-desc">
                          <span className="minus" onClick={() => toggleCartItemQty(item._id, "dec")}><AiOutlineMinus /></span>
                          <span className="num">{item.quantity}</span>
                          <span className="plus" onClick={() => toggleCartItemQty(item._id, "inc")}><AiOutlinePlus /></span>
                      </p>
                    </div>
                    <button className='remove-item' onClick={() => onRemove(item._id)}><TiDeleteOutline /></button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>


        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>{totalPrice.toFixed(2)}</h3>
            </div>

            <div className="btn-container">
              <button className='btn' onClick={handleCheckout}>Pay with Stripe</button>
            </div>
{/* 
            <form action="/api/stripe" method='POST'>
              <input type="hidden" name="products" value={JSON.stringify(cartItems)}/>
              <button className='btn' type='submit' onClick={checkout}>Pay with Stripe</button>
            </form> */}
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart