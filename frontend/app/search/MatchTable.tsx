import { Table } from "antd";
// import "antd/dist/antd.css"; // Ant Design 스타일 시트를 불러옵니다.

// ... (다른 import 및 컴포넌트 코드)

const columns = [
  {
    title: "경기 ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "홈팀",
    dataIndex: "homeName",
    key: "homeName",
  },
  {
    title: "어웨이팀",
    dataIndex: "awayName",
    key: "awayName",
  },
  {
    title: "경기 날짜",
    dataIndex: "matchDate",
    key: "matchDate",
  },
  {
    title: "홈팀 점수",
    dataIndex: "homeScore",
    key: "homeScore",
  },
  {
    title: "어웨이팀 점수",
    dataIndex: "awayScore",
    key: "awayScore",
  },
];

const MyTable = ({ matchList, searchDetailMatch }) => {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  return (
    <Table
      dataSource={matchList.map((match) => ({
        id: match.id,
        homeName: match.homeName,
        awayName: match.awayName,
        matchDate: formatDate(match.matchDate), // 날짜 형식으로 변환
        homeScore: match.homeScore,
        awayScore: match.awayScore,
      }))}
      columns={columns}
      onRow={(record) => ({
        onClick: () => {
          searchDetailMatch(String(record.id));
        },
      })}
    />
  );
};

export default MyTable;
