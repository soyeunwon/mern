import React from "react";
import "./PlaceList.css";
import Card from "../../shared/components/UIElement/Card";
import PlaceItem from "./PlaceItem";
import Button from "../../shared/components/Form/Button";

const PlaceList = (props) => {
  if (!props.items.length)
    return (
      <div className="place-list center">
        <Card>
          <h2>장소를 찾을 수 없습니다. 추가하시겠습니까?</h2>
          <Button to="/places/new">추가</Button>
        </Card>
      </div>
    );

  return (
    <ul className="place-list">
      {props.items.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.image}
          title={place.title}
          description={place.description}
          address={place.address}
          creatorId={place.creator}
          coordinates={place.location}
          onDelete={props.onDeletePlace}
        />
      ))}
    </ul>
  );
};

export default PlaceList;
