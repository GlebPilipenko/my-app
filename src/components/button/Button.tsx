import React from 'react'

type PropsType = {
    getData: () => void
}

export const Button: React.FC<PropsType> = props => {
    return <button onClick={props.getData}>+</button>
}