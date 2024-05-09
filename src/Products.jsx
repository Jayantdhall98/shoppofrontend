import React, { useEffect, useState } from 'react'
import { Link,  useNavigate } from 'react-router-dom';

import axios from 'axios'
import AdminOrderlist from './AdminOrderlist';
export default function Products() {
const [products,setProducts]=useState([]);

const [cartlength,setCartlength]=useState('');
const [isadmin,setIsadmin]=useState(false);
const [issubadmin,setIssubadmin]=useState(false);


const navigate=useNavigate()



useEffect(() => {
  // Check if user data is available
  axios.defaults.withCredentials=true;
  axios.get('http://localhost:5002/api/auth/').then(res=>{
    console.log(res)
    if(res.data.value){
           if(res.data.value&& res.data.usertype==="admin"){
            setIsadmin(true)
          }
          if(res.data.value&&res.data.usertype==="subadmin"){
            setIssubadmin(true)
          }
      console.log("User authenticated")
      console.log(res.data)
    }else{
      navigate("/login")
    }
  })

},[] );

// Rest of your component code...








useEffect(()=>{


    const getdata=async(req,res)=>{

      
      
      const fetchproducts=await fetch("http://localhost:5002/api/product/allproducts")
      const data= await fetchproducts.json()
      setProducts(data)
      
    }
      getdata()
      
    },[])
    
    
// console.log(products)
// console.log(typeof(products))

useEffect(() => {
  

  fetchCartItems();
},[]);

const fetchCartItems = async () => {
  try {
    const cartItemsResponse = await fetch(`http://localhost:5002/api/cart/cartproducts`,{
      method:"GET",
      credentials:"include"
    });
    const cartItemsData = await cartItemsResponse.json();

    // Wait for all promises to resolve and update the state with combined data

    setCartlength(cartItemsData.length);
  } catch (error) {
    console.error( error);
  }
};



// const Addtocart=async(id)=>{

// // console.log("current product id is :",id)
// // console.log(" current user id is",curruserdata._id)
// const res= await fetch("http://localhost:5002/api/cart/addcart",{
       
// method:"POST",
// credentials:'include',
// headers:{
//   "Content-Type":"application/json"
// },
// body:JSON.stringify({

//       productId:id,
//       quantity:1
   

// })
// })
// const data= await res.json();
// console.log(data)
// if(data){
// alert("Product added to cart sucessfully")
// fetchCartItems()
// }else{
// alert("Product not added to cart!!!")
// }

// }

const logout=async(req,res)=>{
       await fetch("http://localhost:5002/api/auth/destroy",{
        method:"GET",
        credentials:"include"
       }).then(alert("logged Out"))
      navigate("/login")
}

const Gotodetail=(item)=>{
  sessionStorage.setItem('selectedProduct', JSON.stringify(item));

  navigate("/productdDetail")
  
}

  return (
    <div>
      <>
  {/* Hello world */}
  
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container px-4 px-lg-5">
      <h1>
     
     Welcome to Shop now 
      </h1>
      
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        
           
      </div>




        <form className="d-flex">
             {
                         
                               issubadmin&&
                            <Link to={`/newproducts/`}  style={{textDecoration:"none", }}>
                            <button  className="btn btn-outline-dark" type="submit">
                            <i className="bi bi-person-fill"></i>
                           ADD Products
                            
                            </button>
                            </Link>
                          }
             {
                         
                               isadmin&&
                            <Link to={`/admin/`}  style={{textDecoration:"none", }}>
                            <button  className="btn btn-outline-dark" type="submit">
                            <i className="bi bi-person-fill"></i>
                           Admin Page
                            
                            </button>
                            </Link>
                          }
        
            <Link to={`/mycart/`}  style={{textDecoration:"none", }}>
          <button  className="btn btn-outline-dark mar-l" type="submit">
            <i   className="bi-cart-fill me-1" />
            Cart
            <span className="badge bg-dark text-white ms-1 rounded-pill">
           {cartlength}
            </span>
          </button>
            </Link>
            <Link to={`/myorders/`}  style={{textDecoration:"none", }}>
          <button  className="btn btn-outline-dark mar-l" type="submit">
          <i className="bi bi-bag-check-fill"></i> 

                     My Orders
          </button>
            </Link>
         {/* Logout button */}
           <button type='button' onClick={logout} className="btn btn-outline-dark mar-l">
           <i className="bi bi-door-closed-fill"></i>
            Logout
          </button>
        </form>

    </div>
  </nav>
  {/* Header*/}
  <header className="bg-dark py-5">
    <div className="container px-4 px-lg-5 my-5">
      <div className="text-center text-white">
        <h1 className="display-4 fw-bolder">Shop in style</h1>
        <p className="lead fw-normal text-white-50 mb-0">
          With this shop 
        </p>
      </div>
    </div>
  </header>
  {/* Section*/}
  <section className="py-5">
  <div className="container px-4 px-lg-5 mt-5">
    <div className="row row-cols-1 row-cols-md-3 row-cols-xl-4 g-4"> {/* Adjusted grid classes */}
      {products && products.map((item) => (
        <div className="col" key={item._id}>
          <div className="card h-100 carddiv">
            {/* Sale badge*/}
            <div
              className="badge bg-dark text-white position-absolute"
              style={{ top: "0.5rem", right: "0.5rem" }}
            >
              Sale
            </div>
            {/* Product image*/}
            <img
               onClick={()=>{Gotodetail(item)}}
              className="card-img-top zoom"
              src={item.img}
              alt={item.title}
              style={{ maxWidth: "100%", height: "auto" }} // Add style to control image size
            />
            {/* Product details*/}
            <div className="card-body p-4">
              <div className="text-center">
                {/* Product name*/}
                <h5 className="fw-bolder">{item.title}</h5>
                {/* Product reviews*/}
                <div className="d-flex justify-content-center small text-warning mb-2">
                  <div className="bi-star-fill" />
                  <div className="bi-star-fill" />
                  <div className="bi-star-fill" />
                  <div className="bi-star-fill" />
                  <div className="bi-star-fill" />
                </div>
                {/* Product price*/}
                <span className="text-muted text-decoration-line-through">
                  $20.00
                </span>
                {item.price}
              </div>
            </div>
            {/* Product actions*/}
            <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
              <div className="text-center">
                <button  onClick={()=>{Gotodetail(item)}} className="btn btn-outline-dark mt-auto" href="#">
                  Details
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

  {/* Footer*/}
  <footer className="py-5 bg-dark">
    <div className="container">
      <p className="m-0 text-center text-white">
        Copyright © Jayant@shopping_kart 2024
      </p>
    </div>
  </footer>
</>

    </div>
  )
}
