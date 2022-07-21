import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useState } from 'react'
import { connect } from 'react-redux';
import { logUser, LogOut } from "../Store/Action/index";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert';
import './Register.scss';

const Login = (props) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [tryClicky, setTryClicky] = useState(false)

const navigate=useNavigate();
    const onSubmit = (data) => {
        props.logUser(data);
        setTryClicky(true)

       
    }

    useEffect(() => {
        if (tryClicky){
        if(props.theUser == null) {
            Swal({
                icon: 'error',
                title: '...אופססס',
                text: 'אינך רשום במערכת, אנא בצע רישום מחדש',
                footer: '<a href="">Why do I have this issue?</a>'
            })

            navigate("/Register")
        }
        else {
            localStorage.setItem('myUser', JSON.stringify( props.theUser));
            Swal('כניסה בוצעה בהצלחה, מייד תועבר לדף הבא');

        }
        if(props.theUser){
                        navigate("/InsertItem");
        }
    }
    }, [props.theUser])

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="all-inputs">
                    <div >
                        <h2 className="p-reg">כניסה לאזור האישי</h2>
                    </div>
                    <div className="input-reg">
                        <input className="in" type="text" placeholder="שם משתמש"   {...register("userName", { required: true })} />
                    </div>
                    <div className="input-reg">
                        <input className="in" type="text" placeholder="סיסמה"  {...register("password", { required: true })} pattern=".{6,12}" title="אנא הזן 6-12 תווים" />
                    </div>

                    <div className="input-reg">
                        <input className="in" type="text" placeholder='מייל' {...register("mail", { required: true })} pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$" title="אנא הזן כתובת מייל תקינה" />
                    </div>

                    <div className="input-reg1">
                        <input type="submit" value="היכנס" className="in1"  />
                    </div>


                </div>
            </form>


        </>);

}

const mapStateToProps = (state) => {
    return {
        theUser: state.user.theUser
    }
}
export default connect(mapStateToProps, { logUser })(Login);