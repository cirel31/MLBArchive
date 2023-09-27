import { useEffect, useState } from "react";
import { fetchPitchingRankerDataAPI } from "@/app/redux/api/rankAPI";
import { useRouter } from "next/navigation";
import { List } from "antd";
import { Image } from "antd";

interface PromiseResult {
  message: string;
  status: number;
  resultData: any[];
}

const PitcherRank = () => {
  const [pitcher, setPitcher] = useState<any>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: Promise<PromiseResult> = fetchPitchingRankerDataAPI();
        const result = await response;
        setPitcher(result.resultData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="hitter-rank-container">
      {/* 스타일을 적용할 컨테이너 */}
      <div>
        <div className="player_name2">Pitcher Rank</div>
        {pitcher.length > 0 ? (
          <List
            dataSource={pitcher}
            renderItem={(content: any, index: number) => (
              <List.Item
                key={content.playerId}
                onClick={() => router.push(`/players/${content.playerId}`)}
              >
                <div className="player_rank">
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

                    <Image
                      src={content.image}
                      className="player_img"
                      style={{ width: "40px", marginLeft: "20px" }}
                      alt="선수 이미지"
                    />
                    <div className="player_name">{content.name}</div>
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

export default PitcherRank;
