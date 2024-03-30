import { useNavigate } from "react-router-dom";

const Buttons = () => {
  const navi = useNavigate();
  return (
    <div>
      <button onClick={() => navi("/room1")}>room1</button>
      <button onClick={() => navi("/room2")}>room2</button>
    </div>
  );
};

export default Buttons;
