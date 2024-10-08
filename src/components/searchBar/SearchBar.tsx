import React from "react";
import styles from "./searchBar.module.css";

interface SearchBarProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
    return (
    <div className={styles.searchContainer}>
        <input
        type="text"
        placeholder="Поиск активностей..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
        />
    </div>
    );
};

export default SearchBar;
