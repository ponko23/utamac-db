import React from "react";
import { RecoilRoot } from "recoil";
import { PlateList } from "./containers/PlateList";
import { PlateFilter } from "./components/PlateFilter";
import { PlatePagination } from "./components/PlatePagination";
import { useRecoilTransactionObserver_UNSTABLE } from "recoil";
import { favsState, plateFilterState } from "./atoms/plate";

function PersistenceObserver() {
  useRecoilTransactionObserver_UNSTABLE(({ snapshot }) => {
    // TODO : どのatomが更新されたかわからないので、毎回全部保存してるのでどうにかしたい
    var favs = snapshot.getLoadable(favsState).contents;
    localStorage.setItem(favsState.key, JSON.stringify(favs));

    var filter = snapshot.getLoadable(plateFilterState).contents;
    localStorage.setItem(plateFilterState.key, JSON.stringify(filter));
  });
  return null;
}

function App() {
  document.title = "歌マクロスDB";
  return (
    <RecoilRoot>
      <PersistenceObserver />
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
          height: 100,
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
