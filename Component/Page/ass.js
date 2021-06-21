import React from "react"
import "./acc.css"


let SearchBar = ()=>{
let [inputValue,setInputValue] = React.useState()

     return(
      <div>
        <input className="input" onChange={} value={inputValue} placeholder="Search Pokemon"/>
      </div>
      
      )
}


export const pathGet = (arr1, query) => {
  let found  = false
  let foundPath = ""
arr1.forEach((i)=>{
    Object.keys(u).forEach(k=>{
        if (typeof u[k] === "string" && u[k] === query) {
            return a[i][u]
        }else{
             Object.keys(u[k]).forEach((p)=>{
                    if (typeof u[k][p] === "string" && u[k][p] === query) {
                      return a[i][u];
                    }
             })
        }
    })

})
};