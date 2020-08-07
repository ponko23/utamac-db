import fs from "fs";

class UpdateHistories {
  public histories: Map<string, string>;
  constructor() {
    this.histories = new Map<string, string>();
  }

  public load = (resourcesPath: string) => {
    const filePath = resourcesPath + "index.json";
    if (fs.existsSync(filePath)) {
      const json = fs.readFileSync(filePath, { encoding: "utf-8" });
      const data = JSON.parse(json) as [string, string][];
      this.histories = new Map(data);
    }
  };

  public save = (resourcesPath: string) => {
    const filePath = resourcesPath + "index.json";
    const json = JSON.stringify(Array.from(this.histories));
    fs.writeFileSync(filePath, json, { encoding: "utf-8" });
  };
}

export default new UpdateHistories();
