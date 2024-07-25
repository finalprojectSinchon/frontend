import React, { useState, useCallback, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import api from "src/store/apps/airplane/api.js";

// Utility function to convert user data into draggable items
const getItems = (users) => users.map(user => ({
    userCode: user.userCode.toString(),
    userName: user.username,
    userImg: user.userImg,
}));

// Reorder items within the same list
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

// Move items between lists
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);
    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const grid = 5;
const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    background: isDragging ? 'lightgreen' : 'white',
    ...draggableStyle,
    display: 'flex',
    alignItems: 'center',
    borderRadius: '10px'
});

const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    width: 250,
    height: 237,
    overflowY: 'auto',
    borderRadius: '10px'
});

// Function to perform API request
const sendApiRequest = async (AllUser, Manager, airportCode, airportType) => {

    const managerUpdateDTOList = Manager.map(user => ({
        userCode: user.userCode,
        airportType: airportType,
        airportCode: airportCode,
    }));

    api.put('/api/v1/managers',managerUpdateDTOList)
        .then(res => res.data)
        .catch(err => {
            alert('담당 직원은 비어있을 수 없습니다.')
            window.location.reload();
        })
};

const ManagerDragAndDrop = ({ AllUser = [], Manager = [], airportCode, airportType }) => {
    const [state, setState] = useState({
        admins: getItems(AllUser),
        selectedAdmins: getItems(Manager),
    });


    useEffect(() => {
        setState({
            admins: getItems(AllUser),
            selectedAdmins: getItems(Manager),
        });
    }, [AllUser, Manager]);

    const onDragEnd = useCallback((result) => {
        const { source, destination } = result;

        // If dropped outside the list
        if (!destination) {
            return;
        }

        let updatedState;
        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                state[source.droppableId],
                source.index,
                destination.index
            );
            updatedState = {
                ...state,
                [source.droppableId]: items,
            };
        } else {
            const result = move(
                state[source.droppableId],
                state[destination.droppableId],
                source,
                destination
            );
            updatedState = {
                admins: result.admins,
                selectedAdmins: result.selectedAdmins,
            };
        }

        // Update state
        setState(updatedState);

        // Send API request with the new state
        sendApiRequest(updatedState.admins, updatedState.selectedAdmins, airportCode, airportType);
    }, [state]);

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Droppable droppableId="admins">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                        >
                            {state.admins.map((item, index) => (
                                <Draggable key={item.userCode} draggableId={item.userCode} index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                                        >
                                            <img src={item.userImg} alt={item.userName} width="50" className="rounded-circle me-4"/>
                                            {item.userName}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>

                <Droppable droppableId="selectedAdmins">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                        >
                            {state.selectedAdmins.map((item, index) => (
                                <Draggable key={item.userCode} draggableId={item.userCode} index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                                        >
                                            <img src={item.userImg} alt={item.userName} width="50" className="rounded-circle me-4"/>
                                            <div>{item.userName}</div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        </DragDropContext>
    );
};

export default ManagerDragAndDrop;
