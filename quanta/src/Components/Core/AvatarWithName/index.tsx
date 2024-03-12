import { icons, Images } from "@Assets";
import { UncontrolledTooltip } from "reactstrap";

interface AvatarWithNameProps {
    src?: string;
    id?: string;
    name?: string;
    onclick?: ()=> void;
}

const AvatarWithName = ({id, src, name, onclick }: AvatarWithNameProps) => {


    return (
        <div className="" style={{zoom:'111%'}}>
            <div className="avatar-group">
                <a
                    className="avatar avatar-sm rounded-circle"
                    href="#pablo"
                    id={`tooltip${id}`}
                    onClick={onclick}
                >
                    <img
                        alt="..."
                        src={src || icons.profile}
                        height={'35px'}
                        
                    />
                </a>
                <UncontrolledTooltip
                    delay={0}
                    target={`tooltip${id}`}
                >
                    {name || '...'}
                </UncontrolledTooltip>
            </div>
        </div>
    );
};
export { AvatarWithName };
