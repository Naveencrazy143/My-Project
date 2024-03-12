import { useNavigate as useNav } from "react-router-dom";
const useNavigation = () => {
  const navigation = useNav();
  const goTo = (to: string, replace: boolean = false) => {
    navigation(to, { replace: replace });
  }

  const goBack = (number: number = -1) => navigation(number)

  return { goTo, goBack };
};

export { useNavigation };
