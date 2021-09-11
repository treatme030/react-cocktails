import React, { useContext, useEffect, useState } from 'react';

const AppContext = React.createContext()
const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='

export const AppProvider = ({ children }) => {
    const [loading, setLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState('b')
    const [cocktails, setCocktails] = useState([])

    const fetchDrinks = async () => {
        setLoading(true)
        try {
            const response = await fetch(`${url}${searchTerm}`)
            const data = await response.json()
            const { drinks } = data

            if(drinks){
                //필요한 데이터만 가져오기
                const newCocktails = drinks.map((item) => {
                    const { 
                        idDrink, 
                        strDrink, 
                        strDrinkThumb, 
                        strAlcoholic, 
                        strGlass 
                    } = item
                    return { 
                        id: idDrink, 
                        name: strDrink, 
                        image: strDrinkThumb, 
                        info: strAlcoholic, 
                        glass: strGlass
                    }  
                })
                setCocktails(newCocktails)
            } else {
                setCocktails([])
            }
            setLoading(false)
        } catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        fetchDrinks()
    },[searchTerm])
    return (
        <AppContext.Provider 
        value={{
            loading,
            cocktails,
            setSearchTerm,
        }}>
            { children }
        </AppContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(AppContext)
}

