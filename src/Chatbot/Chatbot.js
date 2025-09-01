// import React, { useEffect, useRef, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { IoIosSend } from "react-icons/io";
// import { FaPlus } from "react-icons/fa";
// import "./Chatbot.css";

// const Chatbot = () => {
//   const [isshow, setisshow] = useState(false);
//   const [message, setmessage] = useState("");
//   const [currentChatIndex, setCurrentChatIndex] = useState(0);
//   const [chat, setchat] = useState([[]]);
//   const messagesEndRef = useRef(null);
//   const [newMessage,setnewmessage]=useState(true)
//   const handleupload = () => {
//     setisshow((prev) => !prev);
//   };
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [chat]);

//   const handlesend = () => {
//   if (!message.trim()) return;

//   setChats(prev => {
//     const updated = [...prev];
//     updated[currentChatIndex] = [
//       ...updated[currentChatIndex],
//       { role: "user", content: message }
//     ];
//     return updated;
//   });

//   setTimeout(() => {
//     setChats(prev => {
//       const updated = [...prev];
//       updated[currentChatIndex] = [
//         ...updated[currentChatIndex],
//         { role: "bot", content: "🤖 This is a bot message" }
//       ];
//       return updated;
//     });
//   }, 800);

//   setMessage("");
// };

//     setmessage(""); // clear input
//   };
//   //   const handleupdate = (id, newMessage) => {
//   //   setchat((prev) =>
//   //     prev.map((item, index) =>
//   //       index === id ? { ...item, content: newMessage } : item
//   //     )
//   //   );
//   // };

//   //  const handledelete = (id) => {
//   //   setchat((prev) => prev.filter((item, index) => index !== id));
//   // };

//   const handleallmesss = (item) => {
//     setmessage(item.content); // load into input
//   };

//  const handlenewchat = () => {
//   setChat(prev => [...prev, []]);         // add new empty session
//   setCurrentChatIndex(chats.length);// clear all old messages
//   setmessage("");       // clear input box
//   setnewmessage(true);  // make sure chat area is visible
// };
//   //   return (
//   //     <div className="sidebar">
//   //        {chat.length > 0 ? (
//   //   <div className="sidebar-messages">
//   //     {chat.map((item, i) => (
//   //       <p key={i} onClick={() => handleallmesss(item)}>
//   //         {item.content}
//   //       </p>
//   //     ))}
//   //   </div>
//   // ) : (
//   //   <div>Loading...</div>
//   // )}

//   //     </div>
//   //     <motion.div
//   //       className="chatbot-container"
//   //       initial={{ opacity: 0, y: 50 }}
//   //       animate={{ opacity: 1, y: 0 }}
//   //       transition={{ duration: 0.5 }}
//   //     >
//   //       <motion.h1
//   //         className="chatbot-title"
//   //         initial={{ opacity: 0 }}
//   //         animate={{ opacity: 1 }}
//   //         transition={{ delay: 0.3 }}
//   //       >
//   //         How can I help you?
//   //       </motion.h1>

//   //       {/* Chat History */}
//   //       <div className="chat-history">
//   //         <AnimatePresence>
//   //           {chat.map((msg, i) => (
//   //             <motion.div
//   //               key={i}
//   //               className={`chat-message ${msg.role}`}
//   //               initial={{ opacity: 0, x: msg.role === "user" ? 50 : -50 }}
//   //               animate={{ opacity: 1, x: 0 }}
//   //               exit={{ opacity: 0, x: msg.role === "user" ? 50 : -50 }}
//   //               transition={{ duration: 0.3 }}
//   //             >
//   //               {msg.content}
//   //             </motion.div>
//   //           ))}
//   //         </AnimatePresence>
//   //         <div ref={messagesEndRef} />
//   //       </div>

//   //       {/* Input Area */}
//   //       <motion.div
//   //         className="chat-input-area"
//   //         initial={{ opacity: 0, y: 20 }}
//   //         animate={{ opacity: 1, y: 0 }}
//   //         transition={{ delay: 0.4 }}
//   //       >
//   //         <FaPlus className="icon" onClick={handleupload} />

