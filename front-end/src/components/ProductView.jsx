import React, {useEffect, useState} from 'react'
import Grid from '../components/Grid'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import ImageSlider from './ImageSlider';
import Size from './Size';
import { addItem } from '../redux/shopping-cart/cartItemsSlide'
import { useDispatch } from 'react-redux'
import { withRouter } from 'react-router'



const ProductView = (props) => {
    const dispatch = useDispatch()

    const number =[1,2,3,4,5,6,7,8,9,10]

    let imageApi = 'http://admeliora.tk/api/products/images/'
  
    const [productDetail, setProductDetail] = useState({images:[],defaultImage: null,Size:[]})
    useEffect(()=>{
        setProductDetail(props.productDetail)
    },[props])

    // console.log("props", props)
    
    const [previewImg, setPreviewImg] = useState(imageApi+props.productDetail.defaultImage)

    useEffect(()=>{
        setPreviewImg(imageApi+props.productDetail.defaultImage)
    },[imageApi+props.productDetail.defaultImage])
    // ========================================

//  set size
    const [size, setsize] = useState([])
    useEffect(()=>{
        if  (props.productDetail.Sizes ===undefined){
            setsize([])
        }
      
        else {setsize(props.productDetail.Sizes)}
        
    },[props])
// =========================================

    
    const [value, setvalue] = useState(undefined)

    const getinfor = (e) =>{
        setvalue(e.target.value)
    }

    const check = () => {

        if (value === undefined) {
            alert('Vui lòng chọn kích cỡ!')
            return false
        }

        return true
    }
    // =======================================
    const addCard =()=>{
        // console.log({value})
        if (check()) {
        var newitem ={
            image: props.productDetail.defaultImage,
            name :productDetail.name,
            product_detail_id : value,
            price : productDetail.price,
            discount: productDetail.discount
        }
        if (dispatch(addItem(newitem))) {
            alert('Success')
            props.history.push('/cart')
            
        } else {
            alert('Fail')
        }
        console.log("newitem", newitem)
    }}


    return (
        <div className="products">    
  
                <Grid   col={2}
                      mdCol={2} 
                      smCol={1}
                      gap={10}
                    >
                <div>
                    <div className="product_images_main">
                    < img className ="main_img" src={previewImg} alt=""/>
                    </div>
                     <div className="list_images">
                         <img  className = "children_img"  onClick={()=> setPreviewImg(imageApi+props.productDetail.defaultImage)} src={imageApi+props.productDetail.defaultImage} alt=""/>
                        {productDetail.images.map((item,index)=>(                 
                            <ImageSlider 
                                key={index}
                                src={imageApi+item} setPreviewImg={setPreviewImg} className ="image">                         
                            </ImageSlider>                      
                        ))}        
                    </div>  

                </div>


                <div className = "second_frame">
                    <div className="product_infor">
                    <div className="product_infor_title">
                        <h1>{productDetail.name}</h1>
                    </div>
                    <div className="product_infor_category">
                        <p>{productDetail.category}</p>
                    </div>


                    <div className = "dropdown_frame">

                    <select onChange={getinfor} value={value} className="dropdown_size">
                        <option hidden="hidden">Size</option>
                            {
                                                   
                                size.map((item,index)=>(
                                    
                                    
                                <option key={index} value ={item.product_detail_id}  >
                                    {item.size_name}
                                </option>
                       
                                ))}
                        </select>
                        <select className="dropdown_number">
                                <option className="dropdown_list" hidden="hidden">Quantity</option>
                                    { 
                                    number.map((item)=>(
                                    <option>                                            
                                        {item}
                                    </option>
                                    ))}

                        </select>
    
                    </div>
                    
                        
                    <div className="product_infor_price">
                        {productDetail.price + " " + "VND"}
                    </div>
                    <div className = "button_frame">
                    <button onClick={()=> addCard()} className = "button_enter">Thêm Vào Giỏ Hàng</button>
                    </div>

                    <div className="description">
                        <h3 className = "font_size_description">Mô tả</h3>
                        <p className = "font_size_description">{"Dòng áo"+" : "+ productDetail.product_line}</p>
                        <p className = "font_size_description"> 
                            {"Color"+" : "+productDetail.color}
                        </p>
                        <p className = "font_size_description">
                            <h5>Size</h5>
                            {
                                size.map((item,index)=>(
                                    <Size
                                    key={index}
                                    size_name={item.size_name}>
                                   </Size>                                   
                                ))
                            }
                        </p>
                        <h3 className = "font_size_description">Thông điệp : </h3>
                        <p className = "font_size_description">“Do what you want while you can“ đây
                             là cụm từ các bạn đã quá quen
                              rồi đúng không nào. Trên Dreamer
                            Tee season 2 lần này, AD để dòng
                            chữ này cùng với những hình bộ
                                xương mang ý nghĩa chúng ta hãy
                                làm những điều mính thích trước
                                khi quá trễ, và hãy cháy hết mình
                                 với tuổi trẻ này. “Dreammer“ là người
                                 hay mơ mộng, nhưng đừng suốt ngày cứ 
                                mơ mộng hãy biến giấc mơ của mình thành
                             hiện thực. Thêm nữa, làm gì cũng sẽ có khó
                              khăn với thử thách nên cứ “I don’t give
                               a fuck“ và bước tiếp. </p>
                    </div>                   
                            
                </div>  
                </div>               
            </Grid>    
        </div>           
    )
} 


export default withRouter(ProductView)