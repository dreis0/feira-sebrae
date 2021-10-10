import { Timestamp } from "@firebase/firestore";
import { Produto } from ".";

export class Pedido {
  id: string = "";
  produto: Produto = new Produto();
  quantidade: number = 0;
  timestamp: Timestamp = Timestamp.now();
  observacao: string = "";
  pronto: boolean = false;
}
