/* eslint-disable no-console */
import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { apiGet } from '../Misc/config';

const Show = () => {
    
    const {id} = useParams();
    const [show, setShow] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`).then(results => {

            setTimeout(()=>{
                setShow(results);
                setIsLoading(false);
            }, 2000)          
        }).catch(err => {
            setError(err.msg);
            setIsLoading(false)
        })
    }, [id])
    console.log('show',show);

    if(isLoading){
        return <div>data is loading</div>
    }
    if(error){
        return <div>Error Occured: {error}</div>
    }
    return (<div>this is show poge</div>
    )
}

export default Show
