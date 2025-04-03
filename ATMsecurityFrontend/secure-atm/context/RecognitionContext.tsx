"use client"

import React, { createContext, useContext, useState } from "react";
import { RECOGNITION_URL } from "@/handler/apiConfig"; // ✅ Import correct API URL
import { RecognitionResponse } from "../handler/RecognitionManager";

interface RecognitionContextProps {
    recognizedUser: RecognitionResponse | null;
    recognizeUser: (image: File) => Promise<void>;
    isLoading: boolean;
    error: string | null;
}

const RecognitionContext = createContext<RecognitionContextProps | undefined>(undefined);

export const RecognitionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [recognizedUser, setRecognizedUser] = useState<RecognitionResponse | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const recognizeUser = async (image: File) => {
        setIsLoading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append("image", image);

            const response = await fetch(RECOGNITION_URL, { // ✅ Use full backend URL
                method: "POST",
                body: formData, // ✅ Send as multipart/form-data
            });

            if (!response.ok) {
                throw new Error("Face not recognized or invalid image.");
            }

            const result: RecognitionResponse = await response.json();
            setRecognizedUser(result);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <RecognitionContext.Provider value={{ recognizedUser, recognizeUser, isLoading, error }}>
            {children}
        </RecognitionContext.Provider>
    );
};

export const useRecognition = () => {
    const context = useContext(RecognitionContext);
    if (!context) {
        throw new Error("useRecognition must be used within a RecognitionProvider");
    }
    return context;
};
