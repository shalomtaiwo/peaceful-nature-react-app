import axios from "axios";
import React from "react";

const useAxios = () => {
    const [state, setState] = React.useState({
        data: null,
        isLoading: false,
        error: null,
    });

    const mutateAsync = ({ url, body, ...options }) => {
        setState((prev) => ({ ...prev, isLoading: true, data: null }));
        return (
            axios
                // @ts-expect-error
                .post(url, body, options)
                .then((response) => {
                    setState((prev) => ({
                        ...prev,
                        isLoading: false,
                        data: response,
                        error: null,
                    }));
                    return response;
                })
                .catch((err) => {
                    setState((prev) => ({
                        ...prev,
                        isLoading: false,
                        data: null,
                        error: err?.response ?? err,
                    }));
                    throw new Error(err?.response ?? err);
                })
        );
    };

    return { ...state, mutateAsync };
};

export default useAxios;