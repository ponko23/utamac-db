import React from "react";
import { RecoilRoot } from "recoil";
import { PlateList } from "./containers/PlateList";
import { PlateFilter } from "./components/PlateFilter";
import { PlatePagination } from "./components/PlatePagination";

function App() {
  return (
    <RecoilRoot>
      <PlateFilter />
      <PlatePagination />
      <PlateList />
      <PlatePagination />
    </RecoilRoot>
  );
}

export default App;
