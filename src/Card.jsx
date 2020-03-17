import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import ItemTypes from './ItemTypes'
import Picker from './datepick';
import logo from './img/up-and-down.png' 

const Card = ({ id, text, checked, timer, message, index, moveCard, onRemove, onToggle, onChangeTime, onDeleteTime }) => {
  const ref = useRef(null)
  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }

      const hoverBoundingRect = ref.current.getBoundingClientRect()

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      const clientOffset = monitor.getClientOffset()

      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      moveCard(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CARD, id, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? 0.5 : 1
  const backgroundColor = isDragging ? '#ccc' : '#fff'

  drag(drop(ref))
  return (
    <div className="todo-wrap" style={{ opacity, backgroundColor }}>
    <div className="todo-item" >
      <div className="dragPointer" ref={ref} style={{opacity}}>
          <img className="dragLogo" src={logo} alt={"logo"}/>
      </div>
      <div className="remove" onClick={(e) => {
        e.stopPropagation();
        onRemove(id);
      }}>
        &times;
      </div>
      <div className={`todo-text ${checked && 'checked'}`}
        onClick={() => onToggle(id)}>
        {text}
      </div>
        {
            !checked && (<Picker id={id} onChangeTime={(id, date) => onChangeTime(id, date)} />)
        }
        {
            checked && (<div className="check-mark">✓</div>)
        }
        </div>
        {
            timer && !checked && (
                <div className="accept-time">
                    <div className="remove-time" onClick={(e) => {
                        e.stopPropagation();
                        onDeleteTime(id);
                    }}>
                        &times;
                    </div>
                    <div className="time-text">{timer}</div>
                </div>
            )
        }
    </div>
  )
}
export default Card
