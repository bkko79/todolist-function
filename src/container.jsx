import React, { useState, useCallback } from 'react'
import Card from './Card'
import Form from './form'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { DndProvider } from 'react-dnd'
import TouchBackend from 'react-dnd-touch-backend'
import update from 'immutability-helper'

const backendOptions = {
  enableMouseEvents: true,
}

const Container = () => {
  const [input, setInput] = useState("")
  const [cards, setCards] = useState([
    {id: 0, text: 'hello', checked: false, timer: false, message: ''},
    {id: 1, text: 'react', checked: true, timer: false, message: ''},
    {id: 2, text: 'Nintendo', checked: false, timer: false, message: ''}
  ])
  const [idx, setIdx] = useState(cards.length+1)
  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = cards[dragIndex]
      setCards(
        update(cards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        }),
      )
    },
    [cards],
  )
  const renderCard = (card, index) => {
    return (
      <CSSTransition key={card.id} timeout={300} classNames="item">
      <Card
        key={card.id}
        index={index}
        id={card.id}
        text={card.text}
        checked={card.checked}
        timer={card.timer}
        message={card.message}
        moveCard={moveCard}
        onRemove={handleRemove}
        onToggle={handleToggle}
        onChangeTime={(id, date) => handleTime(id, date) }
        onDeleteTime={(id) => handleDeleteTime(id) }
      />
      </CSSTransition>
    )
  }

  const handleKeyPress = (e) => {
    if(e.key === 'Enter') {
      this.handleCreate();
    }
  }

  const handleChange = (e) => {
    setInput(e.target.value);
  }

  const handleCreate = () => {
    if (input !== ''){
      setCards(
        update( cards, {
          $push: [{
            id: idx,
            text: input,
            checked: false,
            timer: false,
            message: '',
          }]
        })
      )
      setIdx( idx + 1 )
    }
  }

  const handleRemove = (id) => {
    setCards( cards.filter((t) => t.id !== id))
    setIdx( idx - 1 )
  }

  const handleToggle = (id) => {
    const idx = cards.findIndex( card => card.id === id)
    const selected = cards[idx];
    setCards(
      update( cards, {
        [idx]: {
          checked: {$set : !selected.checked}
        }
      })
    )
  }

  const handleTime = (id, date) => {
    const idx = cards.findIndex( card => card.id === id)
    setCards(
      update( cards, {
        [idx]: {
          timer: {$set : date}
        }
      })
    )
  }

  const handleDeleteTime = (id) => {
    const idx = cards.findIndex( card => card.id === id)
    setCards(
      update( cards, {
        [idx]: {
          timer: {$set : false}
        }
      })
    )
  }

  return (
    <>
    <section className="form-wrapper">
      <Form 
        value={input}
        onKeyPress={handleKeyPress}
        onChange={handleChange}
        onCreate={handleCreate} />
    </section>
    <section className="todos-wrapper">
        <DndProvider backend={TouchBackend} options={backendOptions}>
          <TransitionGroup className="todo-list">
          {cards.map((card, i) => renderCard(card, i))}
          </TransitionGroup>
        </DndProvider>
    </section>
    </>
  )
}
export default Container
