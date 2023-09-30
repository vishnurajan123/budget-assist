import React from 'react'
import './Main.css'
import { useState } from 'react'
function Main() {

    
    const [income,setIncome]=useState(null)
    const [entry,setEntry]=useState([0])
    const [expense,setExpense]=useState(null)
    const [text,setText]=useState("")
    const [transaction,setTransaction]=useState([{text:"",expense:0}])
    const [isIncomeValid,setIsIncomeValid]=useState(true)
    const [isTextValid,setIsTextValid]=useState(true)
    const [isExpenseValid,setIsExpenseValid]=useState(true)
    var totalTransaction=0
    var balance=0
    
    const ar=[]
    const handleIncome=(e)=>{
        e.preventDefault()
        if(!income){
            alert("Please fill the form")
        }
        else{
            setEntry([...entry,+income])
            
        }
       
    }
    var inco=entry.reduce((num1,num2)=>num1+num2)
    const validateIncome=(e)=>{
        
            const {value}=e.target
            if(!!value.match(/^[0-9]+$/)) {     
        setIncome(value)
        setIsIncomeValid(true)
        }
        else{
            setIncome(value)
        setIsIncomeValid(false)
        }
    }
    const handleTransaction=(e)=>{
        e.preventDefault()
        if(!expense||!text){
            alert("Please fill the form..!")
        }
        else{
            if(expense<=balance){
                setTransaction([...transaction,{text:text,expense:expense}])
                setText("")
                setExpense(null)
            }
            else{
                alert("Insufficient balance..!")
            }

        }

        
        

    }
   const getTransaction=(e)=>{
    const {name,value}=e.target
    if(name=="amount"){
        if(!!value.match(/^[0-9]+$/)){
            setExpense(value)
            setIsExpenseValid(true)

        }
        else{
            setExpense(value)
            setIsExpenseValid(false)
        }
        
    }
    else{
        setText(value)
    }
   }
   console.log(transaction);
   totalTransaction=transaction.map(item=>+(item.expense)).reduce((num1,num2)=>num1+num2)
   balance=inco-totalTransaction
   console.log(totalTransaction);
   console.log(balance);

    


  return (
    <div className='main'>

        <h1  className='heading'>Budget Calculator</h1>
       <div className='d-flex justify-content-center'>
            <div className='d-flex flex-wrap justify-content-evenly fl'>
                <div>
                    <div className='d-flex justify-content-center'>
                        <div className='balance'>
                            <h6>Your Balance </h6>
                            <h1>₹ {balance}</h1>
                        </div>
                    </div>
                    <div className='add text-center'>
                        
                        <form onSubmit={(e)=>handleIncome(e)}>
                            <input value={income||null} className='bt' type="text" placeholder='Add to budget /-' onChange={(e)=>validateIncome(e)} />
                            <input disabled={isIncomeValid?false:true}  className='btttn' type="submit" value={"Add"} />
                            {
                                !isIncomeValid &&
                                <div style={{color:"red"}} className=''>
                               * Invalid input
                            </div>
                            }
                            
                        </form>
                    </div>
                    

                    <div className='d-flex justify-content-center mt-5'>
                        <div className='income'><h4>INCOME</h4>
                        <h3>₹ {inco}</h3>
                        </div>
                        <div className="expense">
            
                        <h4>EXPENSE</h4>
                        <h3>₹ {totalTransaction}</h3>
                        </div>
                    </div>
                </div>
                <div className='trans'>
                <form onSubmit={(e)=>handleTransaction(e)}>
                        <h3 className='mt-4'>Add new transaction</h3>
                        <hr />
                    <div className='aaa mt-5'>
                            <h6><label htmlFor="text">Text</label></h6>
                            <input onChange={(e)=>getTransaction(e)} value={text||""} name='text' type="text" id='text' />
                    </div>
                    <div className='aaa mt-5'>
                            <h6><label htmlFor="text">Amount</label></h6>
                            <input  onChange={(e)=>getTransaction(e)} value={expense ||""} name='amount' type="text" id='text' />
                    </div>
                    {
                                !isExpenseValid &&
                                <div style={{color:"red"}} className=''>
                               * Invalid input
                            </div>
                            }
                    <div className='text-center  bttt'> <input disabled={isExpenseValid?false:true} className='btn mt-3 ' type="submit" value={"Submit"} />
                    
                    </div>
                </form>
                </div>
            </div>
       </div>
       <div>
        <h1 className='heading mt-5 pt-5'>Transaction History</h1>
        <div id='result' className='history'>
            <div className='his'>
                
                    <table >
                        <thead>
                            <th>  #</th>
                            <th>Amount</th>
                            <th>Description</th>
                        </thead>
                        <tbody>
                            {
                                transaction.map((item,index)=>(
                                    index>0 &&
                                   <tr>
                                        <td><span className='colo'>|</span>
                                        {index}
                                        </td>
                                        <td>
                                            {item.expense}
                                        </td>
                                        <td>
                                            {item.text}
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
        
            </div>
            
        </div>
       </div>
    </div>
  )
}

export default Main