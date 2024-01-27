import React, { useContext, useState } from "react";
import "./PlaceItem.css";
import Card from "../../shared/components/UIElement/Card";
import Button from "../../shared/components/Form/Button";
import Modal from "../../shared/components/UIElement/Modal";
import Map from "../../shared/components/UIElement/Map";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElement/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElement/LoadingSpinner";

const PlaceItem = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const showMapHandler = () => {
    setShowMap(!showMap);
  };

  const showConfirmModalHandler = () => {
    setShowConfirmModal(!showConfirmModal);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `http://localhost:5050/api/places/${props.id}`,
        "DELETE",
        null,
        { Authorization: `Bearer ${auth.token}` }
      );
      props.onDelete(props.id);
    } catch (err) {}
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showMap}
        onCancel={showMapHandler}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={showMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <Map center={props.coordinates} zoom={16} />
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={showConfirmModalHandler}
        footerClass="place-item__modal-actions"
        footer={
          <>
            <Button inverse onClick={showConfirmModalHandler}>
              취소
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              삭제
            </Button>
          </>
        }
      >
        <p>삭제하시겠습니까?</p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="place-item__image">
            <img
              src={`http://localhost:5050/${props.image}`}
              alt={props.title}
            />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={showMapHandler}>
              지도보기
            </Button>
            {auth.userId === props.creatorId && (
              <>
                <Button to={`/places/${props.id}`}>수정</Button>
                <Button danger onClick={showConfirmModalHandler}>
                  삭제
                </Button>
              </>
            )}
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;
