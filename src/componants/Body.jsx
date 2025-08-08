import { useState, useEffect, useRef } from "react";
import { FaTools, FaImage, FaUpload, FaCamera, FaSearch, FaComment, FaMicrophone, FaFile, FaTasks, FaProjectDiagram, FaThumbtack, FaHistory, FaPaperPlane, FaCommentDots, FaEdit, FaSave } from "react-icons/fa";
import { motion } from "framer-motion";
import Login from './Login';

export default function Body() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showTools, setShowTools] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const callAPI = async (endpoint) => {
    if (!prompt.trim()) {
      setErrorMsg("⚠️ Prompt cannot be empty.");
      return null;
    }
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch(`http://localhost:5000/api/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ prompt }),
      });

      const contentType = res.headers.get("content-type") || "";
      const payload = contentType.includes("application/json")
        ? await res.json()
        : await res.text();

      if (!res.ok) {
        const message =
          payload?.error ||
          (typeof payload === "string" ? payload : "Server error");
        throw new Error(message);
      }

      return payload;
    } catch (err) {
      setErrorMsg(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleTextAI = async () => {
    if (!prompt.trim()) return;
    setMessages((prev) => [{ type: "user", content: prompt }, ...prev]);
    const data = await callAPI("ask-ai");
    if (data?.answer) {
      setMessages((prev) => [{ type: "bot", content: data.answer }, ...prev]);
    }
    setPrompt("");
  };

  const handleImageAI = async () => {
    if (!prompt.trim()) return;
    setMessages((prev) => [{ type: "user", content: prompt }, ...prev]);
    const data = await callAPI("generate-image");
    if (data?.image) {
      setMessages((prev) => [{ type: "bot", content: data.image }, ...prev]);
    }
    setPrompt("");
  };

  const handleUploadImage = () => {
    alert("Upload Image feature not implemented yet.");
  };

  const handleTakeImage = () => {
    alert("Take Image feature not implemented yet.");
  };

  const handleVoice = () => {
    alert("Voice feature not implemented yet.");
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Copied to clipboard!");
    }).catch((err) => {
      console.error("Failed to copy: ", err);
    });
  };

  const startEditing = (index, content) => {
    setEditingIndex(index);
    setEditContent(content);
  };

  const saveEdit = (index) => {
    setMessages((prev) =>
      prev.map((msg, i) =>
        i === index ? { ...msg, content: editContent } : msg
      )
    );
    setEditingIndex(null);
    setEditContent("");
  };

  const HeroSection = () => (
    <div className="flex flex-col items-center justify-center h-full space-y-8">
      <h1 className="text-4xl font-bold text-white">Jerry</h1>
      <div className="w-full max-w-2xl">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleTextAI()}
          placeholder="What do you want to know?"
          className="w-full bg-[#333333] border border-[#444444] rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#6B46C1] text-lg"
          autoFocus
        />
      </div>
      <div className="flex gap-4 flex-wrap justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleTextAI}
          className="bg-[#6B46C1] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#805AD5]"
        >
          <FaCommentDots /> Think
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleImageAI}
          className="bg-[#6B46C1] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#805AD5]"
        >
          <FaImage /> Create Images
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleUploadImage}
          className="bg-[#6B46C1] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#805AD5]"
        >
          <FaUpload /> Upload Image
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleTakeImage}
          className="bg-[#6B46C1] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#805AD5]"
        >
          <FaCamera /> Take Image
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleVoice}
          className="bg-[#6B46C1] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#805AD5]"
        >
          <FaMicrophone /> Voice
        </motion.button>
      </div>
    </div>
  );

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white font-sans flex">
      {/* Sidebar */}
      <motion.aside
        initial={{ width: showSidebar ? 256 : 0 }}
        animate={{ width: showSidebar ? 256 : 0 }}
        transition={{ duration: 0.3 }}
        className="bg-[#141414] overflow-hidden"
      >
        <div className="w-64 flex flex-col py-4 space-y-2">
          <div className="px-4">
            <h2 className="text-white text-lg font-bold">Jerry</h2>
          </div>
          <nav className="flex-1 overflow-y-auto">
            <ul className="space-y-1">
              <li>
                <button className="w-full text-left px-4 py-2 text-white hover:bg-[#333333] flex items-center gap-2">
                  <FaSearch /> Search
                </button>
              </li>
              <li>
                <button className="w-full text-left px-4 py-2 text-white hover:bg-[#333333] flex items-center gap-2">
                  <FaComment /> Chat
                </button>
              </li>
              <li>
                <button className="w-full text-left px-4 py-2 text-white hover:bg-[#333333] flex items-center gap-2">
                  <FaMicrophone /> Voice
                </button>
              </li>
              <li>
                <button className="w-full text-left px-4 py-2 text-white hover:bg-[#333333] flex items-center gap-2">
                  <FaFile /> Files
                </button>
              </li>
              <li>
                <button className="w-full text-left px-4 py-2 text-white hover:bg-[#333333] flex items-center gap-2">
                  <FaTasks /> Tasks
                </button>
              </li>
              <li>
                <button className="w-full text-left px-4 py-2 text-white hover:bg-[#333333] flex items-center gap-2">
                  <FaProjectDiagram /> Projects
                </button>
              </li>
              <li>
                <button className="w-full text-left px-4 py-2 text-white hover:bg-[#333333] flex items-center gap-2">
                  <FaThumbtack /> Pinned
                </button>
              </li>
              <li>
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="w-full text-left px-4 py-2 text-white hover:bg-[#333333] flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <FaHistory /> History
                  </span>
                  <span>{showHistory ? "▲" : "▼"}</span>
                </button>
                {showHistory && (
                  <ul className="pl-6 space-y-1">
                    <li>
                      <button className="w-full text-left px-4 py-1 text-white hover:bg-[#333333]">
                        Yesterday
                      </button>
                      <ul className="pl-4 space-y-1">
                        <li>
                          <button className="w-full text-left px-4 py-1 text-white hover:bg-[#333333]">
                            Enhancing Jerry AI Website
                          </button>
                        </li>
                        <li>
                          <button className="w-full text-left px-4 py-1 text-white hover:bg-[#333333]">
                            Merging Sorted Arrays in Python
                          </button>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <button className="w-full text-left px-4 py-1 text-white hover:bg-[#333333]">
                        This Week
                      </button>
                      <ul className="pl-4 space-y-1">
                        <li>
                          <button className="w-full text-left px-4 py-1 text-white hover:bg-[#333333]">
                            PC Jeweller Stock Price Out!
                          </button>
                        </li>
                      </ul>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-[#1A1A1A] p-2 flex justify-between items-center border-b border-[#333333]">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="text-white text-xl hover:text-[#CCCCCC]"
              title="Toggle Sidebar"
            >
              {showSidebar ? "◀️" : "▶️"}
            </button>
            <span className="text-2xl font-bold text-white">J</span>
            <span className="text-lg font-bold text-white">erry</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="bg-[#6B46C1] text-white px-3 py-1 rounded-full flex items-center gap-1 hover:bg-[#805AD5]">
              <span>✨</span> Get Plus
            </button>
            <button className="text-white text-xl hover:text-[#CCCCCC]" title="Settings">
              ⚙️
            </button>
            <div className="text-white text-sm flex items-center gap-1">
              <span>Private</span>
              <input type="checkbox" className="toggle" />
            </div>
          </div>
        </header>

        {/* Conversation Area */}
        {messages.length === 0 && !loading && !errorMsg ? (
          <HeroSection />
        ) : (
          <div className="flex-1 overflow-y-auto p-6 space-y-4 flex flex-col-reverse">
            <div ref={messagesEndRef} />
            {errorMsg && (
              <div className="text-red-400 p-2 bg-red-800 bg-opacity-30 rounded-lg text-center">
                ⚠️ {errorMsg}
              </div>
            )}
            {loading && <div className="text-white text-center">Loading...</div>}
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`p-4 rounded-lg shadow-inner border border-[#444444] ${msg.type === "user" ? "bg-[#333333] ml-auto inline-block min-w-fit" : "bg-[#252525]"}`}
              >
                {typeof msg.content === "string" ? (
                  <div className="flex items-center gap-2">
                    {msg.type === "user" && editingIndex === index ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          className="bg-[#444444] text-white border border-[#555555] rounded px-2 py-1 focus:outline-none focus:border-[#6B46C1]"
                        />
                        <button
                          onClick={() => saveEdit(index)}
                          className="text-white hover:text-[#CCCCCC]"
                          title="Save"
                        >
                          <FaSave />
                        </button>
                      </div>
                    ) : (
                      <>
                        <p className="text-white whitespace-pre-wrap flex-1">{msg.content}</p>
                        {msg.type === "user" && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => startEditing(index, msg.content)}
                              className="text-white hover:text-[#CCCCCC]"
                              title="Edit"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => copyToClipboard(msg.content)}
                              className="text-white hover:text-[#CCCCCC]"
                              title="Copy"
                            >
                              📋
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ) : (
                  <img
                    src={msg.content}
                    alt="AI generated"
                    className="max-w-xs rounded-lg shadow-lg border border-[#444444]"
                  />
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Input Bar */}
        <div className="bg-[#252525] border-t border-[#333333] p-3 flex items-center gap-2 sticky bottom-0 z-50">
          <button
            onClick={() => setShowTools(!showTools)}
            className="text-white text-xl hover:text-[#CCCCCC]"
            title="Tools"
          >
            <FaTools />
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleTextAI()}
              placeholder="Ask anything"
              className="w-full bg-[#333333] border border-[#444444] rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-[#6B46C1] pr-10"
              autoFocus
            />
            <button
              onClick={handleTextAI}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white hover:text-[#CCCCCC]"
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>

        {/* Tools Dropdown */}
        {showTools && (
          <div className="absolute bottom-20 left-4 bg-[#252525] rounded-lg p-3 shadow-xl border border-[#444444] z-50 space-y-2">
            <button
              onClick={handleImageAI}
              className="flex items-center gap-2 text-white hover:text-[#CCCCCC]"
            >
              <FaImage /> Generate Image
            </button>
            <button
              onClick={handleUploadImage}
              className="flex items-center gap-2 text-white hover:text-[#CCCCCC]"
            >
              <FaUpload /> Upload Image
            </button>
            <button
              onClick={handleTakeImage}
              className="flex items-center gap-2 text-white hover:text-[#CCCCCC]"
            >
              <FaCamera /> Take Image
            </button>
            <button
              onClick={handleVoice}
              className="flex items-center gap-2 text-white hover:text-[#CCCCCC]"
            >
              <FaMicrophone /> Voice
            </button>
          </div>
        )}
      </div>
    </div>
  );
}