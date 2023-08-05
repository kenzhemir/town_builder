/**
 * 1. Player 1 selects color
 * 2. Both do placements
 * 3. Player 2 selects color
 * 4. Both do placements
 * 5. Player 1
 */

const players = [{ name: "Player 1" }, { name: "Player 2" }];

export default async function gameloop(
  display,
  getColorChoice,
  requestPlacement
) {
  let activePlayers = structuredClone(players);
  let end = false;
  let currentTurn = 1;
  let currentPlayer = 0;
  while (!end) {
    display(
      `[Turn ${currentTurn}]: ${activePlayers[currentPlayer].name} choose the resource color`
    );
    const selectedResource = await getColorChoice(currentPlayer);
    display(
      `[Turn ${currentTurn}]: Use ${selectedResource?.displayName} on your construction sites!`
    );
    const boardStatuses = await Promise.all(
      activePlayers.map((_, i) => requestPlacement(i, selectedResource))
    );
        console.log(boardStatuses)
    display(
        `[Turn ${currentTurn}]: Moving to the next turn`
      );
    activePlayers = activePlayers.filter((_, i) => !boardStatuses?.isFinished);
    end = activePlayers.length <= 0;
    currentPlayer = (currentPlayer + 1) % activePlayers.length;
    currentTurn++;
  }
  
  display(
    `Game ended`
  );
}
