import ListOfPlayers from "./ListOfPlayers";
import IndianPlayers from "./IndianPlayers";

function App() {

    const flag = true;

    if (flag) {
        return (
            <div>
                <ListOfPlayers />
            </div>
        );
    }
    else {
        return (
            <div>
                <IndianPlayers />
            </div>
        );
    }

}

export default App;