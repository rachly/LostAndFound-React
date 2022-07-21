import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import Chart from 'chart.js/auto';
import "./About.scss";
import CountUp from 'react-countup';
import notes from '../Images/notes.png';
import users from '../Images/users.png';
import Aos from 'aos';
import "aos/dist/aos.css";
import VisibilitySensor from 'react-visibility-sensor';


const About = (props) => {
    const [data, setdata] = useState([])
    const [user, setuser] = useState(0)
    const [item, setitem] = useState(0)

    useEffect(() => {
        Aos.init({});
        axios.get(`https://localhost:44395/api/item/countItem`)
            .then(res => {
                setdata(res.data)
            })
            .catch(err => {
            })
    }, [])
    useEffect(() => {
        Aos.init({});
        axios.get(`https://localhost:44395/api/user/getAllUsers`)
            .then(res => {
                setuser(res.data)
            })
            .catch(err => {
            })
    }, [])
    useEffect(() => {
        axios.get(`https://localhost:44395/api/item/AllItem`)
            .then(res => {
                setitem(res.data)
            })
            .catch(err => {
            })
    }, [])


    const state = {
        labels: ["ביגוד", "תכשיטים", "אלקטרוניקה", "משקפיים", "פלאפונים", "תיקים", "ארנקים", "כרטיסים"],
        datasets: [
            {
                label: "Rainfall",
                backgroundColor: [
                    "#ff000088",
                    "#ff660088",
                    "#ffe60088",
                    "#7bff0088",
                    "#00ffb388",
                    "#0077ff88",
                    "#6200ff88",
                    "#ff00b388"
                ],
                borderColor: "#3d3d3d",
                borderWidth: 2,
                data: data
            }
        ]
    }
    return (<>
        <h1 className="h1">...אספנו לכם קצת מידע</h1>
        <div className='allCount'>
            <div data-aos="flip-up">
                <img src={users} width={170} height={130} />
                <CountUp end={user} >
                    {({ countUpRef, start }) => (
                        <VisibilitySensor onChange={start}>
                            <span ref={countUpRef} />
                        </VisibilitySensor>
                    )}
                </CountUp>
                <p>משתמשים</p>
            </div>
            <div className='notes' data-aos="flip-up">
                <img src={notes} width={120} height={130} />
                <CountUp end={item} >
                    {({ countUpRef, start }) => (
                        <VisibilitySensor onChange={start}>
                            <span ref={countUpRef} />
                        </VisibilitySensor>
                    )}
                </CountUp>
                <p>מודעות</p>
            </div>
        </div>
        <p className="p">כמה מודעות פורסמו לפי קטגוריה?</p>
        <div className='pie'>
            <Pie data={state} />
        </div >

    </>);
}

export default About;