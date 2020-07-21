import React from "react";
import { RecoilRoot } from "recoil";
import { PlateList } from "./containers/PlateList";
import { PlateFilter } from "./components/PlateFilter";
import { PlatePaging } from "./components/PlatePaging";

function App() {
  return (
    <RecoilRoot>
      <PlateFilter />
      <PlatePaging />
      <PlateList />
      <PlatePaging />
    </RecoilRoot>
  );
}

export default App;
