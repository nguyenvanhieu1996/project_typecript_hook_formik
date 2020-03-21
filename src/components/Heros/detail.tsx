import React from 'react'
import { Hero } from '../../store/heros/types';
const DetailHero: React.FC<{ dataDetail: Hero  }> = ({ dataDetail }) => {
    console.log('render DetailHero')
    return (
        <>
            <h1>Detail</h1>
            <label> {dataDetail.id}</label>
            <label> {dataDetail.name}</label>
        </>
    )
}
export default DetailHero