import React from "react";
import UsersList from "../components/UsersList";

const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "SoyeonWon",
      image:
        "https://img.freepik.com/free-vector/weather-icons-collection_1167-124.jpg?size=626&ext=jpg",
      places: 3,
    },
  ];

  return <UsersList items={USERS} />;
};

export default Users;
