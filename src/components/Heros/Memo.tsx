import React, { useState } from 'react'

interface Props {
    imcrement: any,
    count: number
}

const MemoCallBack: React.FC<Props> = ({ imcrement, count }) => {
    console.log('render MemoCallBack')
    return (
        <>
           
            <h1>Memo  {count}</h1>
            <button onClick={() => imcrement(3)}>imcrement</button>
            {/* <input type="text" /> */}
        </>
    )
}
export default React.memo(MemoCallBack)