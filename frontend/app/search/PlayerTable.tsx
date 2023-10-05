import { Table } from "antd";
import "../../styles/SearchPageStyle.scss";

const MyTable = ({ playerResult, router }) => {
  const columns = [
    {
      title: "선수 이름",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "한글 이름",
      dataIndex: "korName",
      key: "korName",
    },
    {
      title: "키",
      dataIndex: "height",
      key: "height",
      render: (height) => (height === -1 ? "-" : height),
    },
    {
      title: "몸무게",
      dataIndex: "weight",
      key: "weight",
      render: (weight) => (weight === -1 ? "-" : weight),
    },
  ];

  return (
    <Table
      className="playertable"
      dataSource={playerResult}
      columns={columns}
      onRow={(record) => ({
        onClick: () => {
          router.push(`/players/${record.id}`);
        },
      })}
    />
  );
};

export default MyTable;
