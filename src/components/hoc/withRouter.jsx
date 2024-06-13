//******** for create withRouter
import {
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";
import {useEffect} from "react";


//******** for create withRouter
export function withRouter(Component) {
    function ComponentWithRouterProp(props) {
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

    return ComponentWithRouterProp;
}

//******** for create withRouter
