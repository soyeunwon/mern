import React from "react";
import PlaceList from "../components/PlaceList";
import { useParams } from "react-router-dom";

export const DUMMY_PLACES = [
  {
    id: "p1",
    title: "서울 시청",
    description: "설명입니다",
    imageUrl:
      "https://img.freepik.com/free-vector/weather-icons-collection_1167-124.jpg?size=626&ext=jpg",
    address: "서울 시청 주소~",
    location: { lat: 37.5665, lng: 126.978 },
    creator: "u1",
  },
  {
    id: "p2",
    title: "용산구청",
    description: "설명입니다",
    imageUrl:
      "https://img.freepik.com/free-vector/weather-icons-collection_1167-124.jpg?size=626&ext=jpg",
    address: "용산구청주소~",
    location: { lat: 37.5311, lng: 126.9815 },
    creator: "u2",
  },
];

const UserPlaces = () => {
  const { userId } = useParams();
  const loadedPlaces = DUMMY_PLACES.filter((place) => place.creator === userId);

  return <PlaceList items={loadedPlaces} />;
};

export default UserPlaces;
