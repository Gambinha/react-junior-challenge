import './style.css';

type MenuBarProps = {
    menuTitle: string;
}

const MenuBar: React.FC<MenuBarProps> = (props) => {

    return (
        <div className="menu-container">
            <h1> {props.menuTitle} </h1>
        </div>
    );
}

export default MenuBar;