import { useContext, createContext } from "react";
import { initDatabase } from "./database";
import { AppDatabase, IAppDatabase } from "./AppDatabase";

interface IDatabaseContext {
  database?: IAppDatabase;
}

const contextType: IDatabaseContext = {};
const DatabaseContext = createContext(contextType);

export const useDatabase = () => {
  var dbContext = useContext<IDatabaseContext>(DatabaseContext);

  if (!dbContext.database) {
    var db = initDatabase();
    dbContext.database = new AppDatabase(db);
  }

  return dbContext.database;
};

export const DatabaseContextProvider = DatabaseContext.Provider;
