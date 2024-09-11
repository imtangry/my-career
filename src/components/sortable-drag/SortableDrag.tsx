import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  useSortable
} from '@dnd-kit/sortable'
import {CSS} from '@dnd-kit/utilities'
import React, {useState} from 'react'

const SortableItem = ({id}: any) => {
  const {attributes, listeners, setNodeRef, transform, transition} =
    useSortable({id})
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: '16px',
    border: '1px solid #ccc',
    marginBottom: '8px',
    backgroundColor: '#f9f9f9'
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {id}
    </div>
  )
}

const SortableList = () => {
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3'])

  const sensors = useSensors(useSensor(PointerSensor))

  const handleDragEnd = (event: DragEndEvent) => {
    const {active, over} = event
    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id as string)
        const newIndex = items.indexOf(over.id as string)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items}
        strategy={rectSortingStrategy}
      >
        {items.map((id) => (
          <SortableItem
            key={id}
            id={id}
          />
        ))}
      </SortableContext>
    </DndContext>
  )
}

export default SortableList
