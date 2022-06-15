import React, {useState} from 'react';

function Categories() {

    const [activeIndex, setActiveIndex] = useState(0);

    const categories = [
        'Все',
        'Мясные',
        'Вегетарианская',
        'Гриль',
        'Острые',
        'Закрытые',
    ]

    const onClickCategory = (index) => {
        setActiveIndex(index)
    };

    return (
        <div className="categories">
            <ul>
                {
                  categories.map((pizzaCategory, i) => (
                          <li
                              key={i}
                              onClick={() => onClickCategory(i)}
                              className={activeIndex === i ? "active" : ""}>
                              {pizzaCategory}
                          </li>
                    )
                  )
                }
            </ul>
        </div>
    );
}

export default Categories;
