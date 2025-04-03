import axios from 'axios';
import { RECOGNITION_URL } from '@/handler/apiConfig';

export interface RecognitionResponse {
    user_id: number;
    username: string;
    email: string;
    name: string;
    confidence: number;
}

export const recognizeFace = async (image: File): Promise<RecognitionResponse | null> => {
    try {
        const formData = new FormData();
        formData.append('image', image);

        // Debugging: Check FormData content before sending
        for (let pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }

        const response = await axios.post<RecognitionResponse>(RECOGNITION_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error: any) {
        console.error('Face recognition error:', error.response?.data || error.message);
        return null;
    }
};
