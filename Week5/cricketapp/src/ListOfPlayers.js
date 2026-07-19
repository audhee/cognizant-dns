import React from "react";

function ListOfPlayers() {

    const players = [
        { name: "Virat Kohli", score: 95 },
        { name: "Rohit Sharma", score: 88 },
        { name: "Shubman Gill", score: 72 },
        { name: "KL Rahul", score: 65 },
        { name: "Hardik Pandya", score: 78 },
        { name: "Ravindra Jadeja", score: 69 },
        { name: "Rishabh Pant", score: 82 },
        { name: "Jasprit Bumrah", score: 60 },
        { name: "Mohammed Shami", score: 75 },
        { name: "Kuldeep Yadav", score: 68 },
        { name: "Suryakumar Yadav", score: 91 }
    ];

    const lowScorePlayers = players.filter(
        player => player.score < 70
    );

    return (
        <div>
            <h2>List of Players</h2>

            <table border="1" cellPadding="8">
                <thead>
                    <tr>
                        <th>Player</th>
                        <th>Score</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        players.map((player, index) => (
                            <tr key={index}>
                                <td>{player.name}</td>
                                <td>{player.score}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <h2>Players with Score Below 70</h2>

            <ul>
                {
                    lowScorePlayers.map((player, index) => (
                        <li key={index}>
                            {player.name} - {player.score}
                        </li>
                    ))
                }
            </ul>

        </div>
    );
}

export default ListOfPlayers;