/* eslint-disable no-underscore-dangle */
import React, {useEffect, useReducer} from 'react'
import { useParams } from 'react-router-dom'
import { apiGet } from '../Misc/config';

import Cast from '../Components/Show/Cast';
import Details from '../Components/Show/Details';
import Seasons from '../Components/Show/Seasons';
import ShowMainData from '../Components/Show/ShowMainData';


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
        let isMounted = true;

        apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
        .then(results => {
            if(isMounted){
                dispatch({ type: 'FETCH_SUCCESS', show: results})
            }
        }).catch(err => {
            if(isMounted){
                dispatch({ type: 'FETCH_FAILED', error: err.message})
            }
        });

        return () =>{
            isMounted = false;
        };
    }, [id]);

    // eslint-disable-next-line no-console
    console.log('show',show);

    if(isLoading){
        return <div>data is loading</div>
    }
    if(error){
        return <div>Error Occured: {error}</div>
    }
    return <div>
        <ShowMainData 
            image={show.image} 
            name={show.name} 
            rating={show.rating} 
            summary={show.summary} 
            tags={show.genres}
        />

        <div>
            <h2>Details</h2>
            <Details 
                status={show.status} 
                network={show.network} 
                premiered={show.premiered}
            />
        </div>
        <div>
            <h2>Seasons</h2>
            <Seasons 
                seasons={show._embedded.seasons}
            />
        </div>
        <div>
            <h2>Cast</h2>
            <Cast 
                cast={show._embedded.cast}
            />
        </div>
    </div>
}

export default Show;
