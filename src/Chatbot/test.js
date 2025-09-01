// import React, { useEffect, useRef, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { IoIosSend } from "react-icons/io";
// import { FaPlus } from "react-icons/fa";
// import "./Chatbot.css";
// import axios from "axios";

// const Chatbot = () => {
//   const [isshow, setisshow] = useState(false);
//   const [message, setMessage] = useState("");
//   const [currentChatIndex, setCurrentChatIndex] = useState(0);
//   const [chats, setChats] = useState([[]]);
//   const messagesEndRef = useRef(null);
//   const [newMessage, setnewmessage] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");

//   const handleupload = () => {
//     setisshow((prev) => !prev);
//   };

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [chats, currentChatIndex]);

//   const handlesend = async () => {
//     if (!message.trim()) return;

//     try {
//       // Save user message
//       setChats((prev) => {
//         const updated = [...prev];
//         updated[currentChatIndex] = [
//           ...updated[currentChatIndex],
//           { role: "user", content: message },
//         ];
//         return updated;
//       });

//       await axios.post("http://localhost:4000/api/question", {
//         question: message,
//       });

//       // Simulate bot reply
//       const botResponse = await axios.post("http://localhost:4000/api/answer", {
//         question: message,
//       });

//       setTimeout(() => {
//         setChats((prev) => {
//           const updated = [...prev];
//           updated[currentChatIndex] = [
//             ...updated[currentChatIndex],
//             { role: "bot", content: botResponse.data.answer },
//           ];
//           return updated;
//         });
//       }, 800);
//     } catch (error) {
//       console.error("❌ Something went wrong", error);
//     }

//     setMessage("");
//   };

//   const handlenewchat = () => {
//     setChats((prev) => {
//       const updated = [...prev, []];
//       setCurrentChatIndex(updated.length - 1); // ✅ safe new index
//       return updated;
//     });
//     setMessage("");
//     setnewmessage(true);
//   };

//   const handleseach = async (query) => {
//     if (!query.trim()) return;
//     try {
//       const response = await axios.get(
//         `http://localhost:4000/api/getmessage/${query}`
//       );
//       console.log("Search result:", response.data);
//       // optionally filter chats or show results
//     } catch (error) {
//       console.error("❌ Search error", error);
//     }
//   };

//   const handledelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:4000/api/getallmessage/${id}`);
//       setChats((prev) => prev.filter((_, index) => index !== id));

//       if (currentChatIndex === id) {
//         setCurrentChatIndex(0); // reset to first
//       }
//     } catch (error) {
//       console.error("❌ Something went wrong", error);
//     }
//   };

//   const handlesavequestionanser = async () => {
//     try {
//       const response = await axios.post("http://localhost:4000/api/message", {
//         chats: chats[currentChatIndex],
//       });
//       console.log("Saved:", response.data);
//     } catch (error) {
//       console.error("❌ Save error", error);
//     }
//   };

//   const handlegetallmessage = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:4000/api/getallmessage"
//       );
//       setChats(response.data);
//     } catch (error) {
//       console.error("❌ Fetch error", error);
//     }
//   };

//   useEffect(() => {
//     handlegetallmessage();
//   }, []);

//   return (
//     <div className="chatbot-wrapper">
//       <div className="chatbot-container">
//         {/* Sidebar */}
//         <div className="sidebar">
//           <button onClick={handlenewchat}>+ New Chat</button>

//           <input
//             type="text"
//             placeholder="Search..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <button onClick={() => handleseach(searchTerm)}>Search</button>

//           {chats.map((session, idx) => {
//             const title =
//               session.find((msg) => msg.role === "user")?.content ||
//               "Empty Chat";

//             return (
//               <div
//                 key={idx}
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "space-between",
//                 }}
//               >
//                 <p
//                   onClick={() => setCurrentChatIndex(idx)}
//                   style={{
//                     cursor: "pointer",
//                     fontWeight: idx === currentChatIndex ? "bold" : "normal",
//                   }}
//                 >
//                   {title}
//                 </p>
//                 <button
//                   onClick={() => handledelete(idx)}
//                   style={{
//                     background: "red",
//                     color: "white",
//                     border: "none",
//                     cursor: "pointer",
//                     padding: "2px 6px",
//                     borderRadius: "4px",
//                   }}
//                 >
//                   ❌
//                 </button>
//               </div>
//             );
//           })}
//         </div>

