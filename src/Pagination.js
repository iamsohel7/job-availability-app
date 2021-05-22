import React from 'react';
import './Pagination.css';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {

    const pageNumbers = [];  //Array to get the total number of pages required to show all the data

     for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
     }

     return (
                <div className="pages">
                      {pageNumbers.map(number =>(
                          <button onClick={()=> paginate(number)} key={number} className="btn">
                              {number}
                           </button>
                        )
                      )}
                 </div>
       );
};

export default Pagination;