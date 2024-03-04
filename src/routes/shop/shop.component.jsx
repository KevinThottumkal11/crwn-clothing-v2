import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

// import SHOP_DATA from '../../shop-data.json';
// import { Fragment, useContext } from "react";

// import { CategoriesContext } from "../../context/categories.context";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

import { setCategoriesMap } from "../../store/categories/categories.action";

// import ProductCard from "../../components/product-card/product-card.component";
// import CategoryPreview from "../../components/category-preview/category-preview.component";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";

import './shop.styles.scss';

const Shop = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments('categories');
            // console.log(categoryMap);
            dispatch(setCategoriesMap(categoryMap));
        }
        getCategoriesMap();
    }, [])
    // const { categoriesMap } = useContext(CategoriesContext);
    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=":category" element={<Category />} />
        </Routes>


        // ***************OLD****************************
        // <div className="shop-container">
        //     {Object.keys(categoriesMap).map((title) => {
        //         const products = categoriesMap[title];
        //         return (
        //             <CategoryPreview key={title} title={title} products={products} />
        //         )
        //     })}
        // </div>
    )
}

export default Shop;