import {
  DragDropContext,
  Draggable,
  Droppable,
  OnDragEndResponder,
  DraggableProvided,
  DroppableProvided,
  Direction,
} from "react-beautiful-dnd";

interface AppDraggableListProps<T> {
  droppableId: string;
  data: T[];
  onDragEnd: OnDragEndResponder;
  renderItem: (item: T, provided: DraggableProvided) => JSX.Element;
  direction?: Direction;
}

export const AppDraggableList = <T extends { id: string }>({
  droppableId,
  data,
  onDragEnd,
  renderItem,
  direction,
}: AppDraggableListProps<T>) => {
  
    const renderWrapper = (
    children: JSX.Element,
    providedMain: DroppableProvided
  ) => (
    <div
      ref={providedMain.innerRef}
      {...providedMain.droppableProps}
    >
      {children}
    </div>
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={droppableId} direction={direction}>
        {(providedMain) =>
          renderWrapper(
            <>
              {data.map((item, index) => (
                <Draggable
                  key={item.id}
                  index={index}
                  draggableId={item.id}
                >
                  {(provided) => renderItem(item, provided)}
                </Draggable>
              ))}

              {providedMain.placeholder}
            </>,
            providedMain
          )
        }
      </Droppable>
    </DragDropContext>
  );
};
