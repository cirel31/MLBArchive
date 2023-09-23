import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";

type NewsItem = {
  title: string;
  description: string;
  link: string;
};

const DetailTeamPage: React.FC = () => {
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        console.log("fetchNewsData 함수 호출");
        const apiKey = "FLOc3fYEiPsAYS8J8095";
        const teamName = "가을"; // 특정 팀의 이름 또는 키워드

        const response: AxiosResponse = await axios.get(
          "https://openapi.naver.com/v1/search/news.json",
          {
            headers: {
              "X-Naver-Client-Id": apiKey,
              "X-Naver-Client-Secret": "r8K6aviDft",
            },
            params: {
              query: teamName,
            },
          }
        );

        console.log("뉴스 데이터 응답:", response);
        setNewsData(response.data.items);
        setIsLoading(false);
      } catch (error) {
        console.error("뉴스 데이터를 불러오는 중에 오류 발생:", error);
      }
    };

    fetchNewsData();
  }, []);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  // newsData를 사용하여 뉴스 정보를 표시
  return (
    <>
      {newsData.map((newsItem: NewsItem, index: number) => (
        <div key={index} className="news-item">
          <h2>{newsItem.title}</h2>
          <p>{newsItem.description}</p>
          <a href={newsItem.link} target="_blank" rel="noopener noreferrer">
            Read More
          </a>
        </div>
      ))}
    </>
  );
};

export default DetailTeamPage;
