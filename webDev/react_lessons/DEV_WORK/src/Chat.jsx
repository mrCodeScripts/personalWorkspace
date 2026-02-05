import { useEffect, useReducer, useState } from "react"
import { useContextProvider } from "./SocketProvider";

export function Chat () {
  const messageCallback = (state, action) => {
    switch (action.type) {
      case "send":
        return [...state, action.payload];
      case "delete":
        return state.filter((v, i) => i !== action.key);
      default: 
        return state;
    }
  }

  const socket = useContextProvider();
  const [chatMessages, dispatchMessage] = useReducer(messageCallback, []);
  const [user1, newInput1] = useState('');
  const [user2, newInput2] = useState('');

  useEffect(() => {
    if (!socket) return;

    socket.on("send_message", (message) => {
      dispatchMessage({type: "send", payload: message});
      console.log(chatMessages);
    });

    socket.on("delete_message", (message) => {
      dispatchMessage({type: "delete", payload: message});
    });

    return () => {
      socket.off("new_message");
    };
  }, [socket]);

  const sendMessage = (messageData) => {
    socket.emit("send_message", messageData);
  };

  const deleteMessage = (messageKey) => {
    socket.emit("delete_message", messageKey);
  };

  return (
    <>
      <div className="flex flex-row border-2 w-full h-full p-3 gap-3">
        {/* user 1 chat */}
        <div className="flex flex-col w-full border-2 bg-blue-50 rounded-2xl">
          <div className="flex flex-col w-full h-full border-1 p-5">
            {/* user 1 chat messages */}
            {
              chatMessages.map((e, i) => {
                return e.username === "user_1" ? 
                <div className="flex flex-row gap-2 items-center animate-scale-in">
                  <p key={i} className="py-2 px-4 bg-blue-400 rounded-xl text-sm text-white m-3 ml-auto fit-content">{e.sentMessage}</p> 
                  <div className="w-8 h-8 rounded-full bg-red-300"></div>
                </div>
                : 
                <div className="flex flex-row gap-2 items-center animate-scale-in">
                  <div className="w-8 h-8 rounded-full bg-red-300"></div>
                  <p key={i} className="py-2 px-4 bg-blue-400 rounded-xl text-sm text-white m-3 mr-auto fit-content">{e.sentMessage}</p> 
                </div>
              })
            }
          </div>
          <div className="flex flex-row bg-white shadow-xs p-4 m-3 rounded-2xl overflow-hidden">
            <input 
              className="w-full h-full bg-white outline-none border-none text-sm"
              type="text" 
              value={user1}
              onInput={(e) => newInput1(e.target.value)}
            />
            <button
              className="px-3 bg-green-300 h-full"
              type="button"
              // onClick={() => messageCallback({action: 'sendMessage', payload: {
              //   username: "user_1",
              //   message: newInput1
              // }})}
              onClick={() => sendMessage({username: "user_1", sentMessage: user1})}
            >
              SEND
            </button>
          </div>
        </div>
        {/* user 2 chat */}
        <div className="flex flex-col w-full border-2 bg-blue-50 rounded-2xl p-5 overflow-y-auto">
          <div className="flex flex-col w-full h-full border-1">
            {/* user 1 chat messages */}
            {
              chatMessages.map((e, i) => {
                return e.username === "user_2" ? 
                <div className="flex flex-row gap-2 items-center animate-scale-in">
                  <p key={i} className="py-2 px-4 bg-blue-400 rounded-xl text-sm text-white m-3 ml-auto fit-content">{e.sentMessage}</p> 
                  <div className="w-8 h-8 rounded-full bg-red-300"></div>
                </div>
                : 
                <div className="flex flex-row gap-2 items-center animate-scale-in">
                  <div className="w-8 h-8 rounded-full bg-red-300"></div>
                  <p key={i} className="py-2 px-4 bg-blue-400 rounded-xl text-sm text-white m-3 mr-auto fit-content">{e.sentMessage}</p> 
                </div>
              })
            }
          </div>
          <div className="flex flex-row bg-white shadow-xs p-4 m-3 rounded-2xl overflow-hidden">
            <input 
              className="w-full h-full bg-white outline-none border-none text-sm"
              type="text" 
              value={user2}
              onInput={(e) => newInput2(e.target.value)}
            />
            <button
              className="px-3 bg-green-300 h-full"
              type="button"
              // onClick={() => messageCallback({action: 'sendMessage', payload: {
              //   username: "user_1",
              //   message: newInput1
              // }})}
              onClick={() => sendMessage({username: "user_2", sentMessage: user2})}
            >
              SEND
            </button>
          </div>
        </div>
      </div>
    </>
  )
}