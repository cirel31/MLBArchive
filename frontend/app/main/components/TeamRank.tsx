// "use client"
// import {useEffect, useState} from "react";
// import {fetchTeamRankDataAPI} from "@/app/redux/api/rankAPI";
// import {AxiosResponse} from "axios";

// const TeamRank = () => {
//   const [teamList, setTeamList] = useState([])
//   useEffect(() => {
//     const response: Promise<AxiosResponse> = fetchTeamRankDataAPI()
//     response
//       .then((response) => {
//         setTeamList(response.data)
//       })
//       .catch((error) => {
//         console.log(error)
//       })
//   }, [])

//   return (
//     <>
//       <div>
//         {teamList.length >= 5 ?
//           teamList.map((content: any) => (
//             <div key={content.id}>
//               {content.name}
//             </div>
//           )) :
//           <p>받아온 팀 정보 없음</p>
//         }
//       </div>
//     </>
//   )
// }

// export default TeamRank

"use client";

import React from "react";
import { Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
    filters: [
      {
        text: "Joe",
        value: "Joe",
      },
      {
        text: "Category 1",
        value: "Category 1",
        children: [
          {
            text: "Yellow",
            value: "Yellow",
          },
          {
            text: "Pink",
            value: "Pink",
          },
        ],
      },
      {
        text: "Category 2",
        value: "Category 2",
        children: [
          {
            text: "Green",
            value: "Green",
          },
          {
            text: "Black",
            value: "Black",
          },
        ],
      },
    ],
    filterMode: "tree",
    filterSearch: true,
    onFilter: (value: string, record) => record.name.includes(value),
    width: "30%",
  },
  {
    title: "Age",
    dataIndex: "age",
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: "Address",
    dataIndex: "address",
    filters: [
      {
        text: "London",
        value: "London",
      },
      {
        text: "New York",
        value: "New York",
      },
    ],
    onFilter: (value: string, record) => record.address.startsWith(value),
    filterSearch: true,
    width: "40%",
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
];

const onChange: TableProps<DataType>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log("params", pagination, filters, sorter, extra);
};

const App: React.FC = () => (
  <>
    <h3>Team Rank</h3>
    <Table columns={columns} dataSource={data} onChange={onChange} />
  </>
);

export default App;
