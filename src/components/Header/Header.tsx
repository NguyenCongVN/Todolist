import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";

interface HeaderProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    }

const Header = ({setOpen}: HeaderProps) => {
  // Selector
  const username = useAppSelector(
    (state: RootState) => state.UserReducer.username
  );

  return (
    <div className="header">
      <h1>TODO</h1>
      <div className="header_sub_container">
        <h2 className="header_subtitle">{username}'s Todo List</h2>
        <button className="header_sub_button"
        onClick={() => {
            setOpen(true);
        }}>set name</button>
      </div>
    </div>
  );
};

export default Header;
