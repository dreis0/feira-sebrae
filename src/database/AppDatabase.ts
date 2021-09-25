import {
  Firestore,
  getDocs,
  collection,
  onSnapshot,
  query,
} from "@firebase/firestore";
import { Pedido } from "../model/Pedido";

export interface IAppDatabase {
  pedidos: IDbEntity<Pedido>;
}

interface IDbEntity<T> {
  get: () => Promise<T[]>;
  update: (entity: T) => void;
  write: (entity: T) => void;
  listen: (callback: (entities: T[]) => void) => void;
}

export class AppDatabase implements IAppDatabase {
  database: Firestore;

  constructor(db: Firestore) {
    this.database = db;
  }

  pedidos = {
    get: async () => {
      const snapshot = await getDocs(collection(this.database, "pedidos"));
      var pedidos: Pedido[] = [];
      snapshot.forEach((x) => pedidos.push(x.data() as Pedido));

      return pedidos;
    },
    update: (entity: Pedido) => {},
    write: (entity: Pedido) => {},
    listen: async (callback: (entities: Pedido[]) => void) => {
      const q = query(collection(this.database, "pedidos"));
      
      onSnapshot(q, (querySnapshot) => {
        var pedidos: Pedido[] = [];
        querySnapshot.forEach((doc) => {
          pedidos.push(doc.data() as Pedido);
        });
      
        callback(pedidos);
      });
    },
  };
}
