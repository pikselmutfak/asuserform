import { useEffect, useState } from 'react'
import {Container, Col, Row, Form, Button, Spinner} from 'react-bootstrap'
import { useSelector, useDispatch  } from 'react-redux'
import {useHistory, useParams} from 'react-router-dom'
import {asyncUpdateUser, selectUserById} from './userSlice'

const UserDetail = () => {

    const {id} = useParams()
    const history = useHistory()
    const dispatch = useDispatch()

    const selectedUser = useSelector(selectUserById(id))

    const [user, setUser] = useState({})
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setUser(selectedUser)
    }, [selectedUser])

    const onChange = (key,value) => {
        setUser({
            ...user,
            [key]: value
        })
    }

    const imageSize = '134px'

    return (
        <Container fluid>
            <Row>
                <Col>
                    <Form.Control 
                        value={user ? user.mail : ""} 
                        disabled
                    />
                </Col>
            </Row>
            <Row style={{marginTop: '10px'}}>
                <Col>
                    <Form.Control 
                        value={user ? user.displayName : ""} 
                        onChange={e => {onChange('displayName', e.target.value)}}
                        placeholder="Ad Soyad"
                    />
                </Col>
            </Row>
            <Row style={{marginTop: '10px'}}>
                <Col sm="1" md="1" xs="1">
                    <Button variant="secondary" onClick={() => {
                        history.goBack()
                    }} style={{width:'80px'}} disabled={isLoading}>Geri</Button>
                </Col>
                <Col sm="1" md="1" xs="1">
                    <Button variant="success" onClick={() => {

                        if (!isLoading) {
                            setLoading(true)
                            dispatch(asyncUpdateUser(user, () => {
                                console.log('--- updated')
                                setLoading(false)
                            }))
                        }
                    }} style={{width:'80px'}}>
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
                            "Kaydet"
                        )
                    }
                    </Button>
                </Col>
            </Row>
        </Container>
    )
}

export default UserDetail