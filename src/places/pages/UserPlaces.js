import React from "react";
import PlaceList from "../components/PlaceList";
import { useParams } from "react-router-dom";

export const DUMMY_PLACES = [
  {
    id: "p1",
    title: "강남빌딩",
    description: "설명입니다",
    imageUrl:
      "https://img.freepik.com/free-vector/weather-icons-collection_1167-124.jpg?size=626&ext=jpg",
    address: "1가",
    location: { lat: 40.123, lng: -73 },
    creator: "u1",
  },
  {
    id: "p2",
    title: "강남빌딩2",
    description: "설명입니다",
    imageUrl:
      "https://img.freepik.com/free-vector/weather-icons-collection_1167-124.jpg?size=626&ext=jpg",
    address: "1가",
    location: { lat: 40.123, lng: -73 },
    creator: "u2",
  },
];

const UserPlaces = () => {
  const { userId } = useParams();
  const loadedPlaces = DUMMY_PLACES.filter((place) => place.creator === userId);

  return <PlaceList items={loadedPlaces} />;
};

export default UserPlaces;
