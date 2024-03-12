import React, { useEffect, useRef, useState } from 'react';
import { Image } from '@Components';
import { icons } from '@Assets';
import { Icons } from 'react-toastify';
import { SERVER } from '@Services';

interface Props {
    onSelect: (image: any) => void;
    variant?: "ICON" | 'BUTTON'
    text?: string
    icon?: string | null
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    profile?: string;
}

const Dropzone: React.FC<Props> = ({ onSelect, variant = 'BUTTON', text, icon, size = "lg", profile }) => {
    const fileInputRef = useRef<any>();
    const [image, setImage] = useState<any>(icon)
    const handleRefClick = () => {
        fileInputRef.current.click();
    };

    console.log("imageee==>", image)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                if (onSelect && e.target) {
                    onSelect(e.target?.result);
                    setImage(e.target?.result)
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            {variant === 'BUTTON' &&
                <>
                    <input type="file" ref={fileInputRef}
                        style={{ display: 'none' }} onChange={handleChange} accept="image/*" />
                    <button onClick={handleRefClick}>{text && text}</button>
                </>
            }
            {variant === 'ICON' &&
                <> <input type="file" ref={fileInputRef}
                    style={{ display: 'none' }} onChange={handleChange} accept="image/*" multiple/>
                     <Image
                        src={image ? image : profile ? profile:icons.productPhoto}
                        variant='rounded'
                        onClick={handleRefClick}
                        size={size}
                    /> 
                   
                
                </>
            }
        </>
    );
};

export { Dropzone };