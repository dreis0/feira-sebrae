import {
  Firestore,
  getDocs,
  collection,
  onSnapshot,
  query,
  setDoc,
  doc,
  addDoc,
} from "@firebase/firestore";
import { Pedido, Produto } from "../model";

export interface IAppDatabase {
  pedidos: IDbEntity<Pedido>;
  produtos: IDbEntity<Produto>;
}

interface IDbEntity<T> {
  get: () => Promise<T[]>;
  update: (entity: T) => void;
  write: (entity: T) => Promise<void>;
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
    update: async (entity: Pedido) => {
      await setDoc(
        doc(this.database, `pedidos/${entity.id}`),
        buildNativeJsonObject(entity)
      );
    },
    write: async (entity: Pedido) => {
      var newRef = doc(collection(this.database, "pedidos"));
      await setDoc(newRef, buildNativeJsonObject(entity));

      entity.id = newRef.id;
      await setDoc(
        doc(this.database, `pedidos/${newRef.id}`),
        buildNativeJsonObject(entity)
      );
    },
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

  produtos = {
    get: async () => {
      const snapshot = await getDocs(collection(this.database, "produtos"));
      var produtos: Produto[] = [];
      snapshot.forEach((x) => produtos.push(x.data() as Produto));

      return produtos;
    },
    update: async (entity: Produto) => {
      await setDoc(
        doc(this.database, `produtos/${entity.id}`),
        buildNativeJsonObject(entity)
      );
    },
    write: async (entity: Produto) => {
      console.log(entity);
      var newRef = doc(collection(this.database, "produtos"));
      await setDoc(newRef, buildNativeJsonObject(entity));

      entity.id = newRef.id;
      await setDoc(
        doc(this.database, `produtos/${newRef.id}`),
        buildNativeJsonObject(entity)
      );
    },
    listen: async (callback: (entities: Produto[]) => void) => {
      const q = query(collection(this.database, "produtos"));

      onSnapshot(q, (querySnapshot) => {
        var produtos: Produto[] = [];
        querySnapshot.forEach((doc) => {
          produtos.push(doc.data() as Produto);
        });

        callback(produtos);
      });
    },
  };
}

const buildNativeJsonObject = (obj: any): object => {
  var result = {};
  
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === "object")
      result = Object.assign(result, {
        [key]: buildNativeJsonObject(obj[key]),
      });
    else result = Object.assign(result, {[key]: obj[key]});
  });

  return result;
};
