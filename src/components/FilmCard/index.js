import React from "react";
import { Card, Button, Statistic, Row, Col } from 'antd';
import { Link } from "react-router-dom";

function FilmCard({ film }) {
    const {title, releaseYear, format, stars, _id: id} = film

    return (
        <Card title={`"${title}"`}>
            <Row gutter={16} style={{ marginBottom: "10px" }}>
                <Col span={12}>
                    <Statistic title="Release Year" value={releaseYear} groupSeparator="" />
                </Col>
                <Col span={12}>
                    <Statistic title="Format" value={format} />
                </Col>
            </Row>

            <Link to={`/${id}`}>
                <Button type="primary">Select</Button>
            </Link>
        </Card>
    )
}

export default FilmCard;