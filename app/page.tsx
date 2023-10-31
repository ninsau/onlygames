import Image from "next/image";
import Grid from "./components/Grid";
import Keyboard from "./components/Keyboard";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen" style={{ background: 'var(--background-start-rgb)' }}>
      <Grid />
      <Keyboard />
    </div>
    </>
  );
}
