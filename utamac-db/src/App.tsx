import React from "react";
import { RecoilRoot } from "recoil";
import { PlateList } from "./containers/PlateList";
import { PlateFilter } from "./components/PlateFilter";
import { PlatePagination } from "./components/PlatePagination";

function App() {
  return (
    <RecoilRoot>
      <div
        style={{
          position: "fixed",
          top: 0,
          height: 80,
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
