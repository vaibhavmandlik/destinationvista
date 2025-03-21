import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/system';

interface SearchContainerProps {
  expanded: boolean;
}

const SearchContainer = styled('div')<SearchContainerProps>(({ expanded }) => ({
  display: 'flex',
  alignItems: 'center',
  transition: 'width 0.3s ease',
  width: expanded ? '300px' : '150px',
  overflow: 'hidden',
  padding: '4px',
}));

const SearchBar: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(true);
  };

  const handleBlur = () => {
    setExpanded(false);
  };
  const [searchText, setSearchText] = useState('');
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      alert('Search initiated:'+ searchText);
      // Add your search function here
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  return (
    <SearchContainer expanded={expanded}>
      <TextField
        variant="outlined"
        size="small"
        placeholder="Search"
        onBlur={handleBlur}
        onFocus={handleExpandClick}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton onClick={handleExpandClick}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ backgroundColor: 'white', width: expanded ? '100%' : '100%', transition: 'width 0.3s ease' }}
      />
    </SearchContainer>
  );
};

export default SearchBar;