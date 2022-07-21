import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { item, getAllColors } from './../Store/Action/item'
import axios from 'axios';
import './ShowByFilter.scss';
import ReactPaginate from "react-paginate";
import place from '../Images/place.png';
const ShowByFilter = (props) => { 

    const [color, setColor] = useState({ value: "null" })
    const [key, setKey] = useState(null)
    const [isFind, setIsFind] = useState(false)
    const [clicked, setclicked] = useState(false)


    useEffect(() => {
        console.log("find")
        if (props.type != null && props.isBargin != null) {
            props.item(props.type, props.isBargin)
        }
    }, [props.type, props.isBargin])

    let limit = 6;
    let page = 0;
    useEffect(() => {
        console.log("find")
        if (page == 0) {
            if (props.type != null && props.isBargin != null) {
                props.item(props.type, props.isBargin, limit, page)
            }
        }

    }, [props.type, props.isBargain, limit]);

    const fetchComments = (currentPage) => {
        if (props.type != null && props.isBargin != null) {
            props.item(props.type, props.isBargin, limit, currentPage)
        }
    };

    const handlePageClick = (data) => {
        console.log(data.selected + "data");
        fetchComments(data.selected);


    };

    useEffect(() => {
        if (color != null && key != null) {
            Is(color, key)
        }
    }, [color, key])

    const getColors = (keYGet) => {
        setKey(keYGet)
        console.log(keYGet, props.type)
        if (props.type != null && keYGet != null) {
            props.getAllColors(props.type, keYGet);
        }

    }
    const Color = event => {
        setColor(event.target.value)
    }
    const Is = (color, id) => {
        axios.get(`https://localhost:44395/api/item/Is?id=${id}&colorId=${color}`)
            .then(res => {
                console.log(res.data + "Is")
                if (res.data) {
                    setIsFind(id)
                }
                else {
                    setIsFind(null)
                }
            })
    }
    return (
        <>
            <div >
                {props.arr.length == 0 ? <div><p className='noItem'>אין מודעות עבור קטגוריה זו</p></div> : <div className='gridD'>{props.arr.map((item) => <div key={item.itemId} >
                    <div className='design'>
                        {props.isBargin ? <h2 className='card'>פרטי אבידה</h2> : <h2 className='card'>פרטי מציאה</h2>}
                        <div className='d'>

                            <div>
                                <p className='place'>{props.isBargin ? <b>איפה איבדו אותי? </b> : <b>איפה מצאו אותי? </b>}<br /> {item.itemPlace} </p>
                                <p className='place'><b>תיאור פריט</b> <br /> {item.itemDescription}</p>
                                <div style={{ display: clicked ? 'none' : 'block' }}>
                                    {item.itemId == key ?
                                        <select
                                            className='select' onChange={Color} defaultValue={color.value}>
                                            <option value="">בחר צבע לזיהוי</option>
                                            {props.colors.map((color) => <option onClick={() => setclicked(true)} value={color.colorId}>{color.colorDescription}</option>)}

                                        </select> : null}
                                </div>

                                <button className='is' onClick={() => { getColors(item.itemId) }}>זה שלי?</button>

                            </div>
                            {console.log(item)}
                        </div>
                        {isFind == item.itemId ? <div className='d'>
                            <div>
                                {item.Image ? <img width={150} height={150} src={`data:image/png;base64,${item.Image.FileValue}`} /> : null}

                            </div>
                            <div className='c'>
                                <p> פרטי המוצא:</p>
                                <div className='dd'>
                                    <p>שם:</p>{item.nameFinder}
                                </div>
                                <div className='dd'>
                                    <p>טלפון:</p>{item.phoneFinder}
                                </div>
                            </div>
                        </div> : null}



                    </div>

                </div>)}</div>
                }
            </div>
            <div className='Pag'>
                <ReactPaginate
                    className='pa'
                    previousLabel={">"}
                    nextLabel={"<"}
                    breakLabel={"..."}
                    pageCount={props.sum / limit}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination justify-content-center"}
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                    activeClassName={"active"}
                />

            </div>
        </>
    )
}
const mapStateToProps = state => {
    return {
        isBargin: state.item.isBargin,
        type: state.item.type,
        arr: state.item.items,
        is: state.item.is,
        sum: state.item.sum,
        colors: state.item.colors

    }
}


export default connect(mapStateToProps, { item, getAllColors })(ShowByFilter)
