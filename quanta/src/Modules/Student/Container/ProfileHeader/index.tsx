import { Container, Row, Col } from "reactstrap";
import { Images } from "@Assets";
import { ProfileHeaderProps } from "./interface";
import { FC } from "react";
import { Back, Button } from '@Components'
import { translate } from "@I18n";

const ProfileHeader: FC<ProfileHeaderProps> = ({ data = {}, onClick, name }) => {
  const { userName, info, coverPic } = data
  
  return (
    <>
      <div className="ml-2">
        <Back />
      </div>

      <div
        className="header pb-6 d-flex align-items-center"
        style={{
          minHeight: "500px",
          backgroundImage: coverPic ? 'url("' + coverPic + '")' :
            'url("' + Images.mountain + '")',
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        <span className="mask bg-gradient-default opacity-5" />

        <div className="d-flex align-items-center ml-4" >
          <div className="row">
            <div className="col-lg-7 col-md-10">
              <h1 className="display-2 text-white">{name ? `Hello ${name}` : 'Hello Diva'}</h1>
              <p className="text-white mt-0 mb-5">
                {info ? info : `A user profile is a collection of settings and information associated with a user. 
                It contains critical information that is used to identify an individual, such as their name, 
                age, portrait photograph and individual characteristics such as knowledge or expertise.`}
              </p>
              {/* <Button
                className="btn-neutral"
                color="default"
                href="#pablo"
                onClick={onClick}
                text={translate('course.editProfile')}
              /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export { ProfileHeader };
