import React, {ChangeEvent} from 'react'

type PropsType = {
    value: string
    changeValue: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Input: React.FC<PropsType> = props => {
    return <input type="text" value={props.value} onChange={props.changeValue}/>
}