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
  "1": {
    type: "hiragana",
    japanese: "あ",
    alphabet: "a"
  },
  "2": {
    type: "hiragana",
    japanese: "い",
    alphabet: "i"
  },
  "3": {
    type: "hiragana",
    japanese: "う",
    alphabet: "u"
  },
  "4": {
    type: "hiragana",
    japanese: "え",
    alphabet: "e"
  },
  "5": {
    type: "hiragana",
    japanese: "お",
    alphabet: "o"
  },
  "6": {
    type: "hiragana",
    japanese: "か",
    alphabet: "ka"
  },
  "7": {
    type: "hiragana",
    japanese: "き",
    alphabet: "ki"
  },
  "8": {
    type: "hiragana",
    japanese: "く",
    alphabet: "ku"
  },
  "9": {
    type: "hiragana",
    japanese: "け",
    alphabet: "ke"
  },
  "10": {
    type: "hiragana",
    japanese: "こ",
    alphabet: "ko"
  },
  "11": {
    type: "hiragana",
    japanese: "さ",
    alphabet: "sa"
  },
  "12": {
    type: "hiragana",
    japanese: "し",
    alphabet: "shi"
  },
  "13": {
    type: "hiragana",
    japanese: "す",
    alphabet: "su"
  },
  "14": {
    type: "hiragana",
    japanese: "せ",
    alphabet: "se"
  },
  "15": {
    type: "hiragana",
    japanese: "そ",
    alphabet: "so"
  },
  "16": {
    type: "hiragana",
    japanese: "た",
    alphabet: "ta"
  },
  "17": {
    type: "hiragana",
    japanese: "ち",
    alphabet: "chi"
  },
  "18": {
    type: "hiragana",
    japanese: "つ",
    alphabet: "tsu"
  },
  "19": {
    type: "hiragana",
    japanese: "て",
    alphabet: "te"
  },
  "20": {
    type: "hiragana",
    japanese: "と",
    alphabet: "to"
  },
  "21": {
    type: "hiragana",
    japanese: "な",
    alphabet: "na"
  },
  "22": {
    type: "hiragana",
    japanese: "に",
    alphabet: "ni"
  },
  "23": {
    type: "hiragana",
    japanese: "ぬ",
    alphabet: "nu"
  },
  "24": {
    type: "hiragana",
    japanese: "ね",
    alphabet: "ne"
  },
  "25": {
    type: "hiragana",
    japanese: "の",
    alphabet: "no"
  },
  "26": {
    type: "hiragana",
    japanese: "は",
    alphabet: "ha"
  },
  "27": {
    type: "hiragana",
    japanese: "ひ",
    alphabet: "hi"
  },
  "28": {
    type: "hiragana",
    japanese: "ふ",
    alphabet: "fu"
  },
  "29": {
    type: "hiragana",
    japanese: "へ",
    alphabet: "he"
  },
  "30": {
    type: "hiragana",
    japanese: "ほ",
    alphabet: "ho"
  },
  "31": {
    type: "hiragana",
    japanese: "ま",
    alphabet: "ma"
  },
  "32": {
    type: "hiragana",
    japanese: "み",
    alphabet: "mi"
  },
  "33": {
    type: "hiragana",
    japanese: "む",
    alphabet: "mu"
  },
  "34": {
    type: "hiragana",
    japanese: "め",
    alphabet: "me"
  },
  "35": {
    type: "hiragana",
    japanese: "も",
    alphabet: "mo"
  },
  "36": {
    type: "hiragana",
    japanese: "や",
    alphabet: "ya"
  },
  "37": {
    type: "hiragana",
    japanese: "ゆ",
    alphabet: "yu"
  },
  "38": {
    type: "hiragana",
    japanese: "よ",
    alphabet: "yo"
  },
  "39": {
    type: "hiragana",
    japanese: "ら",
    alphabet: "ra"
  },
  "40": {
    type: "hiragana",
    japanese: "り",
    alphabet: "ri"
  },
  "41": {
    type: "hiragana",
    japanese: "る",
    alphabet: "ru"
  },
  "42": {
    type: "hiragana",
    japanese: "れ",
    alphabet: "re"
  },
  "43": {
    type: "hiragana",
    japanese: "ろ",
    alphabet: "ro"
  },
  "44": {
    type: "hiragana",
    japanese: "わ",
    alphabet: "wa"
  },
  "45": {
    type: "hiragana",
    japanese: "ゐ",
    alphabet: "i"
  },
  "46": {
    type: "hiragana",
    japanese: "ゑ",
    alphabet: "e"
  },
  "47": {
    type: "hiragana",
    japanese: "を",
    alphabet: "o"
  },
  "48": {
    type: "hiragana",
    japanese: "ん",
    alphabet: "n"
  },
  "49": {
    type: "hiragana",
    japanese: "が",
    alphabet: "ga"
  },
  "50": {
    type: "hiragana",
    japanese: "ぎ",
    alphabet: "gi"
  },
  "51": {
    type: "hiragana",
    japanese: "ぐ",
    alphabet: "gu"
  },
  "52": {
    type: "hiragana",
    japanese: "げ",
    alphabet: "ge"
  },
  "53": {
    type: "hiragana",
    japanese: "ご",
    alphabet: "go"
  },
  "54": {
    type: "hiragana",
    japanese: "ざ",
    alphabet: "za"
  },
  "55": {
    type: "hiragana",
    japanese: "じ",
    alphabet: "ji"
  },
  "56": {
    type: "hiragana",
    japanese: "ず",
    alphabet: "zu"
  },
  "57": {
    type: "hiragana",
    japanese: "ぜ",
    alphabet: "ze"
  },
  "58": {
    type: "hiragana",
    japanese: "ぞ",
    alphabet: "zo"
  },
  "59": {
    type: "hiragana",
    japanese: "だ",
    alphabet: "d"
  },
  "60": {
    type: "hiragana",
    japanese: "ぢ",
    alphabet: "ji"
  },
  "61": {
    type: "hiragana",
    japanese: "づ",
    alphabet: "zu"
  },
  "62": {
    type: "hiragana",
    japanese: "で",
    alphabet: "de"
  },
  "63": {
    type: "hiragana",
    japanese: "ど",
    alphabet: "do"
  },
  "64": {
    type: "hiragana",
    japanese: "ば",
    alphabet: "ba"
  },
  "65": {
    type: "hiragana",
    japanese: "び",
    alphabet: "bi"
  },
  "66": {
    type: "hiragana",
    japanese: "ぶ",
    alphabet: "bu"
  },
  "67": {
    type: "hiragana",
    japanese: "べ",
    alphabet: "be"
  },
  "68": {
    type: "hiragana",
    japanese: "ぼ",
    alphabet: "bo"
  },
  "69": {
    type: "hiragana",
    japanese: "ぱ",
    alphabet: "pa"
  },
  "70": {
    type: "hiragana",
    japanese: "ぴ",
    alphabet: "pi"
  },
  "71": {
    type: "hiragana",
    japanese: "ぷ",
    alphabet: "pu"
  },
  "72": {
    type: "hiragana",
    japanese: "ぺ",
    alphabet: "pe"
  },
  "73": {
    type: "hiragana",
    japanese: "ぽ",
    alphabet: "po"
  },
  "74": {
    type: "hiragana",
    japanese: "きゃ",
    alphabet: "kya"
  },
  "75": {
    type: "hiragana",
    japanese: "きゅ",
    alphabet: "kyu"
  },
  "76": {
    type: "hiragana",
    japanese: "きょ",
    alphabet: "kyo"
  },
  "77": {
    type: "hiragana",
    japanese: "しゃ",
    alphabet: "sha"
  },
  "78": {
    type: "hiragana",
    japanese: "しゅ",
    alphabet: "shu"
  },
  "79": {
    type: "hiragana",
    japanese: "しょ",
    alphabet: "sho"
  },
  "80": {
    type: "hiragana",
    japanese: "ちゃ",
    alphabet: "cha"
  },
  "81": {
    type: "hiragana",
    japanese: "ちゅ",
    alphabet: "chu"
  },
  "82": {
    type: "hiragana",
    japanese: "ちょ",
    alphabet: "cho"
  },
  "83": {
    type: "hiragana",
    japanese: "にゃ",
    alphabet: "nya"
  },
  "84": {
    type: "hiragana",
    japanese: "にゅ",
    alphabet: "nyu"
  },
  "85": {
    type: "hiragana",
    japanese: "にょ",
    alphabet: "nyo"
  },
  "86": {
    type: "hiragana",
    japanese: "ひゃ",
    alphabet: "hya"
  },
  "87": {
    type: "hiragana",
    japanese: "ひゅ",
    alphabet: "hyu"
  },
  "88": {
    type: "hiragana",
    japanese: "ひょ",
    alphabet: "hyo"
  },
  "89": {
    type: "hiragana",
    japanese: "みゃ",
    alphabet: "mya"
  },
  "90": {
    type: "hiragana",
    japanese: "みゅ",
    alphabet: "myu"
  },
  "91": {
    type: "hiragana",
    japanese: "みょ",
    alphabet: "myo"
  },
  "92": {
    type: "hiragana",
    japanese: "りゃ",
    alphabet: "rya"
  },
  "93": {
    type: "hiragana",
    japanese: "りゅ",
    alphabet: "ryu"
  },
  "94": {
    type: "hiragana",
    japanese: "りょ",
    alphabet: "ryo"
  },
  "95": {
    type: "hiragana",
    japanese: "ぎゃ",
    alphabet: "gya"
  },
  "96": {
    type: "hiragana",
    japanese: "ぎゅ",
    alphabet: "gyu"
  },
  "97": {
    type: "hiragana",
    japanese: "ぎょ",
    alphabet: "gyo"
  },
  "98": {
    type: "hiragana",
    japanese: "じゃ",
    alphabet: "ja"
  },
  "99": {
    type: "hiragana",
    japanese: "じゅ",
    alphabet: "ju"
  },
  "100": {
    type: "hiragana",
    japanese: "じょ",
    alphabet: "jo"
  },
  "101": {
    type: "hiragana",
    japanese: "ぢゃ",
    alphabet: "ja"
  },
  "102": {
    type: "hiragana",
    japanese: "ぢゅ",
    alphabet: "ju"
  },
  "103": {
    type: "hiragana",
    japanese: "ぢょ",
    alphabet: "jo"
  },
  "104": {
    type: "hiragana",
    japanese: "びゃ",
    alphabet: "bya"
  },
  "105": {
    type: "hiragana",
    japanese: "びゅ",
    alphabet: "byu"
  },
  "106": {
    type: "hiragana",
    japanese: "びょ",
    alphabet: "byo"
  },
  "107": {
    type: "hiragana",
    japanese: "ぴゃ",
    alphabet: "pya"
  },
  "108": {
    type: "hiragana",
    japanese: "ぴゅ",
    alphabet: "pyu"
  },
  "109": {
    type: "hiragana",
    japanese: "ぴょ",
    alphabet: "pyo"
  },
  "110": {
    type: "katakana",
    japanese: "ア",
    alphabet: "a"
  },
  "111": {
    type: "katakana",
    japanese: "イ",
    alphabet: "i"
  },
  "112": {
    type: "katakana",
    japanese: "ウ",
    alphabet: "u"
  },
  "113": {
    type: "katakana",
    japanese: "エ",
    alphabet: "e"
  },
  "114": {
    type: "katakana",
    japanese: "オ",
    alphabet: "o"
  },
  "115": {
    type: "katakana",
    japanese: "カ",
    alphabet: "ka"
  },
  "116": {
    type: "katakana",
    japanese: "キ",
    alphabet: "ki"
  },
  "117": {
    type: "katakana",
    japanese: "ク",
    alphabet: "ku"
  },
  "118": {
    type: "katakana",
    japanese: "ケ",
    alphabet: "ke"
  },
  "119": {
    type: "katakana",
    japanese: "コ",
    alphabet: "ko"
  },
  "120": {
    type: "katakana",
    japanese: "サ",
    alphabet: "sa"
  },
  "121": {
    type: "katakana",
    japanese: "シ",
    alphabet: "shi"
  },
  "122": {
    type: "katakana",
    japanese: "ス",
    alphabet: "su"
  },
  "123": {
    type: "katakana",
    japanese: "セ",
    alphabet: "se"
  },
  "124": {
    type: "katakana",
    japanese: "ソ",
    alphabet: "so"
  },
  "125": {
    type: "katakana",
    japanese: "タ",
    alphabet: "ta"
  },
  "126": {
    type: "katakana",
    japanese: "チ",
    alphabet: "chi"
  },
  "127": {
    type: "katakana",
    japanese: "ツ",
    alphabet: "tsu"
  },
  "128": {
    type: "katakana",
    japanese: "テ",
    alphabet: "te"
  },
  "129": {
    type: "katakana",
    japanese: "ト",
    alphabet: "to"
  },
  "130": {
    type: "katakana",
    japanese: "ナ",
    alphabet: "na"
  },
  "131": {
    type: "katakana",
    japanese: "ニ",
    alphabet: "ni"
  },
  "132": {
    type: "katakana",
    japanese: "ヌ",
    alphabet: "nu"
  },
  "133": {
    type: "katakana",
    japanese: "ネ",
    alphabet: "ne"
  },
  "134": {
    type: "katakana",
    japanese: "ノ",
    alphabet: "no"
  },
  "135": {
    type: "katakana",
    japanese: "ハ",
    alphabet: "ha"
  },
  "136": {
    type: "katakana",
    japanese: "ヒ",
    alphabet: "hi"
  },
  "137": {
    type: "katakana",
    japanese: "フ",
    alphabet: "fu"
  },
  "138": {
    type: "katakana",
    japanese: "ヘ",
    alphabet: "he"
  },
  "139": {
    type: "katakana",
    japanese: "ホ",
    alphabet: "ho"
  },
  "140": {
    type: "katakana",
    japanese: "マ",
    alphabet: "ma"
  },
  "141": {
    type: "katakana",
    japanese: "ミ",
    alphabet: "mi"
  },
  "142": {
    type: "katakana",
    japanese: "ム",
    alphabet: "mu"
  },
  "143": {
    type: "katakana",
    japanese: "メ",
    alphabet: "me"
  },
  "144": {
    type: "katakana",
    japanese: "モ",
    alphabet: "mo"
  },
  "145": {
    type: "katakana",
    japanese: "ヤ",
    alphabet: "ya"
  },
  "146": {
    type: "katakana",
    japanese: "ユ",
    alphabet: "yu"
  },
  "147": {
    type: "katakana",
    japanese: "ヨ",
    alphabet: "yo"
  },
  "148": {
    type: "katakana",
    japanese: "ラ",
    alphabet: "ra"
  },
  "149": {
    type: "katakana",
    japanese: "リ",
    alphabet: "ri"
  },
  "150": {
    type: "katakana",
    japanese: "ル",
    alphabet: "ru"
  },
  "151": {
    type: "katakana",
    japanese: "レ",
    alphabet: "re"
  },
  "152": {
    type: "katakana",
    japanese: "ロ",
    alphabet: "ro"
  },
  "153": {
    type: "katakana",
    japanese: "ワ",
    alphabet: "wa"
  },
  "154": {
    type: "katakana",
    japanese: "ヰ",
    alphabet: "i"
  },
  "155": {
    type: "katakana",
    japanese: "ヱ",
    alphabet: "e"
  },
  "156": {
    type: "katakana",
    japanese: "ヲ",
    alphabet: "o"
  },
  "157": {
    type: "katakana",
    japanese: "ン",
    alphabet: "n"
  },
  "158": {
    type: "katakana",
    japanese: "ガ",
    alphabet: "ga"
  },
  "159": {
    type: "katakana",
    japanese: "ギ",
    alphabet: "gi"
  },
  "160": {
    type: "katakana",
    japanese: "グ",
    alphabet: "gu"
  },
  "161": {
    type: "katakana",
    japanese: "ゲ",
    alphabet: "ge"
  },
  "162": {
    type: "katakana",
    japanese: "ゴ",
    alphabet: "go"
  },
  "163": {
    type: "katakana",
    japanese: "ザ",
    alphabet: "za"
  },
  "164": {
    type: "katakana",
    japanese: "ジ",
    alphabet: "ji"
  },
  "165": {
    type: "katakana",
    japanese: "ズ",
    alphabet: "zu"
  },
  "166": {
    type: "katakana",
    japanese: "ゼ",
    alphabet: "ze"
  },
  "167": {
    type: "katakana",
    japanese: "ゾ",
    alphabet: "zo"
  },
  "168": {
    type: "katakana",
    japanese: "ダ",
    alphabet: "d"
  },
  "169": {
    type: "katakana",
    japanese: "ヂ",
    alphabet: "ji"
  },
  "170": {
    type: "katakana",
    japanese: "ヅ",
    alphabet: "zu"
  },
  "171": {
    type: "katakana",
    japanese: "デ",
    alphabet: "de"
  },
  "172": {
    type: "katakana",
    japanese: "ド",
    alphabet: "do"
  },
  "173": {
    type: "katakana",
    japanese: "バ",
    alphabet: "ba"
  },
  "174": {
    type: "katakana",
    japanese: "ビ",
    alphabet: "bi"
  },
  "175": {
    type: "katakana",
    japanese: "ブ",
    alphabet: "bu"
  },
  "176": {
    type: "katakana",
    japanese: "ベ",
    alphabet: "be"
  },
  "177": {
    type: "katakana",
    japanese: "ボ",
    alphabet: "bo"
  },
  "178": {
    type: "katakana",
    japanese: "パ",
    alphabet: "pa"
  },
  "179": {
    type: "katakana",
    japanese: "ピ",
    alphabet: "pi"
  },
  "180": {
    type: "katakana",
    japanese: "プ",
    alphabet: "pu"
  },
  "181": {
    type: "katakana",
    japanese: "ペ",
    alphabet: "pe"
  },
  "182": {
    type: "katakana",
    japanese: "ポ",
    alphabet: "po"
  },
  "183": {
    type: "katakana",
    japanese: "キャ",
    alphabet: "kya"
  },
  "184": {
    type: "katakana",
    japanese: "キュ",
    alphabet: "kyu"
  },
  "185": {
    type: "katakana",
    japanese: "キョ",
    alphabet: "kyo"
  },
  "186": {
    type: "katakana",
    japanese: "シャ",
    alphabet: "sha"
  },
  "187": {
    type: "katakana",
    japanese: "シュ",
    alphabet: "shu"
  },
  "188": {
    type: "katakana",
    japanese: "ショ",
    alphabet: "sho"
  },
  "189": {
    type: "katakana",
    japanese: "チャ",
    alphabet: "cha"
  },
  "190": {
    type: "katakana",
    japanese: "チュ",
    alphabet: "chu"
  },
  "191": {
    type: "katakana",
    japanese: "チョ",
    alphabet: "cho"
  },
  "192": {
    type: "katakana",
    japanese: "ニャ",
    alphabet: "nya"
  },
  "193": {
    type: "katakana",
    japanese: "ニュ",
    alphabet: "nyu"
  },
  "194": {
    type: "katakana",
    japanese: "ニョ",
    alphabet: "nyo"
  },
  "195": {
    type: "katakana",
    japanese: "ヒャ",
    alphabet: "hya"
  },
  "196": {
    type: "katakana",
    japanese: "ヒュ",
    alphabet: "hyu"
  },
  "197": {
    type: "katakana",
    japanese: "ヒョ",
    alphabet: "hyo"
  },
  "198": {
    type: "katakana",
    japanese: "ミャ",
    alphabet: "mya"
  },
  "199": {
    type: "katakana",
    japanese: "ミュ",
    alphabet: "myu"
  },
  "200": {
    type: "katakana",
    japanese: "ミョ",
    alphabet: "myo"
  },
  "201": {
    type: "katakana",
    japanese: "リャ",
    alphabet: "rya"
  },
  "202": {
    type: "katakana",
    japanese: "リュ",
    alphabet: "ryu"
  },
  "203": {
    type: "katakana",
    japanese: "リョ",
    alphabet: "ryo"
  },
  "204": {
    type: "katakana",
    japanese: "ギャ",
    alphabet: "gya"
  },
  "205": {
    type: "katakana",
    japanese: "ギュ",
    alphabet: "gyu"
  },
  "206": {
    type: "katakana",
    japanese: "ギョ",
    alphabet: "gyo"
  },
  "207": {
    type: "katakana",
    japanese: "ジャ",
    alphabet: "ja"
  },
  "208": {
    type: "katakana",
    japanese: "ジュ",
    alphabet: "ju"
  },
  "209": {
    type: "katakana",
    japanese: "ジョ",
    alphabet: "jo"
  },
  "210": {
    type: "katakana",
    japanese: "ヂャ",
    alphabet: "ja"
  },
  "211": {
    type: "katakana",
    japanese: "ヂュ",
    alphabet: "ju"
  },
  "212": {
    type: "katakana",
    japanese: "ヂョ",
    alphabet: "jo"
  },
  "213": {
    type: "katakana",
    japanese: "ビャ",
    alphabet: "bya"
  },
  "214": {
    type: "katakana",
    japanese: "ビュ",
    alphabet: "byu"
  },
  "215": {
    type: "katakana",
    japanese: "ビョ",
    alphabet: "byo"
  },
  "216": {
    type: "katakana",
    japanese: "ピャ",
    alphabet: "pya"
  },
  "217": {
    type: "katakana",
    japanese: "ピュ",
    alphabet: "pyu"
  },
  "218": {
    type: "katakana",
    japanese: "ピョ",
    alphabet: "pyo"
  }
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
      <div className="w-full flex justify-center space-x-4 mb-4 mt-8">
        <Button
          variant={selectedType === "hiragana" ? "default" : "outline"}
          onClick={() => setSelectedType("hiragana")}
          className={`rounded-full font-bold ${
            selectedType === "hiragana" ? "text-white" : "text-gray-800"
          }`}
        >
          Hiragana
        </Button>
        <Button
          variant={selectedType === "katakana" ? "default" : "outline"}
          onClick={() => setSelectedType("katakana")}
          className={`rounded-full font-bold ${
            selectedType === "katakana" ? "text-white" : "text-gray-800"
          }`}
        >
          Katakana
        </Button>
      </div>
      <div className="relative w-full max-w-sm">
        <Button
          variant="ghost"
          size="icon"
          onClick={handlePreviousCard}
          className="absolute -top-12 left-1/2 transform -translate-x-1/2 rounded-full"
        >
          <ChevronUp className="h-6 w-6 text-gray-800" />
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
          className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 rounded-full"
        >
          <ChevronDown className="h-6 w-6 text-gray-800" />
        </Button>
      </div>
      <div className="w-full max-w-sm mt-4 mb-16">
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Enter alphabet"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleCheck();
              }
            }}
            className="flex-grow text-black rounded-full"
          />
          <Button
          onClick={handleCheck} 
          size="icon"
          className="rounded-full w-10 h-10"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
