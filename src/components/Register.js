import { connect } from "react-redux";
import { useState } from 'react'
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { AddUser } from '../Store/Action/index';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert';
import './Register.scss';

const Register = (props) => {
    const [check, setcheck] = useState(false)
    const [dis, setdis] = useState(true)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [tryClicky, setTryClicky] = useState(false)
    
    const handleInputChange = (e) => {
        setdis(false);
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        setcheck(value);
    }
    const onSubmit = (data) => {
        data["isPriemum"] = false;
        data["isActive"] = false;
        props.AddUser(data);
        setTryClicky(true);

    }
    const navigate = useNavigate();

    useEffect(() => {
        if (tryClicky) {
            if (props.theUser != null) {
                localStorage.setItem('myUser', JSON.stringify(props.theUser));
                Swal({
                    icon: 'success',
                    title: 'תודה שהצטרפת אלינו! מייד תועבר לדף הבא',
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate("/InsertItem");
            }
        }
    }, [props.theUser])



    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="all-inputs">
                    <div><h2 className="p-reg">הרשמה</h2></div>
                    <div className="input-reg">
                        <input focus className="in" type="text" placeholder='הכנס שם מלא' {...register("userName", { required: true })} title="זהו שדה חובה" />
                    </div>

                    <div className="input-reg">
                        <input className="in" type="text" placeholder='מקום מגורים' {...register("city", { required: true })} title="זהו שדה חובה" />
                    </div>
                    <div className="input-reg">
                        <input className="in" type="text" placeholder='מספר פלאפון' {...register("phone", { required: true })} pattern="05?[0-9]-?[0-9]{7}" title="אנא הזן מספר סלולרי תקין" />
                    </div>
                    <div className="input-reg">
                        <input className="in" type="text" placeholder='מייל' {...register("mail", { required: true })} pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$" title="אנא הזן כתובת מייל תקינה" />
                    </div>
                    <div className="input-reg">
                        <input className="in" type="text" placeholder='סיסמה' {...register("password", { required: true })} pattern=".{6,12}" title="אנא הזן 6-12 תווים" />
                    </div>
                    <div>
                        <div className="check">
                            <input className="inCheck" name="terms" type="checkbox" checked={check} onChange={handleInputChange} />
                            <p>אני מסכים לתקנון</p>
                        </div>
                        <p><Link to="/Terms"> תקנון </Link></p>
                    </div>
                    <div className="input-reg1">
                        <input type="submit" disabled={dis} className="in1" value="הירשם" />

                    </div>
                </div>
            </form>

        </>
    )
}

const mapDispatchToProps = (state) => {
    return {
        arrUsers: state.user.users,
        theUser: state.user.theUser
    }
}
export default connect(mapDispatchToProps, { AddUser })(Register);
