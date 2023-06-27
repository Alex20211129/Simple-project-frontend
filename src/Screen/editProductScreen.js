import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { ToChineseName, ToEnglishName } from '../utils'
import { toast } from "react-toastify";
import { Store } from '../components/store';

const EditProductScreen = () => {
    const { state } = useContext(Store);
    const { userInfo } = state;
    const navitation = useNavigate()
    const nameRef = useRef()
    const chnameRef = useRef()
    const [product, setProduct] = useState("");
    const [textarea, setTextarea] = useState("");
    const [editCatrgory, setEditCatrgory] = useState("");
    const [file, setFile] = useState("");
    const token = JSON.parse(localStorage.getItem('Token')) || null
    const { id } = useParams()
    let src = ''
    
    const goHomePage = () => {
        navitation('/');
    }

    const sumitHandler = async(e) => {
        e.preventDefault()

        //如果file State裡沒有東西，預設提交原本的圖片
        let imageURL = ""
        if (!file) {
            imageURL = product.image.imageURL
        } else {
             imageURL = 'https://simple-demo.onrender.com/upload/' + file[0].name;
        }

        try {
            const formData = new FormData();
            formData.append('name', nameRef.current.value);
            formData.append('chname', chnameRef.current.value);
            formData.append('category', ToEnglishName(editCatrgory));
            formData.append('image', file[0]); //加入文件
            formData.append('imageURL', imageURL); //加入文件路徑(網路上)
            formData.append('description', textarea);
            const { data } = await axios.patch(`https://simple-demo.onrender.com/api/products/admin/${id}`, formData, {
                headers: {
                    Authorization: token,
                    'content-type': 'multipart/form-data'
                }
            })
            if (data) {
                toast.success("更新產品成功", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                navitation(`/categories/${ToEnglishName(editCatrgory)}`)
            }
        } catch (error) {
            if(error.response.data === "Unauthorized"){
                toast.error("無操作此功能的權限")
            } else {                
                toast.warning("更新產品失敗", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                navitation(`/categories/${ToEnglishName(editCatrgory)}`)
            }
        }

    }


    useEffect(() => {
        const fetchCategoryProduct = async () => {
            const { data } = await axios.get(`https://simple-demo.onrender.com/api/products/category/${id}`)
            setProduct(data)
            setEditCatrgory(ToChineseName(data.category))
        }
        fetchCategoryProduct()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

  return (
      <div>{!userInfo && <p>請先登入!!</p>}
          {userInfo && userInfo.role === 'Admin' ?  (
              <Form style={{ "width": "60%", "margin": "auto" }} onSubmit={sumitHandler}> 
                <FormGroup style={{"display":"flex","justifyContent":"center"}}>
                  <img
                    className='productImg'
                    src={product.image ? product.image.imageURL : src}
                    alt={product.name}
                    />
                </FormGroup>
            <FormGroup>
            <Label for="title">
                標題
            </Label>
            <Input
            id="title"
            name="title"
            placeholder="請輸入產品名稱"
            type="text"
            required={true}
            defaultValue={product.name}
            innerRef ={nameRef}
            />
        </FormGroup>
        <FormGroup>
            <Label for="secondTitle">
                副標題
            </Label>
            <Input
            id="secondTitle"
            name="secondTitle"
            placeholder="中文名稱"
            type="text"
            required ={true}
            defaultValue={product.chname}
            innerRef ={chnameRef}
            />
        </FormGroup>
        <FormGroup>
            <Label for="Select">
                分類
            </Label>
            <Input
            id="Select"
            name="select"
            type="select"
            value={editCatrgory} //預設分類
            onChange={(e)=>setEditCatrgory(e.target.value)}            
            >
            <option>
                工業用潤滑油
            </option>
            <option>
                車用齒輪油
            </option>
            <option>
                船舶用潤滑油
            </option>
            <option>
                食品機械用油
            </option>
            <option >
                金屬加工用油
            </option>
            <option>
                潤滑油脂
            </option>
            </Input>
        </FormGroup>
        <FormGroup >
            <Label for="exampleText">
                敘述
            </Label>
              <CKEditor
                    style={{"height":"600px"}}
                    editor={ ClassicEditor }
                    data={product.description}
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        //console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        setTextarea(data)
                    } }
                      />
        </FormGroup>
        <FormGroup>
            <Label for="exampleFile">
                File
            </Label>
            <Input
            id="exampleFile"
            name="file"
            type="file"
            onChange={(e)=>setFile(e.target.files)}
            />
        </FormGroup>
          <Button>
            Submit
        </Button>
       </Form>) :(
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <h1>無操作此功能的權限，請返回上一頁</h1>
                        <Button onClick={goHomePage}>返回</Button>
                </div>)
          }
      </div>
  )
}

export default EditProductScreen