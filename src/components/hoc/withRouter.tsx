//******** for create withRouter
import {
    NavigateFunction, Params,
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";
import React, {useEffect} from "react";

interface Router {
    location: Location
    navigate: NavigateFunction
    params: Readonly<Params<string>>
}

export interface PropsWithRouter {
    router: Router
    userId: number
}

//******** for create withRouter
export function withRouter<T extends PropsWithRouter>(Component: React.FC<T>): React.FC<Omit<T, "router">> {
    function ComponentWithRouterProp(props: T) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();



        useEffect(() => {
            if (!params.userId && !props.userId) {
                navigate("/Login");
            }
        }, [params.userId, props.userId, navigate]);

        return (
            <Component
                {...props}
                router={{location, navigate, params}}
            />
        );
    }

    return ComponentWithRouterProp as React.FC<Omit<T, "router">>;
}

//******** for create withRouter
