import React, {  useState, useEffect} from 'react'

import Helmet from '../components/Helmet'
import HeroSlider from '../components/HeroSlider'

import Section, {  SectionBody } from '../components/Section'


import Grid from '../components/Grid'
import ProductCard from '../components/ProductCard'



import axios from 'axios'

const Home = () => {
  




  const [heroSliderData, setslider] = useState([])
    useEffect(() => {
      const fetchProducts = async () => {
        const { data } = await axios.get('/api/heroSliderData')
        console.log('data', data)
        setslider(data)
      }
      fetchProducts()
    }, [])
  
    useEffect(() => {
      console.log(heroSliderData)
    }, [heroSliderData])


    const [product, setProduct] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products')
      console.log('data', data)
      setProduct(data)
    }
    fetchProducts()
  }, [])

  useEffect(() => {
    console.log(product)
  }, [product])


  const getAllProducts = () => product

  const getProducts = (count) => {
    const max = product.length - count

    const min = 0

    const start = Math.floor(Math.random() * (max - min) + min)

    return product.slice(start, start + count)
  }

  const productData = {
    getAllProducts,
    getProducts,
  }



    

  return (
    
    <Helmet title="Trang chủ">
      {/* hero slider */}
      <HeroSlider
          data={heroSliderData}
          control={true}
          auto={false}
          timeOut={5000}/>

      <section>
      <Grid >
        <div className = "contents">
        <h1 style = {{textAlign:"center", marginTop:"20px"}}>GIỚI THIỆU</h1>

        <h4 style = {{margin:"20px"}}>Dirtycoins xuất hiện trên thị trường từ đầu năm 2017, 
            Dirtycoins mang sức mạnh của một thương hiệu local brand 
            đầy cá tính với những sản phẩm thời trang hàng đầu xu thế.
            Dirtycoins thực chất là một cách lồng ghép khéo léo về sự ra đời 
            của thương hiệu. Chữ Y trên đồng tiền tượng trưng cho tiền thân của Dirtycoins, The Yars Shop.</h4>

        <h4 style = {{margin:"20px"}}>Bắt nguồn từ Yars, Dirtycoins trân trọng 
            giá trị của đồng tiền xương máu, thành quả lao 
            động đầy mồ hôi, bụi bẩn và nước mắt. Với sức hút của 
            mình, Dirty Coins trở thành biểu tượng cho phong cách thời 
            trang mạnh mẽ, táo bạo, và được ưa chuộng rộng rãi. 
            Dirtycoins mang đến một cái góc độ độc đáo không những 
            về phong cách sống mà còn về gout ăn mặc hiện đại. Dirtycoins 
            nhận thức được nhu cầu đang phát triển của thị trường Streetwear 
            Việt Nam. Những mặt hàng thời trang tại Dirtycoins được thiết kế 
            với sự kết hợp văn hoá Châu Á và Châu Âu, tạo ra phong cách độc đáo 
            và mới mẻ. Bên cạnh đó ,với sự phá cách từ tông màu trắng đen, tông 
            màu chủ đạo của đa số dòng thời trang Streetwear, các mẫu thời trang 
            tại Dirtycoins mang nhiều màu sắc phong phú. Đây là cách Dirtycoins 
            mang đến giá trị cho cộng đồng trẻ yêu thích Streetwear, khuyến khích 
            họ mạo hiểm trong gu ăn mặc của mình. Với tính cách mạo hiểm, không 
            ngại rủi ro, Dirtycoins dần mở rộng thị trường trong suốt quá trình phát 
            triển các chi nhánh trên toàn quốc, đem tới một nền văn hoá rất riêng của Dirtycoins.</h4>
        </div>        
      </Grid>
      </section>

      <section>
        <div className = "Imghome">
          <img className = "IMG1" src = "./images/img_home/imghome2.jpg" />
          <img  className = "IMG2"  src = "./images/img_home/imghome1.jpg" />
          
        </div>
      </section>



      <Section>
         <h1 style = {{textAlign:"center", margin:"40px"}}>Sản Phẩm Nổi Bật</h1>
              <SectionBody> 
                  <Grid
                      col={4}
                      mdCol={2}
                      smCol={1}
                      gap={20}>
                        {
                            productData.getProducts(8).map((item, index) => (
                                <ProductCard
                                    key={index}
                                    img01={item.image01}
                                    img02={item.image02}
                                    name={item.title}
                                    price={Number(item.price)}
                                    slug={item.slug}
                                />
                            ))
                        }
                    
                      
                  </Grid>
              </SectionBody>
              </Section>

    

  
   </Helmet> 
  )
}

export default Home
