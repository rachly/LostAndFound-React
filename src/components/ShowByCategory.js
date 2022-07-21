import React, { Component, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllCategory, GetAllCategory } from '../Store/Action/index';
import { connect } from 'react-redux';
import { Link, Route, Routes } from "react-router-dom";
import Found from '../components/Found';
import { SET_IS_TYPE } from '../ActionTypes';
import './ShowByCategory.scss';


const ShowByCategory = (props) => {
    const arr = ["A", "B", "C", "D", "E", "F", "G", "H"]
    useEffect(() => {
        if (props.arrC != null) {
            props.GetAllCategory();
        }
    }, [])

    const navigate = useNavigate();
    const navig = () => {
        navigate("/ShowByFilter");
    }
    return (
        <>
            <div className='grid'>
                {props.arrC.map((item, index) => {

                    return (<button className={arr[index]}
                        onClick={() => { props.setType(item.categoryCode); navig() }} value={item.categoryCode} key={index}>
                        <div className='cat' key={index}>{item.categoryName}</div>

                    </button>
                    )
                })}
            </div>


        </>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        setType: (categoryCode) => dispatch({ type: SET_IS_TYPE, paylod: categoryCode }),
        GetAllCategory: () => dispatch(GetAllCategory())


    }
}

const mapStateToProps = (state) => {
    return {
        arrC: state.item.categorys
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ShowByCategory);