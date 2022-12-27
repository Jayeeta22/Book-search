import React from 'react'
import "./App.css"
import { useState } from 'react'
import axios from 'axios'


function App() {
  const [searchbooks,setsearchbooks]=useState("")
  const [result,setResult]=useState([])
  const [hover,setHover]=useState(false)

  const handelChange=(e)=>{
    setsearchbooks(e.target.value)
  }
  const handelsubmit=(e)=>{
    e.preventDefault()
    console.log(searchbooks)
    axios.get("https://www.googleapis.com/books/v1/volumes?q="+searchbooks)
    .then(data=>{
      setResult(data.data.items)
      console.log(data.data.items)
    })
    

  }

  const handelMouseOver=()=>{
    setHover(true)
  }


  const handelMouseOut=()=>{
    setHover(false)
  }
  return (
    <div className='main'>
      <div className='heading'>
        <h1>BOOK SEARCH</h1>
      </div>

    <div className='search-bar'>
      <form onSubmit={handelsubmit}>
      <input id='book-search' placeholder='search books' value={searchbooks} onChange={handelChange} /> 
      <button type="submit"><i class="fa fa-search"></i>🔍</button>
    </form>
      
    </div>

    <div className='showitems'>
      {
        result.map((value,index)=>{
          return(<div className='img' key={index} >
             <a href={value.volumeInfo.previewLink} >
              <img src={value.volumeInfo.imageLinks.smallThumbnail} height="250px" width="200px" alt={value.title}
               onMouseOver={handelMouseOver} onMouseOut={handelMouseOut}/>     
           
           {hover && <div className='title'> {value.volumeInfo.title}</div>}   
             {hover && <div className='author'> {value.volumeInfo.authors}</div>} 
              {hover && <div className='page'>Page Count: {value.volumeInfo.pageCount}</div>}
             {hover&& <div className='rating'>Rating: {value.volumeInfo.ratingsCount}</div>} 
            </a>
            
          </div>
            
           
          )
          
          
        })
      }
    </div>
    </div>
  )
}

export default App