import React from 'react'
const InputHero: React.FC = () => {
    console.log('render InputHero')
    return (
        <>
            <h1>InputHero</h1>
            {/* <input type="text" /> */}
        </>
    )
}
export default React.memo(InputHero)