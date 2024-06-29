import {
    NavigateFunction,
    useLocation,
    useNavigate,
    useParams,
    Location,
} from "react-router-dom";
import React, { useEffect } from "react";

// Определение типа для маршрутизации
export interface RouterType {
    location: Location
    navigate: NavigateFunction
    params:  Readonly<Partial<ParamsType>>
}

// Основные пропсы компонента
type PropsType = {
    router: RouterType
    userId?: number
};
type ParamsType = {
    userId: string
}

// Пропсы с маршрутизацией
export type PropsWithRouter = RouterType & PropsType;

// Функция высшего порядка (HOC) для добавления маршрутизации
export function withRouter<T extends PropsType>(Component: React.FC<T>): React.FC<Omit<T, keyof RouterType>> {
    function ComponentWithRouterProp(props: Omit<T, keyof RouterType>) {
        const location = useLocation();
        const navigate = useNavigate();
        const params = useParams<ParamsType>();

        useEffect(() => {
            if (!params.userId && !props.userId) {
                navigate("/Login");
            }
        }, [params.userId, props.userId, navigate]);

        return (
            <Component {...(props) as T} router={{location, navigate, params}} />
        );
    }

    return ComponentWithRouterProp;
}