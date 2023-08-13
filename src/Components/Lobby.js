import { useNavigate } from "react-router-dom";

export default function Lobby() {
  const navigate = useNavigate();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const gameId = e.target.gameId.value;
        navigate(`/game/${gameId}`);
      }}
    >
      <input name="gameId" />
      <button>Go!</button>
    </form>
  );
}
