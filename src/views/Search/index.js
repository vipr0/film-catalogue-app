import React, { useEffect, useState } from "react";
import { Typography, List, Card, Button } from 'antd';

import "./style.css";
import Loader from "../../components/Loader";
import api from "../../utils/api";
import SearchInput from "../../components/SearchInput";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;

function SearchPage() {
    const [isLoading, setIsLoading] = useState(true)
    const [query, setQuery] = useState(null)
    const [searchResult, setSearchResult] = useState([])

    const showSearchResult = () => {
        return(
            <div>
                <List
                    header={<Title level={2}>Search results</Title>}
                    grid={{ gutter: 16, column: 1 }}
                    dataSource={searchResult}
                    renderItem={item => (
                        <List.Item>
                            <Card title={item.title}>
                                <Text>Stars: {item.stars.length > 0 && item.stars.reduce((acc, item) => `${acc}, ${item}`)}</Text>
                                <div className="more-btn">
                                    <Link to={`/${item._id}`}>
                                        <Button type="primary">More info</Button>
                                    </Link>
                                </div>
                            </Card>
                        </List.Item>
                    )}
                />
            </div>
        )
    }

    const showLoader = () => {
        return <Loader/>
    }

    useEffect(() => {
        api
            .searchFilm(query)
            .then(({ data }) => setSearchResult(data.result))
            .catch(err => setSearchResult([]))
            .finally(() => setIsLoading(false))
    }, [query])

    return (
        <div>
            <SearchInput setQuery={setQuery}/>
        
            { isLoading ? showLoader() : showSearchResult() }
        </div>
    )
}

export default SearchPage