import React, { useEffect, useState } from 'react'
import  '../../../Mystyles/admintabs.css'
import  '../../../Mystyles/Pagestyles/vehiclecategory.css'
import Axios from 'axios'

export default function VehicleYears() {

  const [showSections, setShowSections] = useState(""); 
  const [years, setYears] = useState(""); 
  const [selectedYears, setSelectedYears] = useState(""); 
  const [getyears, setGetYears] = useState([]); 
 
 
 
  const onChooseYears= (e)=>
  {
    Axios.get("http://localhost:3001/categories/years").then((response)=>{
     console.log(response.data);
     setGetYears(response.data);
    })

    if(e=="viewYears")
    {
      setShowSections(e);
     console.log("Add working" + e);
    }
    else if(e=="addYears")
    {
      setShowSections(e);
      console.log("Update working" + e);
    }
    else if(e=="")
    {
     
    }
    else if(e=="updateYears")
    {
      setShowSections(e);
      console.log("view working" + e);
      
    }
    else
    {
      setShowSections(e);
      console.log("Delete working" + e);
    }

  }

  const onYearsSelected =(e)=>{
    setSelectedYears(e);
  }
  const addYears =() => 
  {
    Axios.post("http://localhost:3001/categories/insertyears",{years:years}).then((response)=>{
     console.log(response.data);
    })
  }
  const updateYears =() => 
  {
    Axios.post("http://localhost:3001/categories/updateyears",{newyears:years,oldyears:selectedYears}).then((response)=>{
     console.log(response.data);
    })
  }
  const deleteYears =() => 
  {
    Axios.post("http://localhost:3001/categories/deleteyears",{year:selectedYears}).then((response)=>{
      console.log(response.data);
     })
  }
  
  return (
    <div className='veh-cat-main-cont' >
    <div className='veh-cat-opr-cnt'>
        <div className='veh-cat-main-cont2'>               
              <div className='veh-opr'>
              <span>Select Operation</span>
              </div>
              <div className='veh-opr1'>
                  <select className='select-inp' name="operation" id="" onChange={(e)=>{onChooseYears(e.target.value)}}>
                  <option value="" selected>Choose Operation</option>
                                      
                      <option value="viewYears">View Years</option>
                      <option value="addYears" >Add Years</option>
                      <option value="updateYears">Update Years</option>
                      <option value="deleteYears">Delete Years</option>
                  </select>
              </div>
          </div>

          {showSections==="addYears" ? 
            <div className='veh-opr-reslt-makes-add' >
                 <div className='add-cat-container'  >
                              <div className='add-cat-lb'>
                                <label htmlFor="">Add Years</label>
                              </div>
                               <div className='cat-name-inp'>
                                <input type="text" placeholder='Type Here' className='add-cat-inp' onChange={(e)=>{
                                  setYears(e.target.value);
                                }}/>
                              </div>
                              <div className='cat-name-inp' >
                                <button className='add-cat-sb' onClick={addYears}>Submit</button>
                              </div>
                        </div>        
              
                
              </div>:""}
              {showSections==="updateYears" ? 
                <div className='veh-opr-reslt-makes-add'> 
                   <div className='add-cat-container'  >
                        <div className='add-cat-lb'>
                            <label htmlFor="">Update Prices</label>
                        </div>
                        <div className='cat-name-inp'  style={{marginTop:"5px"}}>
                    <select className='select-inp' name="updateVehicleCategory" id="" onChange={(e)=>{onYearsSelected(e.target.value)}}>
                    <option value="" selected>Choose Vehicle Years</option>
                      {getyears.map((val)=>{
                         return (<option value={val.years}  >{val.years}</option>)
                          })}                
                    </select>
                    </div>
                      <div className='cat-name-inp' style={{marginTop:"10px"}}>
                        <input type="text" placeholder={selectedYears}  className='add-cat-inp' onChange={(e)=>{
                          setYears(e.target.value);
                        }}/>
                      </div>
                      <div className='cat-name-inp' >
                        <button className='add-cat-sb' onClick={updateYears}>Update</button>
                      </div>
                      </div>
                </div>:""}
                {showSections==="deleteYears" ? 
                <div className='veh-opr-reslt-del'> 
                   <div className='add-cat-container'  >
                        <div className='add-cat-lb'>
                            <label htmlFor="">Delete Prices</label>
                        </div>
                        <div className='cat-name-inp' style={{marginTop:"5px"}}>
                    <select className='select-inp' name="updateVehicleCategory" id="" onChange={(e)=>{onYearsSelected(e.target.value)}}>
                    <option value="" selected>Choose Vehicle Years</option>
                      {getyears.map((val)=>{
                         return (<option value={val.years}  >{val.years}</option>)
                          })}                
                    </select>
                    </div>
                      
                      <div className='cat-name-inp' >
                        <button className='add-cat-sb' onClick={deleteYears}>Delete</button>
                      </div>
                      </div>
                </div>:""}

      {showSections==="viewYears" ? <div className='veh-opr-reslt-makes-add' >
          <div className='add-cat-container'>
          <div className='add-cat-lb'>
          <label htmlFor="">Vehicle Make</label>
          </div>
        <div><select className='select-inp' name="viewVehicleCategory" style={{width:"250px"}} id="" onChange={(e)=>{}}>
                    <option value="" selected>All Vehicle Years</option>
          {getyears.map((val)=>{
        
                 return (
                     
                   <option value={val.years}  >{val.years}</option>
                   
                 )
                 
             })}

           </select>
           </div>
           
             </div>
      </div>:""}
        </div>
    </div>  
  )
}
