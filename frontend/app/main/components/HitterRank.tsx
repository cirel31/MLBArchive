import React from "react";
import { useEffect, useState } from "react";
import { fetchHittingRankerDataAPI } from "@/app/redux/api/rankAPI";
import { useRouter } from "next/navigation";
import { List } from "antd";
import { Image } from "antd";
import First from "./5406818.png";

interface PromiseResult {
  message: string;
  status: number;
  resultData: any;
}

// HitterRank.tsx
// ...

const HitterRank = () => {
  const [hitter, setHitter] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: Promise<PromiseResult> = fetchHittingRankerDataAPI();
        response
          .then((response) => {
            setHitter(response.resultData);
          })
          .catch(() => {
          });
      } catch (error) {
      }
    };
    fetchData();
  }, []);

  const data = hitter.map((content: any, index: number) => ({
    key: content.playerId,
    name: content.name,
    age: content.age, // 수정 필요
    address: content.address, // 수정 필요
  }));

  return (
    <div className="hitter-rank-container">
      {/* 스타일을 적용할 컨테이너 */}
      <div>
        <div className="player_name2">Hitter</div>
        {hitter.length > 0 ? (
          <List
            dataSource={hitter}
            renderItem={(content: any, index: number) => (
              <List.Item
                key={content.playerId}
                onClick={() => router.push(`/players/${content.playerId}`)}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {/* <span className="rank">{index + 1}.</span> */}

                    {index == 0 ? ( // 상위 3명에 따라 이미지 지정
                      <Image
                        src="https://cdn-icons-png.flaticon.com/128/1021/1021116.png"
                        alt=""
                        width={"50px"}
                      />
                    ) : index == 1 ? (
                      <Image
                        src="https://cdn-icons-png.flaticon.com/128/1021/1021085.png"
                        alt=""
                        width={"50px"}
                      />
                    ) : index == 2 ? (
                      <Image
                        src="https://cdn-icons-png.flaticon.com/128/1021/1021077.png"
                        alt=""
                        width={"50px"}
                      />
                    ) : (
                      <span className="rank">{index + 1}</span>
                    )}
                    <div style={{ display: "flex" }}>
                      <div style={{ width: "50px" }}>
                        <Image
                          src={content.image}
                          className="player_img"
                          style={{ width: "50px", marginLeft: "10px" }}
                          alt="선수 이미지"
                        />
                      </div>

                      <div className="player_name5">{content.korName}</div>
                    </div>
                  </div>
                </div>
              </List.Item>
            )}
          />
        ) : (
          <p>받아온 타자 정보 없음</p>
        )}
      </div>
    </div>
  );
};

export default HitterRank;
