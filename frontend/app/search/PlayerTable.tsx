import { Table } from "antd";
import "../../styles/SearchPageStyle.scss";
import {useRouter} from "next/navigation";
import {useSelector} from "react-redux";
import React from "react";

const MyTable = () => {
  const playerResult = useSelector((state: any) => state.searchPlayer.wordParseResult);
  console.log("선수결과", playerResult)
  const router = useRouter()
  const columns = [
    {
      title: "선수 이름",
      dataIndex: "name",
      key: "name",
      render: (value:string) => (<p>{value}</p>)
    },
    {
      title: "한글 이름",
      dataIndex: "korName",
      key: "korName",
      render: (value:string) => (<p>{value}</p>)
    },
    {
      title: "키",
      dataIndex: "height",
      key: "height",
      render: (value:number) => (<p>{(value === -1) ? "-" : value}</p>)
    },
    {
      title: "몸무게",
      dataIndex: "weight",
      key: "weight",
      render: (value:number) => (<p>{(value === -1) ? "-" : value}</p>)
    },
  ];

  return (
    <Table
      className="playertable"
      dataSource={playerResult}
      columns={columns}
      rowKey={(record) => record.id}
      onRow={(record) => ({
        onClick: () => {
          router.push(`/players/${record.id}`);
        },
      })}
    />
  );
};

export default MyTable;
