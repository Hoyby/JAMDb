import React, { useEffect, useState } from 'react'
import MovieService from '../services/movieService'
import { MovieCard } from './MovieCard'
import { useAppDispatch, useAppSelector } from '../hooks'
import { Dispatch } from '@reduxjs/toolkit'
import { SearchAndSortMovies } from '../services/movieService/__generated__/SearchAndSortMovies'
import { setSearchPage } from '../slices/searchPageSlice'
// material-tailwind is not officially supported by TS - hence the ignores
/* eslint-disable */
// @ts-ignore
import InputIcon from '@material-tailwind/react/InputIcon'
// @ts-ignore
import Icon from '@material-tailwind/react/Icon'
// @ts-ignore
import Button from '@material-tailwind/react/Button'
/* eslint-enable */

// Redux dispatch
const actionDispatch = (dispatch: Dispatch) => ({
    setSearchResult: (page: SearchAndSortMovies['searchandSortMovie']) =>
        dispatch(setSearchPage(page)),
})

export function Search() {
    // Set new redux seach page state
    const { setSearchResult: setSearchResult } = actionDispatch(
        useAppDispatch(),
    )

    // Current redux seach page state
    const searchResult = useAppSelector((state) => state.searchPage.searchPage)

    let timer: NodeJS.Timeout

    const [sortValue, setSortValue] = useState(-1)

    const [searchInput, setSearchInput] = useState<string>('')

    const fetchSearchResults = async (query: string) => {
        setSearchInput(query)
        const queryResult = await MovieService.searchandSortMovie(
            query,
            sortValue,
        ).catch((err: Error) => {
            console.error(err)
        })
        if (queryResult) setSearchResult(queryResult)
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        clearTimeout(timer)
        timer = setTimeout(() => {
            fetchSearchResults(event.target.value).catch((err) => {
                console.error(err)
                throw err
            })
        }, 700)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    }

    useEffect(() => {
        fetchSearchResults(searchInput).catch((err) => {
            console.error(err)
            throw err
        })
    }, [sortValue])

    return (
        <>
            <form className="my-10" onSubmit={handleSubmit}>
                <InputIcon
                    type="text"
                    name="searchbar"
                    id="searchbar"
                    className="p-3 mb-16"
                    color="blueGray"
                    size="lg"
                    iconFamily="material-icons"
                    iconName="search"
                    outline={true}
                    placeholder="Search Movies"
                    onChange={handleInputChange}
                />
            </form>
            <Button
                size="sm"
                className="ml-auto my-5"
                ripple="light"
                color="pink"
                onClick={() => {
                    setSortValue(-sortValue)
                }}
            >
                <Icon name="sort" size="sm" /> Sort by date added
            </Button>

            <div className="max-w-screen-xl w-full h-full flex justify-between flex-wrap gap-8 mb-10">
                {searchResult &&
                    searchResult.map((movie) => (
                        <MovieCard
                            title={movie?.title}
                            description={movie?.description}
                            _id={movie?._id}
                        />
                    ))}
            </div>
        </>
    )
}

export default Search