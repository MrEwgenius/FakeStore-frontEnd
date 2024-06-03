import React, { FormEvent, useEffect, useState } from "react"
import style from './AddProduct.module.scss'
import { Button, Col, Dropdown, Form, Modal, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { ProductSelectors, addNewProduct, addNewProductFailure, getBrandProduct, getTypeProduct, responseMessage } from "src/redux/reducers/productSlice"
import ReactImageUploading, { ImageListType } from "react-images-uploading"
import { ACCESS_TOKEN_KEY } from "src/utils/constans"
import classNames from "classnames"
import { AuthSelectors, getUserInfo } from "src/redux/reducers/authSlice"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { RoutesList } from "../Router"

const AddProduct: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { t } = useTranslation()

    const typeProduct = useSelector(ProductSelectors.getTypeProducts);
    const brandProducts = useSelector(ProductSelectors.getBrandProducts)
    const userInfo = useSelector(AuthSelectors.getUserInfo)



    const [name, setName] = useState('')
    const [gender, setGender] = useState('man')
    const [clothingType, setClothingType] = useState('bike')
    const [price, setPrice] = useState(100)
    const [brandName, setBrandName] = useState('');
    const [typeName, setTypeName] = useState('')
    const [images, setImages] = useState<ImageListType>([]);

    useEffect(() => {
        if (!userInfo) {
            navigate(RoutesList.Home);
        } else {
            dispatch(getTypeProduct());
            dispatch(getBrandProduct());
        }
    }, [dispatch, navigate, userInfo]);





    const maxNumber = 6;

    useEffect(() => {
        dispatch(addNewProductFailure(''))
        // dispatch(responseMessage(''))

    }, [
        name,
        gender,
        clothingType,
        price,
        brandName,
        typeName,
        images,
    ])


    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // Добавьте вашу логику обработки отправки формы
        onSubmit()
        // console.log("Form submitted:", formData);
    };
    const successresponseMessage = useSelector(ProductSelectors.getResponseMessage)
    const error = useSelector(ProductSelectors.getError);
    console.log(successresponseMessage);

    useEffect(() => {
        if (error) {
            // Обработка ошибки, например, вывод сообщения пользователю
            console.log('Error:', error.message);
        }
    }, [error, dispatch, name]);


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
        if (images.length !== imageList.length) {
            setImages(imageList as never[]);
        }
    };



    const onSubmit = () => {
        try {
            const formData = new FormData()
            formData.append('name', name);
            formData.append('gender', gender);
            formData.append('clothingType', clothingType);
            formData.append('price', `${price}`);
            formData.append('brandName', brandName || brandProducts[0]?.name)
            formData.append('typeName', typeName || typeProduct[0]?.name)
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
            if (!!formData) {
                console.log(1);

            } else {

                console.log(2);

            }
            dispatch(addNewProduct({
                data: formData, callback: () => {
                    setName('')
                    setGender('man')
                    setClothingType('bike')
                    setPrice(100)
                    setImages([])
                    setChecked([])

                },
            }
            ))



        } catch (error) {
            console.log('error', error);

        }






    }



    return (

        <form className={style.formContainer} onSubmit={handleSubmit} >
            <label form="name" className={style.group}>
                <span className={style.groupName}>{t('addProduct.name')} </span>
                <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
            </label>

            <label form="price" className={style.group}>
                <span className={style.groupName}>{t('addProduct.price')}</span>
                <input type="number" name="price" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
            </label>

            <label form="brandName" className={style.group}>
                <span className={style.groupName}>{t('addProduct.brand')}</span>
                {/* <input type="text" name="brandName" value={brandName} onChange={(e) => setBrandName(e.target.value)} /> */}
                <select name="brandName" value={brandName} onChange={(e) => setBrandName(e.target.value)}>
                    {brandProducts.map((brand) => {
                        return <option key={brand.id} value={brand.name}>{brand.name}</option>
                    })}
                </select>
            </label>

            <div className={style.group}>
                <span className={style.groupName}>{t('addProduct.type')}</span>
                {/* <input type="text" name="typeName" value={typeName} onChange={(e) => setTypeName(e.target.value)} /> */}
                <select name="typeName" value={typeName} onChange={(e) => setTypeName(e.target.value)}>
                    {typeProduct.map((type) =>
                        <option key={type.id} value={type.name}>{type.name}</option>
                    )}
                </select>
            </div>

            <label form="clothingType" className={style.group}>
                <span className={style.groupName}>clothingType:</span>
                <input type="text" name="clothingType" value={clothingType} onChange={(e) => setClothingType(e.target.value)} />
            </label>

            <div className={style.group}>
                <span className={style.groupName}>{t('addProduct.sex')}</span>
                <select name="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value="male">man</option>
                    <option value="female">women</option>
                </select>
            </div>

            <div className={style.group}>
                <span className={style.groupName}>{t('addProduct.size')}</span>
                <div className={style.groupSizes}>
                    <div>
                        <label htmlFor="xs"> XS</label>
                        <input className={style.checkBox} value={'xs'} onChange={(e) => handleCheck(e)} name="checkbox" id="xs" type="checkbox" />
                    </div>

                    <div>
                        <label htmlFor="s">S </label>
                        <input className={style.checkBox} onChange={(e) => handleCheck(e)} value={'s'} name="checkbox" id="s" type="checkbox" />
                    </div>

                    <div>
                        <label htmlFor="m"> M</label>
                        <input className={style.checkBox} onChange={(e) => handleCheck(e)} value={'m'} name="checkbox" id="m" type="checkbox" />
                    </div>

                    <div>
                        <label htmlFor="l"> L</label>
                        <input className={style.checkBox} onChange={(e) => handleCheck(e)} value={'l'} name="checkbox" id="l" type="checkbox" />
                    </div>

                    <div>
                        <label htmlFor="xl"> XL</label>
                        <input className={style.checkBox} onChange={(e) => handleCheck(e)} value={'xl'} name="checkbox" id="xl" type="checkbox" />
                    </div>
                </div  >
            </div>

            <div className={style.group}>
                <span className={style.groupName}>{t('addProduct.img')}</span>
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
                            <div className={style.buttonGroup}>
                                <button
                                    type="button"
                                    style={isDragging ? { color: "red" } : undefined}
                                    onClick={onImageUpload}
                                    {...dragProps}
                                    disabled={maxNumber === images.length}
                                    className={style.addImageButton}
                                >
                                    {t('addProduct.imgButtonAdd')}
                                </button>
                                <button
                                    className={classNames(style.removeAllImageButton,
                                        { [style.none]: images.length < 1 })
                                    }
                                    type="button"
                                    onClick={onImageRemoveAll}
                                >
                                    {t('addProduct.buttonRemoveAllImage')}
                                </button>
                            </div>

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
                                            {t('addProduct.replace')}
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => onImageRemove(index)}
                                        >
                                            {t('addProduct.remove')}
                                        </button>

                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </ReactImageUploading>
            </div >

            {error && <div className={style.error}>{`${error.message}`}</div>}
            {successresponseMessage && <div className={style.success}>{`${successresponseMessage}`}</div>}
            <button className={style.button} type="submit">  {t('addProduct.buttonAddProduct')}</button>
        </form >

    )
}
export default AddProduct
