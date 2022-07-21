import React, { Component, useEffect } from 'react';
import { getAllCategory, GetAllCategory } from '../Store/Action/index';
import { connect } from 'react-redux';
import "./Register.scss";
const Categorys = (props) => {
    useEffect(() => {
        props.GetAllCategory();
    }, [])
   

    return (
        <>
        <div className='box'>
            <select  onChange={(e) => props.getCategory(e.target.value)} >
                <option>בחר קטגוריה</option>
                {props.arrC.map((item, index) => {  
                
                    return ( <>
                      
                    <option selected={props.category===item.categoryCode}  value={item.categoryCode} key={index}>{item.categoryName}</option>
                 </>  )
                }
                )}
            </select>
            </div>
        </>

    )
}
const mapStateToProps = (state) => {
    return {
        arrC: state.item.categorys
    }
}
export default connect(mapStateToProps, { GetAllCategory })(Categorys);