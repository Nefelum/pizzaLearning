import React, {useContext} from 'react';
import {useEffect, useState} from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import {SearchContext} from "../App";

export default function Home() {

    const { searchValue } = useContext(SearchContext);

    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [categoryId, setCategoryId] = useState(0);
    const [sortType, setSortType] = useState({
        name: 'популярности',
        sortProperty: 'rating'
    });
    const [currentPage, setCurrentPage] = useState(1);

    const urlPizzas = `https://62aa42323b3143855444e3e3.mockapi.io/items?page=${currentPage}&limit=4&`
    useEffect(() => {
        setIsLoading(true)
        const category = categoryId > 0 ? categoryId : ''
        const sortBy = sortType.sortProperty.replace('-', '')
        const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'
        const search = searchValue ? `&search=${searchValue}` : ''


        fetch(urlPizzas + `category=${category}&sortBy=${sortBy}&order=${order}${search}`)
        // fetch(urlPizzas + `category=${category}&sortBy=${sortBy}&order=${order}`)
            .then(response => response.json())
            .then(pizzas => {
                setItems(pizzas)
                setIsLoading(false)
            })
        window.scrollTo(0, 0)
    },[categoryId, sortType, searchValue, currentPage])

    // const pizzas = items.filter(item => {
    //     return item.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase());
    // }).map((item) => <PizzaBlock key={item.id} {...item} />)
    const pizzas = items.map((item) => <PizzaBlock key={item.id} {...item} />)

    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>)
    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    onClickCategory={setCategoryId}
                    value={categoryId}/>
                <Sort
                    onClickSort={setSortType}
                    value={sortType}
                />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading
                        ? skeletons : pizzas
                }
            </div>
            <Pagination onClickPage={setCurrentPage}/>
        </div>
    )
}