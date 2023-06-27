import React from "react";
import TaskBoard from "../components/Boards/TaskBoard";
import Navbar from "../components/Navbar";
import { Navigate } from "react-router";
import { useSelector } from "react-redux";

function Tasks() {
  const isLogged = useSelector((state) => state.token.value) !== "";

  return (
    <>
      {!isLogged ? (
        <Navigate to="/login" replace={true} />
      ) : (
        <div>
          <Navbar></Navbar>
          <TaskBoard></TaskBoard>
        </div>
      )}
    </>
  );
}

export default Tasks;
