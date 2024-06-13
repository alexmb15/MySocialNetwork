import {useNavigate} from "react-router-dom";

export const withNavigate = Comp => props => <Comp {...props} navigate={useNavigate()} />;

const withNavigateHook = (Component) => {
    return (props) => {
        const navigation = useNavigate();

        return <Component navigation={navigation} {...props} />
    }
}

export default withNavigateHook;