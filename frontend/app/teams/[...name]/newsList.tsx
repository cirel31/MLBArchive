import styled from "styled-components";
import NewsItem from "./newsItem";
import React, { useEffect, useState } from "react";
import axios from "axios";

const NewsListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
}

const NewsList = ({ searchKeyword }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const apiKey = "4608c15e5e5347b3ae18c7fc6e2fb7a7"; // News API 키를 여기에 입력
        const query = encodeURIComponent(searchKeyword);
        const res = await axios.get(
          `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`
        );

        setArticles(res.data.articles);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [searchKeyword]);

  if (loading) {
    return <NewsListBlock>로딩 중...</NewsListBlock>;
  }

  return (
    <NewsListBlock>
      {articles.map((article) => (
        <NewsItem key={article.url} article={article} />
      ))}
    </NewsListBlock>
  );
};

export default NewsList;
