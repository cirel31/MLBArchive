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
  const [pitcher, setPitcher] = useState([]);
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
    <div className="pitcher-rank-container">
      {" "}
      {/* 스타일을 적용할 컨테이너 */}
      <div>
        <div>투수 순위</div>
        <List
          dataSource={pitcher}
          renderItem={(content: any, index: number) => (
            <List.Item
              key={index}
              onClick={() => router.push(`/players/${content.playerId}`)}
            >
              <div>
                <span className="rank">{index + 1}</span>
                <Image
                  src={content.image}
                  className="player_img"
                  style={{ width: "30px" }}
                  alt="선수 이미지"
                />
                {content.name}
              </div>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default PitcherRank;
