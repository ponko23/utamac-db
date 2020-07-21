import React from "react";
import { RecoilRoot } from "recoil";
import { PlateList } from "./containers/PlateList";
import { PlateFilter } from "./components/PlateFilter";
import { PlatePagination } from "./components/PlatePagination";

function App() {
  document.title = "歌マクロスDB";
  return (
    <RecoilRoot>
      <h3
        style={{
          position: "fixed",
          top: 0,
          height: 26,
          margin: 0,
          paddingLeft: 5,
          width: "100%",
          background: "#3399FF",
          color: "white",
        }}
      >
        歌マクロスDB
      </h3>
      <div
        style={{
          position: "fixed",
          top: 26,
          height: 78,
          width: "100%",
          padding: 5,
          boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
          transition: "0.3s",
          background: "white",
        }}
      >
        <PlateFilter />
        <PlatePagination />
      </div>
      <PlateList />
    </RecoilRoot>
  );
}

export default App;
