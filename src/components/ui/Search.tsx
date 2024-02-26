import React from "react";
import { Restaurant } from "../../interfaces/mock-data-interface.";
import { Autocomplete, Stack, TextField } from "@mui/material";

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
        options={data.map((restaurant) => restaurant.name)}
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
