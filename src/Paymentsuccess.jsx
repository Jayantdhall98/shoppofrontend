import React from 'react'
import {useSearchParams,useNavigate} from 'react-router-dom'

export default function Paymentsuccess() {


    const searchquery=useSearchParams()[0]

     const transaction_id=searchquery.get("reference")
     const navigate=useNavigate()
     const Gotomyorders=()=>{
navigate('/myorders')
     }






  return (
    <div>
      <h1>Payment Succesfull</h1>
      <h3>Your transaction is is :{transaction_id}</h3>

      <button className="btn btn-warning shadow-0 mar-l" onClick={Gotomyorders}>My Orders</button>
    </div>
  )
}
