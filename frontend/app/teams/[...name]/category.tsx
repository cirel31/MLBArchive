import React, { useState } from "react";
import styled, { css } from "styled-components";

// const categories = [
//   {
//     name: "all",
//     text: "전체보기",
//   },
//   {
//     name: "business",
//     text: "비즈니스",
//   },
//   {
//     name: "entertainment",
//     text: "엔터테인먼트",
//   },
//   {
//     name: "health",
//     text: "건강",
//   },
//   {
//     name: "science",
//     text: "과학",
//   },
//   {
//     name: "sports",
//     text: "스포츠",
//   },
//   {
//     name: "technology",
//     text: "기술",
//   },
// ];

const CategoriesBlock = styled.div`
  display: flex;
  padding: 1rem;
  width: 768px;
  margin: 0 auto;
  @media screen and (max-width: 768px) {
    width: 100%;
    overflow-x: auto;
  }
`;

const Category = styled.div`
  font-size: 1.125rem;
  cursor: pointer;
  white-space: pre;
  text-decoration: none;
  color: inherit;
  padding-bottom: 0.25rem;

  &:hover {
    color: #495057;
  }

  ${(props) =>
    props.active &&
    css`
      font-weight: 600;
      border-bottom: 2px solid #22b8cf;
      color: #22b8cf;

      &:hover {
        color: #3bc9db;
      }
    `}

  & + & {
    margin-left: 1rem;
  }
`;

const SearchInput = styled.input`
  font-size: 1.125rem;
  border: none;
  outline: none;
  padding: 0.5rem;
  margin-right: 1rem;
`;

const SearchButton = styled.button`
  font-size: 1.125rem;
  background-color: #22b8cf;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
`;

const Categories = ({ onSelect, category, onSearch }) => {
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSearch = () => {
    onSearch(searchKeyword);
  };

  return (
    <CategoriesBlock>
      <SearchInput
        type="text"
        placeholder="검색어를 입력하세요"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
      />
      <SearchButton onClick={handleSearch}>검색</SearchButton>
    </CategoriesBlock>
  );
};

export default Categories;
