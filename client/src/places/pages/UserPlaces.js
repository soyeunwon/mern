import React, { useEffect, useState } from "react";
import PlaceList from "../components/PlaceList";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElement/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElement/LoadingSpinner";

const UserPlaces = () => {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const { userId } = useParams();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5050/api/places/user/${userId}`
        );

        setLoadedPlaces(responseData.places);
      } catch (err) {}
    };
    fetchPlaces();
  }, [sendRequest, userId]);

  const placeDeletedHandler = (deletedPlaceId) => {
    setLoadedPlaces((prevPlaces) =>
      prevPlaces.filter((place) => place.id !== deletedPlaceId)
    );
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      <PlaceList items={loadedPlaces} onDeletePlace={placeDeletedHandler} />
    </>
  );
};

export default UserPlaces;
