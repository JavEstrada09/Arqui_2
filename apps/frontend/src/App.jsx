import { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  const API_URL = "https://arqui2-production.up.railway.app";

  const getItems = async () => {
    const res = await axios.get(`${API_URL}/items`);
    setItems(res.data);
  };

  const addItem = async () => {
    if (!newItem) return;

    await axios.post(`${API_URL}/items`, {
      name: newItem
    });

    setNewItem("");
    getItems();
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div style={{padding:"40px"}}>
      <h1>Lista de Súper</h1>

      <input
        value={newItem}
        onChange={(e)=>setNewItem(e.target.value)}
        placeholder="Agregar producto"
      />

      <button onClick={addItem}>Agregar</button>

      <ul>
        {items.map((item)=>(
          <li key={item.id}>
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;