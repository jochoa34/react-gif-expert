import {useState} from "react";
// import PropTypes from 'prop-types';


export const AddCategory = ({onNewCategory}) => {

    const [inputValue, setInputValue] = useState('One Punch');

    const onInputChange = ({target}) => { // console.log(target.value);
        setInputValue(target.value);
    }
    const onSubmit = (event) => {
        event.preventDefault();
        if (inputValue.trim().length <= 1) return;
        
        onNewCategory(inputValue.trim())
        setInputValue('');
    }
    return (
        <form onSubmit={onSubmit}>
            <input type="text" placeholder="Buscar gifs"
                value={inputValue}
                onChange={onInputChange}/>
        </form>
    )
};

// AddCategory.prototype ={
//     onNewCategory: PropTypes.func.isRequired
// }
