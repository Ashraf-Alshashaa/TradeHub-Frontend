import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { fetchUser } from "../../features/users/userSlice";
import EditProfile from "../../modals/Edit-profile";
import ProfileTab from "./Tab";
import Avatar, { genConfig } from "react-nice-avatar";
import ChangePassword from "../../modals/Change-password";
import ErrorComponent from "../../components/error/Error";
import NotificationWS from "../../components/notification/NotificationContainer";

const UserProfile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    user: authUser,
    loading,
    error,
  } = useSelector((state: RootState) => state.auth);
  const { user } = useSelector((state: RootState) => state.users);
  const { address } = useSelector((state: RootState) => state.addresses);

  useEffect(() => {
    if (authUser?.user_id) {
      dispatch(fetchUser(authUser.user_id));
    }
  }, [dispatch, address, authUser]);

  const config = user ? genConfig(user.username) : genConfig("default");
  if (loading || !user) return <h1 className="m-4">Loading...</h1>;
  if (error || !authUser) return <ErrorComponent msg={error?.detail || 'Please Login.'} />;

  const localStorageUser = localStorage.getItem("user");
  const user_id = localStorageUser
    ? JSON.parse(localStorageUser).user_id
    : null;

  return (
    <div className="UserProfile">
      <NotificationWS user_id={user_id} />
      <div className="row py-5  w-100">
        <div className="col-3 pt-5 px-5 ml-5">
          <Avatar
            style={{ width: "13rem", height: "10rem" }}
            shape="rounded"
            {...config}
          />
        </div>
        <div className="col-5 pt-5 text-start">
          <div className="row">
            <p>
              {" "}
              <strong>Username:</strong> {user?.username || "Loading..."}{" "}
            </p>
          </div>
          <div className="row">
            <p>
              {" "}
              <strong>Email: </strong>
              {user?.email || "Loading..."}{" "}
            </p>
          </div>
          {user?.address ? (
            <div className="row">
              <p>
                <strong> Address: </strong> <br />
                {user.address.street_name}&nbsp;&nbsp;
                {user.address.house_number}, &nbsp;&nbsp;
                {user.address.postcode}, &nbsp;&nbsp;
                {user.address.city}, &nbsp;&nbsp;
                {user.address.country}
              </p>
            </div>
          ) : (
            <div className="row">
              <p style={{ color: "red" }}>
                {" "}
                No address provided. Please add an address in "Edit Profile".
              </p>
            </div>
          )}
        </div>
        <div className="col-2 pt-5">
          <div className="row py-2">
            <EditProfile />
          </div>
          <div className="row py-2">
            <ChangePassword />
          </div>
        </div>
      </div>
      <div className="row my-5 w-100">
        <div className="col-8">
          <ProfileTab />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
