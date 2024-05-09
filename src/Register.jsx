import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Register() {

    const [username,setUsername]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [confirmpassword,setConfirmpass]=useState("")
    const [ischecked,setIschecked]=useState("false")
    const [usertype,setUsertype]=useState("user")


const handleUserTypeChange=(e)=>{

setUsertype(e.target.value)
}

console.log(usertype)



const navigate=useNavigate();

    const  postHandle=async(e)=>{
        e.preventDefault()
        if(password===confirmpassword && username,email,password,confirmpassword !="" ){
       

const res= await fetch("https://shoppobackend.onrender.com/api/auth/register",{

method:"POST",
headers:{
    "Content-Type":"application/json"
},
body:JSON.stringify({
    username:username,
    email:email,
    password:password,
    usertype:usertype
})
})
    const data=await res.json();
          if(data){
            alert("registered success")
            navigate("/login");
          }else{
            alert("not registered")
          }
        }else{
            alert("password not matched !!")
        }
   



}





  return (
    <div>
      <section className="vh-100" style={{ backgroundColor: "#eee" }}>
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-lg-12 col-xl-11">
                <div className="card text-black" style={{ borderRadius: 25 }}>
                  <div className="card-body p-md-5">
                    <div className="row justify-content-center">
                      <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                          Sign up
                        </p>
                        <form className="mx-1 mx-md-4"   onSubmit={postHandle} >
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="bi bi-person-fill" style={{ fontSize: "2rem", marginRight: "0.5rem" }} />
                            <div className="form-outline flex-fill mb-0">
                              <input
                                type="text"
                                id="form3Example1c"
                                className="form-control"
                                onChange={(e)=>setUsername(e.target.value)}   
                                   
                                   />
                              <label
                                className="form-label"
                                htmlFor="form3Example1c"
                              >
                                Your Name
                              </label>
                            </div>
                          </div>
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="bi bi-envelope-at-fill" style={{ fontSize: "2rem", marginRight: "0.5rem" }}/>
                            <div className="form-outline flex-fill mb-0">
                              <input
                                type="email"
                                id="form3Example3c"
                                className="form-control"
                                onChange={(e)=>setEmail(e.target.value)} 
                              />
                              <label
                                className="form-label"
                                htmlFor="form3Example3c"
                              >
                                Your Email
                              </label>
                            </div>
                          </div>
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="bi bi-key-fill" style={{ fontSize: "2rem", marginRight: "0.5rem" }}/>
                            <div className="form-outline flex-fill mb-0">
                              <input
                                type="password"
                                id="form3Example4c"
                                className="form-control"
                                onChange={(e)=>setPassword(e.target.value)} 
                              />
                              <label
                                className="form-label"
                                htmlFor="form3Example4c"
                              >
                                Password
                              </label>
                            </div>
                          </div>
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="bi bi-key-fill"  style={{ fontSize: "2rem", marginRight: "0.5rem" }} />
                            <div className="form-outline flex-fill mb-0">
                              <input
                                type="password"
                                id="form3Example4cd"
                                className="form-control"
                                onChange={(e)=>setConfirmpass(e.target.value)} 
                              />
                              <label
                                className="form-label"
                                htmlFor="form3Example4cd"
                              >
                                Repeat your password
                              </label>
                            </div>
                          </div>
                          <div className="d-flex flex-row align-items-center mb-4">
                          <i className="bi bi-person-fill" style={{ fontSize: "2rem", marginRight: "0.5rem" }}/>
                          <div className="form-outline flex-fill mb-0">
                            <select
                              className="form-control"
                              value={usertype}
                              onChange={handleUserTypeChange}
                            >
                              <option value="user">User</option>
                              <option value="admin" disabled>Admin</option>
                              <option value="subadmin" disabled>Sub Admin</option>
                            </select>
                            <label
                                className="form-label"
                                htmlFor="form3Example4cd"
                              >
                               User Type
                              </label>
                          </div>
                        </div>
                          
                          <div className="form-check d-flex justify-content-center mb-5">
                            <input
                              className="form-check-input me-2"
                              type="checkbox"
                              defaultValue=""
                              id="form2Example3c"
                              onChange={(e)=>setIschecked(e.target.checked)}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="form2Example3"
                            >
                              I agree all statements in{" "}
                              <a href="#!">Terms of service</a>
                            </label>
                          </div>
                          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <button
                              type="submit"
                              className="btn btn-primary btn-lg"
                             
                            >
                              Register
                            </button>
                          </div>
                        </form>
                            <button
                              type="submit"
                              className="btn btn-primary btn-lg mar-l"
                             
                            >
                             <Link  to={"/login"} style={{textDecoration:"none", color:"white"}}>LOG IN</Link>
                            </button>
                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4"></div>
                     
                      </div>
                      <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                          className="img-fluid"
                          alt="Sample image"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
  
    </div>
  )
}