//   //         <AnimatePresence>
//   //           {isshow && (
//   //             <motion.input
//   //               key="file-upload"
//   //               type="file"
//   //               name="upload"
//   //               className="file-input"
//   //               initial={{ opacity: 0, scale: 0.8 }}
//   //               animate={{ opacity: 1, scale: 1 }}
//   //               exit={{ opacity: 0, scale: 0.8 }}
//   //               transition={{ duration: 0.3 }}
//   //               onClick={() => setisshow(false)}
//   //             />
//   //           )}
//   //         </AnimatePresence>

//   //         <input
//   //           type="text"
//   //           placeholder="Ask anything..."
//   //           className="chat-input"
//   //           value={message}
//   //           onChange={(e) => setmessage(e.target.value)}
//   //           onKeyDown={(e) => e.key === "Enter" && handlesend()}
//   //         />

//   //         <motion.div
//   //           whileTap={{ scale: 0.9 }}
//   //           whileHover={{ scale: 1.1 }}
//   //         >
//   //           <IoIosSend className="icon send-icon" onClick={handlesend} />
//   //         </motion.div>
//   //       </motion.div>
//   //     </motion.div>
//   //   );
//      return (
//     <div className="chatbot-wrapper">
//       <div className="chatbot-container">
//         {/* Sidebar inside chatbot */}
//        <div className="sidebar">
//   <button onClick={handlenewchat}>+ New Chat</button>
//   {chats.map((session, idx) => (
//     <p
//       key={idx}
//       onClick={() => setCurrentChatIndex(idx)}
//       style={{
//         cursor: "pointer",
//         fontWeight: idx === currentChatIndex ? "bold" : "normal"
//       }}
//     >
//       {session.find(msg => msg.role === "user")?.content || "Empty Chat"}
//     </p>
//   ))}
// </div>

//         {/* Chat area */}
//         {newMessage?(
//             <motion.div
//           className="chat-area"
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <motion.h1
//             className="chatbot-title"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.3 }}
//           >
//             How can I help you?
//           </motion.h1>

//           <div className="chat-history">
//             <AnimatePresence>
//               {chat.map((msg, i) => (
//                 <motion.div
//                   key={i}
//                   className={`chat-message ${msg.role}`}
//                   initial={{ opacity: 0, x: msg.role === "user" ? 50 : -50 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: msg.role === "user" ? 50 : -50 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   {msg.content}
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//             <div ref={messagesEndRef} />
//           </div>

//           <motion.div
//             className="chat-input-area"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4 }}
//           >
//             <FaPlus className="icon" onClick={handleupload} />

//             <AnimatePresence>
//               {isshow && (
//                 <motion.input
//                   key="file-upload"
//                   type="file"
//                   name="upload"
//                   className="file-input"
//                   initial={{ opacity: 0, scale: 0.8 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0.8 }}
//                   transition={{ duration: 0.3 }}
//                   onClick={() => setisshow(false)}
//                 />
//               )}
//             </AnimatePresence>

//             <input
//               type="text"
//               placeholder="Ask anything..."
//               className="chat-input"
//               value={message}
//               onChange={(e) => setmessage(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && handlesend()}
//             />

//             <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }}>
//               <IoIosSend className="icon send-icon" onClick={handlesend} />
//             </motion.div>
//           </motion.div>
//         </motion.div>
//         ):(
//             <div>Loading...</div>
//         )}

//       </div>
//     </div>
//   );
// };

// export default Chatbot;

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosSend } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import "./Chatbot.css";
import axios from "axios";

