import React, { useState } from 'react'
import Header from '../Components/Header'
import SideBar from '../Components/Sidebar'
import ComplaintsCard from '../Components/CoplaintCard'



const Dashboard = () => {
    const [search,setSearch]=useState("")
    
    return (
        <div>
            <Header />
            <div style={{ width: "100%",marginLeft:"-10px" }} className='container-fluid'>
                <div className='d-flex' style={{ width: "100%" }}>
                    <div >
                        <SideBar />
                    </div>
                    <div className='ms-3 bg-dark rounded text-light pe-2' style={{ width: "100%" }}>
                        <div className="d-flex align-items-center">
                            <span><h3 className='fw-bold mt-3 ms-5'>All Grievances :</h3></span>
                        </div>
                        <div className="row mt-3 mb-3">
                            <div className="col-lg-10 d-flex">
                                <input onChange={(e)=>setSearch(e.target.value)} type="text" className='form-control w-50 ms-5 p-2' placeholder='Search here!!!'/>
                                
                            </div>
                        </div>
                        <ComplaintsCard search={search}/>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Dashboard