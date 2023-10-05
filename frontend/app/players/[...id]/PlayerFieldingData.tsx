import React from "react";
import { Table } from "antd";

interface PlayerFieldingData {
  [key: string]: any;
}

interface Props {
  playerScore: {
    playerFielding?: PlayerFieldingData;
  };
}

const FieldingTable: React.FC<Props> = ({ playerScore }) => {
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

  // 수비 성적 데이터를 테이블 데이터로 변환
  const fieldingData = playerScore?.playerFielding
    ? Object.entries(playerScore.playerFielding)
        .slice(1)
        .map(([key, value]) => ({
          key,
          field: key,
          value: String(value),
        }))
    : [];

  return (
    <>
      {fieldingData.length > 0 ? (
        <Table
          columns={columns}
          dataSource={fieldingData}
          pagination={false} // 페이지네이션 비활성화 (모든 데이터를 하나의 테이블에 표시)
        />
      ) : (
        <div>해당 시즌에는 활동한 기록이 없습니다.</div>
      )}
    </>
  );
};

export default FieldingTable;
