import { AlarmCheck, ChartArea, Target } from "lucide-react";
import Hero from "./components/hero/hero";

export default function Home() {
  return (
   <div className="w-full">
    <Hero />
    <div className="mt-16 flex justify-around">
      <div className="bg-blue-500 w-full">
        <div className="border-4 p-4 border-white w-fit m-auto rounded-full mt-8">
          <ChartArea size={64}/>
        </div>
        <p className="p-4 mt-8">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora, harum optio, deserunt, at doloremque illum consequuntur expedita consequatur laboriosam quis et cumque itaque ea similique dolores rerum quisquam quia commodi?</p>
      </div>
      <div className="bg-purple-500 w-full">
        <div className="border-4 p-4 border-white w-fit m-auto rounded-full mt-8">
          <AlarmCheck size={64}/>
        </div>
        <p className="p-4 mt-8">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora, harum optio, deserunt, at doloremque illum consequuntur expedita consequatur laboriosam quis et cumque itaque ea similique dolores rerum quisquam quia commodi?</p>
      </div>
      <div className="bg-pink-500 w-full">
        <div className="border-4 p-4 border-white w-fit m-auto rounded-full mt-8">
          <Target size={64}/>
        </div>
        <p className="p-4 mt-8">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora, harum optio, deserunt, at doloremque illum consequuntur expedita consequatur laboriosam quis et cumque itaque ea similique dolores rerum quisquam quia commodi?</p>
      </div>
    </div>
   </div>
  );
}
