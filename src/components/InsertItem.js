import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { item, AddItem, UpdateItem } from '../Store/Action/index';
import Categorys from "../components/Categorys";
import { useForm } from 'react-hook-form';
import Images from '../components/Images';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert';
import './Register.scss';
const InsertItem = (props) => {

    const [category, setcategory] = useState(null);
    const [clicked, setclicked] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        if (props.userID == null) {
            Swal({
                icon: 'error',
                title: '...אופססס',
                text: 'בבקשה לבצע כניסה למערכת',
                footer: '<a href="">Why do I have this issue?</a>'
            })
            return navigate("/Login");
        }
    }, [props.userID])

    const onSubmit = (data) => {

        data["categoryCode"] = category;
        data["userId"] = props.userID.userId;
        data["isActive"] = true;

      
        props.AddItem(data);
        setclicked(true);
        
    }
    

    return (
        <>
            <div className="all-inputs">
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div><h2 className="p-reg">פריט חדש</h2></div>
                    <div className="input-reg">
                        <input type="text" className="in" placeholder='עיר' {...register("itemPlace", { required: true })} />
                    </div>
                    <div className="input-reg">
                        <input type="text" className="in" placeholder='תיאור הפריט' {...register("itemDescription", { required: true })} />
                    </div>
                    <div className="input-reg">
                        <input type="text" className="in" placeholder='שם מלא' {...register("nameFinder", { required: true })} />
                    </div>
                    <div className="input-reg">
                        <input type="text" className="in" placeholder='מספר פלאפון' {...register("phoneFinder", { required: true })} pattern="05?[0-9]-?[0-9]{7}" title="אנא הזן מספר סלולרי תקין"  />
                    </div>
                    <div className="input-reg">
                        <input type="text" className="in" placeholder='פרט צבעים לזיהוי'  {...register("color", { required: true })} />
                    </div>
                    <div className="all-select">
                        <Categorys getCategory={setcategory} category={category} />

                        <div className='box'>
                            <select {...register("isBargain", { required: true })} >
                                <option >נאבד לך או מצאת?</option>
                                <option value="true">אבדה</option>
                                <option value="false">מציאה</option>

                            </select>
                        </div>
                    </div>
                    <div className="input-reg1">
                        <input type="submit" className="in1" value="שמור" style={{ display: clicked ? 'none' : 'block' }}/>
                    </div>


                </form>


                <div style={{ display: clicked ? 'block' : 'none' }}>
                    <Images itemId={props.itemId} />
                </div>
            </div>
        </>
    )
}

const mapDispatchToProps = state => {
    return {
        arr: state.item.items,
        userID: state.user.theUser
    }
}
export default connect(mapDispatchToProps, { AddItem, UpdateItem })(InsertItem);
