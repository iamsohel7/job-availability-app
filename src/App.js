
import './App.css';
import { useState } from 'react'
import useFetchJobs from './useFetchJobs'   //Custom hook to fetch data
import Jobs from './Jobs'
import Search from './Search'

import Pagination from './Pagination';

function App() {
 
 const [params, setParams] = useState({})
 const [page, setPage] = useState(1)
 const [postsPerPage] = useState(20);
 const {jobs, loading, error} = useFetchJobs(params, page);
 const [darkMode, setDarkMode] = useState(false);

 //function to get the user input of description and location field
 function handleParamChange(e) {
  const param = e.target.name
  const value = e.target.value
  setPage(1)
  setParams(prevParams => {
    return { ...prevParams, [param]: value }
  })
}

  //Setting the number of job posts that will be visible in a single page 
  const indexOfLastPost = page * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPost = jobs.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setPage(pageNumber);  //function to set the current page based on clicked page   
                                                            //number

  return (
          <div id="container" className={darkMode ? "dark-mode" : "light-mode"}>

                  <h1>GitHub Jobs App</h1>
                 <div className="container">
                    <span style={{ color: darkMode ? "grey" : "yellow" }}>☀︎</span>
                    <div className="switch-checkbox">
                      <label className="switch">
                        <input type="checkbox" onChange={() => setDarkMode(!darkMode)} />
                        <span className="slider round"> </span>
                      </label>
                    </div>
                    <span style={{ color: darkMode ? "#c96dfd" : "grey" }}>☽</span>
                 </div>
     

                  <Search params={params} onParamChange={handleParamChange}/> {/*Location & Description search component */}

                  {/*Pagination component to show data on different page no.s*/}  
                  <Pagination                      
                      postsPerPage={postsPerPage}
                      totalPosts={jobs.length}
                      paginate={paginate}
                    />

                  {
                    loading && <h1>Loading...</h1>  /*Loading text while fetching the data*/ 
                  }

                  {
                    error && <h3>{error.error}</h3>  /*if any error occurs while fetching*/
                  }
                
                  {
                    currentPost.map(items=>{      /*Mapping through the fetched data */        
                      return <Jobs key={items.id} job={items}/>  /*Job component that displays the data fetched */
                    })
                  }    
                
                  <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={jobs.length}
                    paginate={paginate}
                  />
          </div>
  );
}

export default App;
