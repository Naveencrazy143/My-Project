export interface NavbarProps {
    theme?: any;
    sidenavOpen?: boolean;
    toggleSidenav: any;
    userName?: string;
    userProfile?: string;
    isBack?: boolean;
    isShowToggle?:boolean;
    fixedTop?:string;
    onItemClick?:(e)=>{};
    adminDropdownData?:any
}