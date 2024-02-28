import { createContext, useState, useEffect } from 'react';

// import { addCollectionAndDocuments } from '../utils/firebase/firebase.utils.js';
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils.js';
// import SHOP_DATA from '../shop-data.js'

export const ProductsContext = createContext({
    products: [],
})

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    
    // Only for adding data into the firebase db, Do not need to use once the data is loaded
    // useEffect(() => {
    //     addCollectionAndDocuments('categories', SHOP_DATA);
    // }, [])

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            console.log(categoryMap);
        }
        getCategoriesMap();
    }, [])
    const value = { products }; 

    return (
        <ProductsContext.Provider value={value}>{ children }</ProductsContext.Provider>
    )
}