/* eslint-disable no-console */
import React, {useState} from 'react'
import ActorGrid from '../Components/Actor/ActorGrid';
import ShowGrid from '../Components/Show/ShowGrid';
import MainPageLayout from '../Components/MainPageLayout'
import {apiGet} from '../Misc/config'
import { useLastQuery } from '../Misc/custom-hooks';
import { RadioInputsWrapper, SearchButtonWrapper, SearchInput } from './Home.styled';
import CustomRadio from '../Components/CustomRadio';

const Home = () => {

    const [input, setInput] = useLastQuery();
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
            return results[0].show ? (
                <ShowGrid data={results} />
            ) : (
                <ActorGrid data={results}/>
            );
        }
        return null;
    }

    return (
        <MainPageLayout>
            <SearchInput 
            type='text' 
            placeholder='Search for something'
            onChange={onInputChange} 
            onKeyDown={onKeyDown} 
            value={input}
            />

            <RadioInputsWrapper>
                <div>
                    <CustomRadio
                    label="Shows"
                    id="shows-search" 
                    checked={isShowsSearch}
                    value="shows" 
                    onChange={onRadioChange} 
                    />
                </div>
                <div>
                    <CustomRadio
                    label="Actors"
                    id="actors-search" 
                    checked={!isShowsSearch} 
                    value="people" 
                    onChange={onRadioChange}
                    />
                </div>
            </RadioInputsWrapper>
            <SearchButtonWrapper>
            <button type="button" onClick={onSearch}>Search</button>
            </SearchButtonWrapper>
            {renderResult()}
        </MainPageLayout>
    )
}

export default Home
