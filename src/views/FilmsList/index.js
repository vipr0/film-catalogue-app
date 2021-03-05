import React, { useState, useEffect } from "react";
import { Row, Col, Typography, Button, message, Empty } from 'antd';
import { PlusOutlined, FileAddOutlined } from '@ant-design/icons';

import FilmCard from "../../components/FilmCard";
import Loader from "../../components/Loader";
import api from "../../utils/api";
import AddFilmDrawer from "../../components/AddFilmDrawer";
import ImportFromFileDrawer from "../../components/ImportFromFileDrawer";

const { Title } = Typography;

function FilmsList() {
    const [isLoading, setIsLoading] = useState(true)
    const [addFilmVisible, setAddFilmVisible] = useState(false)
    const [importFromFileVisible, setImportFromFileVisible] = useState(false)
    const [list, setList] = useState([])

    useEffect(() => {
        api
            .getAllFilms()
            .then(({data}) => setList(data.data.films))
            .catch(err => message.error(err.response.data.message))
            .finally(() => setIsLoading(false))
    }, [])

    if(isLoading) {
        return (<Loader/>)
    } else {
        return (
            <div>
                <div className="page-header">
                    <Title level={2}>List of all films</Title>
                    
                    <div>
                        <Button
                            className="page-header__button"
                            onClick={() => setAddFilmVisible(true)} 
                            type="primary">
                            <PlusOutlined /> Add film
                        </Button>

                        <Button 
                            className="page-header__button"
                            onClick={() => setImportFromFileVisible(true)} 
                            type="secondary">
                            <FileAddOutlined /> Import from file
                        </Button>
                    </div>
                </div>

                {
                    list.length > 0 ? 
                    (
                        <Row gutter={[16, 24]}>
                            {list.map(item => (<Col key={item._id} xs={24} sm={12} xl={8}><FilmCard film={item} /></Col>))}
                        </Row>
                    ) :
                    ( <Empty/> )
                }

                <AddFilmDrawer visible={addFilmVisible} setVisible={setAddFilmVisible} />

                <ImportFromFileDrawer visible={importFromFileVisible} setVisible={setImportFromFileVisible} />
            </div>
        )
    }

}

export default FilmsList