import React, { useState, useRef, useEffect } from 'react';
import { Search as SearchIcon } from 'lucide-react';

const SeachBox = ({ onSearch }) => {
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [searchString, setSearchString] = useState('');
    const searchContainerRef = useRef(null);
    const searchInputRef = useRef(null);

    const handleSearchIconClick = () => {
        setIsSearchVisible(true);
    };

    const handleSearch = () => {
        if (onSearch && searchString.trim()) {
            onSearch(searchString);
            setIsSearchVisible(false);
            setSearchString('');
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                searchContainerRef.current &&
                !searchContainerRef.current.contains(event.target)
            ) {
                setIsSearchVisible(false);
            }
        };

        // Add event listener when search is visible
        if (isSearchVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        // Cleanup event listener
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSearchVisible]);

    useEffect(() => {
        if (isSearchVisible && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isSearchVisible]);

    return (
        <div className="relative" ref={searchContainerRef}>

            <button
                onClick={handleSearchIconClick}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Open search"
            >
                <SearchIcon className="text-gray-600 w-6 h-6" />
            </button>
            {isSearchVisible && (
                <div className="absolute right-0 top-full mt-2 z-50 shadow-lg bg-white border border-gray-200 rounded-lg p-2">
                    <div className="flex items-center space-x-2">
                        <input
                            ref={searchInputRef}
                            type="text"
                            value={searchString}
                            onChange={(e) => setSearchString(e.target.value)}
                            placeholder="Search..."
                            className="flex-grow border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        />
                        <button
                            onClick={handleSearch}
                            className="bg-blue-500 text-white px-1.5 py-1.5 rounded-md hover:bg-blue-600 transition-colors"
                        >
                            <SearchIcon size={18} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
export default SeachBox;