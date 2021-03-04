import React from "react";
import { Drawer, Upload, Form, Button, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import api from "../../utils/api";
const { Dragger } = Upload;

function ImportFromFileDrawer({ visible, setVisible }) {
    const props = {
        name: 'file',
        multiple: false,
        beforeUpload: () => false,
        accept: ".txt",
    };

    const handleSubmit = (data) => {
        const formData = new FormData();
        formData.append("file", data.file.file);
        
        api
            .importFilmsFromFile(formData)
            .then(({ data }) => message.success(`Films imported (${data.data.successes} successfully, ${data.data.fails} fails)`))
            .catch(err => message.error(err.response.data.message))
      };

    return (
        <Drawer
            title="Import films from a file"
            onClose={() => setVisible(false)}
            visible={visible}
        >
            <Form onFinish={handleSubmit}>
                <Form.Item name="file" valuePropName="file">
                    <Dragger {...props}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">
                            Only supported .txt files
                        </p>
                    </Dragger>
                </Form.Item>

                <Form.Item style={{ textAlign: "center" }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Drawer>
    )
}

export default ImportFromFileDrawer