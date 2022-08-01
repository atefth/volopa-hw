import logo from '../../../logo.png'
import { Avatar, Col, Row, Space, Tabs, Button } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import user from './store/images/Ellipse_12@2x.png';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/Auth';
import { history } from '../../helpers';

function NavBar() {
    const dispatch = useDispatch();
    const { auth } = useSelector(x => x);
    const [showingDropdown, setShowingDropdown] = useState(false);
    return (
        <Row>
            <Col span={3}>
                <div className="logo"><img src={logo} alt='logo' /></div>
            </Col>
            <Col span={20}>
                <Tabs size='large' className='m-t-4'>
                        <Tabs.TabPane
                        key={0}
                        tab={<span className='fs-18px medium'>Wallet Dashboard</span>} />
                </Tabs>
            </Col>
            <Col span={1}>
                <Space size="small">
                    <Avatar icon={<UserOutlined />} src={user} size={42} />
                    <DownOutlined style={{ fontSize: '10px' }} onClick={() => setShowingDropdown(!showingDropdown)}/>
                </Space>
                    {showingDropdown &&
                        <Button
                            type="secondary"
                            htmlType="button"
                            className="right-align-text"
                            onClick={() => {
                                dispatch(authActions.logout());
                                history.navigate('/login');
                            }}
                        >
                            Logout
                        </Button>
                    }
            </Col>
        </Row>
    )
}
export default NavBar;
