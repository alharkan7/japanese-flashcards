"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronRight, ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface FlashCard {
  type: "hiragana" | "katakana";
  japanese: string;
  alphabet: string;
}

const flashCardsData: Record<string, FlashCard> = {
  "1": {
    type: "Hiragana",
    japanese: "あ",
    alphabet: "a",
  },
  "2": {
    type: "Hiragana",
    japanese: "い",
    alphabet: "i",
  },
  "3": {
    type: "Hiragana",
    japanese: "う",
    alphabet: "u",
  },
  "4": {
    type: "Hiragana",
    japanese: "え",
    alphabet: "e",
  },
  "5": {
    type: "Hiragana",
    japanese: "お",
    alphabet: "o",
  },
  "6": {
    type: "Hiragana",
    japanese: "か",
    alphabet: "ka",
  },
  "7": {
    type: "Hiragana",
    japanese: "き",
    alphabet: "ki",
  },
  "8": {
    type: "Hiragana",
    japanese: "く",
    alphabet: "ku",
  },
  "9": {
    type: "Hiragana",
    japanese: "け",
    alphabet: "ke",
  },
  "10": {
    type: "Hiragana",
    japanese: "こ",
    alphabet: "ko",
  },
  "11": {
    type: "Hiragana",
    japanese: "さ",
    alphabet: "sa",
  },
  "12": {
    type: "Hiragana",
    japanese: "し",
    alphabet: "shi",
  },
  "13": {
    type: "Hiragana",
    japanese: "す",
    alphabet: "su",
  },
  "14": {
    type: "Hiragana",
    japanese: "せ",
    alphabet: "se",
  },
  "15": {
    type: "Hiragana",
    japanese: "そ",
    alphabet: "so",
  },
  "16": {
    type: "Hiragana",
    japanese: "た",
    alphabet: "ta",
  },
  "17": {
    type: "Hiragana",
    japanese: "ち",
    alphabet: "chi",
  },
  "18": {
    type: "Hiragana",
    japanese: "つ",
    alphabet: "tsu",
  },
  "19": {
    type: "Hiragana",
    japanese: "て",
    alphabet: "te",
  },
  "20": {
    type: "Hiragana",
    japanese: "と",
    alphabet: "to",
  },
  "21": {
    type: "Hiragana",
    japanese: "な",
    alphabet: "na",
  },
  "22": {
    type: "Hiragana",
    japanese: "に",
    alphabet: "ni",
  },
  "23": {
    type: "Hiragana",
    japanese: "ぬ",
    alphabet: "nu",
  },
  "24": {
    type: "Hiragana",
    japanese: "ね",
    alphabet: "ne",
  },
  "25": {
    type: "Hiragana",
    japanese: "の",
    alphabet: "no",
  },
  "26": {
    type: "Hiragana",
    japanese: "は",
    alphabet: "ha",
  },
  "27": {
    type: "Hiragana",
    japanese: "ひ",
    alphabet: "hi",
  },
  "28": {
    type: "Hiragana",
    japanese: "ふ",
    alphabet: "fu",
  },
  "29": {
    type: "Hiragana",
    japanese: "へ",
    alphabet: "he",
  },
  "30": {
    type: "Hiragana",
    japanese: "ほ",
    alphabet: "ho",
  },
  "31": {
    type: "Hiragana",
    japanese: "ま",
    alphabet: "ma",
  },
  "32": {
    type: "Hiragana",
    japanese: "み",
    alphabet: "mi",
  },
  "33": {
    type: "Hiragana",
    japanese: "む",
    alphabet: "mu",
  },
  "34": {
    type: "Hiragana",
    japanese: "め",
    alphabet: "me",
  },
  "35": {
    type: "Hiragana",
    japanese: "も",
    alphabet: "mo",
  },
  "36": {
    type: "Hiragana",
    japanese: "や",
    alphabet: "ya",
  },
  "37": {
    type: "Hiragana",
    japanese: "ゆ",
    alphabet: "yu",
  },
  "38": {
    type: "Hiragana",
    japanese: "よ",
    alphabet: "yo",
  },
  "39": {
    type: "Hiragana",
    japanese: "ら",
    alphabet: "ra",
  },
  "40": {
    type: "Hiragana",
    japanese: "り",
    alphabet: "ri",
  },
  "41": {
    type: "Hiragana",
    japanese: "る",
    alphabet: "ru",
  },
  "42": {
    type: "Hiragana",
    japanese: "れ",
    alphabet: "re",
  },
  "43": {
    type: "Hiragana",
    japanese: "ろ",
    alphabet: "ro",
  },
  "44": {
    type: "Hiragana",
    japanese: "わ",
    alphabet: "wa",
  },
  "45": {
    type: "Hiragana",
    japanese: "ゐ",
    alphabet: "i",
  },
  "46": {
    type: "Hiragana",
    japanese: "ゑ",
    alphabet: "e",
  },
  "47": {
    type: "Hiragana",
    japanese: "を",
    alphabet: "o",
  },
  "48": {
    type: "Hiragana",
    japanese: "ん",
    alphabet: "n",
  },
  "49": {
    type: "Hiragana",
    japanese: "が",
    alphabet: "ga",
  },
  "50": {
    type: "Hiragana",
    japanese: "ぎ",
    alphabet: "gi",
  },
  "51": {
    type: "Hiragana",
    japanese: "ぐ",
    alphabet: "gu",
  },
  "52": {
    type: "Hiragana",
    japanese: "げ",
    alphabet: "ge",
  },
  "53": {
    type: "Hiragana",
    japanese: "ご",
    alphabet: "go",
  },
  "54": {
    type: "Hiragana",
    japanese: "ざ",
    alphabet: "za",
  },
  "55": {
    type: "Hiragana",
    japanese: "じ",
    alphabet: "ji",
  },
  "56": {
    type: "Hiragana",
    japanese: "ず",
    alphabet: "zu",
  },
  "57": {
    type: "Hiragana",
    japanese: "ぜ",
    alphabet: "ze",
  },
  "58": {
    type: "Hiragana",
    japanese: "ぞ",
    alphabet: "zo",
  },
  "59": {
    type: "Hiragana",
    japanese: "だ",
    alphabet: "d",
  },
  "60": {
    type: "Hiragana",
    japanese: "ぢ",
    alphabet: "ji",
  },
  "61": {
    type: "Hiragana",
    japanese: "づ",
    alphabet: "zu",
  },
  "62": {
    type: "Hiragana",
    japanese: "で",
    alphabet: "de",
  },
  "63": {
    type: "Hiragana",
    japanese: "ど",
    alphabet: "do",
  },
  "64": {
    type: "Hiragana",
    japanese: "ば",
    alphabet: "ba",
  },
  "65": {
    type: "Hiragana",
    japanese: "び",
    alphabet: "bi",
  },
  "66": {
    type: "Hiragana",
    japanese: "ぶ",
    alphabet: "bu",
  },
  "67": {
    type: "Hiragana",
    japanese: "べ",
    alphabet: "be",
  },
  "68": {
    type: "Hiragana",
    japanese: "ぼ",
    alphabet: "bo",
  },
  "69": {
    type: "Hiragana",
    japanese: "ぱ",
    alphabet: "pa",
  },
  "70": {
    type: "Hiragana",
    japanese: "ぴ",
    alphabet: "pi",
  },
  "71": {
    type: "Hiragana",
    japanese: "ぷ",
    alphabet: "pu",
  },
  "72": {
    type: "Hiragana",
    japanese: "ぺ",
    alphabet: "pe",
  },
  "73": {
    type: "Hiragana",
    japanese: "ぽ",
    alphabet: "po",
  },
  "74": {
    type: "Hiragana",
    japanese: "きゃ",
    alphabet: "kya",
  },
  "75": {
    type: "Hiragana",
    japanese: "きゅ",
    alphabet: "kyu",
  },
  "76": {
    type: "Hiragana",
    japanese: "きょ",
    alphabet: "kyo",
  },
  "77": {
    type: "Hiragana",
    japanese: "しゃ",
    alphabet: "sha",
  },
  "78": {
    type: "Hiragana",
    japanese: "しゅ",
    alphabet: "shu",
  },
  "79": {
    type: "Hiragana",
    japanese: "しょ",
    alphabet: "sho",
  },
  "80": {
    type: "Hiragana",
    japanese: "ちゃ",
    alphabet: "cha",
  },
  "81": {
    type: "Hiragana",
    japanese: "ちゅ",
    alphabet: "chu",
  },
  "82": {
    type: "Hiragana",
    japanese: "ちょ",
    alphabet: "cho",
  },
  "83": {
    type: "Hiragana",
    japanese: "にゃ",
    alphabet: "nya",
  },
  "84": {
    type: "Hiragana",
    japanese: "にゅ",
    alphabet: "nyu",
  },
  "85": {
    type: "Hiragana",
    japanese: "にょ",
    alphabet: "nyo",
  },
  "86": {
    type: "Hiragana",
    japanese: "ひゃ",
    alphabet: "hya",
  },
  "87": {
    type: "Hiragana",
    japanese: "ひゅ",
    alphabet: "hyu",
  },
  "88": {
    type: "Hiragana",
    japanese: "ひょ",
    alphabet: "hyo",
  },
  "89": {
    type: "Hiragana",
    japanese: "みゃ",
    alphabet: "mya",
  },
  "90": {
    type: "Hiragana",
    japanese: "みゅ",
    alphabet: "myu",
  },
  "91": {
    type: "Hiragana",
    japanese: "みょ",
    alphabet: "myo",
  },
  "92": {
    type: "Hiragana",
    japanese: "りゃ",
    alphabet: "rya",
  },
  "93": {
    type: "Hiragana",
    japanese: "りゅ",
    alphabet: "ryu",
  },
  "94": {
    type: "Hiragana",
    japanese: "りょ",
    alphabet: "ryo",
  },
  "95": {
    type: "Hiragana",
    japanese: "ぎゃ",
    alphabet: "gya",
  },
  "96": {
    type: "Hiragana",
    japanese: "ぎゅ",
    alphabet: "gyu",
  },
  "97": {
    type: "Hiragana",
    japanese: "ぎょ",
    alphabet: "gyo",
  },
  "98": {
    type: "Hiragana",
    japanese: "じゃ",
    alphabet: "ja",
  },
  "99": {
    type: "Hiragana",
    japanese: "じゅ",
    alphabet: "ju",
  },
  "100": {
    type: "Hiragana",
    japanese: "じょ",
    alphabet: "jo",
  },
  "101": {
    type: "Hiragana",
    japanese: "ぢゃ",
    alphabet: "ja",
  },
  "102": {
    type: "Hiragana",
    japanese: "ぢゅ",
    alphabet: "ju",
  },
  "103": {
    type: "Hiragana",
    japanese: "ぢょ",
    alphabet: "jo",
  },
  "104": {
    type: "Hiragana",
    japanese: "びゃ",
    alphabet: "bya",
  },
  "105": {
    type: "Hiragana",
    japanese: "びゅ",
    alphabet: "byu",
  },
  "106": {
    type: "Hiragana",
    japanese: "びょ",
    alphabet: "byo",
  },
  "107": {
    type: "Hiragana",
    japanese: "ぴゃ",
    alphabet: "pya",
  },
  "108": {
    type: "Hiragana",
    japanese: "ぴゅ",
    alphabet: "pyu",
  },
  "109": {
    type: "Hiragana",
    japanese: "ぴょ",
    alphabet: "pyo",
  },
  "110": {
    type: "Katakana",
    japanese: "ア",
    alphabet: "a",
  },
  "111": {
    type: "Katakana",
    japanese: "イ",
    alphabet: "i",
  },
  "112": {
    type: "Katakana",
    japanese: "ウ",
    alphabet: "u",
  },
  "113": {
    type: "Katakana",
    japanese: "エ",
    alphabet: "e",
  },
  "114": {
    type: "Katakana",
    japanese: "オ",
    alphabet: "o",
  },
  "115": {
    type: "Katakana",
    japanese: "カ",
    alphabet: "ka",
  },
  "116": {
    type: "Katakana",
    japanese: "キ",
    alphabet: "ki",
  },
  "117": {
    type: "Katakana",
    japanese: "ク",
    alphabet: "ku",
  },
  "118": {
    type: "Katakana",
    japanese: "ケ",
    alphabet: "ke",
  },
  "119": {
    type: "Katakana",
    japanese: "コ",
    alphabet: "ko",
  },
  "120": {
    type: "Katakana",
    japanese: "サ",
    alphabet: "sa",
  },
  "121": {
    type: "Katakana",
    japanese: "シ",
    alphabet: "shi",
  },
  "122": {
    type: "Katakana",
    japanese: "ス",
    alphabet: "su",
  },
  "123": {
    type: "Katakana",
    japanese: "セ",
    alphabet: "se",
  },
  "124": {
    type: "Katakana",
    japanese: "ソ",
    alphabet: "so",
  },
  "125": {
    type: "Katakana",
    japanese: "タ",
    alphabet: "ta",
  },
  "126": {
    type: "Katakana",
    japanese: "チ",
    alphabet: "chi",
  },
  "127": {
    type: "Katakana",
    japanese: "ツ",
    alphabet: "tsu",
  },
  "128": {
    type: "Katakana",
    japanese: "テ",
    alphabet: "te",
  },
  "129": {
    type: "Katakana",
    japanese: "ト",
    alphabet: "to",
  },
  "130": {
    type: "Katakana",
    japanese: "ナ",
    alphabet: "na",
  },
  "131": {
    type: "Katakana",
    japanese: "ニ",
    alphabet: "ni",
  },
  "132": {
    type: "Katakana",
    japanese: "ヌ",
    alphabet: "nu",
  },
  "133": {
    type: "Katakana",
    japanese: "ネ",
    alphabet: "ne",
  },
  "134": {
    type: "Katakana",
    japanese: "ノ",
    alphabet: "no",
  },
  "135": {
    type: "Katakana",
    japanese: "ハ",
    alphabet: "ha",
  },
  "136": {
    type: "Katakana",
    japanese: "ヒ",
    alphabet: "hi",
  },
  "137": {
    type: "Katakana",
    japanese: "フ",
    alphabet: "fu",
  },
  "138": {
    type: "Katakana",
    japanese: "ヘ",
    alphabet: "he",
  },
  "139": {
    type: "Katakana",
    japanese: "ホ",
    alphabet: "ho",
  },
  "140": {
    type: "Katakana",
    japanese: "マ",
    alphabet: "ma",
  },
  "141": {
    type: "Katakana",
    japanese: "ミ",
    alphabet: "mi",
  },
  "142": {
    type: "Katakana",
    japanese: "ム",
    alphabet: "mu",
  },
  "143": {
    type: "Katakana",
    japanese: "メ",
    alphabet: "me",
  },
  "144": {
    type: "Katakana",
    japanese: "モ",
    alphabet: "mo",
  },
  "145": {
    type: "Katakana",
    japanese: "ヤ",
    alphabet: "ya",
  },
  "146": {
    type: "Katakana",
    japanese: "ユ",
    alphabet: "yu",
  },
  "147": {
    type: "Katakana",
    japanese: "ヨ",
    alphabet: "yo",
  },
  "148": {
    type: "Katakana",
    japanese: "ラ",
    alphabet: "ra",
  },
  "149": {
    type: "Katakana",
    japanese: "リ",
    alphabet: "ri",
  },
  "150": {
    type: "Katakana",
    japanese: "ル",
    alphabet: "ru",
  },
  "151": {
    type: "Katakana",
    japanese: "レ",
    alphabet: "re",
  },
  "152": {
    type: "Katakana",
    japanese: "ロ",
    alphabet: "ro",
  },
  "153": {
    type: "Katakana",
    japanese: "ワ",
    alphabet: "wa",
  },
  "154": {
    type: "Katakana",
    japanese: "ヰ",
    alphabet: "i",
  },
  "155": {
    type: "Katakana",
    japanese: "ヱ",
    alphabet: "e",
  },
  "156": {
    type: "Katakana",
    japanese: "ヲ",
    alphabet: "o",
  },
  "157": {
    type: "Katakana",
    japanese: "ン",
    alphabet: "n",
  },
  "158": {
    type: "Katakana",
    japanese: "ガ",
    alphabet: "ga",
  },
  "159": {
    type: "Katakana",
    japanese: "ギ",
    alphabet: "gi",
  },
  "160": {
    type: "Katakana",
    japanese: "グ",
    alphabet: "gu",
  },
  "161": {
    type: "Katakana",
    japanese: "ゲ",
    alphabet: "ge",
  },
  "162": {
    type: "Katakana",
    japanese: "ゴ",
    alphabet: "go",
  },
  "163": {
    type: "Katakana",
    japanese: "ザ",
    alphabet: "za",
  },
  "164": {
    type: "Katakana",
    japanese: "ジ",
    alphabet: "ji",
  },
  "165": {
    type: "Katakana",
    japanese: "ズ",
    alphabet: "zu",
  },
  "166": {
    type: "Katakana",
    japanese: "ゼ",
    alphabet: "ze",
  },
  "167": {
    type: "Katakana",
    japanese: "ゾ",
    alphabet: "zo",
  },
  "168": {
    type: "Katakana",
    japanese: "ダ",
    alphabet: "d",
  },
  "169": {
    type: "Katakana",
    japanese: "ヂ",
    alphabet: "ji",
  },
  "170": {
    type: "Katakana",
    japanese: "ヅ",
    alphabet: "zu",
  },
  "171": {
    type: "Katakana",
    japanese: "デ",
    alphabet: "de",
  },
  "172": {
    type: "Katakana",
    japanese: "ド",
    alphabet: "do",
  },
  "173": {
    type: "Katakana",
    japanese: "バ",
    alphabet: "ba",
  },
  "174": {
    type: "Katakana",
    japanese: "ビ",
    alphabet: "bi",
  },
  "175": {
    type: "Katakana",
    japanese: "ブ",
    alphabet: "bu",
  },
  "176": {
    type: "Katakana",
    japanese: "ベ",
    alphabet: "be",
  },
  "177": {
    type: "Katakana",
    japanese: "ボ",
    alphabet: "bo",
  },
  "178": {
    type: "Katakana",
    japanese: "パ",
    alphabet: "pa",
  },
  "179": {
    type: "Katakana",
    japanese: "ピ",
    alphabet: "pi",
  },
  "180": {
    type: "Katakana",
    japanese: "プ",
    alphabet: "pu",
  },
  "181": {
    type: "Katakana",
    japanese: "ペ",
    alphabet: "pe",
  },
  "182": {
    type: "Katakana",
    japanese: "ポ",
    alphabet: "po",
  },
  "183": {
    type: "Katakana",
    japanese: "キャ",
    alphabet: "kya",
  },
  "184": {
    type: "Katakana",
    japanese: "キュ",
    alphabet: "kyu",
  },
  "185": {
    type: "Katakana",
    japanese: "キョ",
    alphabet: "kyo",
  },
  "186": {
    type: "Katakana",
    japanese: "シャ",
    alphabet: "sha",
  },
  "187": {
    type: "Katakana",
    japanese: "シュ",
    alphabet: "shu",
  },
  "188": {
    type: "Katakana",
    japanese: "ショ",
    alphabet: "sho",
  },
  "189": {
    type: "Katakana",
    japanese: "チャ",
    alphabet: "cha",
  },
  "190": {
    type: "Katakana",
    japanese: "チュ",
    alphabet: "chu",
  },
  "191": {
    type: "Katakana",
    japanese: "チョ",
    alphabet: "cho",
  },
  "192": {
    type: "Katakana",
    japanese: "ニャ",
    alphabet: "nya",
  },
  "193": {
    type: "Katakana",
    japanese: "ニュ",
    alphabet: "nyu",
  },
  "194": {
    type: "Katakana",
    japanese: "ニョ",
    alphabet: "nyo",
  },
  "195": {
    type: "Katakana",
    japanese: "ヒャ",
    alphabet: "hya",
  },
  "196": {
    type: "Katakana",
    japanese: "ヒュ",
    alphabet: "hyu",
  },
  "197": {
    type: "Katakana",
    japanese: "ヒョ",
    alphabet: "hyo",
  },
  "198": {
    type: "Katakana",
    japanese: "ミャ",
    alphabet: "mya",
  },
  "199": {
    type: "Katakana",
    japanese: "ミュ",
    alphabet: "myu",
  },
  "200": {
    type: "Katakana",
    japanese: "ミョ",
    alphabet: "myo",
  },
  "201": {
    type: "Katakana",
    japanese: "リャ",
    alphabet: "rya",
  },
  "202": {
    type: "Katakana",
    japanese: "リュ",
    alphabet: "ryu",
  },
  "203": {
    type: "Katakana",
    japanese: "リョ",
    alphabet: "ryo",
  },
  "204": {
    type: "Katakana",
    japanese: "ギャ",
    alphabet: "gya",
  },
  "205": {
    type: "Katakana",
    japanese: "ギュ",
    alphabet: "gyu",
  },
  "206": {
    type: "Katakana",
    japanese: "ギョ",
    alphabet: "gyo",
  },
  "207": {
    type: "Katakana",
    japanese: "ジャ",
    alphabet: "ja",
  },
  "208": {
    type: "Katakana",
    japanese: "ジュ",
    alphabet: "ju",
  },
  "209": {
    type: "Katakana",
    japanese: "ジョ",
    alphabet: "jo",
  },
  "210": {
    type: "Katakana",
    japanese: "ヂャ",
    alphabet: "ja",
  },
  "211": {
    type: "Katakana",
    japanese: "ヂュ",
    alphabet: "ju",
  },
  "212": {
    type: "Katakana",
    japanese: "ヂョ",
    alphabet: "jo",
  },
  "213": {
    type: "Katakana",
    japanese: "ビャ",
    alphabet: "bya",
  },
  "214": {
    type: "Katakana",
    japanese: "ビュ",
    alphabet: "byu",
  },
  "215": {
    type: "Katakana",
    japanese: "ビョ",
    alphabet: "byo",
  },
  "216": {
    type: "Katakana",
    japanese: "ピャ",
    alphabet: "pya",
  },
  "217": {
    type: "Katakana",
    japanese: "ピュ",
    alphabet: "pyu",
  },
  "218": {
    type: "Katakana",
    japanese: "ピョ",
    alphabet: "pyo",
  },
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
  const [isAnimating, setIsAnimating] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const allCards = Object.values(flashCardsData);
    setCards(allCards);
  }, []);

  useEffect(() => {
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
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cards.length);
      resetCardState();
      setIsAnimating(false);
    }, 300);
  };

  const handlePreviousCard = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentCardIndex(
        (prevIndex) => (prevIndex - 1 + cards.length) % cards.length
      );
      resetCardState();
      setIsAnimating(false);
    }, 300);
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
    const threshold = 50;

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
          className="rounded-full px-6 py-2 text-lg font-semibold"
        >
          Hiragana
        </Button>
        <Button
          variant={selectedType === "katakana" ? "default" : "outline"}
          onClick={() => setSelectedType("katakana")}
          className="rounded-full px-6 py-2 text-lg font-semibold"
        >
          Katakana
        </Button>
      </div>
      <div className="relative w-full max-w-sm flex-grow flex flex-col justify-center perspective-1000">
        <div
          className={`relative w-full h-[70vh] transition-transform duration-300 transform-style-3d ${
            isAnimating
              ? isFlipped
                ? "translate-y-full"
                : "-translate-y-full"
              : ""
          }`}
        >
          <Card
            ref={cardRef}
            className={`absolute w-full h-full flex flex-col items-center justify-between p-4 text-8xl font-bold cursor-pointer transition-all duration-500 backface-hidden rounded-3xl ${
              isFlipped ? "rotate-y-180" : ""
            } ${
              cardState === "correct"
                ? "bg-green-100"
                : cardState === "incorrect"
                ? "bg-red-100"
                : "bg-white"
            }`}
            onClick={handleCardClick}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                handlePreviousCard();
              }}
              className="self-center rounded-full"
            >
              <ChevronUp className="h-6 w-6" />
            </Button>
            <div className="flex-grow flex items-center justify-center">
              {currentCard.japanese}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                handleNextCard();
              }}
              className="self-center rounded-full"
            >
              <ChevronDown className="h-6 w-6" />
            </Button>
          </Card>
          <Card
            className={`absolute w-full h-full flex flex-col items-center justify-between p-4 text-8xl font-bold cursor-pointer transition-all duration-500 backface-hidden rotate-y-180 rounded-3xl ${
              cardState === "correct"
                ? "bg-green-100"
                : cardState === "incorrect"
                ? "bg-red-100"
                : "bg-white"
            }`}
            onClick={handleCardClick}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                handlePreviousCard();
              }}
              className="self-center rounded-full"
            >
              <ChevronUp className="h-6 w-6" />
            </Button>
            <div className="flex-grow flex items-center justify-center rotate-y-180">
              {currentCard.alphabet}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                handleNextCard();
              }}
              className="self-center rounded-full"
            >
              <ChevronDown className="h-6 w-6" />
            </Button>
          </Card>
        </div>
      </div>
      <div className="w-full max-w-sm mt-4">
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Enter alphabet"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="flex-grow rounded-full text-lg px-6 py-3"
          />
          <Button
            onClick={handleCheck}
            size="icon"
            className="rounded-full w-12 h-12 p-0 flex items-center justify-center"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}
