import React, { Component, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { itemById, UpdateItem, SelectItem } from '../Store/Action/index';
import { connect } from 'react-redux';
import axios from 'axios';
import moduleName from 'module'
import EditItem from '../components/EditItem';
import './ShowByCategory.scss';
const UserAcount = (props) => {
    const [select, setselect] = useState(null);


    useEffect(() => {
        if (props.theUser != null) {
            props.itemById(props.theUser.userId);
        }
    }, [])
    const navigate = useNavigate();

    const Delete = (id) => {
        props.UpdateItem(id);
    }

    const sendMail = (id, c) => {
        axios.post(`https://localhost:44395/api/User/EmailUser?userId=${id}&c=${c}`)
            .then(res => {
                console.log(res)
            })

    }

    return (
        <>
            <div className='mail'>
                {!props.theUser.isPriemum ? <div className='allM'><p className='yes1'> לדיוורים לפי אזור מגורך -</p>
                    <input type="button" className='yes' value="לחץ כאן" onClick={() => sendMail(props.theUser.userId, props.theUser.userId)} /></div> :
                    <div className='allM'><p className='yes1'>להפסקת הדיוור</p>
                        <input type="button" className='yes' value="לחץ כאן" onClick={() => sendMail(props.theUser.userId, 0)} />
                    </div>
                }</div>
            <div className='gridD'>
                {props.arr.map((item) => item.isActive ? <div key={item.itemId} >
                    <div className='design'>

                        <div>
                            <p className='place'>{item.isBargain ? <b>איפה איבדו אותי? </b> : <b>איפה מצאו אותי? </b>}<br /> {item.itemPlace} </p>

                            <p className='place'><b>איך אני נראה?</b> <br /> {item.itemDescription}</p>
                            {item.Image ? <img width={100} height={100} src={`data:image/png;base64,${item.Image.FileValue}`} /> : null}

                            <div className='divDelete'>
                                <button className='deleteEdit' onClick={() => Delete(item.itemId)}>מחיקה</button>
                                <button className='deleteEdit' onClick={() => { props.SelectItem(item); navigate("/EditItem") }}>עריכה</button>
                            </div>
                        </div>
                    </div>
                </div> : null)
                }
            </div>
        </>
    )
}



const mapStateToProps = (state) => {
    return {
        arr: state.item.itemById,
        theUser: state.user.theUser,
        selectItem: state.item.selected,
        isBargin: state.item.isBargin,

    }
}
export default connect(mapStateToProps, { itemById, UpdateItem, SelectItem })(UserAcount);