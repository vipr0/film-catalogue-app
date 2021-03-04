import { Button, PageHeader, Descriptions, message, Empty } from 'antd';
import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Loader from '../../components/Loader';
import api from "../../utils/api";

function FilmDetails() {
    const { filmId } = useParams();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true)
    const [film, setFilm] = useState({})

    useEffect(() => {
        api
            .getFilm(filmId)
            .then(({data}) => setFilm(data.data.film))
            .catch(err => message.error(err.response.data.message))
            .finally(() => setIsLoading(false))
    }, [])

    const deleteFilm = () => {
        api
            .deleteFilm(film._id)
            .then(res => {
                message.success("Film was successfully deleted");
                history.push('/');
            })
            .catch(err => message.error(err.message))
    }

    if(isLoading) {
        return (<Loader/>)
    } else {
        if(Object.keys(film).length > 0) {
            return (
                <div>
                    <PageHeader
                        ghost={false}
                        onBack={() => window.history.back()}
                        title={film.title}
                        subTitle={<p className="description-subtitle">{film._id}</p>}
                        extra={[
                            <Button onClick={deleteFilm} type="primary" danger>Delete film</Button>
                        ]}
                    >
                        <Descriptions size="small" column={1}>
                            <Descriptions.Item label="Release Year">{film.releaseYear}</Descriptions.Item>
                            <Descriptions.Item label="Format">{film.format}</Descriptions.Item>
                            <Descriptions.Item label="Stars">
                                <div className="star-list">
                                    {film.stars && film.stars.map(star => (<div key={star} className="star-list__item">{star}</div>))}
                                </div>
                            </Descriptions.Item>
                        </Descriptions>
                    </PageHeader>
                </div>
            )
        } else {
            return (<Empty/>)
        }
    }
}

export default FilmDetails