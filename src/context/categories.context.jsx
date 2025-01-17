import { createContext, useState, useEffect } from 'react';

// import { addCollectionAndDocuments } from '../utils/firebase/firebase.utils.js';
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils.js';
// import SHOP_DATA from '../shop-data.js'

export const CategoriesContext = createContext({
    categoriesMap: {},
})

export const CategoriesProvider = ({ children }) => {
    const [categoriesMap, setCategoriesMap] = useState({});
    
    // Only for adding data into the firebase db, Do not need to use once the data is loaded
    // useEffect(() => {
    //     addCollectionAndDocuments('categories', SHOP_DATA);
    // }, [])

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            // console.log(categoryMap);
            setCategoriesMap(categoryMap);
        }
        getCategoriesMap();
    }, [])
    const value = { categoriesMap }; 

    return (
        <CategoriesContext.Provider value={value}>{ children }</CategoriesContext.Provider>
    )
}