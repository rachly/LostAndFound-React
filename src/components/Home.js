import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SET_IS_BARGIN } from './../ActionTypes'
import './Home.scss'
import ShowByCategory from './ShowByCategory';
import Logo3 from '../Images/logo3.png';
import dog from '../Images/dog.png';
import About from './About';

const Home = (props) => {

  const navigate = useNavigate();
  useEffect(() => {
    
    console.log("bargin changed!")
  }, [props.isBargin])

  const navig = () => {
    navigate("/ShowByCategory");
  }


  console.log(props.isBargin);
  return (
    <>
    <div className='body'>
      <div className='logo'>
        <div>
          <img className='dog' src={dog} width={150} height={150} />
        </div>

        <div>
          <p className='p'>
            <p > האתר הגדול למציאת אבידות</p>
            <div className='wra'>
            <b className='b'>נאבד לי </b></div>
          </p>
        </div>
      </div>
      <div className='b'>
        <div>
          <button className='btn draw-border' onClick={() => { props.setisBargin(true); navig() }}> 
              <p>איבדתי?</p></button>
        </div>
        <div>
          <img src={Logo3} width={550} height={500} className="i"/>
        </div>
        <div>
          <button className='btn draw-border' onClick={() => { props.setisBargin(false); navig() }}>
            <p>מצאתי!</p></button>
        </div>

      </div>
      <div className='divColor'></div>
      </div>
<About/>
    </>
  )
}
const mapStateToProps = state => {
  return {
    isBargin: state.item.isBargin
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setisBargin: (isbar) => dispatch({ type: SET_IS_BARGIN, paylod: isbar })
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)
