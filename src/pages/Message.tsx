import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { Input } from "@/components/shad/ui/input";
import useProfileCard from "../hooks/useProfileCard";
import { staticUrlPath } from "@/services/apiClient";

const socket = io(`${staticUrlPath}`);

interface ChatMessage {
  message: string;
  _id: string;
  sender: string;
  receiver: string;
}

interface Chat {
  _id: string;
  participants: string[];
  messages: ChatMessage[];
}

const Message = () => {
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { id } = useParams();
  const userId = localStorage.getItem("socialUserId");

  const handleIncomingChat = (payload: ChatMessage) => {
    setChat((prevChat) => [payload, ...prevChat]);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("chat", {
      sender: userId,
      receiver: id,
      message: inputValue,
    });

    setInputValue("");
    if (inputRef.current) inputRef.current.focus();
  };

  //   on Submit handles
  useEffect(() => {
    socket.on("chat", handleIncomingChat);

    return () => {
      socket.off("chat", handleIncomingChat);
    };
  }, []);

  useEffect(() => {
    let roomName: any;
    if (userId && id) {
      roomName = userId < id ? `${userId}-${id}` : `${id}-${userId}`;
      socket.emit("joinRoom", roomName);
    }

    return () => {
      socket.emit("leaveRoom", roomName);
    };
  }, []);

  //   on reload handles
  useEffect(() => {
    socket.emit(
      "getAllChats",
      {
        sender: userId,
        receiver: id,
      },
      (receivedChats: Chat) => {
        if (receivedChats?.messages)
          setChat([...receivedChats.messages.reverse()]);
      }
    );
  }, []);

  const { res, loading } = useProfileCard(id || "");
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [loading]);

  return (
    <section id="message" className="">
      <div className="relative chatBox mx-auto w-full overflow-hidden sm:w-2/3 md:w-1/2 mt-4 border-white/40 border p-2 rounded-md">
        <div className="bg-[#202020] h-8 z-10 px-2 items-center  w-full absolute inset-0 flex">
          <p className="text-xl">
            {res?.firstName} {res?.lastName}
          </p>
        </div>
        <div className="box relative flex   gap-2 h-[270px] overflow-y-scroll no-scrollbar flex-col-reverse">
          {chat.map((c, i) => (
            <div key={i}>
              {userId !== c.sender.toString() ? (
                <div className="receiver w-full">
                  <div className=" px-2 bg-gray-500 float-left max-w-[70%] rounded-md whitespace-normal break-words">
                    {c.message}
                  </div>
                </div>
              ) : (
                <div className="sender w-full ">
                  <div className=" px-2 bg-blue-500 max-w-[70%] rounded-md  float-right whitespace-normal break-words ">
                    {c.message}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input flex gap-3 mt-2 border-t-2 border-white/50 items-end">
            <Input
              className={`h-8  mt-2 `}
              disabled={loading}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              ref={inputRef}
            />
            <input
              type="submit"
              value={"Send"}
              className={`px-2 h-8 bg-blue-500 rounded-md hover:bg-blue-500/50 cursor-pointer ${
                loading && "bg-blue-500/70"
              }`}
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default Message;
