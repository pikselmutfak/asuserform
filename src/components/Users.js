import React, {useEffect, useState} from 'react'

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'

import {selectUsers, asyncGetUsers, asyncRemoveUser} from './userSlice'
import {useSelector, useDispatch} from 'react-redux'

import {Button, Table} from 'react-bootstrap'

import { useHistory } from 'react-router-dom'

const Users = ({updateUsers,account}) => {

    const users = useSelector(selectUsers)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        if (users.length === 0) {
            dispatch(asyncGetUsers(() => {
                console.log('users updated', users)
            }))
        }
    }, [])

    return (
        <>
        {
            users.length > 0 ? (
                <Table bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Ad Soyad</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>TCKN</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                {
                    users.map(user => {
                        return (
                            <tr key={user.id}>
                                <td>{user.displayName}</td>
                                <td>{user.mail}</td>
                                <td>{user.mobilePhone}</td>
                                <td>{user.tckn}</td>
                                <td>
                                    <Button size="sm" variant="info" onClick={() => {
                                        history.push('/user/'+user.id)
                                    }}>Detaylar</Button>
                                </td>
                                <td>
                                    <Button size="sm" variant="secondary" onClick={() => {
                                        history.push('/update/'+user._id)
                                    }}>Güncelle</Button>
                                </td>
                                <td>
                                    <Button size="sm" variant="danger" onClick={() => {
                                        dispatch(asyncRemoveUser(user, () => {
                                            console.log('--- user removed')
                                        }))
                                    }}>Sil</Button>
                                </td>
                            </tr>
                        )
                    })
                }
                        <tr>
                            <td>
                                <Button onClick={() => {
                                    // ekle ekranına yönlendir
                                    history.push('/add')
                                }}>Ekle</Button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            ) : (
                <div>
                    <Loader
                        type="ThreeDots"
                        color="#00838f"
                        height={32}
                        width={32}
                    />
                </div>
            )
        }
        </>
    )
}

export default Users