import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useDatabase } from "./database";
import { Pedido } from "./model/Pedido";

function App() {
  var db = useDatabase();

  const [pedidos, setPedidos] = useState<Pedido[]>();
  const [count, setCount] = useState<number>(1);

  useEffect(() => {
    db.pedidos.get().then((res) => {
      setPedidos(res);
    });

    db.pedidos.listen((x) => {
      setPedidos(x);
    });
  }, [db.pedidos]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        {pedidos?.map((x) => (
          <p key={x.id}> {x.observacao} </p>
        ))}
        <button>Teste</button>
      </header>
    </div>
  );
}

export default App;
