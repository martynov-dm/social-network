import React from "react";
import Preloader from "../../common/preloader/preloader";
import classes from "./ProfileInfo.module.css";
import ProfileStatus from "./ProfileStatus.jsx";

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader />;
  }

  return (
    <div>
      <div>
        {/* <img
          alt="cover"
          src="data:image/jpeg;base64,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"
        /> */}
        <div className={classes.descriptionBlock}>
          <img alt="avatar" src={props.profile.photos.large} />
          <ProfileStatus
            status={props.status}
            updateStatus={props.updateStatus}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
