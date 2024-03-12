export interface ProfileCardProps {
    courseName?: string;
    bgImage?: string;
    photo?: string;
    subText?: string;
    buttonOnClick?: (e) => void;
    startDate?: string;
    endDate?: string;
    disable?: boolean;
    height?: string;
    buttonText?: string;
    buttonSize?: 'sm' | 'md' | 'lg';
    cursor?: string
    assignDate?: string;
    length?: number;
    subLength?: number;
    className?: string;
    completed?: any;
    total?: number;
    buttonSize2?: 'sm' | 'md' | 'lg';
    buttonText2?: string
    buttonOnClick2?: (e) => void;
    isAdmin?: boolean;
}
