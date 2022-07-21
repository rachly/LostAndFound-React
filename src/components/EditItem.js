import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { item } from './../Store/Action/item'
import Categorys from '../components/Categorys';
import { useForm } from 'react-hook-form';
import { Edititem } from '../Store/Action/index';
import {useNavigate} from 'react-router-dom'

const EditIte = (props) => {
    const navigate=useNavigate();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm(
        { mode: "onBlur" });


    useEffect(() => {
        console.log("props.selected",props.selected)
        if( props.selected){
        setValue('itemPlace', props.selected.itemPlace);
        setValue('itemDescription', props.selected.itemDescription);
        setValue('nameFinder', props.selected.nameFinder);
        setValue('phoneFinder', props.selected.phoneFinder);
        setValue('isBargain', props.selected.isBargain);
        setcategory(props.selected.categoryCode)
        }
        else{
            navigate("/UserAcount")
        }
    }, [props.selected])
    const [category, setcategory] = useState(null);
    const fileInput = React.createRef();

    const onSubmit = (data) => {
        
        console.log("onSubmit",data);
        data["categoryCode"] = category;
        data["itemId"]=props.selected.itemId
        props.Edititem(data);

    }
    return (
        <>
            <div className="all-inputs">
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="p-reg"><h2>עדכון פריט</h2></div>
                    <div className="input-reg">
                        <input type="text" className="in"  {...register("itemPlace", { required: true })} />
                    </div>
                    <div className="input-reg">
                        <input type="text" className="in"  {...register("itemDescription", { required: true })} />
                    </div>
                    <div className="input-reg">
                        <input type="text" className="in"  {...register("nameFinder", { required: true })} />
                    </div>
                    <div className="input-reg">
                        <input type="text" className="in"  {...register("phoneFinder", { required: true })} />
                    </div>
                    <Categorys getCategory={setcategory} category={category}/>
                    <div className='box'>
                    <select  {...register("isBargain", { required: true })} >
                        <option value="true">אבדה</option>
                        <option value="false">מציאה</option>

                    </select>
                    </div>
                    <input type="submit" className='in1' value="שמור" />

                </form>
            </div>
        </>
    )

}
const mapStateToProps = (state) => {
    return {
        selected: state.item.selected
    }
}
export default connect(mapStateToProps,{Edititem})(EditIte);