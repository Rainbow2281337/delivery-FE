import React from "react";
import { Autocomplete, Stack, TextField } from "@mui/material";
import { Restaurant } from "../../interfaces/restaurant-interface";

interface SearchProps {
  data: Restaurant[];
}

const Search: React.FC<SearchProps> = ({ data }) => {
  return (
    <Stack spacing={2} sx={{ width: 400 }}>
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={data.map((restaurant) => restaurant.title)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search in restaurants"
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
          />
        )}
      />
    </Stack>
  );
};

export default Search;
