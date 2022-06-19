import React from 'react';
import {useEffect, useState} from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";

export default function Home() {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [categoryId, setCategoryId] = useState(0);
    const [sortType, setSortType] = useState({
        name: 'популярности',
        sortProperty: 'rating'
    });

    const urlPizzas = 'https://62aa42323b3143855444e3e3.mockapi.io/items?'
    // categoryId === 0 ? urlPizzas='https://62aa42323b3143855444e3e3.mockapi.io/items' : urlPizzas='https://62aa42323b3143855444e3e3.mockapi.io/items?category=' + categoryId
    useEffect(() => {
        setIsLoading(true)
        const category = categoryId > 0 ? categoryId : ''
        const sortBy = sortType.sortProperty.replace('-', '')
        const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'
        fetch(urlPizzas + `category=${category}&sortBy=${sortBy}&order=${order}`)
            .then(response => response.json())
            .then(pizzas => {
                setItems(pizzas)
                setIsLoading(false)
            })
        window.scrollTo(0, 0)
    },[categoryId, sortType])

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
                        ? [...new Array(6)].map((_, index) => <Skeleton key={index}/>)
                        : items.map((item) => <PizzaBlock key={item.id} {...item} />)
                }
            </div>
        </div>
    )
}