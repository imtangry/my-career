'use client'

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
import React, {useEffect, useState} from 'react'

export interface SortableItem {
  id: string
  content: string
  type: string
  title: string
}

const SortableItem = ({title}: {title: string}) => {
  const {attributes, listeners, setNodeRef, transform, transition} =
    useSortable({id: title})
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
      {title}
    </div>
  )
}

const SortableList = ({items = []}: {items: SortableItem[]}) => {
  const [list, setList] = useState<SortableItem[]>([])
  const sensors = useSensors(useSensor(PointerSensor))

  const handleDragEnd = (event: DragEndEvent) => {
    const {active, over} = event
    if (over && active.id !== over.id) {
      setList((items) => {
        const oldIndex = items.findIndex(
          (item) => item.id === (active.id as string)
        )
        const newIndex = items.findIndex(
          (item) => item.id === (over.id as string)
        )
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  useEffect(() => {
    setList(items)
  }, [])

  console.log('list', items)

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
        {list.map((item) => (
          <SortableItem
            key={item.id}
            title={item.title}
          />
        ))}
      </SortableContext>
    </DndContext>
  )
}

export default SortableList
