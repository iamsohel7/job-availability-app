import React, { useState } from 'react'

function Jobs(props) {

    const [ open, setOpen ] = useState(false); //state for the details-btn on a particular job data
    
    return (
           <div className="job-card">
               <div>
                    <p className="title">{props.job.title} - <span>{props.job.company}</span></p>
                        <span className="created-at">{new Date(props.job.created_at).toLocaleDateString()}</span>
                        <div className="type-location">
                            <span className="label">{props.job.type}</span>
                            <span className="label">{props.job.location}</span>
                        </div>
                    
                    <div dangerouslySetInnerHTML={{ __html: props.job.how_to_apply }}
                    className="apply"/>
                    <button className="details-btn" onClick={()=>setOpen(prevOpen=>!prevOpen)}>{open ? 'Hide Details' : 'View Details'}</button>
               </div>
               <img className="image"  src={props.job.company_logo} alt={props.company}/>  
               {
                   open?  <div dangerouslySetInnerHTML={{ __html: props.job.description}}/> : ''
               }
             
           </div>
      
    )
}

export default Jobs
