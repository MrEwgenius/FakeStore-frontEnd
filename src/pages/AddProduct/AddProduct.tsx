import React, { FormEvent, useEffect, useState } from "react"
import style from './AddProduct.module.scss'
import { Button, Col, Dropdown, Form, Modal, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { ProductSelectors, addNewProduct, getProductList } from "src/redux/reducers/productSlice"
import { ImageListType } from "react-images-uploading"
import { ACCESS_TOKEN_KEY } from "src/utils/constans"




// interface FormData {
//     name: string;
//     price: number;
//     rating: number;
//     brandName: number;
//     typeName: number;
//     gender: string;
//     img: File | null;
// }
const AddProduct: React.FC = () => {

    // const [formData, setFormData] = useState<FormData>({
    //     name: '',
    //     price: 0,
    //     rating: 0,
    //     brandName: 0,
    //     typeName: 0,
    //     gender: '',
    //     img: null,
    // });

    const [name, setName] = useState('')
    const [gender, setGender] = useState('man')
    const [clothingType, setClothingType] = useState('bike')
    const [price, setPrice] = useState(1000)
    const [brandName, setBrandName] = useState('')
    const [typeName, setTypeName] = useState('')
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

    const error = useSelector(ProductSelectors.getError);
    console.log(error);

    useEffect(() => {
        if (error) {
            // Обработка ошибки, например, вывод сообщения пользователю
            console.log('Error:', error.message);
        }
    }, [error]);


    const onSubmit = () => {

        const formData = new FormData()
        formData.append('name', name);
        formData.append('gender', gender);
        formData.append('clothingType', clothingType);
        formData.append('price', `${price}`);
        formData.append('brandName', brandName)
        formData.append('typeName', typeName)
        if (file) {
            formData.append('img', file);
        }



        dispatch(addNewProduct({
            data: formData, callback: () => { },
        }
        ))
        console.log(formData);



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
                Brand Name:
                <input type="text" name="brandName" value={brandName} onChange={(e) => setBrandName(e.target.value)} />
            </label>
            <br />
            <label>
                Type Name:
                <input type="text" name="typeName" value={typeName} onChange={(e) => setTypeName(e.target.value)} />
            </label>
            <br />
            <label>
                clothingType:
                <input type="text" name="clothingType" value={clothingType} onChange={(e) => setClothingType(e.target.value)} />
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
            {error && <div className={style.error}>{`${error.message}`}</div>}
            <button type="submit">Submit</button>
        </form>

    )
}
export default AddProduct
