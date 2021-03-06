import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import PageGrid from "../../shared/UI/PageGrid";
import Profile from "../components/Profile";
import UpdateProfile from "../components/UpdateProfile";
import WarningModal from "../../shared/UI/WarningModal";
import { AuthContext } from "../../shared/context/AuthContext";
import ErrorBar from "../../shared/UI/ErrorBar";
import LoadingSpinner from "../../shared/UI/LoadingSpinner";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const ProfilePage = () => {
  const classes = useStyles();
  const { userId, token } = useContext(AuthContext);

  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadedProfile, setLoadedProfile] = useState();
  const history = useHistory();

  const clearError = () => {
    setError(null);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  useEffect(() => {
    const doFetch = async () => {
      setError(null);
      setIsLoading(true);
      try {
        const response = await fetch(
          process.env.REACT_APP_SERVER_URL + `/profiles/${id}`,
        );
        console.log(id, "profileId");
        console.log(response);
        // console.log("user", userId);
        const resJson = await response.json();
        if (!response.ok) {
          throw new Error(resJson.message);
        }
        // console.log(resJson);

        setLoadedProfile(resJson.data);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError(err.message);
      }
    };
    doFetch();
  }, [id]);

  const [viewMode, setViewMode] = useState(true);

  const handleUpdate = () => {
    setViewMode(false);
  };
  const cancelHandler = () => {
    setViewMode(true);
  };

  const viewHandler = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await fetch(
        process.env.REACT_APP_SERVER_URL + `/profiles/${id}`,
      );
      console.log(id, "profileId");
      console.log(response);
      // console.log("user", userId);
      const resJson = await response.json();
      if (!response.ok) {
        throw new Error(resJson.message);
      }
      // console.log(resJson);

      setLoadedProfile(resJson.data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
    setViewMode(true);
  };
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const showWarningHandler = () => {
    setShowConfirmModal(true);
  };
  const confirmDeleteHandler = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_SERVER_URL + `/api/profiles/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          method: "DELETE",
        },
      );

      // console.log(response);

      history.push(`/users/${userId}/profiles`);
      if (!response.ok) {
        throw new Error(response.message || response.statusText);
      }
    } catch (err) {
      console.log(err);

      setError(err.message);
    }
  };

  return (
    <PageGrid>
      {isLoading && <LoadingSpinner />}
      <ErrorBar error={error} errorMessage={error} onClear={clearError} />
      {viewMode ? (
        <React.Fragment>
          <WarningModal
            open={showConfirmModal}
            onClose={cancelDeleteHandler}
            header="Are you sure?"
            footer={
              <React.Fragment>
                <Button
                  variant="outlined"
                  onClick={cancelDeleteHandler}
                  className={classes.button}
                >
                  Cancel
                </Button>
                <Button
                  className={classes.button}
                  variant="contained"
                  color="secondary"
                  onClick={confirmDeleteHandler}
                >
                  Delete
                </Button>
              </React.Fragment>
            }
          />
          {!isLoading && loadedProfile && (
            <Profile
              profile={loadedProfile}
              profileId={id}
              setError={setError}
            />
          )}
        </React.Fragment>
      ) : (
        <UpdateProfile
          profile={loadedProfile}
          cancelHandler={cancelHandler}
          viewHandler={viewHandler}
        />
      )}

      {loadedProfile && loadedProfile.agent === userId && viewMode && (
        <div className="profile-item__actions">
          <Button
            className={classes.button}
            onClick={handleUpdate}
            variant="outlined"
          >
            Edit
          </Button>
          <Button className={classes.button} onClick={showWarningHandler}>
            Delete
          </Button>
        </div>
      )}
    </PageGrid>
  );
};

export default ProfilePage;
