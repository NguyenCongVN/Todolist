import { useDispatch } from "react-redux";
import { Box } from "@mui/material";
import IconCross from "../../assets/iconCross.svg";
import { completeTodo } from "../../redux/todos";

export type TodoProps = {
    id: string;
    name: string;
    deleteHandler: () => {};
    index: number;
    completed: boolean;
};

const TodoItem = ({ id, name, deleteHandler, completed }: TodoProps) => {
    const dispatch = useDispatch();

    function completedHandler() {
        dispatch(completeTodo(id));
    }

    return (
        <div className="todo_item">
            <Box
                className="checkbox_container"
            >
                <button
                    onClick={completedHandler}
                    className={`${completed ? "checkbox-checked" : "checkbox"}`}
                ></button>
            </Box>
            <Box
                sx={{ flex: "1", padding: "10px" }}
                className={`${completed ? "todo_item--completed" : ""}`}
            >
                {name}
            </Box>
            <Box>
                <button className="todo_item--btn" onClick={deleteHandler}>
                    <img src={IconCross}></img>
                </button>
            </Box>
        </div>
    );
};

export default TodoItem;
