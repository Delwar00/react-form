import React, { useEffect, useState } from 'react';
import axios from 'axios';
const Input = () => {
    const [inputValue,setInputValue]=useState({
        name:'',
        email:'',
        phone:'',
        uname:'',
        gender:'',
        photo:''
    });
    // console.log(inputValue);
    const [validationMsg,setValidationMsg]=useState({
        msg:'All field ',
        type:'info',
        status:false,
    });
    const handleFormSubmit=(e)=>{
        e.preventDefault();
        if(inputValue.name==='' || inputValue.email==='' || inputValue.phone==='' ||  inputValue.uname==='' || inputValue.gender===''){
            setValidationMsg({
                msg:'All fields are mandatory !',
                type:'danger',
                status:true, 
            });
        }
        else{
            //form submit that means post data
            axios.post("http://localhost:5050/users",inputValue
            // {
                // name:inputValue.name,
                // email:inputValue.email,
                // phone:inputValue.phone,
                // uname:inputValue.uname,
                // gender:inputValue.gender,
                // photo:inputValue.photo
            // }
            ).then(res=>{
                setValidationMsg({
                    msg:'Data Stable !',
                    type:'info',
                    status:true, 
                });
                setInputValue({
                    name:'',
                    email:'',
                    phone:'',
                    uname:'',
                    photo:''
                });
            }).catch(err=>{
                console.log(err);
            });
            
        }
    }
    //alert close form submit
    const handleCloseBtn=()=>{
        setValidationMsg({
            status:false, 
        });
    }
    //get data from api
    const [users,setUsers]=useState([]);
    useEffect(()=>{
        axios.get('http://localhost:5050/users').then(res=>{
            setUsers(res.data)
        }).catch(err=>{
            console.log(err);
        });
    },[users]);
    //data delete
    const handleDataDelete=(id)=>{
            axios.delete('http://localhost:5050/users/'+ id);
    }
  return (
    <>
        <section className='inputfiledall'>
            <div className="container my-5">
                <div className="row">
                    <div className='col-md-4'>
                    <div class="card shadow">
                        <div className='card-header'>
                            <h5 class="card-title">Create User</h5>
                        </div>
                        <div class="card-body">
                            {
                                validationMsg.status && <p className={`alert alert-${validationMsg.type} d-flex justify-content-between`}>{validationMsg.msg} <button onClick={handleCloseBtn} className='btn-close'></button></p>
                            }
                            <form action="" onSubmit={handleFormSubmit}>
                                <input className="form-control" type="text" placeholder="Name" value={inputValue.name} onChange={e=>setInputValue({...inputValue,name:e.target.value})}/>
                                <p>{inputValue.name}</p>
                                <input className="form-control" type="text" placeholder="Email" value={inputValue.email} onChange={e=>setInputValue({...inputValue,email:e.target.value})}/>
                                <p>{inputValue.email}</p>
                                <input className="form-control" type="text" placeholder="Phone" value={inputValue.phone} onChange={e=>setInputValue({...inputValue,phone:e.target.value})}/>
                                <p>{inputValue.phone}</p>
                                <input className="form-control" type="text" placeholder="Photo" value={inputValue.photo} onChange={e=>setInputValue({...inputValue,photo:e.target.value})}/>
                                <br></br>
                                <input className="form-control" type="text" placeholder="Uname" value={inputValue.uname} onChange={e=>setInputValue({...inputValue,uname:e.target.value})}/>
                                <p>{inputValue.uname}</p>
                                <input className="form-check-input" type="radio" name="gender" id="male" value="Male" onChange={e=>setInputValue({...inputValue,gender:e.target.value})}/>
                                <label className="form-check-label" for="male">Male</label>
                                <input className="form-check-input" type="radio" name="gender" id="Female" value="FeMale" onChange={e=>setInputValue({...inputValue,gender:e.target.value})}/>
                                <label className="form-check-label" for="Female">Female</label><br/><br/>
                                <button type="submit" class="btn btn-primary">Submit</button>
                            </form>
                        </div>
                        </div>
                    </div>
                    <div className='col-md-8'>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Gender</th>
                                <th scope="col">Photo</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Uname</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((data,index)=>
                                    <tr>
                                        <th scope="row">{index+1}</th>
                                        <td>{data.name}</td>
                                        <td>{data.email}</td>
                                        <td>{data.gender}</td>
                                        <td><img style={{width:'60px',height:'60px'}}src={data.photo} alt="" /></td>
                                        <td>{data.phone}</td>
                                        <td>{data.uname}</td>
                                        <td><button onClick={ ()=>handleDataDelete(data.id) } className='btn btn-danger btn-sm'>Delete</button></td>
                                    </tr>
                                )
                            }
                            
                            
                        </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default Input