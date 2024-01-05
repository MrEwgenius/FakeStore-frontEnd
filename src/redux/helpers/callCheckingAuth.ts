// import { ApiResponse } from "apisauce";
// import { call, put } from "redux-saga/effects";
// import { logoutUser, setAccessToken } from "src/redux/reducers/authSlice";
// import api from "src/api";
// import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "src/utils/constans";


// export function* callCheckingAuth(
//     apiCall: any,
//     ...params: any
// ) {

//     const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY)
//     const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY)


//     if (accessToken && refreshToken) {
//         const response: ApiResponse<any> = yield call(
//             apiCall,
//             accessToken,
//             ...params
//         ) //тот запрос, который мы хотим сделать из приложения 

//         const { status: accessStatus } = yield call(api.verifyToken, accessToken) // проверяем сразу не помер ли Access
//         if (response.status === 401 && accessStatus) { // случай когда access помер 

//             const { status: refreshStatus } = yield call(api.verifyToken, refreshToken) // запрос на проверку , помер ли наш refreshToken

//             if (refreshStatus === 401) { //если рефреш умер то выходим 
//                 //Log out

//                 yield put(logoutUser())
//             } else {// если рефреш живой то идм дальше
//                 const newAccessResponse: ApiResponse<RefreshResponseData> = yield call(
//                     api.refreshToken,
//                     refreshToken
//                 );// пытемся возродить access 

//                 if (newAccessResponse.ok && newAccessResponse.data) { // Проверяем всё ли хорошо  прошло с нашим новым access

//                     const { access } = newAccessResponse.data
//                     localStorage.setItem(ACCESS_TOKEN_KEY, access)
//                     const newResponse: ApiResponse<any> = yield call(
//                         apiCall,
//                         access,
//                         ...params
//                     )//новый запрос с новым токеном --  return уже любой 
//                     yield put(setAccessToken(access))//  в redux перезаписываем Token
//                     return newResponse// отдаем данные юзеру, котоый уже получили с валидным токеном - данные получены
//                 } else { //если не прошло то выходим (выкидываем пользователя) если не ок то выкидываем пользователя
//                     yield put(logoutUser())
//                     //log out
//                 }
//             }
//         } else {// если дело не в токене  тогда просто возвращаем наш респонс пусть разбирается сага сама

//             return response;
//         }
//     } else { // Если нет какого-то из токенов то логаут
//         yield put(logoutUser())
//         //log out
//     }


// }