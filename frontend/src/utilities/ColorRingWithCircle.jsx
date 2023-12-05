import { useState, useEffect } from "react";

const ColorRingWithCircle = ({ visible }) => {
    const initialColors = [
        "#1c328f",
        "#1f6edf",
        "#2889c3",
        "#34a6bf",
        "#6dbada",
        "#9dc5cd",
    ];

    const numColors = initialColors.length;

    const containerStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
    };

    const spinnerStyle = {
        width: "60px", // Adjust the width for mobile
        height: "60px", // Adjust the height for mobile
        position: "relative",
    };

    const ringStyle = {
        width: "100%",
        height: "100%",
        position: "absolute",
        transform: "rotate(90deg)",
    };

    // const circleStyle = {
    //     position: "absolute",
    //     width: "12px",
    //     height: "12px",
    //     backgroundColor: "transparent",
    //     borderRadius: "50%",
    //     transition: "background-color 0.5s ease", // Smooth color transition
    //     transform: "rotate(45deg) scale(1)", // Adjust the rotation and scale
    // };

    const circleStyle = {
        position: "absolute",
        width: "12px",
        height: "12px",
        backgroundColor: "transparent",
        borderRadius: "50%",
        transition: "background-color 0.5s ease, box-shadow 0.3s ease", // Smooth color transition and shine effect
        transform: "rotate(45deg) scale(1)", // Adjust the rotation and scale
        boxShadow: "0 10px 8px 10px rgba(255, 255, 255, 0.7)", // Add a subtle shine effect
    };

    const [colors, setColors] = useState(initialColors);

    useEffect(() => {
        if (visible) {
            const interval = setInterval(() => {
                // Rotate the colors array to create a color swapping effect
                const newColors = [...colors];
                const lastColor = newColors.pop();
                newColors.unshift(lastColor);
                setColors(newColors);
            }, 500);

            return () => clearInterval(interval);
        }
    }, [visible, colors]);

    if (window.innerWidth <= 768) {
        spinnerStyle.width = "30px";
        spinnerStyle.height = "30px";
        circleStyle.width = "8px";
        circleStyle.height = "8px";
        circleStyle.transform = "rotate(45deg) scale(1.5)"; // Adjust the rotation and scale for mobile
    }

    return (
        <div style={containerStyle}>
            <div style={spinnerStyle}>
                <div style={ringStyle}>
                    {colors.map((color, index) => {
                        const angle = (360 / numColors) * index;
                        const circleTransform = `rotate(${angle}deg) translate(${window.innerWidth <= 768 ? "19px" : "30px"
                            })`;

                        return (
                            <div
                                key={index}
                                style={{
                                    ...circleStyle,
                                    backgroundColor: color,
                                    transform: circleTransform,
                                }}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ColorRingWithCircle;
