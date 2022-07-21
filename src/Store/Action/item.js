import * as ActionType from "../../ActionTypes";
import axios from 'axios';

//הצגת כל הפריטים 
export const item = (type, isBargin, limit, page) => {
    return (dispach) => {
        axios.get(`https://localhost:44395/api/item?type=${type}&isBargin=${isBargin}&limit=${limit}&page=${page}`)
            .then(res => {
                console.log(res.data)
                dispach(saveItem(res.data))
            })
            .catch(err => {
                console.log(err);
            })
    }
}


export const saveItem = (items) => {
    return {
        type: ActionType.SAVE_ITEMS,
        paylod: items
    }
}
//הוספת פריט חדש
export const AddItem = (item) => {
    return (dispach) => {
        axios.post(`https://localhost:44395/api/item/SetItem`, item)
            .then(res => {
                console.log(item)
                dispach(addItem(res.data))


            })
    }
}

export const addItem = (item) => {
    return {
        type: ActionType.SET_ITEMS,
        paylod: item
    }
}
//יצוא כל הקטגוריות
export const GetAllCategory = () => {
    return (dispach) => {
        axios.get(`https://localhost:44395/api/Category/GetAllCategory`)
            .then(res => {
                dispach(getAllCategory(res.data))
            })
    }
}

export const getAllCategory = (category) => {
    return {
        type: ActionType.SAVE_CATEGORY,
        paylod: category
    }

}
//Delete Item
export const UpdateItem = (item) => {
    return (dispach) => {
        axios.delete(`https://localhost:44395/api/item/DeleteItem?itemId=${item}`)
            .then(res => {
                console.log(item + "קוד פריט למחיקה")
                dispach(updateItem(res.data))


            })
    }
}

export const updateItem = (item) => {
    return {
        type: ActionType.UPDATE_ITEM,
        paylod: item
    }
}
//הצגת פריטים לפי קוד משתמש
export const itemById = (id) => {

    return (dispach) => {
        axios.get(`https://localhost:44395/api/item/getAllItemUser?userId=${id}`)
            .then(res => {
                console.log(res)
                dispach(ItemById(res.data))
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const ItemById = (items) => {
    return {
        type: ActionType.ITEM_BY_ID,
        paylod: items
    }
}
export const getAllColors=(type,key)=>{
    return(dispach)=>{
        axios.get(`https://localhost:44395/api/color/getColors?type=${type}&key=${key}`)
        .then(res=>{
            console.log(res)
            dispach(saveColors(res.data))
        })
        .catch(err=>{
            console.log(err);
        })
    }
    }
    
    export const saveColors=(colors)=>{
        return{
            type:ActionType.SAVE_COLORS,
            paylod:colors
        }
    }

    
    export const SelectItem=(item)=>{
        return (dispach)=>{
                dispach(Select(item))
           
        }
    }
    export const Select=(item)=>{
        return{
            type:ActionType.SELECT_EDIT,
            item :item
        }
    }
    export const Edititem=(item)=>{
        return (dispach)=>{
            axios.post(`https://localhost:44395/api/item/EditItem`,item)
            .then(res=>{
                console.log(res.data)
                dispach(editItem(res.data))
            })
        }
    }
    export const editItem=(item)=>{
        return{
            type:ActionType.EDIT_ITEM,
            paylod:item
        }
    }