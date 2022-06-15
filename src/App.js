import './scss/app.scss'
import './components/Header'
import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock";
import {useEffect, useState} from "react";
// import pizzas from "./assets/pizza.json";


function App() {
    const urlPizzas = 'https://62aa42323b3143855444e3e3.mockapi.io/items'
    const [items, setItems] = useState([])

    useEffect(() => {
        fetch(urlPizzas)
            .then(response => response.json())
            .then(pizzas => setItems(pizzas))
    }, [])

    return (
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <div className="content__top">
              <Categories />
              <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
              {
                items.map(object => (
                    <PizzaBlock key={object.id}  {...object}
                    />
                ))
              }
            </div>
          </div>
        </div>
    </div>
  );
}

export default App;
