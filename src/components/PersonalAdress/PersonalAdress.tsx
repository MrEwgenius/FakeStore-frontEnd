import React, { useEffect, useState } from "react"
import style from './PersonalAdress.module.scss'
import { useDispatch, useSelector } from "react-redux";
import { AuthSelectors, addUserAddress, getUserInfo } from "src/redux/reducers/authSlice";
import { useNavigate } from "react-router-dom";
import { RoutesList } from "src/pages/Router";

const PersonalAdress = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userInfo = useSelector(AuthSelectors.getUserInfo)
    const [selectedStreet, setSelectedStreet] = useState("");
    const [showAddress, setShowAddress] = useState(false);

    useEffect(() => {

        dispatch(getUserInfo())
    }, [dispatch])

    const handleStreetChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedStreet(event.target.value);
    };

    const onSubmit = () => {


        if (selectedStreet) {

            dispatch(addUserAddress({
                data: { address: selectedStreet },
                callback: () => {

                    dispatch(getUserInfo())
                }
            }))
            setShowAddress(false)
        }
    }
    const clickOnEdditAddress = () => {
        setShowAddress(!showAddress)
    }


    return (
        <div className={style.containerPersonalAdress}>
            <div className={style.titlePersonalAddress}>Адресс ближайшего отделения европочты, <span>Буларусь:</span></div>
            <br />


            {userInfo && userInfo?.adress ?

                <div className={style.containerWrapper}>
                    <div className={style.nameAdress}>{!showAddress && userInfo.adress}</div>
                    {showAddress &&
                        <>
                            <select name="street" id="street" value={selectedStreet} onChange={handleStreetChange}>
                                <option value="">Выберите улицу</option>
                                <option value="г. Минск, ул. Ангарская, 62а">г. Минск, ул. Ангарская, 62а</option>
                                <option value="г. Минск, ул. Могилевская, 14">г. Минск, ул. Могилевская, 14</option>
                                <option value="г. Минск, пр-т Дзержинского, 125А-212">г. Минск, пр-т Дзержинского, 125А-212</option>
                                <option value="г. Минск, ул. Е. Гедройца, 2">г. Минск, ул. Е. Гедройца, 2</option>
                                <option value="г. Минск, ул. Я. Райниса, 2а">г. Минск, ул. Я. Райниса, 2а</option>
                                <option value="г. Минск, ул. Водолажского, 15">г. Минск, ул. Водолажского, 15</option>
                                <option value="г. Минск, пр-т Партизанский, 13">г. Минск, пр-т Партизанский, 13</option>
                                <option value="г. Минск, пр-т Победителей, 89">г. Минск, пр-т Победителей, 89</option>
                                <option value="г. Минск, ул. Полтавская, 10">г. Минск, ул. Полтавская, 10</option>
                                <option value="г. Минск, ул. Туровского, 24-219">г. Минск, ул. Туровского, 24-219</option>
                                <option value="г. Минск, пр-т Дзержинского, 11">г. Минск, пр-т Дзержинского, 11</option>
                                <option value="г. Минск, пр-т Дзержинского, 23">г. Минск, пр-т Дзержинского, 23</option>
                                <option value="г. Минск, ул. Матусевича, 35">г. Минск, ул. Матусевича, 35</option>
                                <option value="г. Минск, ул. Бурдейного, 6">г. Минск, ул. Бурдейного, 6</option>
                                <option value="г. Минск, ул. Жилуновича, 45-19">г. Минск, ул. Жилуновича, 45-19</option>
                                <option value="г. Минск, ул. Багратиона, 55Б">г. Минск, ул. Багратиона, 55Б</option>
                                <option value="г. Минск, ул. Гамарника, 2">г. Минск, ул. Гамарника, 2</option>
                                <option value="г. Минск, ул. Калиновского, 66А">г. Минск, ул. Калиновского, 66А</option>
                                <option value="г. Минск, ул. Калиновского, 101">г. Минск, ул. Калиновского, 101</option>
                                <option value="г. Минск, ул. Калиновского, 81">г. Минск, ул. Калиновского, 81</option>
                                <option value="г. Минск, ул. Казимировская, 6">г. Минск, ул. Казимировская, 6</option>
                                <option value="г. Минск, ул. Каменногорская, 6-203">г. Минск, ул. Каменногорская, 6-203</option>
                                <option value="г. Минск, ул. Налибокская, 12-39">г. Минск, ул. Налибокская, 12-39</option>
                                <option value="г. Минск, ул. Неманская, 24">г. Минск, ул. Неманская, 24</option>
                                <option value="г. Минск, ул. Неманская, 85)">г. Минск, ул. Неманская, 85</option>
                                <option value="г. Минск, ул. Кульман, 5Б-72, пав.315">г. Минск, ул. Кульман, 5Б-72, пав.315</option>
                                <option value="г. Минск, ул. Академика Жебрака, 35">г. Минск, ул. Академика Жебрака, 35</option>
                                <option value="г. Минск, ул. Казинца, 52а">г. Минск, ул. Казинца, 52а</option>
                                <option value="г. Минск, ул. Николы Теслы, 6-1">г. Минск, ул. Николы Теслы, 6-1</option>
                                <option value="г. Минск, ул. Ильянская, 4-130">г. Минск, ул. Ильянская, 4-130</option>
                                <option value="г. Минск, ул. Асаналиева, 42">г. Минск, ул. Асаналиева, 42</option>
                                <option value="г. Минск, ул. Гошкевича 3-2">г. Минск, ул. Гошкевича 3-2</option>
                                <option value="г. Минск, ул. Прушинских, 2">г. Минск, ул. Прушинских, 2</option>
                                <option value="г. Минск, пр-т Пушкина, 29б">г. Минск, пр-т Пушкина, 29б</option>
                                <option value="г. Минск, ул. Шпилевского, 54">г. Минск, ул. Шпилевского, 54</option>
                                <option value="г. Минск, ул. Есенина, 76">г. Минск, ул. Есенина, 76</option>
                                <option value="г. Минск, ул. Есенина, 30 пом. 2Н">г. Минск, ул. Есенина, 30 пом. 2Н</option>
                                <option value="г. Минск, ул. Слободская, 131">г. Минск, ул. Слободская, 131</option>
                                <option value="г. Минск, ул. Лынькова, 85">г. Минск, ул. Лынькова, 85</option>
                                <option value="г. Минск, ул. Аэродромная, 3-64">г. Минск, ул. Аэродромная, 3-64</option>
                                <option value="г. Минск, ул. Аэродромная, 28">г. Минск, ул. Аэродромная, 28</option>
                                <option value="г. Минск, ул. Уманская, 54">г. Минск, ул. Уманская, 54</option>
                                <option value="г. Минск, пер. Загородный 1й, 3а">г. Минск, пер. Загородный 1й, 3а</option>
                                <option value="г. Минск, пр-т Независимости, 29-1Н">г. Минск, пр-т Независимости, 29-1Н</option>
                                <option value="г. Минск, пр-т. Независимости, 96-14">г. Минск, пр-т. Независимости, 96-14</option>
                                <option value="г. Минск, тр-т Сморговский, 7">г. Минск, тр-т Сморговский, 7</option>
                                <option value="г. Минск, пр-т Партизанский, 85">г. Минск, пр-т Партизанский, 85</option>
                                <option value="г. Минск, ул. Трудовая, 6-3">г. Минск, ул. Трудовая, 6-3</option>
                                <option value="г. Минск, пр-т Пушкина, 51-1Н">г. Минск, пр-т Пушкина, 51-1Н</option>
                                <option value="г. Минск ул. Белинского 54">г. Минск ул. Белинского 54</option>
                                <option value="г. Минск ул. Сурганова, 57Б-8">г. Минск ул. Сурганова, 57Б-8</option>
                                <option value="г. Минск, ул. Я. Коласа, 53к1">г. Минск, ул. Я. Коласа, 53к1</option>
                                <option value="г. Минск, ул. Богдановича, 89-2Н (м-н Евроопт)">г. Минск, ул. Богдановича, 89-2Н (м-н Евроопт)</option>
                                <option value=". Минск, ул. Богдановича, 134">г. Минск, ул. Богдановича, 134</option>
                                <option value="г. Минск, ул. Лукьяновича, 4Б">г. Минск, ул. Лукьяновича, 4Б</option>
                                <option value="г. Минск, ул. Плеханова, 38">г. Минск, ул. Плеханова, 38</option>
                                <option value="г. Минск, ул. Плеханова, 89">г. Минск, ул. Плеханова, 89</option>
                                <option value="г. Минск, ул. Рокоссовского 99">г. Минск, ул. Рокоссовского 99</option>
                                <option value="г. Минск, ул. Притыцкого, 29">г. Минск, ул. Притыцкого, 29</option>
                                <option value="г. Минск, ул. Карвата, 31">г. Минск, ул. Карвата, 31</option>
                                <option value="г. Минск, тр-т. Старовиленский, 10">г. Минск, тр-т. Старовиленский, 10</option>
                                <option value="г. Минск, ул. Лобанка, 22">г. Минск, ул. Лобанка, 22</option>
                                <option value="г. Минск, ул. Лобанка, 94">г. Минск, ул. Лобанка, 94</option>
                                <option value="г. Минск, ул. Мазурова, 24">г. Минск, ул. Мазурова, 24</option>
                                <option value="г. Минск, ул. П. Панченко, 60">г. Минск, ул. П. Панченко, 60</option>
                                <option value="г. Минск, ул. Янковского, 44">г. Минск, ул. Янковского, 44</option>
                                <option value="г. Минск, ул. Монтажников, 2">г. Минск, ул. Монтажников, 2</option>
                                <option value="г. Минск, ул. Ложинская, 20">г. Минск, ул. Ложинская, 20</option>

                            </select>
                            <button className={style.buttonEddAndSaveitUserAddress} onClick={onSubmit}>Сохранить</button>
                        </>
                    }

                    <button className={style.buttonEddAndSaveitUserAddress} onClick={clickOnEdditAddress}>{showAddress ? 'отменить' : 'редактировать'}</button>
                </div>
                :

                <div className={style.containerWrapper}>
                    <select name="street" id="street" value={selectedStreet} onChange={handleStreetChange}>
                        <option value="">Выберите улицу</option>
                        <option value="г. Минск, ул. Ангарская, 62а">г. Минск, ул. Ангарская, 62а</option>
                        <option value="г. Минск, ул. Могилевская, 14">г. Минск, ул. Могилевская, 14</option>
                        <option value="г. Минск, пр-т Дзержинского, 125А-212">г. Минск, пр-т Дзержинского, 125А-212</option>
                        <option value="г. Минск, ул. Е. Гедройца, 2">г. Минск, ул. Е. Гедройца, 2</option>
                        <option value="г. Минск, ул. Я. Райниса, 2а">г. Минск, ул. Я. Райниса, 2а</option>
                        <option value="г. Минск, ул. Водолажского, 15">г. Минск, ул. Водолажского, 15</option>
                        <option value="г. Минск, пр-т Партизанский, 13">г. Минск, пр-т Партизанский, 13</option>
                        <option value="г. Минск, пр-т Победителей, 89">г. Минск, пр-т Победителей, 89</option>
                        <option value="г. Минск, ул. Полтавская, 10">г. Минск, ул. Полтавская, 10</option>
                        <option value="г. Минск, ул. Туровского, 24-219">г. Минск, ул. Туровского, 24-219</option>
                        <option value="г. Минск, пр-т Дзержинского, 11">г. Минск, пр-т Дзержинского, 11</option>
                        <option value="г. Минск, пр-т Дзержинского, 23">г. Минск, пр-т Дзержинского, 23</option>
                        <option value="г. Минск, ул. Матусевича, 35">г. Минск, ул. Матусевича, 35</option>
                        <option value="г. Минск, ул. Бурдейного, 6">г. Минск, ул. Бурдейного, 6</option>
                        <option value="г. Минск, ул. Жилуновича, 45-19">г. Минск, ул. Жилуновича, 45-19</option>
                        <option value="г. Минск, ул. Багратиона, 55Б">г. Минск, ул. Багратиона, 55Б</option>
                        <option value="г. Минск, ул. Гамарника, 2">г. Минск, ул. Гамарника, 2</option>
                        <option value="г. Минск, ул. Калиновского, 66А">г. Минск, ул. Калиновского, 66А</option>
                        <option value="г. Минск, ул. Калиновского, 101">г. Минск, ул. Калиновского, 101</option>
                        <option value="г. Минск, ул. Калиновского, 81">г. Минск, ул. Калиновского, 81</option>
                        <option value="г. Минск, ул. Казимировская, 6">г. Минск, ул. Казимировская, 6</option>
                        <option value="г. Минск, ул. Каменногорская, 6-203">г. Минск, ул. Каменногорская, 6-203</option>
                        <option value="г. Минск, ул. Налибокская, 12-39">г. Минск, ул. Налибокская, 12-39</option>
                        <option value="г. Минск, ул. Неманская, 24">г. Минск, ул. Неманская, 24</option>
                        <option value="г. Минск, ул. Неманская, 85)">г. Минск, ул. Неманская, 85</option>
                        <option value="г. Минск, ул. Кульман, 5Б-72, пав.315">г. Минск, ул. Кульман, 5Б-72, пав.315</option>
                        <option value="г. Минск, ул. Академика Жебрака, 35">г. Минск, ул. Академика Жебрака, 35</option>
                        <option value="г. Минск, ул. Казинца, 52а">г. Минск, ул. Казинца, 52а</option>
                        <option value="г. Минск, ул. Николы Теслы, 6-1">г. Минск, ул. Николы Теслы, 6-1</option>
                        <option value="г. Минск, ул. Ильянская, 4-130">г. Минск, ул. Ильянская, 4-130</option>
                        <option value="г. Минск, ул. Асаналиева, 42">г. Минск, ул. Асаналиева, 42</option>
                        <option value="г. Минск, ул. Гошкевича 3-2">г. Минск, ул. Гошкевича 3-2</option>
                        <option value="г. Минск, ул. Прушинских, 2">г. Минск, ул. Прушинских, 2</option>
                        <option value="г. Минск, пр-т Пушкина, 29б">г. Минск, пр-т Пушкина, 29б</option>
                        <option value="г. Минск, ул. Шпилевского, 54">г. Минск, ул. Шпилевского, 54</option>
                        <option value="г. Минск, ул. Есенина, 76">г. Минск, ул. Есенина, 76</option>
                        <option value="г. Минск, ул. Есенина, 30 пом. 2Н">г. Минск, ул. Есенина, 30 пом. 2Н</option>
                        <option value="г. Минск, ул. Слободская, 131">г. Минск, ул. Слободская, 131</option>
                        <option value="г. Минск, ул. Лынькова, 85">г. Минск, ул. Лынькова, 85</option>
                        <option value="г. Минск, ул. Аэродромная, 3-64">г. Минск, ул. Аэродромная, 3-64</option>
                        <option value="г. Минск, ул. Аэродромная, 28">г. Минск, ул. Аэродромная, 28</option>
                        <option value="г. Минск, ул. Уманская, 54">г. Минск, ул. Уманская, 54</option>
                        <option value="г. Минск, пер. Загородный 1й, 3а">г. Минск, пер. Загородный 1й, 3а</option>
                        <option value="г. Минск, пр-т Независимости, 29-1Н">г. Минск, пр-т Независимости, 29-1Н</option>
                        <option value="г. Минск, пр-т. Независимости, 96-14">г. Минск, пр-т. Независимости, 96-14</option>
                        <option value="г. Минск, тр-т Сморговский, 7">г. Минск, тр-т Сморговский, 7</option>
                        <option value="г. Минск, пр-т Партизанский, 85">г. Минск, пр-т Партизанский, 85</option>
                        <option value="г. Минск, ул. Трудовая, 6-3">г. Минск, ул. Трудовая, 6-3</option>
                        <option value="г. Минск, пр-т Пушкина, 51-1Н">г. Минск, пр-т Пушкина, 51-1Н</option>
                        <option value="г. Минск ул. Белинского 54">г. Минск ул. Белинского 54</option>
                        <option value="г. Минск ул. Сурганова, 57Б-8">г. Минск ул. Сурганова, 57Б-8</option>
                        <option value="г. Минск, ул. Я. Коласа, 53к1">г. Минск, ул. Я. Коласа, 53к1</option>
                        <option value="г. Минск, ул. Богдановича, 89-2Н (м-н Евроопт)">г. Минск, ул. Богдановича, 89-2Н (м-н Евроопт)</option>
                        <option value=". Минск, ул. Богдановича, 134">г. Минск, ул. Богдановича, 134</option>
                        <option value="г. Минск, ул. Лукьяновича, 4Б">г. Минск, ул. Лукьяновича, 4Б</option>
                        <option value="г. Минск, ул. Плеханова, 38">г. Минск, ул. Плеханова, 38</option>
                        <option value="г. Минск, ул. Плеханова, 89">г. Минск, ул. Плеханова, 89</option>
                        <option value="г. Минск, ул. Рокоссовского 99">г. Минск, ул. Рокоссовского 99</option>
                        <option value="г. Минск, ул. Притыцкого, 29">г. Минск, ул. Притыцкого, 29</option>
                        <option value="г. Минск, ул. Карвата, 31">г. Минск, ул. Карвата, 31</option>
                        <option value="г. Минск, тр-т. Старовиленский, 10">г. Минск, тр-т. Старовиленский, 10</option>
                        <option value="г. Минск, ул. Лобанка, 22">г. Минск, ул. Лобанка, 22</option>
                        <option value="г. Минск, ул. Лобанка, 94">г. Минск, ул. Лобанка, 94</option>
                        <option value="г. Минск, ул. Мазурова, 24">г. Минск, ул. Мазурова, 24</option>
                        <option value="г. Минск, ул. П. Панченко, 60">г. Минск, ул. П. Панченко, 60</option>
                        <option value="г. Минск, ул. Янковского, 44">г. Минск, ул. Янковского, 44</option>
                        <option value="г. Минск, ул. Монтажников, 2">г. Минск, ул. Монтажников, 2</option>
                        <option value="г. Минск, ул. Ложинская, 20">г. Минск, ул. Ложинская, 20</option>

                    </select>
                    <br />
                    <br />
                    <button className={style.buttonEddAndSaveitUserAddress} onClick={onSubmit}>Сохранить</button>
                </div>
            }

        </div>
    )
}

export default PersonalAdress;
