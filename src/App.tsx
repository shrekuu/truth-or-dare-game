import { useState } from "react";
import "./App.css";
import { emoticons, tasks } from "./data";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

type TTask = string;

const Item = ({ task }: { task: TTask }) => {
  const [viewed, setViewed] = useState(false);

  const [open, setOpen] = useState(false);

  return (
    <div className="border border-neutral-300 aspect-square flex justify-center items-center text-7xl">
      {viewed ? (
        <div className="grayscale">🫥</div>
      ) : (
        <div
          onClick={() => {
            setOpen(true);
            setViewed(true);

            // read the task
            const utterance = new SpeechSynthesisUtterance(task);
            speechSynthesis.speak(utterance);
          }}
        >
          {emoticons[Math.floor(Math.random() * emoticons.length)]}
        </div>
      )}

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-3xl">{task}</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default function App() {
  const shuffledTasks = tasks.sort(() => Math.random() - 0.5);

  return (
    <div>
      <header className="p-4 bg-gray-200">
        <h1 className="text-3xl">盲盒大冒险</h1>
      </header>
      <main className="grid grid-cols-5 gap-2 p-2">
        {shuffledTasks.map((task, index) => (
          <Item key={index} task={task} />
        ))}
      </main>
    </div>
  );
}
