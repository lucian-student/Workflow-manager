import React, { useContext } from "react";
import SearchBarStyles from './SearchBar/SearchBar.module.css';
import { AiOutlineSearch } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';
import { SearchBarContext } from '../../context/searchBar';

function SearchBar(): JSX.Element {

    // const { register } = useForm<SearchInput>();
    const { watchSearch, setWatchSearch } = useContext(SearchBarContext);

    function handleChange(event) {
        setWatchSearch(event.target.value);
    }

    return (
        <div className={SearchBarStyles.search_bar_wrapper}>
            <form>
                <div className={SearchBarStyles.input_group}>
                    <AiOutlineSearch className={SearchBarStyles.search_icon} />
                    {watchSearch && (
                        <ImCancelCircle className={SearchBarStyles.cancel_icon}
                            onClick={() => {
                                setWatchSearch('')
                            }} />
                    )}
                    <input className={SearchBarStyles.input}
                        name='search'
                        placeholder='Search'
                        type='text'
                        autoComplete='on'
                        value={watchSearch}
                        onChange={handleChange}
                        /*{...register('search')}*/ />
                </div>
            </form>
        </div>
    )

}

export default SearchBar;