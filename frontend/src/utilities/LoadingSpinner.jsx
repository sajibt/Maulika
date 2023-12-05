import { ColorRing } from "react-loader-spinner";

const LoadingSpinner = ({ visible }) => {
    if (!visible) {
        return null;
    }

    const spinnerStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
    };

    return (
        <div style={spinnerStyle}>
            <ColorRing
                visible={visible}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["#1f6edf", "#2889c3", "#34a6bf", "#6dbada", "#9dc5cd"]}
            />
        </div>
    );
};

export default LoadingSpinner;
