import React, { useContext, useState } from 'react'
import { Button, Form, FormGroup,  Input, Label } from 'reactstrap'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToEnglishName, getError } from '../utils'
import { toast } from "react-toastify";
import { Store } from '../components/store';

const PostProductScreen = () => {
    const { state } = useContext(Store);
    const { userInfo } = state;
    const navitation = useNavigate()
    const [title, setTitle] = useState("");
    const [secondTitle, setSecondTitle] = useState("");
    const [textarea, setTextarea] = useState("");
    const [file, setFile] = useState("");
    const token = JSON.parse(localStorage.getItem('Token')) || null
    const handelTakeToLogin = () => {
        navitation('/Simple-project-frontend/login');
    }
    const goHomePage = () => {
        navitation('/Simple-project-frontend/');
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        
        let imageURL = ""
        if (file) {
            imageURL = 'https://simple-demo.onrender.com/upload/' + file[0].name;
        } else {
            imageURL = 'https://simple-demo.onrender.com/upload/noImage.jpg'
        }
        try {
            const formData = new FormData();
            formData.append('name', title);
            formData.append('chname', secondTitle);
            formData.append('category', ToEnglishName(e.target.select.value));
            formData.append('image', file[0]); //加入文件
            formData.append('imageURL', imageURL ); //加入文件路徑(網路上)
            formData.append('description', textarea);
            const { data } = await axios.post("https://simple-demo.onrender.com/api/products/admin", formData, {
                headers: {
                    Authorization: token,
                    'content-type': 'multipart/form-data'
                }
            })
            if (data) {
                toast.success("新墤產品成功");
                navitation('/Simple-project-frontend/')
            }
        } catch (error) {
            if(error.response.data === "Unauthorized"){
                toast.error("無操作此功能的權限")
            } else {
                toast.error(getError(error));
            }
        }

    
    }
    return (
        <div>
            {!userInfo && (<div>
              
              <p>Please login to post a product</p>
              <Button onClick={handelTakeToLogin}>Login</Button>
          </div>)}
            {userInfo && userInfo.role === 'Admin' ?  (
        <Form style={{ "width": "60%", "margin": "auto" }} onSubmit={submitHandler}>        
            <FormGroup>
            <Label for="title">
                標題
            </Label>
            <Input
            id="title"
            name="title"
            placeholder="請輸入產品名稱"
            type="text"
            required ={true}
            onChange={(e)=>setTitle(e.target.value)}
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
            onChange={(e)=>setSecondTitle(e.target.value)}
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
            <option>
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
                    data=""
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        setTextarea(data)
                    } }
                />
        </FormGroup>
        <FormGroup>
            <Label for="exampleFile">
                圖片(檔案限制:5MB,僅接受jpg/png)
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
                </Form>) : (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <h1>無操作此功能的權限，請返回上一頁</h1>
                        <Button onClick={goHomePage}>返回</Button>
                </div>)
            }

    </div>
  )
}

export default PostProductScreen