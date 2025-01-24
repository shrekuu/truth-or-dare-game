import { useState } from "react";
import "./App.css";
import { emoticons, tasks } from "./data";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { isMobile } from "./lib/utils";

type TTask = string;

const Item = ({ task }: { task: TTask }) => {
  const [viewed, setViewed] = useState(false);

  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="border border-neutral-300 aspect-square flex justify-center items-center text-3xl md:text-7xl select-none"
        onClick={() => {
          if (viewed) {
            return;
          }
          setOpen(true);
          setViewed(true);

          // read the task on mobile devices
          if (isMobile()) {
            const utterance = new SpeechSynthesisUtterance(task);
            speechSynthesis.speak(utterance);
          }
        }}
      >
        {viewed ? <div className="grayscale">🫥</div> : <div>{emoticons[Math.floor(Math.random() * emoticons.length)]}</div>}
      </div>

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
    </>
  );
};

export default function App() {
  const shuffledTasks = tasks.sort(() => Math.random() - 0.5);

  return (
    <div>
      <main className="grid grid-cols-5 gap-2 p-2">
        {shuffledTasks.map((task, index) => (
          <Item key={index} task={task} />
        ))}
      </main>
    </div>
  );
}
