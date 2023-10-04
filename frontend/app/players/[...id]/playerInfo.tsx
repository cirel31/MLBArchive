import React from "react";
import { Table, Typography, Card } from "antd";

interface PlayerInfo {
  backnumber: string | number;
  debutDate: string;
  retireDate: string;
  height: string;
  weight: string;
  name: string;
  mainPosition: string;
  playing: boolean;
  mainHand: string;
}

interface Props {
  playerData: PlayerInfo;
}

const PlayerInfoTable: React.FC<Props> = ({ playerData }) => {
  console.log({ playerData });
  const columns: any = [
    {
      title: "항목",
      dataIndex: "field",
      key: "field",
      align: "center",
    },
    {
      title: "내용",
      dataIndex: "value",
      key: "value",
      align: "center",
    },
  ];
  const activityStatus = playerData.playing ? "활동 중" : "은퇴";
  const retireDateValue =
    playerData.retireDate !== null ? playerData.retireDate : "-";
  const backValue = playerData.backnumber !== -1 ? playerData.backnumber : "-";
  const data = [
    { key: "playing", field: "활동여부", value: activityStatus },
    { key: "backnumber", field: "등번호", value: backValue },
    { key: "debutDate", field: "데뷔일", value: playerData.debutDate },
    { key: "retireDate", field: "은퇴일", value: retireDateValue },
    { key: "height", field: "키", value: playerData.height },
    { key: "weight", field: "몸무게", value: playerData.weight },
    { key: "name", field: "이름", value: playerData.name },
    {
      key: "mainPosition",
      field: "주요 포지션",
      value: playerData.mainPosition,
    },
    // { key: "playing", field: "경기 수", value: playerData.playing },
    { key: "mainHand", field: "주요 손", value: playerData.mainHand },
  ];

  return (
    <div
      style={{
        width: "700px",
        border: "5px solid rgb(6, 31, 77)",
        borderRadius: "10px",
      }}
    >
      <Card title="Player Information">
        <Table
          dataSource={data}
          columns={columns}
          pagination={false} // 페이지네이션 비활성화 (모든 내용을 하나의 테이블에 표시)
          size="large"
        />
      </Card>
    </div>
  );
};

export default PlayerInfoTable;
