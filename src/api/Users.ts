import Axios, { AxiosResponse } from 'axios'
import { UserEntity, UserResponse } from '../models/Users'
import { throwError } from './RequestError'
const domain = "https://reqres.in/api";
const usersUrl = `${domain}/users`;
const registerUsersUrl = `${domain}/register`;
const loginUsersUrl = `${domain}/login`;


export const getUsersCollection = () => {
    return Axios.get<UserEntity[]>(usersUrl).then((res) => {
        throwError(res)
        return mapUsersModel(res)
    })
}

export const getUser = (id: number) => {
    return Axios.get(usersUrl + '/' + id).then((res) => {
        throwError(res)
        return res.data.data
    })
}

export const createUser = (dataAction: any) => {
    return Axios.post(usersUrl, dataAction.data).then((res) => {
        throwError(res)
        dataAction.cbSuccessfully()
    })
}

export const registerUser = (dataAction: any) => {
    return Axios.post(registerUsersUrl, dataAction.data).then((res) => {
        throwError(res)
        console.log('res registerUser', res);

        dataAction.cbSuccessfully(res.data)
    })
}

export const loginUser = (dataAction: any) => {
    return Axios.post(loginUsersUrl, dataAction.data).then((res) => {
        throwError(res)
        dataAction.cbSuccessfully(res.data)
    })
}

const mapUsersModel = ({ data }: AxiosResponse<UserResponse | any>): UserEntity[] => {
    return data.data.map((val: any) => {
        return {
            id: val.id,
            email: val.email,
            first_name: val.first_name,
            last_name: val.last_name,
            avatar: val.avatar
        }
    })
}

// const mapUserModel = ({ data }: AxiosResponse<UserEntity>): UserEntity[] => {
//     return data.map((val: any) => {
//         return {
//             id: val.id,
//             email: val.email,
//             first_name: val.first_name,
//             last_name: val.last_name,
//             avatar: val.avatar
//         }
//     })
// }