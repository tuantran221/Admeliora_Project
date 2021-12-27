import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "../components/Grid";
import { Link } from "react-router-dom";
import TodoItem from "../components/TodoItem";



const Profile = (props) => {


  
  const [userInfo, setUserInfo]  = useState({
    user_name: '',
    first_name: '',
    last_name: '',
    email: '',
    level: '',
    dob: '',
    PhoneNumbers: '',
    gender: '',
    Address: {
      address_id: '',
      province:'',
      district: '',
      street:'',
      detail_address:''
    }
  })


  let token = localStorage.getItem("accessToken");
  
  useEffect(() => {
    const fetchToken = async () => {
      const respone = await axios({
        method: "get",
        url: "http://admeliora.tk/api/user/profile",
        
        headers: { authorization: "token: " + token },
      });

      console.log(respone.data)

      let newtoken = respone.data.newToken
      setUserInfo(respone.data.data)


      //  user is not login 
      if (newtoken === null && token === null ) {
        console.log("token", token);

        props.history.push("/Login");
    
        alert("Bạn chưa có Tài khoản");
      } 
      
      else if (newtoken !== null && token !== null) {
        localStorage.getItem("accessToken", newtoken);
      }
      else
         axios({
          method: "get",
          url: "http://admeliora.tk/api/user/profile",
          headers: { authorization: "token: " + token },
      });
      
    };
    fetchToken();
  }, []);





console.log("user info", userInfo)

    

  function clear(){

    localStorage.clear("accessToken");
  } 
   

  
   

  const [state, setState] = useState({
    
    tasks: [],
    currentTask: "",
    

  });


  useEffect(()=>{
    setState(state.tasks = {
      tasks: [
        {
          name: (userInfo.first_name && userInfo.last_name) !== '' ?  userInfo.last_name + " " + userInfo.first_name  : "Nhập Họ và tên ...",
          completed: false,
        },
  
        {
          name: userInfo.user_name !== '' ? userInfo.user_name : "Nhập Tên Đăng Nhập ...",
          completed: false,
        },
        {
          name: userInfo.email !== '' ? userInfo.email:  "Nhập Gmail ... ",
          completed: false,
        },
        {
          name: userInfo.PhoneNumbers !== '' ? userInfo.PhoneNumbers: "Nhập Số Điện Thoại ... ",
          completed: false,
        },
        {
          name: userInfo.Address.address_id  !== '' ? userInfo.Address.detail_address + ' - \t xã: ' +  userInfo.Address.street + 
          '\t - huyện: ' + userInfo.Address.district + ' - \t tỉnh: '+ userInfo.Address.province : "Nhập địa chỉ ... ",
          completed: false,
        },
        {
           name : userInfo.dob !== '' ? userInfo.dob : 'ngày sinh, vd 11-1-2001 ...',
          completed: false,
        },
      ],
      currentTask: "",
    })
  }, [userInfo])


  
  
   
  function deleteTask(index) {
    console.log(index);

    let tasks = state.tasks;
    tasks.splice(index, 1);

    setState({
      tasks,
    });



    this.setState({
      tasks,
      currentTask: "",
      
    });
    
  }
  const updateTask = (newValue) => {
    setState({
      currentTask: newValue.target.value,
    });
  };

  function editTask(index, newValue) {
    var tasks = state.tasks;
    var task = tasks[index];
    task["name"] = newValue;
    setState({
      tasks,
    });
  }

  function changeStatus(index) {
    var tasks = state.tasks;
    var task = tasks[index];
    task.completed = !task.completed;
    setState({
      tasks: tasks,
    });
  }

  const [img, setImg] = useState({
    profileImg:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  });

  function imageHandler(e) {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImg({ profileImg: reader.result });
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  }
  const { profileImg } = img;





  const [gender, setGender] = useState("");

  const handleChange = (e) => {
    setGender(e.target.value);
  };

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ textDecoration: "underline" }}>Hồ Sơ của tôi</h1>
      </div>

      <div>
        <Grid col={2} mdCol={1} smCol={1} gap={20}>
          <div className="first_frame_profile">
            <div className ="frame_content_default" >
              <h2 className ="fname_lname_profile" >Họ & Tên:</h2>
              <h2 className ="fname_lname_profile1" >Tên Đăng Nhập:</h2>
              <h2 className ="fname_lname_profile2" >Gmail:</h2>
              <h2 className ="fname_lname_profile3" >Điện Thoại:</h2>
              <h2 className ="fname_lname_profile4" >Địa Chỉ:</h2>
              <h2 className ="fname_lname_profile5" >Ngày Sinh:</h2>
              

              <div>
                <h2 className ="fname_lname_profile6"  >Giới Tính:</h2>
              </div>

              <div style ={{display:"flex"}}>
                <h2 className ="fname_lname_profile7" >Level : </h2>
                <p className ="fname_lname_profile7" style={{marginLeft:"20px",}}>{userInfo.level}</p>
                </div>



                <div>
                
                <Link to="">
                  <h2
                    className ="fname_lname_profile8"  
                  >
                    Lịch Sữ Giao Dịch
                  </h2>
                </Link>

                <button
                  style={{
                    height: "30px",
                    width: "100px",
                    borderRadius: "20px",
                    backgroundColor: "white",
                    marginTop: "60px",
                    cursor:"pointer"
                  }}
                >
                  Lưu
                </button>
              </div>
            </div>

            <section>
              {state.tasks.map((task, index) => {
                return (
                  <TodoItem
                    key={index}
                    clickHandler={changeStatus}
                    index={index}
                    deleteTask={deleteTask}
                    editTask={editTask}
                    details={task}
                  />
                );
              })}

              

              <form className = "form_select_gender" >
                <label htmlFor="male" style={{ paddingLeft: "20px" }}>
                  <input
                    type="radio"
                    value="male"
                    id="male"
                    defaultChecked
                    onChange={handleChange}
                    name="gender"
                    
                  />
                  Nam
                </label>

                <label htmlFor="female" className ="radio_gender_profile" >
                  <input 
                    type="radio"
                    value="female"
                    id="female"
                    onChange={handleChange}
                    name="gender"
                  />
                  Nữ
                </label>


                <label htmlFor="other" className ="radio_gender_profile" >
                <input
                  type="radio"
                  value="other"
                  id="other"
                  onChange={handleChange}
                  
                  name="gender"
                />
                
                  Khác
                </label>
              </form>
            </section>
          </div>




          <div className="second_frame_profile">
            <div className="title_add_img_profile">
              <h2>Ảnh Của Bạn</h2>
            </div>

            <div className="container_frame_profile">
              <div className="img-holder">
                <img
                  src={profileImg}
                  alt=""
                  id="img"
                  className="img_user_input_profile"
                />
              </div>
              <input
                type="file"
                accept="image/*"
                name="image-upload"
                id="input"
                onChange={imageHandler}
              />
              <div className="label">
                <label className="image_upload" htmlFor="input">
                  <h4>Thay Đổi</h4>
                </label>
                <p style={{ marginTop: "20px" }}>
                  Quản lý thông tin hồ sơ để bảo mật tài khoản
                </p>
              </div>
            </div>

            <div style={{textAlign: "center" }}>
              <Link to="/Login">
                <button

                className ="exit_button_profile"
                  onClick={()=>clear()}
                >
                  log out
                </button>
              </Link>
            </div>
          </div>
        </Grid>
      </div>
    </div>
  );
};

export default Profile;