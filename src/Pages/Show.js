/* eslint-disable no-console */
import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { apiGet } from '../Misc/config';

const Show = () => {
    
    const {id} = useParams();
    const [show, setShow] = useState(null);

    useEffect(()=>{
        apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`).then(results => {
            setShow(results);
        })
    }, [id])
    console.log('show',show);


    return (<div>this is show poge</div>
    )
}

export default Show
