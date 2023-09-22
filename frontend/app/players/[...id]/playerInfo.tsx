import React from "react";
import { Table } from "antd";

interface PlayerInfo {
  backnumber: string;
  debutDate: string;
  retireDate: string;
  height: string;
  weight: string;
  name: string;
  mainPosition: string;
  playing: string;
  mainHand: string;
}

interface Props {
  playerData: PlayerInfo;
}

const PlayerInfoTable: React.FC<Props> = ({ playerData }) => {
  const columns = [
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

  const data = [
    { key: "backnumber", field: "등번호", value: playerData.backnumber },
    { key: "debutDate", field: "데뷔일", value: playerData.debutDate },
    { key: "retireDate", field: "은퇴일", value: playerData.retireDate },
    { key: "height", field: "키", value: playerData.height },
    { key: "weight", field: "몸무게", value: playerData.weight },
    { key: "name", field: "이름", value: playerData.name },
    {
      key: "mainPosition",
      field: "주요 포지션",
      value: playerData.mainPosition,
    },
    { key: "playing", field: "경기 수", value: playerData.playing },
    { key: "mainHand", field: "주요 손", value: playerData.mainHand },
  ];

  return (
    <div style={{ width: "60%" }}>
      <Table
        dataSource={data}
        columns={columns}
        pagination={false} // 페이지네이션 비활성화 (모든 내용을 하나의 테이블에 표시)
        size="large"
      />
    </div>
  );
};

export default PlayerInfoTable;
