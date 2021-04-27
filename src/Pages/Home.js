/* eslint-disable no-console */
import React, {useState} from 'react'
import MainPageLayout from '../Components/MainPageLayout'
import {apiGet} from '../Misc/config'

const Home = () => {

    const [input, setInput] = useState('');
    const [results, setResults] = useState(null);
    const [searchOption, setSearchOption] = useState('shows');

    const isShowsSearch = searchOption === 'shows';

    const onInputChange = (ev) =>{
        setInput(ev.target.value);
    }

    const onSearch = () =>{

        apiGet(`/search/${searchOption}?q=${input}`).then(result => {
            setResults(result);
        });
    };

    const onKeyDown = (ev) =>{
        if(ev.keyCode === 13){
            onSearch();
        }
    };

    const onRadioChange = (ev) => {
        setSearchOption(ev.target.value);
    }

    console.log(searchOption);

    const renderResult = () =>{
        if(results && results.length === 0){
            return <div>No Results Found</div>

        }

        if(results && results.length > 0){
            return results[0].show ? 
            results.map(item => (
            <div key={item.show.id}>{item.show.name}</div>
            )) :
            results.map(item => (
            <div key={item.person.id}>{item.person.name}</div>
            ))
  
        }

        return null;
    }

    return (
        <MainPageLayout>
            <input 
            type='text' 
            placeholder='Search for something'
            onChange={onInputChange} 
            onKeyDown={onKeyDown} 
            value={input}
            />

            <div>
            <label htmlFor="shows-search">
                Shows
                <input 
                id="shows-search" 
                checked={isShowsSearch}
                type="radio" 
                value="shows" 
                onChange={onRadioChange} 
                />
            </label>
            
            <label htmlFor="actors-search">
                Actors
                <input 
                id="actors-search" 
                type="radio" 
                checked={!isShowsSearch} 
                value="people" 
                onChange={onRadioChange}
                />
            </label>
            </div>
            <button type="button" onClick={onSearch}>Search</button>
            {renderResult()}
        </MainPageLayout>
    )
}

export default Home
