import logo from './logo.svg';
import './App.scss';
import Found from './components/Found';
import InsertItem from './components/InsertItem';
import ShowByCategory from './components/ShowByCategory';
import Home from './components/Home';
import Login from './components/Login';
import { Route, Routes, Link,useNavigate } from 'react-router-dom'
import ShowByFilter from './components/ShowByFilter';
import Register from './components/Register';
import UserAcount from './components/UserAcount';
import WebFont from 'webfontloader';
import { useEffect } from 'react'
import Images from './components/Images';
import About from './components/About';
import Terms from './components/Terms';
import EditItem from './components/EditItem';
import { connect } from "react-redux";
import { saveUser } from './Store/Action/index';
import Aos from 'aos';
import "aos/dist/aos.css";
import dog from './Images/dog.png';



// import { EditItem } from './Store/Action';
function App(props) {
  const Navigate=useNavigate(); 
  useEffect(() => {
    Navigate("/Home");
  const user=  JSON.parse(localStorage.getItem("myUser"))
    if(user){
props.setUser(user)
    }
    
    console.log(props.userID,"from APP")
    
    WebFont.load({
      google: {
        families: ['Varela Round']
      }
    });
  }, []);
  const logout=()=>{
    localStorage.removeItem("myUser")
props.setUser(null)
  }
  const myFunction=() =>{
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }
  return (

    <> 
    <nav className='navbar'>
    {/* <input type="checkbox" className='menuToggle'/>
            <label for="menuToggle" class="menu-icon"><i class="fa fa-bars"></i></label> */}
    <ul className='nav_list'>
          <li>
            <Link to="/Home">
              <p className='link'>עמוד הבית</p>
              <p className='hidden_link'>עמוד הבית</p>
            </Link>
          </li>
        </ul>
     
      
        <ul className='nav_list'>
          <li>
            <Link to="/Login">
              <p className='link'>כניסה</p>
              <p className='hidden_link'>כניסה</p>
            </Link>
          </li>
        </ul>
    {!props.userID?    <ul className='nav_list'>
          <li>
            <Link to="/Register">
              <p className='link'>הרשמה</p>
              <p className='hidden_link'>הרשמה</p>
            </Link>
          </li>
        </ul>:<ul  onClick={logout} className='nav_list'>
          <li>
            <Link to="/Home">
              <p className='link'>יציאה</p>
              <p className='hidden_link'>יציאה</p>
            </Link>
          </li>
        </ul>}

        <ul className='nav_list'>
          <li>
            <Link to="/InsertItem">
              <p className='link'> פרסום מודעה</p>
              <p className='hidden_link'> פרסום מודעה</p>
            </Link>
          </li>
        </ul>   
        {props.userID&&
        <ul className='nav_list'>
          <li>
            <Link to="/UserAcount">
              <p className='link'>אזור אישי</p>
              <p className='hidden_link'>אזור אישי</p>
            </Link>
          </li>
        </ul> }
        {/* <ul className='nav_list'>
          <li><Link to="/About">
            <p className='link'>אודות</p>
            <p className='hidden_link'>אודות</p>
          </Link>
          </li>
        </ul> */}
      </nav>
      <a href="javascript:void(0);" class="icon" onclick="myFunction()"></a>

      <input type="checkbox" id="active"/>
    <label for="active" class="menu-btn"><span></span></label>
    <label for="active" class="close"></label>
    <div class="wrapper">   
 <ul> 
 <li><Link to="/Home">עמוד הבית </Link></li>
 <li><Link to="/Login">כניסה</Link></li>
 <li><Link to="/InsertItem">פרסום מודעה</Link></li>
 {!props.userID?<li><Link to="/Register">הרשמה</Link></li>:
 <li onClick={logout}><Link to="/Register">יציאה</Link></li>
 }
{props.userID&&<li><Link to="/UserAcount">אזור אישי</Link></li>}


</ul>

</div>
      <Routes>
        <Route path="/Register" element={<Register />} />
        <Route path="/About" element={<About />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/ShowByCategory" element={<ShowByCategory />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/InsertItem" element={<InsertItem />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/ShowByFilter" element={<ShowByFilter />} />
        <Route path="/Images" element={<Images />} />
      {props.userID?  <Route path="/EditItem" element={<EditItem />} />:null}
      {props.userID? <Route path="/UserAcount" element={<UserAcount/>} />:null}
      <Route path="/Terms" element={<Terms/>} />

        <Route path="*"  element={<Home/>} />
        {/* element={<Navigate replace to="/Home" */}
      </Routes>
      {/* <footer>
      <div className='footer'>
    <div className='f'>
  <div>
<img src={dog} width={150} height={150} />
</div> 
  <p><Link to="/Terms"> תקנון </Link></p>
</div></div>
      </footer> */}
    </>
  )
}
const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (u) => dispatch(saveUser(u))
  }
}
const mapStateToProps=(state)=>{
  return{
    userID: state.user.theUser
  }
  }
  export default connect(mapStateToProps,mapDispatchToProps)(App);
