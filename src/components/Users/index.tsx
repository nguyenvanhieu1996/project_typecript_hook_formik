import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { getUsersCollection, createUser } from '../../api/Users'
import { UserEntity } from '../../models/Users'

interface Props {
    history: any
}
const Users: React.FC<Props> = ({ history }) => {
    const [users, setUsers] = useState<UserEntity[]>([])
    const columns = [
        {
            id: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Last Name',
            dataIndex: 'last_name',
            key: 'last_name',
            render: (_: any, record: any) => {
                return record.last_name + ' ' + record.first_name
            }
        },
    ];

    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = async () => {
        const result = await getUsersCollection()
        if (!result) return false
        setUsers(result)
    }

    const handleDetectRoute = (e: any) => {
        history.push('/detail/' + e.id)
    }

    const handleSuccessCreateUser = () => {
        let data: UserEntity = {
            id: users[users.length - 1].id + 1,
            email: 'george.bluth@reqres.in',
            first_name: 'George',
            last_name: 'Bluth',
            avatar: ''
        }
        let myArray = [...users];
        myArray.push(data);
        setUsers(myArray)
        
    }

    const create = () => {
        const dataAction = {
            data: {
                name: "morpheus",
                job: "leader"
            },
            cbSuccessfully: () => handleSuccessCreateUser()
        }
        createUser(dataAction)
    }

    return (
        <>
            <Table dataSource={users} columns={columns} rowKey="id" onRow={e => ({
                onClick: () => {
                    handleDetectRoute(e)
                },
            })} />
            <button onClick={() => create()}>Add User</button>
        </>
    );
};

export default Users;
