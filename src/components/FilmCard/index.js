import React from "react";
import { Card, Statistic, Row, Col } from 'antd';
import { Link } from "react-router-dom";

function FilmCard({ film }) {
    const {title, releaseYear, format, _id: id} = film

    return (
        <Card title={<Link to={`/${id}`}>{title}</Link>}>
            <Row gutter={16} style={{ marginBottom: "10px" }}>
                <Col span={12}>
                    <Statistic title="Release Year" value={releaseYear} groupSeparator="" />
                </Col>
                <Col span={12}>
                    <Statistic title="Format" value={format} />
                </Col>
            </Row>
        </Card>
    )
}

export default FilmCard;