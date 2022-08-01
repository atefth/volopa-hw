import { useState } from 'react';
import { Row, Col, Typography, Card, Form, Input, Select, Space, Progress, Button } from 'antd'
import { convert } from '../../services/RateExchange';

function RateChecker() {
    const [to, setTo] = useState({currency: null, amount: 0});
    const [from, setFrom] = useState({currency: null, amount: 0});

    const handleConversion = async () => {
        const [message, amount] = await convert({from, to});
        if (message.includes('from')) {
            setFrom({...from, amount});
        } else {
            setTo({...to, amount});
        }
    }

    const validateFrom = () => {
        return from.currency !== null;
    }

    const validateTo = () => {
        return to.currency !== null;
    }

    const validateConversion = () => {
        return from.currency !== null && to.currency !== null && (to.amount > 0 || from.amount > 0);
    }

    return (
        <>
            <Row>
                <Col span={24}>
                    <Typography.Text className='dark-green medium fs-25px'>Rate Checker</Typography.Text>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Card>
                        <Card.Grid className='full-width rounded b-g hover-no-border'>
                            <Form layout='vertical'>
                                <Row>
                                    <Col span={24}>
                                        <Form.Item
                                            name='convertTo'
                                            label={<span className='muli semi-bold fs-18px'>Convert To</span>}
                                        >
                                            <Row gutter={8}>
                                                <Col span={6}>
                                                    <Select
                                                        className='dark-green'
                                                        showSearch
                                                        filterOption={(input, option) => {
                                                            if (option.children)
                                                                return option.children.toLowerCase().includes(input.toLowerCase())
                                                            else if (option.label)
                                                                return option.label.toLowerCase().includes(input.toLowerCase())
                                                        }}
                                                        onChange={currency => setTo({...to, currency})}
                                                        value={to.currency}
                                                        >
                                                        <Select.OptGroup label='Common'>
                                                            <Select.Option value="GBP">GBP</Select.Option>
                                                            <Select.Option value="EUR">EUR</Select.Option>
                                                        </Select.OptGroup>
                                                        <Select.OptGroup label='Other'>
                                                            <Select.Option value="USD">USD</Select.Option>
                                                            <Select.Option value="AUD">AUD</Select.Option>
                                                        </Select.OptGroup>
                                                    </Select>
                                                </Col>
                                                <Col span={18}>
                                                    <Input placeholder='Enter Amount' value={to.amount} disabled={validateTo() === false} onChange={$event => setTo({...to, amount: $event.target.value})} />
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                        <Form.Item
                                            name='convertFrom'
                                            label={<span className='muli semi-bold fs-18px'>Convert From</span>}
                                        >
                                            <Row gutter={8}>
                                                <Col span={6}>
                                                    <Select
                                                        className='dark-green'
                                                        showSearch
                                                        filterOption={(input, option) => {
                                                            if (option.children)
                                                                return option.children.toLowerCase().includes(input.toLowerCase())
                                                            else if (option.label)
                                                                return option.label.toLowerCase().includes(input.toLowerCase())
                                                        }}
                                                        onChange={currency => setFrom({...from, currency})}
                                                        value={from.currency}
                                                        >
                                                        <Select.OptGroup label='Common'>
                                                            <Select.Option value="GBP">GBP</Select.Option>
                                                            <Select.Option value="EUR">EUR</Select.Option>
                                                        </Select.OptGroup>
                                                        <Select.OptGroup label='Other'>
                                                            <Select.Option value="USD">USD</Select.Option>
                                                            <Select.Option value="AUD">AUD</Select.Option>
                                                        </Select.OptGroup>
                                                    </Select>
                                                </Col>
                                                <Col span={18}>
                                                    <Input placeholder='Enter Amount' disabled={validateFrom() === false} value={from.amount} onChange={$event => setFrom({...from, amount: $event.target.value})} />
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row align='bottom'>
                                    <Col span={12}>
                                        <Space>
                                            <Progress type='circle' percent={75} width={40} format={() => `30s`} />
                                            <Space direction='vertical' size={0}>
                                                <Typography.Text className='muli semi-bold light-green'>FX Rate</Typography.Text>
                                                <Typography.Text className='muli semi-bold light-green'>1 GBP = 1.19 EUR</Typography.Text>
                                            </Space>
                                        </Space>
                                    </Col>
                                    <Col span={12} className='right-align-text'>
                                        <Button type='primary' htmlType='submit' disabled={validateConversion() === false} onClick={handleConversion}>Convert</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Grid>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default RateChecker;