//         {/* Chat area */}
//         {newMessage ? (
//           <motion.div
//             className="chat-area"
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             <motion.h1
//               className="chatbot-title"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.3 }}
//             >
//               How can I help you?
//             </motion.h1>

//             <div className="chat-history">
//               <AnimatePresence>
//                 {chats[currentChatIndex]?.map((msg, i) => (
//                   <motion.div
//                     key={i}
//                     className={`chat-message ${msg.role}`}
//                     initial={{ opacity: 0, x: msg.role === "user" ? 50 : -50 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: msg.role === "user" ? 50 : -50 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     {msg.content}
//                   </motion.div>
//                 ))}
//               </AnimatePresence>
//               <div ref={messagesEndRef} />
//             </div>

//             {/* Input Area */}
//             <motion.div
//               className="chat-input-area"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.4 }}
//             >
//               <FaPlus className="icon" onClick={handleupload} />

//               <AnimatePresence>
//                 {isshow && (
//                   <motion.input
//                     key="file-upload"
//                     type="file"
//                     name="upload"
//                     className="file-input"
//                     initial={{ opacity: 0, scale: 0.8 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     exit={{ opacity: 0, scale: 0.8 }}
//                     transition={{ duration: 0.3 }}
//                     onClick={() => setisshow(false)}
//                   />
//                 )}
//               </AnimatePresence>

//               <input
//                 type="text"
//                 placeholder="Ask anything..."
//                 className="chat-input"
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && handlesend()}
//               />

//               <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }}>
//                 <IoIosSend className="icon send-icon" onClick={handlesend} />
//               </motion.div>
//             </motion.div>

//             {/* Save Chat Button */}
//             <div style={{ marginTop: "10px", textAlign: "center" }}>
//               <button
//                 onClick={handlesavequestionanser}
//                 style={{
//                   padding: "6px 12px",
//                   background: "green",
//                   color: "white",
//                   border: "none",
//                   borderRadius: "6px",
//                   cursor: "pointer",
//                 }}
//               >
//                 💾 Save Chat
//               </button>
//             </div>
//           </motion.div>
//         ) : (
//           <div>Loading...</div>
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
  const [chats, setChats] = useState([[]]); // always array of arrays
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

      await axios.post("http://localhost:4000/api/question", {
        question: message,
      });

      // Simulate bot reply
      const botResponse = await axios.post("http://localhost:4000/api/answer", {
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
        `http://localhost:4000/api/getmessage/${query}`
      );
      console.log("Search result:", response.data);
    } catch (error) {
      console.error("❌ Search error", error);
    }
  };

  const handledelete = async (id) => {
    try {
        console.log(id)
        console.log(typeof(id))
      await axios.delete(`http://localhost:4000/api/getallmessage/${id}`,{ withCredentials: true});
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
      const response = await axios.post("http://localhost:4000/api/message", {
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
        "http://localhost:4000/api/getallmessage"
      );

      // ✅ Ensure every session is an array of messages
      const normalizedChats = response.data.map((session) => {
        if (Array.isArray(session)) return session; // already array

        // if backend sends {chats: [...]}
        if (session.chats && Array.isArray(session.chats)) {
          return session.chats;
        }

        // if backend sends a string, wrap in array
        if (typeof session === "string") {
          return [{ role: "bot", content: session }];
        }

        return []; // fallback
      });

      setChats(normalizedChats.length ? normalizedChats : [[]]);
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
              Array.isArray(session) &&
              session.find((msg) => msg.role === "user")?.content;

            return (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <p
                  onClick={() => setCurrentChatIndex(idx)}
                  style={{
                    cursor: "pointer",
                    fontWeight: idx === currentChatIndex ? "bold" : "normal",
                  }}
                >
                  {title || "Empty Chat"}
                </p>
                <button
                  onClick={() => handledelete(idx)}
                  style={{
                    background: "red",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                    padding: "2px 6px",
                    borderRadius: "4px",
                  }}
                >
                  ❌
                </button>
              </div>
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

            {/* Save Chat Button */}
            <div style={{ marginTop: "10px", textAlign: "center" }}>
              <button
                onClick={handlesavequestionanser}
                style={{
                  padding: "6px 12px",
                  background: "green",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                💾 Save Chat
              </button>
            </div>
          </motion.div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default Chatbot;
