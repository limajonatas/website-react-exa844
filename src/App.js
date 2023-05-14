import React, { useEffect, useState } from "react";

function App() {
  const [messages, setMessages] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  // Carrega as mensagens ao iniciar
  useEffect(() => {
    fetchMessages();
  }, []);
  const [filteredMessages, setFilteredMessages] = useState([]);

  useEffect(() => {
    setFilteredMessages(
      messages.filter((message) => {
        const lowerCaseSearch = searchValue.toLowerCase();
        return (
          (message.message &&
            message.message
              .toString()
              .toLowerCase()
              .includes(lowerCaseSearch)) ||
          (message.author &&
            message.author.toString().toLowerCase().includes(lowerCaseSearch))
        );
      })
    );
  }, [messages, searchValue]);

  /**
   * Busca as mensagens no servidor
   */
  const fetchMessages = () => {
    const url =
      "https://script.google.com/macros/s/AKfycbzBn3sALe1rYjz7Ze-Ik7q9TEVP0I2V3XX7GNcecWP8NvCzGt4yO_RT1OlQp09TE9cU/exec?tenho=0";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const sortedData = data
          .map((item) => {
            const [message, author, date] = item;
            return { message, author, date: new Date(date) };
          })
          .sort((a, b) => a.date - b.date);
        setMessages(sortedData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1 align='center'>Mensagens:</h1>
      <hr />
      <br />
      <form>
        <div style={{ textAlign: "center" }}>Pesquisar</div>
        <input
          style={{ width: "300px" }}
          type='text'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </form>
      <br />
      <br />
      <table
        id='table'
        style={{ border: "1px solid black", userSelect: "none" }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid black" }}>Mensagem</th>
            <th style={{ border: "1px solid black" }}>Autor</th>
            <th style={{ border: "1px solid black" }}>Data</th>
          </tr>
        </thead>
        <tbody>
          {filteredMessages.length > 0 ? (
            filteredMessages.map((message, index) => (
              <tr key={index}>
                <td>{message.message}</td>
                <td>{message.author}</td>
                <td
                  style={{ paddingLeft: "10px", paddingRight: "1px" }}
                >{`${new Date(message.date).toLocaleDateString()} ${new Date(
                  message.date
                ).toLocaleTimeString()}`}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan='3'>Nada por aqui...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
