import React from 'react'
import { TitleWrapper } from './Title.styled'

const Title = ({title, subtitle}) => {
    return (
        <TitleWrapper>
            <h1>{title}</h1>
            <small>by Rakshit Gautam</small>
            <p>{subtitle}</p>
        </TitleWrapper>
    )
}

export default Title
