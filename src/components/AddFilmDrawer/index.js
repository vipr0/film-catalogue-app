import React from "react";
import { Button, DatePicker, Form, Select, Input, Drawer, message } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import api from "../../utils/api";

function AddFilmDrawer({ visible, setVisible, onSuccess }) {
    const [form] = Form.useForm();

    const onFinish = async (data) => {        
        data = { ...data, releaseYear: data.releaseYear.format('YYYY')}

        api
            .addNewFilm(data)
            .then(res => {
                form.resetFields();
                message.success("Film was successfully added");
                setVisible(false);
                onSuccess();
            })
            .catch(err => message.error(err.response.data.message))    
    }

    return (
        <Drawer
            title="Add a new film"
            onClose={() => setVisible(false)}
            visible={visible}
        >
            <Form onFinish={onFinish} form={form} layout="vertical">
                <Form.Item 
                    required 
                    name="title" 
                    label="Title"
                    rules={[{ required: true, message: 'Please specify title' }]}
                >
                    <Input placeholder="Enter title" />
                </Form.Item>

                <Form.Item 
                    required
                    name="releaseYear" 
                    label="Release Year"
                    rules={[{ required: true, message: 'Please specify release year' }]}
                >
                    <DatePicker picker="year" />
                </Form.Item>

                <Form.Item 
                    required 
                    name="format" 
                    label="Format"
                    rules={[{ required: true, message: 'Please specify format' }]}
                >
                    <Select>
                        <Select.Option value="VHS">VHS</Select.Option>
                        <Select.Option value="DVD">DVD</Select.Option>
                        <Select.Option value="Blu-Ray">Blu-Ray</Select.Option>
                    </Select>
                </Form.Item>

                <Form.List 
                    name="stars" 
                    label="Stars"
                    rules={[{ required: true, message: 'Please specify list of stars' }]}
                >
                    {(fields, { add, remove }) => {
                        return (
                            <div>
                                {fields.map((field, index) => (
                                    <Form.Item required key={field.key} label={index === 0 ? "Stars" : ""}>
                                        <Form.Item
                                            {...field}
                                            validateTrigger={["onChange", "onBlur"]}
                                            rules={[
                                                {
                                                    required: true,
                                                    whitespace: true,
                                                    message: "Enter star name on delete this field",
                                                },
                                            ]}
                                            noStyle
                                        >
                                            <Input placeholder="star" style={{ width: "85%" }}/>
                                        </Form.Item>
                                        { fields.length > 1 ? (
                                            <MinusCircleOutlined
                                                style={{ margin: "0 8px" }}
                                                onClick={() => remove(field.name)}
                                            />
                                        ) : null }
                                    </Form.Item>
                                ))}

                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()}>
                                        <PlusOutlined /> Add star
                                    </Button>
                                </Form.Item>
                            </div>
                        );
                    }}
                </Form.List>

                <Form.Item>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
        </Drawer>
    )
}

export default AddFilmDrawer