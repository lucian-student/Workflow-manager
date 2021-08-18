import React, { useEffect, useContext } from "react";
import SearchBarStyles from './SearchBar/SearchBar.module.css';
import { AiOutlineSearch } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';
import { useForm } from 'react-hook-form';
import { ProjectSortContext } from '../../context/projectSort';

interface SearchInput {
    search: string
}

function SearchBar(): JSX.Element {

    const { register, watch, setValue } = useForm<SearchInput>();

    const { setSortOptions } = useContext(ProjectSortContext);

    const search = watch('search');

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
                setSortOptions(old => {
                    return {
                        order_param: old.order_param,
                        order: old.order,
                        search: search
                    }
                });
        }, 500);

        return () => clearTimeout(delayDebounceFn)
    }, [search]);

    return (
        <div className={SearchBarStyles.search_bar_wrapper}>
            <form>
                <div className={SearchBarStyles.input_group}>
                    <AiOutlineSearch className={SearchBarStyles.search_icon} />
                    {search && (
                        <ImCancelCircle className={SearchBarStyles.cancel_icon}
                            onClick={() => {
                                setValue('search', '')
                                setSortOptions(old => {
                                    return {
                                        order_param: old.order_param,
                                        order: old.order,
                                        search: ''
                                    }
                                });
                            }} />
                    )}
                    <input className={SearchBarStyles.input}
                        name='search'
                        placeholder='Search'
                        type='text'
                        autoComplete='on'
                        {...register('search')} />
                </div>
            </form>
        </div>
    )

}

export default SearchBar;