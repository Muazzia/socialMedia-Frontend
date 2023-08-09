import { useEffect } from "react";
import { Input } from "../../@/components/shad/ui/input";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

const Message = () => {
  const arr = Array(10).fill(1);

  useEffect(() => {
    socket.on("chat", (payload) => {
      console.log(payload);
    });
  }, []);
  return (
    <section
      id="message"
      className="mx-auto w-full  sm:w-2/3 md:w-1/2 mt-4 border-white/40 border p-2 rounded-md"
    >
      <div className="box relative flex  gap-2 h-[270px] overflow-y-scroll no-scrollbar flex-col-reverse">
        {arr.map((_, i) => (
          <div key={i}>
            <div className="sender">
              <div className=" px-2 bg-gray-500 w-fit rounded-md">Hi</div>
            </div>
            <div className="receiver">
              <div className=" px-2 bg-blue-500 w-fit rounded-md float-right ">
                Hello
              </div>
            </div>
          </div>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          socket.emit("message", "this is message");
        }}
      >
        <div className="input flex gap-3 mt-2 border-t-2 border-white/50 items-end">
          <Input className="h-8 text-black mt-2" />
          <button className="px-2 h-8 bg-blue-500 rounded-md">Send</button>
        </div>
      </form>
    </section>
  );
};

export default Message;
