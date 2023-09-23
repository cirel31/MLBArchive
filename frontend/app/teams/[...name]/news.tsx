import React, { useState, Fragment, useCallback } from "react";
import NewsList from "./newsList";
import Categories from "./category";
import "../../../styles/News.css";

const App = () => {
  const [searchKeyword, setSearchKeyword] = useState(""); // 검색어 상태 추가
  const [category, setCategory] = useState("all");
  const onSelect = useCallback((category) => setCategory(category), []);

  const onSearch = (keyword) => {
    // 검색 버튼 클릭 또는 검색어 입력 후 호출되는 함수
    setSearchKeyword(keyword);
    setCategory("all"); // 검색 시 카테고리를 "all"로 설정 (선택한 카테고리를 해제)
  };

  return (
    <div>
      <Fragment>
        {/* Categories 컴포넌트에 onSearch 함수 전달 */}
        <select
          value={category}
          onChange={(e) => onSelect(e.target.value)}
          className="category-select" // 스타일을 적용할 클래스 추가
        >
          {/* ... */}
        </select>
        <input
          type="text"
          placeholder="검색할 내용을 입력하세요."
          onChange={(e) => setSearchKeyword(e.target.value)}
          className="search-input" // 스타일을 적용할 클래스 추가
        />
        <button onClick={() => onSearch(searchKeyword)}>검색</button>
        {/* <Categories
          category={category}
          onSelect={onSelect}
          onSearch={onSearch}
        /> */}

        {/* NewsList 컴포넌트에 searchKeyword와 category를 전달 */}
        <NewsList searchKeyword={searchKeyword} category={category} />
      </Fragment>
    </div>
  );
};

export default App;
