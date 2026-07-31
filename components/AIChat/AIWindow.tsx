"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Bot,
  Sparkles,
  X,
  Send,
} from "lucide-react";

import { restaurantInfo } from "./restaurantData";

interface Props {
  open: boolean;
  onClose: () => void;
}

interface Message {
  sender: "user" | "bot";
  text: string;
}

export default function AIWindow({
  open,
  onClose,
}: Props) {

  const [input, setInput] = useState("");

  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text:
        "👋 Welcome to Varahi Eat & Fit!\n\nI'm your AI Assistant.\n\nAsk me about:\n\n🍽 Ordering\n💪 Protein Meals\n🥗 Vegetarian Meals\n💳 Payments\n🚚 Delivery\n📍 Restaurant Information",
    },
  ]);

  function getReply(question: string) {
    const q = question.toLowerCase();

    if (
      q.includes("protein") ||
      q.includes("gym") ||
      q.includes("muscle")
    ) {
      return `💪 High Protein Meals

🥇 Lean Chicken Roll — 32g Protein

🥈 Whey Protein Shake — 25g Protein

🥉 Pumpkin Cutlets — 15g Protein

🥚 Boiled Eggs — 12g Protein`;
    }

    if (
      q.includes("veg") ||
      q.includes("vegetarian")
    ) {
      return `🥗 Vegetarian Meals

• Fresh Sprout Salad

• Pumpkin Cutlets

• Whey Protein

• Fresh Soup

• Herbal Tea`;
    }

    if (
      q.includes("order") ||
      q.includes("checkout")
    ) {
      return `📦 How to Order

1. Browse Menu

2. Click Add to Cart

3. Open Shopping Cart

4. Proceed to Checkout

5. Enter Delivery Details

6. Choose Payment

7. Place Order`;
    }

    if (
      q.includes("payment") ||
      q.includes("upi") ||
      q.includes("phonepe") ||
      q.includes("gpay") ||
      q.includes("google pay")
    ) {
      return `💳 Payment Options

${restaurantInfo.payment.join("\n")}`;
    }

    if (
      q.includes("delivery")
    ) {
      return `🚚 Delivery Time

${restaurantInfo.delivery}`;
    }

    if (
      q.includes("phone") ||
      q.includes("contact")
    ) {
      return `📞 Contact

${restaurantInfo.phone}`;
    }

    if (
      q.includes("hello") ||
      q.includes("hi") ||
      q.includes("hey")
    ) {
      return "👋 Hello! Welcome to Varahi Eat & Fit. How can I help you today?";
    }

    return "😊 Sorry, I couldn't understand that.\n\nTry asking:\n\n• High protein meals\n• Vegetarian food\n• How to order\n• Payment options\n• Delivery";
  }

  function sendMessage() {

    if (!input.trim()) return;

    const userMessage: Message = {
      sender: "user",
      text: input,
    };

    const botMessage: Message = {
      sender: "bot",
      text: getReply(input),
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
      botMessage,
    ]);

    setInput("");
  }

  return (
    <AnimatePresence>

  {open && (

    <motion.div
      initial={{
        opacity: 0,
        scale: 0.95,
        y: 40,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        scale: 0.95,
        y: 40,
      }}
      transition={{
        duration: 0.25,
      }}
      className="fixed bottom-24 right-6 z-[9999] w-[390px] max-w-[95vw] h-[620px] bg-[#101010] rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col"
    >

      {/* Header */}

      <div className="bg-[#E63946] px-6 py-5 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">

            <Bot className="text-[#E63946]" />

          </div>

          <div>

            <h2 className="text-white font-bold text-lg">
              Varahi AI
            </h2>

            <p className="text-white/80 text-sm flex items-center gap-1">

              <Sparkles size={14} />

              Online

            </p>

          </div>

        </div>

        <button
          onClick={onClose}
          className="text-white"
        >
          <X />
        </button>

      </div>

      {/* Messages */}

      <div className="flex-1 overflow-y-auto p-5 space-y-4">

        {messages.map((message, index) => (

          <div
            key={index}
            className={`flex ${
              message.sender === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >

            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 whitespace-pre-line text-sm leading-7 ${
                message.sender === "user"
                  ? "bg-[#E63946] text-white"
                  : "bg-white/5 text-white"
              }`}
            >
              {message.text}
            </div>

          </div>

        ))}

      </div>
            {/* Quick Actions */}

      <div className="px-5 pb-4">

        <div className="grid grid-cols-2 gap-2">

          <button
            onClick={() => {
              setInput("High Protein Meals");
              setTimeout(sendMessage, 100);
            }}
            className="bg-white/5 hover:bg-[#E63946] transition rounded-xl py-3 text-white text-sm"
          >
            💪 Protein Meals
          </button>

          <button
            onClick={() => {
              setInput("Vegetarian Meals");
              setTimeout(sendMessage, 100);
            }}
            className="bg-white/5 hover:bg-[#E63946] transition rounded-xl py-3 text-white text-sm"
          >
            🥗 Vegetarian
          </button>

          <button
            onClick={() => {
              setInput("How to Order");
              setTimeout(sendMessage, 100);
            }}
            className="bg-white/5 hover:bg-[#E63946] transition rounded-xl py-3 text-white text-sm"
          >
            🍽 Order
          </button>

          <button
            onClick={() => {
              setInput("Payment");
              setTimeout(sendMessage, 100);
            }}
            className="bg-white/5 hover:bg-[#E63946] transition rounded-xl py-3 text-white text-sm"
          >
            💳 Payment
          </button>

        </div>

      </div>

      {/* Input */}

      <div className="border-t border-white/10 p-4">

        <div className="flex items-center gap-3">

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            placeholder="Ask me anything..."
            className="flex-1 bg-[#1b1b1b] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#E63946]"
          />

          <button
            onClick={sendMessage}
            className="w-12 h-12 rounded-xl bg-[#E63946] hover:bg-red-600 transition flex items-center justify-center"
          >
            <Send className="text-white" size={20} />
          </button>

        </div>

      </div>
          </motion.div>

  )}

</AnimatePresence>

  );
}