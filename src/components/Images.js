import React,{useEffect,useState} from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.scss";
import Swal from 'sweetalert';

let formData = new FormData();

const Images = (props) => {
    const { handleSubmit, register } = useForm({
        mode: "onBlur"
    });
    const [tryClicky, setTryClicky] = useState(false)
    const fileInput = React.createRef();
    const navigate = useNavigate();

    const onSubmitFn = data => {
        postFile(data, fileInput.current.files[0]);
        setTryClicky(true);
    }
    useEffect(() => {
        if (tryClicky){
       
            Swal({
        icon: 'success',
        title: 'המודעה נשמרה בהצלחה!',
        showConfirmButton: false,
        timer: 1500
    })
    navigate("/Home");
        }
    
    }, [tryClicky])

    
    const postFile = (caption, fileToUpload) => {
        console.log(fileToUpload)
        const endpoint = `https://localhost:44395/api/Image/uploadImage`;
        const fd = new FormData();
        fd.append('m', props.itemId.toString());
        fd.append('Image', fileToUpload);
        fd.append('ImageCaption', caption);
        return axios.post(endpoint, fd);

    }


    return (
        <>


            <form action method="post" onSubmit={handleSubmit(onSubmitFn)}>
                <div className="form-group file-area">    
                    <input type="file" name="images" className="im success" ref={fileInput} id="images" required="required" multiple="multiple" />
                    <div class="file-dummy">
                        <div class="success">יופי! התמונה עלתה בהצלחה!</div>
                        <div class="default">יש לבחור תמונה</div>
                    </div>
                </div>
                <button type="submit" className="in1" >
                    שמור
                </button>
            </form>


        </>
    );
};
const mapDispatchToProps = (state) => {
    return {
        itemId: state.item.itemId
    }
}
export default connect(mapDispatchToProps)(Images);

