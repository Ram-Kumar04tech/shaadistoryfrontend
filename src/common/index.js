const backendDomin = process.env.REACT_APP_BACKEND_URL; // Ensure this is consistent

const SummaryApi = {
    signUP: {
        url: `${backendDomin}/api/signup`,
        method: "post"
    },
    signIn: {
        url: `${backendDomin}/api/signin`,
        method: "post"
    },
    current_user: {
        url: `${backendDomin}/api/user-details`,
        method: "get"
    },
    logout_user: {
        url: `${backendDomin}/api/userLogout`,
        method: 'get'
    },
    profile: {
        url: `${backendDomin}/api/profile`,
        method: 'post'
    },
};

export default SummaryApi;
