import React from "react";
import FormRow from "./FormRow";
import FormRowSelect from "./FormRowSelect";
import { useAppContext } from "../context/appContext";
import Wrapper from "../wrappers/SearchContainerWrapper";

const Search = () => {
  const { isLoading, search, sort, sortOptions, searchDate, handleChange } =
    useAppContext();

  const handleSearch = (e) => {
    if (isLoading) return;
    handleChange({ name: e.target.name, value: e.target.value });
  };

  return (
    <Wrapper>
      <center>
        <form className="form">
          <h4>search ToDo</h4>

          <div className="form-center">
            <FormRow
              type="text"
              labelText="Search by Name"
              name="search"
              value={search}
              handleChange={handleSearch}
            ></FormRow>

            <FormRow
              type="date"
              labelText="Search by Date"
              name="searchDate"
              value={searchDate}
              handleChange={handleSearch}
            ></FormRow>

            <FormRowSelect
              labelText="sort"
              name="sort"
              value={sort}
              handleChange={handleSearch}
              list={sortOptions}
            ></FormRowSelect>
          </div>
        </form>
      </center>
    </Wrapper>
  );
};

export default Search;
