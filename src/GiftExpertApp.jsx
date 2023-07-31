import {useState} from 'react';
import {AddCategory,GifGrid} from './components';

export const GiftExpertApp = () => {

    const [categories, setCategories] = useState(['One Punch']);

    const onAddCategory = (NewCategory) => {
        if (categories.includes(NewCategory)) 
            return;
        
        // console.log(NewCategory);
        setCategories([
            NewCategory,
            ...categories
        ]);
    }


    return (
        <> 
            <h1>GifExpertApp</h1>
            <AddCategory 
                onNewCategory={(value) =>onAddCategory(value)}
            /> 
            {
                categories.map((category) => (
                    <GifGrid 
                        key={category} 
                        category={category} />
                ))
            }   
        </>
    )
};
