import React from "react";
import "./PlaceList.css";
import Card from "../../shared/components/UIElement/Card";
import PlaceItem from "./PlaceItem";

const PlaceList = (props) => {
  if (!props.items.length)
    return (
      <div className="place-list center">
        <Card>
          <h2>장소를 찾을 수 없습니다. 추가하시겠습니까?</h2>
          <button>Share Place</button>
        </Card>
      </div>
    );

  return (
    <ul className="place-list">
      {props.items.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.imageUrl}
          title={place.title}
          description={place.description}
          address={place.address}
          creatorId={place.creator}
          coordinates={place.location}
        />
      ))}
    </ul>
  );
};

export default PlaceList;
