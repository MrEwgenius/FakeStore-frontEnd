import React, { FormEvent, useEffect, useState } from "react"
import style from './AddProduct.module.scss'
import { Button, Col, Dropdown, Form, Modal, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { ProductSelectors, addNewProduct, getProductList } from "src/redux/reducers/productSlice"
import ReactImageUploading, { ImageListType } from "react-images-uploading"
import { ACCESS_TOKEN_KEY } from "src/utils/constans"

const AddProduct: React.FC = () => {

    const [name, setName] = useState('')
    const [gender, setGender] = useState('man')
    const [clothingType, setClothingType] = useState('bike')
    const [price, setPrice] = useState(1000)
    const [brandName, setBrandName] = useState('')
    const [typeName, setTypeName] = useState('')
    const [images, setImages] = useState<ImageListType>([]);
    const maxNumber = 6;


    const dispatch = useDispatch();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // Добавьте вашу логику обработки отправки формы
        onSubmit()
        // console.log("Form submitted:", formData);
    };

    const error = useSelector(ProductSelectors.getError);
    // console.log(error);

    useEffect(() => {
        if (error) {
            // Обработка ошибки, например, вывод сообщения пользователю
            console.log('Error:', error.message);
        }
    }, [error]);


    const [checked, setChecked] = useState<any>([])
    const handleCheck = (event: any) => {
        let updatedList = [...checked];
        if (event.target.checked) {
            updatedList = [...checked, event.target.value];
            console.log(event.target.value);

        } else {
            updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setChecked(updatedList);
    };






    const onChange = (
        imageList: ImageListType,
    ) => {
        console.log(1);

        if (images.length !== imageList.length) {
            // Вызываем обновление состояния только если изменился список изображений
            setImages(imageList as never[]);
        }
    };


    const onSubmit = () => {

        const formData = new FormData()
        formData.append('name', name);
        formData.append('gender', gender);
        formData.append('clothingType', clothingType);
        formData.append('price', `${price}`);
        formData.append('brandName', brandName)
        formData.append('typeName', typeName)
        images.forEach((image) => {
            if (image.file) {
                formData.append(`image`, image.file as Blob);
            }
        });
        if (Array.isArray(checked)) {
            checked.forEach(size => {
                formData.append('size', size);
            });
        } else {
            formData.append('size', checked);
        }
        // if (file) {
        //     formData.append('image', file);
        // }



        dispatch(addNewProduct({
            data: formData, callback: () => { },
        }
        ))
        // console.log(formData);



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
                Size:

            </label>
            <br />
            <div>
                <label htmlFor="xs"> XS</label>
                <input value={'xs'} onChange={(e) => handleCheck(e)} name="checkbox" id="xs" type="checkbox" />
            </div>
            <div>
                <label htmlFor="s"> S</label>
                <input onChange={(e) => handleCheck(e)} value={'s'} name="checkbox" id="s" type="checkbox" />
            </div>
            <div>
                <label htmlFor="m"> M</label>
                <input onChange={(e) => handleCheck(e)} value={'m'} name="checkbox" id="m" type="checkbox" />
            </div>
            <div>
                <label htmlFor="l"> L</label>
                <input onChange={(e) => handleCheck(e)} value={'l'} name="checkbox" id="l" type="checkbox" />
            </div>
            <div>
                <label htmlFor="xl"> XL</label>
                <input onChange={(e) => handleCheck(e)} value={'xl'} name="checkbox" id="xl" type="checkbox" />
            </div>
            <br />

            <label>
                {/* <input type="file" accept="image/*" onChange={selectFile} /> */}

                Image:
                <ReactImageUploading
                    multiple
                    value={images}
                    onChange={onChange}
                    maxNumber={maxNumber}



                >
                    {({
                        imageList,
                        onImageUpload,
                        onImageRemoveAll,
                        onImageUpdate,
                        onImageRemove,
                        isDragging,
                        dragProps
                    }) => (
                        <div className={style.uploadImageWrapper}>
                            <button type="button"
                                style={isDragging ? { color: "red" } : undefined}
                                onClick={onImageUpload}
                                {...dragProps}
                                disabled={maxNumber === images.length}
                                className={style.buttonser}
                            >
                                Добавить изображение
                            </button>
                            &nbsp;
                            <button type="button" onClick={onImageRemoveAll}>Удалить все изображения</button>
                            {imageList.map((image, index) => (
                                <div key={index} className={style.imageItem}>

                                    <img
                                        src={image.dataURL}
                                        alt="#!"
                                        width="100"
                                    />
                                    <div className={style.imageItemBtnWrapper}>

                                        <button
                                            type="button"
                                            onClick={() => onImageUpdate(index)}
                                        >
                                            Заменить
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => onImageRemove(index)}
                                        >
                                            Удалить
                                        </button>

                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </ReactImageUploading>
            </label>
            <br />
            <br />
            {error && <div className={style.error}>{`${error.message}`}</div>}
            <button type="submit">Submit</button>
        </form>

    )
}
export default AddProduct
