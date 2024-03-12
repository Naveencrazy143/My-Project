import React from "react";
import { Image } from "@Components";
import { icons } from "@Assets";
import { useNavigation } from '@Hooks'
import { useDispatch } from "react-redux";
import { isBackNavigation } from "@Redux";

interface BackArrowProps {
  backgroundColor?: string;
  col?: String;
  additionClass?: string;
  text?: string;
  headerClass?: string
  onClick?: () => void;
  isViewStudent?: boolean
}

const Back = ({ additionClass, headerClass, col, text, onClick, isViewStudent = false }: BackArrowProps) => {
  const { goBack } = useNavigation()
  const dispatch = useDispatch();


  function isExist(val: any) {
    return val ? val : ''
  }

  return (
    <div className="row mt-3">
      <div
        className={`${isExist(additionClass)} ${isExist(col)} mb-3 ml-3 `}

      >
        {!isViewStudent ? <Image style={{cursor: 'pointer'}} src={icons.back} height={20} width={24} onClick={() => {
          if (onClick) {
            onClick()
            goBack()
          }
          else {
            goBack()
          }
        }}
        /> :
        <div className="mt-1">
          <i className="bi bi-arrow-left text-white fa-lg pointer" onClick={() => {
            if (onClick) {
              onClick()
              goBack()
            }
            else {
              goBack()
            }
          }}></i>
          </div>
        }
      </div>
      <div className="ml-3">
        <h3 className={headerClass}>{text}</h3>
      </div>
    </div>
  );
};
export { Back };
