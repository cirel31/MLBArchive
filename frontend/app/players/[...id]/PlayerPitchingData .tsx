import React from "react";
import { Table } from "antd";

interface PlayerPitchingData {
  [key: string]: any;
}

interface Props {
  playerScore: {
    playerPitching?: PlayerPitchingData;
  };
}

const PitchingTable: React.FC<Props> = ({ playerScore }) => {
  // 컬럼 설정에서 'id' 컬럼을 제거
  const columns = [
    {
      title: "항목",
      dataIndex: "field",
      key: "field",
    },
    {
      title: "내용",
      dataIndex: "value",
      key: "value",
    },
  ];

  // 투구 성적 데이터를 테이블 데이터로 변환
  const pitchingData = playerScore?.playerPitching
    ? Object.entries(playerScore.playerPitching)
        .slice(1) // 첫 번째 행을 제외한 나머지 데이터만 사용
        .map(([key, value]) => ({
          key,
          field: key,
          value: String(value),
        }))
    : [];

  return (
    <>
      {pitchingData.length > 0 ? (
        <Table
          columns={columns}
          dataSource={pitchingData}
          pagination={false} // 페이지네이션 비활성화 (모든 데이터를 하나의 테이블에 표시)
        />
      ) : (
        <div>해당 시즌에는 활동한 기록이 없습니다.</div>
      )}
    </>
  );
};

export default PitchingTable;
