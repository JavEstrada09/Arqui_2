import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>assignment</h1>
      <p style={styles.subtitle}>Desplegada con AWS + CloudFront</p>

      <button style={styles.button} onClick={() => setCount(count + 1)}>
        Clicks: {count}
      </button>
    </div>
  );
}

const styles = {
  container: {
  minHeight: "100vh",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #4e73df, #274f40)",
  color: "white",
  fontFamily: "Arial",
},
  title: {
    fontSize: "3rem",
  },
  subtitle: {
    marginBottom: "20px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "1.2rem",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
  },
};

export default App;