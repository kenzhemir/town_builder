import Game from "./Components/Game";
import Lobby from "./Components/Lobby";
import Layout from "./layout";

/**
 * @type import("react-router").RouteObject[]
 */
export const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Lobby />,
      },
      {
        path: "game/:gameId",
        element: <Game />,
      },
    ],
  },
];
