import React, { useReducer } from "react";

import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import MouseFollower from "./Components/MouseFollower";
import {
  PickContext,
  PickDispatchContext,
  pickReducer,
  useRightClickReset,
} from "./contexts/PickContext";
import { routes } from "./routes";
import "./styles/app.scss";

const router = createBrowserRouter(routes);

function App() {
  const [pickedItem, pickDispatch] = useReducer(pickReducer, null);

  const MouseFollowerComponent = pickedItem?.Component;
  useRightClickReset(pickDispatch);

  return (
    <PickContext.Provider value={pickedItem}>
      <PickDispatchContext.Provider value={pickDispatch}>
        {MouseFollowerComponent ? (
          <MouseFollower boundsRef={pickedItem.boundsRef}>
            <MouseFollowerComponent />
          </MouseFollower>
        ) : null}
        <RouterProvider router={router} />
      </PickDispatchContext.Provider>
    </PickContext.Provider>
  );
}

export default App;
