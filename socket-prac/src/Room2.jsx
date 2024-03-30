import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

const Room2 = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const myId = useRef(socket.id);

  useEffect(() => {
    socket.on("connect", () => {
      myId.current = socket.id; // Update the ID upon connection
    });

    socket.emit("join room", "room2");

    socket.on("chat message", (msg) => {
      setMessages((messages) => [...messages, msg]);
    });

    return () => {
      socket.off("chat message");
    };
  }, []);

  console.log(messages);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("chat message", {
        text: message,
        id: myId.current,
        roomId: "room2",
      });
      setMessage("");
    }
  };

  return (
    <div>
      <h1>room2</h1>

      <ul>
        {messages.map(({ text, id }, index) => (
          <li
            key={index}
            style={{ color: `${id === myId.current ? "red" : "#000"}` }}
          >
            {text}
          </li>
        ))}
      </ul>
      <form onSubmit={sendMessage}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Room2;
