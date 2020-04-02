export default {
    palette: {
        primary: {
            light: "#33c9dc",
            main: "#00bcd4",
            dark: "#008384",
            contrastText: "#fff"
        },
        secondary: {
            light: "ff6333",
            main: "#ff3d00",
            dark: "#b22a00",
            contrastText: "#fff"
        }
    },
    typography: {
        useNextVariants: true
    },
    InputForm: {
        form: {
            textAlign: "center",
            marginTop: "20px"
        },
        textField: {
            margin: "10px auto 10px auto",
            fontSize: "20px"
        }
    },
    Banner: {
        pageTitle: {
            margin: "10px auto 10px auto"
        },
    },
    Buttons: {
        buttons: {
            textAlign: "center",
            "& a": {
                margin: "20px 10px"
            }
        },
        button: {
            marginTop: 20,
            position: "relative"
        }
    },

    Errors: {
        customError: {
            color: 'red',
            fontSize: '0.8rem',
            marginTop: 10
        }
    }
}