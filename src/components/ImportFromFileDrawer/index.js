import React from "react";
import { Drawer, Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
const { Dragger } = Upload;

function ImportFromFileDrawer({ visible, setVisible }) {
    const props = {
        name: 'file',
        multiple: false,
        action: 'http://localhost:3000/films/import',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    return (
        <Drawer
            title="Import films from a file"
            width={500}
            onClose={() => setVisible(false)}
            visible={visible}
        >
            <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                    Only supported .txt files
                </p>
            </Dragger>
        </Drawer>
    )
}

export default ImportFromFileDrawer