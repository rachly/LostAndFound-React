import React, { useEffect, useState } from 'react';
import { item, saveItem } from '../Store/Action/index';
import { connect } from 'react-redux';
import ShowByCategory from './ShowByCategory';

const Found = (props) => {
    useEffect(() => {
        props.item(type);
    }, [])


    const [type, settype] = useState(null);
    <ShowByCategory GetAllCategory={settype} />
    return (
        <div>
            {props.arr.map((item, index) => {
                return <li key={index}>{item.itemPlace}{item.categoryCode}{item.nameFinder}</li>
            })}
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        arr: state.item.items
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        item: () => dispatch(item())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Found);