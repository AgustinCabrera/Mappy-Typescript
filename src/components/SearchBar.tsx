import { ChangeEvent, useRef } from "react"
import { PlacesContext } from "../context";
import { useContext } from "react";
import { SearchResults } from "./SearchResults";

export const SearchBar = () => {

    const {searchPlacesByTerm} = useContext( PlacesContext );
    
    const debounceRef = useRef<NodeJS.Timeout>()
    
    const onQueryChanged = (event:ChangeEvent<HTMLInputElement>) => {
        if(debounceRef.current) 
            clearTimeout(debounceRef.current);

            debounceRef.current = setTimeout(() => {
            searchPlacesByTerm(event.target.value);
        }, 350);
    }
    return (
    <div className="search-container">
        <input 
        type="text" 
        placeholder="Search Place..." 
        className="form-control"
        onChange={onQueryChanged}
        />
        <SearchResults />
        </div>
)
}
