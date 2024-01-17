import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";


const Header = () => {

    // Selector
    const username = useAppSelector((state: RootState) => state.UserReducer.username);

    return (
        <div className="header">
            <h1>TODO</h1>
            <h2 className="header_subtitle">{username}'s Todo List</h2> 
        </div>
    );
};

export default Header;
