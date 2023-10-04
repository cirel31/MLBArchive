"use client";

import React from "react";
import { Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import HitterRank from "@/app/main/components/HitterRank";
import PitcherRank from "@/app/main/components/PitcherRank";

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

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
    <div className="player_rank">
      <div style={{ width: "60%" }}>
        <HitterRank />
      </div>
      <div style={{ width: "60%" }}>
        <PitcherRank />
      </div>
    </div>
  </>
);

export default App;
