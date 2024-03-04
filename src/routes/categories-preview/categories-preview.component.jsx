// import SHOP_DATA from '../../shop-data.json';
import { Fragment, useContext } from "react";
import { useSelector } from "react-redux";

// import { CategoriesContext } from "../../context/categories.context";
import { selectCategoriesMap } from "../../store/categories/categories.selector";

import ProductCard from "../../components/product-card/product-card.component";
import CategoryPreview from "../../components/category-preview/category-preview.component";


const CategoriesPreview = () => {

    const categoriesMap = useSelector(selectCategoriesMap);

    // const { categoriesMap } = useContext(CategoriesContext);
    return (
        <Fragment>
            {Object.keys(categoriesMap).map((title) => {
                const products = categoriesMap[title];
                return (
                    <CategoryPreview key={title} title={title} products={products} />
                )
            })}
        </Fragment>
    )
}

export default CategoriesPreview;