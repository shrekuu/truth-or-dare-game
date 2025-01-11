import "./App.css";
import { emoticons, tasks } from "./data";

export default function App() {
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {tasks.map((task, index) => (
        <div
          key={index}
          className="border p-4 text-center rounded"
          onClick={() => {
            alert(emoticons[Math.floor(Math.random() * emoticons.length)] + " " + task);
          }}
        >
          <div>{emoticons[Math.floor(Math.random() * emoticons.length)]}</div>
        </div>
      ))}
    </div>
  );
}
