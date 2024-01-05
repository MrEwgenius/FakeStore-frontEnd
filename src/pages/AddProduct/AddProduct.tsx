import React, { FormEvent, useEffect, useState } from "react"
import style from './AddProduct.module.scss'
import { Button, Col, Dropdown, Form, Modal, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { ProductSelectors, addNewProduct, getProductList } from "src/redux/reducers/productSlice"
import { ImageListType } from "react-images-uploading"




// interface FormData {
//     name: string;
//     price: number;
//     rating: number;
//     brandId: number;
//     typeId: number;
//     gender: string;
//     img: File | null;
// }
const AddProduct: React.FC = () => {

    // const [formData, setFormData] = useState<FormData>({
    //     name: '',
    //     price: 0,
    //     rating: 0,
    //     brandId: 0,
    //     typeId: 0,
    //     gender: '',
    //     img: null,
    // });

    const [info, setInfo] = useState([])
    const [name, setName] = useState('')
    const [gender, setGender] = useState('man')
    const [clothingType, setClothingType] = useState('')
    const [price, setPrice] = useState(0)
    const [brandId, setBrandId] = useState(0)
    const [typeId, setTypeId] = useState(0)
    const [file, setFile] = useState<File | null>(null);

    const dispatch = useDispatch();
    const productList = useSelector(ProductSelectors.getProductLister);

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    //     const { name, value } = e.target;
    //     setFormData((prevData) => ({ ...prevData, [name]: value }));
    // };

    // const handleFileChange = (e: any) => {
    //     const file = e.target.files?.[0] || null;
    //     setFormData((prevData) => ({ ...prevData, img: file }));
    // };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // Добавьте вашу логику обработки отправки формы
        onSubmit()
        // console.log("Form submitted:", formData);
    };
    const selectFile = (e: any) => {
        console.log(e.target.files[0]);

        setFile(e.target.files[0]);
    }
    const onSubmit = () => {
        const formData = new FormData()
        formData.append('name', name);
        formData.append('gender', gender);
        formData.append('clothingType', clothingType);
        formData.append('price', `${price}`);
        formData.append('brandId', `${brandId}`)
        formData.append('typeId', `${typeId}`)
        // formData.append('img', `${file}`)
        if (file) {
            formData.append('img', file);
        }

        console.log(formData);
        dispatch(addNewProduct({
            data: formData, callback: () => { }
        }
        ))

    }


    return (

        <form onSubmit={handleSubmit} >
            <label>
                Name:
                <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <br />
            <label>
                Price:
                <input type="number" name="price" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
            </label>
            <br />
            <label>
                Brand ID:
                <input type="number" name="brandId" value={brandId} onChange={(e) => setBrandId(Number(e.target.value))} />
            </label>
            <br />
            <label>
                Type ID:
                <input type="number" name="typeId" value={typeId} onChange={(e) => setTypeId(Number(e.target.value))} />
            </label>
            <br />
            <label>
                Gender:
                <select name="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value="male">man</option>
                    <option value="female">women</option>
                </select>
            </label>
            <br />
            <label>
                Image:
                <input type="file" accept="image/*" onChange={selectFile} />
            </label>
            <br />
            <button  type="submit">Submit</button>
        </form>

    )
}
export default AddProduct
