import React, {useEffect, useReducer} from 'react'
import { useParams } from 'react-router-dom'
import { apiGet } from '../Misc/config';

const reducer = (prevState, action) => {
    switch(action.type){
        case 'FETCH_SUCCESS' : {
            return {isLoading:false, error:null, show: action.show}
        }
        case 'FETCH_FAILED' : {
            return {...prevState, isLoading:false, error:action.error}
        }
        default:
            return prevState;
    }
};

const initialState= {
    show: null,
    isLoading: true,
    error: null,
};

const Show = () => {
    
    const {id} = useParams();

    const [{show, isLoading, error}, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {

        apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
        .then(results => {
                dispatch({ type: 'FETCH_SUCCESS', show: results})  
        }).catch(err => {
                dispatch({ type: 'FETCH_FAILED', error: err.message})
        });
    }, [id]);

    // eslint-disable-next-line no-console
    console.log('show',show);

    if(isLoading){
        return <div>data is loading</div>
    }
    if(error){
        return <div>Error Occured: {error}</div>
    }
    return <div>this is show poge</div>
}

export default Show;
