import React from 'react'
import './Search.css'

function Search({params, onParamChange}) {
    return (
              <div className="forms">
                <form className="formElements">

                    <label>Description</label>
                    <input type="text" onChange={onParamChange} value={params.description} name="description">
                    </input>

                    <label>Location</label>
                    <input type="text" onChange={onParamChange} value={params.location} name="location">
                     </input> 

                    <input type="checkbox" onChange={onParamChange} value={params.full_time} name="full_time"></input>
                    <label>Only full time</label>     
                       
                </form>
          
          </div>
    )
}

export default Search
