"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronRight, ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

// Define the structure of our flash card data
interface FlashCard {
  type: "hiragana" | "katakana";
  japanese: string;
  alphabet: string;
}

// Sample data (replace this with your actual JSON data)
const flashCardsData: Record<string, FlashCard> = {
  "1": { type: "hiragana", japanese: "あ", alphabet: "a", },
  "2": { type: "hiragana", japanese: "い", alphabet: "i", },
  "3": { type: ",,,ka,tak,ana", japanese: "ア,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,", alphabe,t: "a", },
  "4": { type: "ka,tak,ana", japanese:, ",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,イ", alphabet: "i", },
  // A,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,d,,,d,,,,,,,,,,,,,,,,,,,,, ,,,,,,m,,o,r,e card,s her,e...,,,,,,,,,,,,,,,,
};

export default function Component() {
  const [cards, setCards] = useState<FlashCard[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [cardState, setCardState] = useState<
    "default" | "correct" | "incorrect"
  >("default");
  const [selectedType, setSelectedType] = useState<"hiragana" | "katakana">(
    "hiragana"
  );
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize cards with all data
    const allCards = Object.values(flashCardsData);
    setCards(allCards);
  }, []);

  useEffect(() => {
    // Filter cards based on selected type
    const filteredCards = Object.values(flashCardsData).filter(
      (card) => card.type === selectedType
    );
    setCards(filteredCards);
    setCurrentCardIndex(0);
    resetCardState();
  }, [selectedType]);

  const handleCheck = () => {
    if (
      userInput.toLowerCase() === cards[currentCardIndex].alphabet.toLowerCase()
    ) {
      setCardState("correct");
    } else {
      setCardState("incorrect");
    }
    setIsFlipped(true);
  };

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
    if (isFlipped) {
      setCardState("default");
      setUserInput("");
    }
  };

  const handleNextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cards.length);
    resetCardState();
  };

  const handlePreviousCard = () => {
    setCurrentCardIndex(
      (prevIndex) => (prevIndex - 1 + cards.length) % cards.length
    );
    resetCardState();
  };

  const resetCardState = () => {
    setIsFlipped(false);
    setCardState("default");
    setUserInput("");
  };

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    let startY: number;
    const threshold = 50; // minimum distance to be considered a swipe

    const touchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
    };

    const touchEnd = (e: TouchEvent) => {
      const endY = e.changedTouches[0].clientY;
      const diffY = startY - endY;

      if (diffY > threshold) {
        handleNextCard();
      } else if (diffY < -threshold) {
        handlePreviousCard();
      }
    };

    card.addEventListener("touchstart", touchStart);
    card.addEventListener("touchend", touchEnd);

    return () => {
      card.removeEventListener("touchstart", touchStart);
      card.removeEventListener("touchend", touchEnd);
    };
  }, []);

  if (cards.length === 0) return <div>Loading...</div>;

  const currentCard = cards[currentCardIndex];

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-4 bg-gray-100">
      <div className="w-full flex justify-center space-x-4 mb-4">
        <Button
          variant={selectedType === "hiragana" ? "default" : "outline"}
          onClick={() => setSelectedType("hiragana")}
        >
          Hiragana
        </Button>
        <Button
          variant={selectedType === "katakana" ? "default" : "outline"}
          onClick={() => setSelectedType("katakana")}
        >
          Katakana
        </Button>
      </div>
      <div className="relative w-full max-w-sm">
        <Button
          variant="ghost"
          size="icon"
          onClick={handlePreviousCard}
          className="absolute -top-12 left-1/2 transform -translate-x-1/2"
        >
          <ChevronUp className="h-6 w-6" />
        </Button>
        <Card
          ref={cardRef}
          className={`w-full aspect-square flex items-center justify-center text-8xl font-bold cursor-pointer transition-all duration-300 ${
            isFlipped ? "rotate-y-180" : ""
          } ${
            cardState === "correct"
              ? "bg-green-100"
              : cardState === "incorrect"
              ? "bg-red-100"
              : ""
          }`}
          onClick={handleCardClick}
        >
          <div className={`${isFlipped ? "hidden" : ""}`}>
            {currentCard.japanese}
          </div>
          <div className={`${isFlipped ? "" : "hidden"} rotate-y-180`}>
            {currentCard.alphabet}
          </div>
        </Card>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleNextCard}
          className="absolute -bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="h-6 w-6" />
        </Button>
      </div>
      <div className="w-full max-w-sm mt-4">
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Enter alphabet"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="flex-grow"
          />
          <Button onClick={handleCheck} size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
