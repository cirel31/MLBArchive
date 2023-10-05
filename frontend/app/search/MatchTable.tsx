"use client"
import { Table } from "antd";
import {useDispatch, useSelector} from "react-redux";
import {requestDetailMatchData} from "@/app/redux/features/matchSlice";
import {useRouter} from "next/navigation";

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

const MyTable = () => {
  const matchList = useSelector((state: any) => state.match?.matchData);
  const dispatch = useDispatch()
  const router = useRouter()
  const searchDetailMatch = (id: string) => {
    dispatch(requestDetailMatchData(id));
    router.push(`/match/${id}`);
  };
  const formatDate = (dateString:any) => {
    const options:any = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  return (
    <Table
      dataSource={matchList.map((match:any) => ({
        id: match.id,
        homeName: match.homeName,
        awayName: match.awayName,
        matchDate: formatDate(match.matchDate),
        homeScore: match.homeScore,
        awayScore: match.awayScore,
      }))}
      columns={columns}
      rowKey={(record) => record.id}
      onRow={(record) => ({
        onClick: () => {
          searchDetailMatch(String(record.id));
        },
      })}
    />
  );
};

export default MyTable;
