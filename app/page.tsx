'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronRight, ChevronUp, ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

interface FlashCard {
  type: 'hiragana' | 'katakana'
  japanese: string
  alphabet: string
}

const flashCardsData: Record<string, FlashCard> = {
  '1': { type: 'hiragana', japanese: 'あ', alphabet: 'a' },
  '2': { type: 'hiragana', japanese: 'い', alphabet: 'i' },
  '3': { type: 'katakana', japanese: 'ア', alphabet: 'a' },
  '4': { type: 'katakana', japanese: 'イ', alphabet: 'i' },
}

export default function Component() {
  const [cards, setCards] = useState<FlashCard[]>([])
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [userInput, setUserInput] = useState('')
  const [cardState, setCardState] = useState<'default' | 'correct' | 'incorrect'>('default')
  const [selectedType, setSelectedType] = useState<'hiragana' | 'katakana'>('hiragana')
  const [isAnimating, setIsAnimating] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const allCards = Object.values(flashCardsData)
    setCards(allCards)
  }, [])

  useEffect(() => {
    const filteredCards = Object.values(flashCardsData).filter(card => card.type === selectedType)
    setCards(filteredCards)
    setCurrentCardIndex(0)
    resetCardState()
  }, [selectedType])

  const handleCheck = () => {
    if (userInput.toLowerCase() === cards[currentCardIndex].alphabet.toLowerCase()) {
      setCardState('correct')
    } else {
      setCardState('incorrect')
    }
    setIsFlipped(true)
  }

  const handleCardClick = () => {
    setIsFlipped(!isFlipped)
    if (isFlipped) {
      setCardState('default')
      setUserInput('')
    }
  }

  const handleNextCard = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cards.length)
      resetCardState()
      setIsAnimating(false)
    }, 300)
  }

  const handlePreviousCard = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentCardIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length)
      resetCardState()
      setIsAnimating(false)
    }, 300)
  }

  const resetCardState = () => {
    setIsFlipped(false)
    setCardState('default')
    setUserInput('')
  }

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    let startY: number
    const threshold = 50

    const touchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY
    }

    const touchEnd = (e: TouchEvent) => {
      const endY = e.changedTouches[0].clientY
      const diffY = startY - endY

      if (diffY > threshold) {
        handleNextCard()
      } else if (diffY < -threshold) {
        handlePreviousCard()
      }
    }

    card.addEventListener('touchstart', touchStart)
    card.addEventListener('touchend', touchEnd)

    return () => {
      card.removeEventListener('touchstart', touchStart)
      card.removeEventListener('touchend', touchEnd)
    }
  }, [])

  if (cards.length === 0) return <div>Loading...</div>

  const currentCard = cards[currentCardIndex]

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-4 bg-gray-100">
      <div className="w-full flex justify-center space-x-4 mb-4">
        <Button
          variant={selectedType === 'hiragana' ? 'default' : 'outline'}
          onClick={() => setSelectedType('hiragana')}
          className="rounded-full px-6 py-2 text-lg font-semibold"
        >
          Hiragana
        </Button>
        <Button
          variant={selectedType === 'katakana' ? 'default' : 'outline'}
          onClick={() => setSelectedType('katakana')}
          className="rounded-full px-6 py-2 text-lg font-semibold"
        >
          Katakana
        </Button>
      </div>
      <div className="relative w-full max-w-sm flex-grow flex flex-col justify-center perspective-1000">
        <div
          className={`relative w-full h-[70vh] transition-transform duration-300 transform-style-3d ${
            isAnimating ? (isFlipped ? 'translate-y-full' : '-translate-y-full') : ''
          }`}
        >
          <Card
            ref={cardRef}
            className={`absolute w-full h-full flex flex-col items-center justify-between p-4 text-8xl font-bold cursor-pointer transition-all duration-500 backface-hidden rounded-3xl ${
              isFlipped ? 'rotate-y-180' : ''
            } ${
              cardState === 'correct'
                ? 'bg-green-100'
                : cardState === 'incorrect'
                ? 'bg-red-100'
                : 'bg-white'
            }`}
            onClick={handleCardClick}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => { e.stopPropagation(); handlePreviousCard(); }}
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
              onClick={(e) => { e.stopPropagation(); handleNextCard(); }}
              className="self-center rounded-full"
            >
              <ChevronDown className="h-6 w-6" />
            </Button>
          </Card>
          <Card
            className={`absolute w-full h-full flex flex-col items-center justify-between p-4 text-8xl font-bold cursor-pointer transition-all duration-500 backface-hidden rotate-y-180 rounded-3xl ${
              cardState === 'correct'
                ? 'bg-green-100'
                : cardState === 'incorrect'
                ? 'bg-red-100'
                : 'bg-white'
            }`}
            onClick={handleCardClick}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => { e.stopPropagation(); handlePreviousCard(); }}
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
              onClick={(e) => { e.stopPropagation(); handleNextCard(); }}
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
          <Button onClick={handleCheck} size="icon" className="rounded-full w-12 h-12 p-0 flex items-center justify-center">
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  )
}