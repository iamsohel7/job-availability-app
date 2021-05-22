import {useEffect, useReducer} from 'react'
import axios from 'axios'

const API = 'https://jobs.github.com/positions.json'  

//Object with the actions for the reducer function.
const ACTIONS = {
    MAKE_REQUEST: 'make-request',
    GET_DATA: 'get-data',
    ERROR: 'error',
    UPDATE_HAS_NEXT_PAGE: 'update-has-next-page'
  }

  

function reducer(state, actions) {
    switch(actions.type){
        case ACTIONS.MAKE_REQUEST: 
            return {loading : true, jobs: []}

        case ACTIONS.GET_DATA: 
            return { ...state, loading : false, jobs: actions.payload}    

        case ACTIONS.ERROR: 
            return {loading: false,error: actions.payload, jobs: []}  
        
        case ACTIONS.UPDATE_HAS_NEXT_PAGE:
          return { ...state, hasNextPage: actions.payload.hasNextPage }   

        default: return state    
               
        }
}

function useFetchJobs(params, page) {

    const [state, dispatch] = useReducer(reducer, { jobs:[], loading: false});

    useEffect(() => {

        const cancelToken = axios.CancelToken.source();  //to cancel the request when this component is not present.

        dispatch({type:ACTIONS.MAKE_REQUEST,})  //dispatching to set the loading state while making the fetch 
                                                 //request.

        const fetchPosts = async () => {
          
            const res = await axios.get(API,{
                                            cancelToken: cancelToken.token,
                                            params: { page: page, ...params }  
                                        });
            
            dispatch({type: ACTIONS.GET_DATA, payload: res.data})  //dispatching to set the fetched data to current 
                                                                    //state.    
        };
    
        fetchPosts();

                        
        return () => {
            cancelToken.cancel()
       }

   }, [params, page])

    return state  //Returning the current state
}

export default useFetchJobs


