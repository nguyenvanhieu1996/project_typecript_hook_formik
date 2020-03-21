import React from 'react'
const Square: React.FC<{ imcrement: Function, n: number }> = ({ imcrement, n }) => {
    console.log('render Square')
    return (
        <>
            <button onClick={() => imcrement(n)} key={n}>{n}</button>
        </>
    )
}
export default React.memo(Square)