const Chatbot = () => {
  const [isshow, setisshow] = useState(false);
  const [message, setMessage] = useState("");
  const [currentChatIndex, setCurrentChatIndex] = useState(0);
  const [chats, setChats] = useState([[]]);
  const messagesEndRef = useRef(null);
  const [newMessage, setnewmessage] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const handleupload = () => {
    setisshow((prev) => !prev);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats, currentChatIndex]);

  const handlesend = async () => {
    if (!message.trim()) return;

    try {
      // Save user message
      setChats((prev) => {
        const updated = [...prev];
        updated[currentChatIndex] = [
          ...updated[currentChatIndex],
          { role: "user", content: message },
        ];
        return updated;
      });

      await axios.post("http://localhost:6000/api/question", {
        question: message,
      });

      // Simulate bot reply
      const botResponse = await axios.post("http://localhost:6000/api/answer", {
        question: message,
      });

      setTimeout(() => {
        setChats((prev) => {
          const updated = [...prev];
          updated[currentChatIndex] = [
            ...updated[currentChatIndex],
            { role: "bot", content: botResponse.data.answer },
          ];
          return updated;
        });
      }, 800);
    } catch (error) {
      console.error("❌ Something went wrong", error);
    }

    setMessage("");
  };

  const handlenewchat = () => {
    setChats((prev) => {
      const updated = [...prev, []];
      setCurrentChatIndex(updated.length - 1); // ✅ safe new index
      return updated;
    });
    setMessage("");
    setnewmessage(true);
  };
  const handleseach = async (query) => {
    if (!query.trim()) return;
    try {
      const response = await axios.get(
        `http://localhost:6000/api/getmessage/${query}`
      );
      console.log("Search result:", response.data);
      // optionally filter chats or show results
    } catch (error) {
      console.error("❌ Search error", error);
    }
  };

  const handledelete = async (id) => {
    try {
      await axios.delete(`http://localhost:6000/api/getallmessage/${id}`);
      setChats((prev) => prev.filter((_, index) => index !== id));

      if (currentChatIndex === id) {
        setCurrentChatIndex(0); // reset to first
      }
    } catch (error) {
      console.error("❌ Something went wrong", error);
    }
  };

  const handlesavequestionanser = async () => {
    try {
      const response = await axios.post("http://localhost:6000/api/message", {
        chats: chats[currentChatIndex],
      });
      console.log("Saved:", response.data);
    } catch (error) {
      console.error("❌ Save error", error);
    }
  };

  const handlegetallmessage = async () => {
    try {
      const response = await axios.get(
        "http://localhost:6000/api/getallmessage"
      );
      setChats(response.data);
    } catch (error) {
      console.error("❌ Fetch error", error);
    }
  };
  useEffect(() => {
    handlegetallmessage();
  }, []);

  return (
    <div className="chatbot-wrapper">
      <div className="chatbot-container">
        {/* Sidebar */}
        {/* Sidebar */}
        <div className="sidebar">
          <button onClick={handlenewchat}>+ New Chat</button>

          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={() => handleseach(searchTerm)}>Search</button>

          {chats.map((session, idx) => {
            const title =
              session.find((msg) => msg.role === "user")?.content ||
              "Empty Chat";

            return (
              <p
                key={idx}
                onClick={() => setCurrentChatIndex(idx)}
                style={{
                  cursor: "pointer",
                  fontWeight: idx === currentChatIndex ? "bold" : "normal",
                }}
              >
                {title}
              </p>
            );
          })}
        </div>

        {/* Chat area */}
        {newMessage ? (
          <motion.div
            className="chat-area"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1
              className="chatbot-title"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              How can I help you?
            </motion.h1>

            <div className="chat-history">
              <AnimatePresence>
                {chats[currentChatIndex]?.map((msg, i) => (
                  <motion.div
                    key={i}
                    className={`chat-message ${msg.role}`}
                    initial={{ opacity: 0, x: msg.role === "user" ? 50 : -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: msg.role === "user" ? 50 : -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    {msg.content}
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <motion.div
              className="chat-input-area"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <FaPlus className="icon" onClick={handleupload} />

              <AnimatePresence>
                {isshow && (
                  <motion.input
                    key="file-upload"
                    type="file"
                    name="upload"
                    className="file-input"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => setisshow(false)}
                  />
                )}
              </AnimatePresence>

              <input
                type="text"
                placeholder="Ask anything..."
                className="chat-input"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handlesend()}
              />

              <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }}>
                <IoIosSend className="icon send-icon" onClick={handlesend} />
              </motion.div>
            </motion.div>
          </motion.div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default Chatbot;
