import { useEffect, useState } from 'react'
import {Container, Col, Row, Form, Button, Spinner} from 'react-bootstrap'
import { useSelector, useDispatch  } from 'react-redux'
import {useHistory, useParams} from 'react-router-dom'
import {asyncAddUser,asyncUpdateUser,selectUserById} from './userSlice'

const UserForm = () => {

    const {id:updatingId} = useParams()

    const updatingUser = useSelector(selectUserById(updatingId))
    console.log('updating user', updatingUser)

    useEffect(() => {
        if (updatingUser !== undefined) {
            setNewUser(updatingUser)
        }
    }, [updatingUser])

    const [newUser,setNewUser] = useState({
        displayName: "",
        mobilePhone: "",
        mail: ""
    })

    const [isLoading, setLoading] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        console.log('--- user updated', newUser)
    }, [newUser])

    const history = useHistory()

    const onChange = (key,val) => {
        setNewUser(pUser => {
            return {
                ...pUser,
                [key]: val
            }
        })
    }

    const onSubmit = () => {

        setLoading(true)
        if (updatingUser === undefined) {
            dispatch(asyncAddUser(newUser, () => {
                setLoading(false)
            }))
        } else {
            dispatch(asyncUpdateUser(newUser, () => {
                setLoading(false)
            }))
        }
    }

    return (
        <Container>
            <Row>
                <Col>
                    <Form.Control
                        placeholder="Display Name"
                        value={newUser.displayName}
                        onChange={e => onChange('displayName', e.target.value)}
                     />
                </Col>
            </Row>
            <Row style={{marginTop: '10px'}}>
                <Col>
                    <Form.Control
                        placeholder="Mobile Phone"
                        value={newUser.mobilePhone}
                        onChange={(e) => onChange('mobilePhone', e.target.value)}
                     />
                </Col>
            </Row>
            <Row style={{marginTop: '10px'}}>
                <Col>
                    <Form.Control
                        placeholder="Mail"
                        value={newUser.mail}
                        onChange={(e) => onChange('mail', e.target.value)}
                     />
                </Col>
            </Row>
            <Row style={{marginTop: '10px'}}>
                <Col>
                    <Button variant="secondary" onClick={() => {
                        history.goBack()
                    }} disabled={isLoading}>Geri</Button>
                </Col>
                <Col>
                    <Button onClick={onSubmit} disabled={isLoading}>
                    {
                        isLoading ? (
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                        ) : (
                            updatingUser ? "Güncelle" : "Kaydet"
                        )
                    }
                    </Button>
                </Col>
            </Row>
        </Container>
    )
}

export default UserForm