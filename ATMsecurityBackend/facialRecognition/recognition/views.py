from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import numpy as np
from PIL import Image
import io
import os
import cv2
import logging
from django.core.files.storage import default_storage
from userManager.models import CustomUser, face_detector, shape_predictor, face_rec_model

# Set up logging
logger = logging.getLogger(__name__)

# Ensure temp directory exists
TEMP_DIR = os.path.join(default_storage.location, "temp")
os.makedirs(TEMP_DIR, exist_ok=True)

@csrf_exempt
@api_view(['POST'])
def recognize_face(request):
    """
    Process an image uploaded via multipart/form-data and recognize the face
    """
    if request.method == 'POST':
        try:
            # Ensure image file exists
            if 'image' not in request.FILES:
                return Response({'error': 'No image file provided'}, status=status.HTTP_400_BAD_REQUEST)

            facial_image = request.FILES['image']
            file_extension = os.path.splitext(facial_image.name)[-1].lower()

            # Ensure valid image format
            if file_extension not in [".jpg", ".jpeg", ".png"]:
                return Response({"error": "Invalid image format. Only JPG, JPEG, PNG allowed."}, 
                                status=status.HTTP_400_BAD_REQUEST)
            
            # Save uploaded image temporarily
            image_path = os.path.join(TEMP_DIR, facial_image.name)
            image_data = facial_image.read()

            try:
                # Validate image before saving
                img = Image.open(io.BytesIO(image_data))
                img.verify()  # Check if image is corrupt
            except Exception as e:
                logger.error(f"Invalid image format: {e}")
                return Response({"error": "Invalid or corrupted image"}, 
                                status=status.HTTP_400_BAD_REQUEST)

            # Save the verified image
            with open(image_path, 'wb') as f:
                f.write(image_data)

            logger.info(f"Saved image at {image_path}")
            print(f"Saved image at {image_path}")  # Debugging print

            # Read the image using OpenCV
            image = cv2.imread(image_path)

            if image is None:
                logger.error(f"cv2.imread() failed to load image: {image_path}")
                return Response({"error": "Failed to read image, ensure it's a valid format"}, 
                                status=status.HTTP_400_BAD_REQUEST)

            # Convert to grayscale for better detection
            gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
            faces = face_detector(gray)

            if not faces:
                os.remove(image_path)
                return Response({"error": "No face detected in the uploaded image"}, 
                                status=status.HTTP_400_BAD_REQUEST)

            # Process face recognition
            face_shape = shape_predictor(gray, faces[0])
            face_encoding = np.array(face_rec_model.compute_face_descriptor(image, face_shape))

            if face_encoding.shape[0] != 128:
                os.remove(image_path)
                return Response({"error": "Face encoding extraction failed"}, 
                                status=status.HTTP_400_BAD_REQUEST)

            # Compare with stored face encodings
            users = CustomUser.objects.filter(face_encoding__isnull=False)
            recognized = False
            best_match_user = None
            best_distance = float("inf")

            for user in users:
                try:
                    stored_encoding = np.array(user.face_encoding, dtype=np.float64)
                    if stored_encoding.shape[0] != 128:
                        continue

                    distance = np.linalg.norm(face_encoding - stored_encoding)
                    logger.info(f"Comparing with {user.email} | Distance: {distance}")
                    print(f"Comparing with {user.email} | Distance: {distance}")

                    if distance < 0.5 and distance < best_distance:
                        best_match_user = user
                        best_distance = distance
                        recognized = True

                except (json.JSONDecodeError, TypeError) as e:
                    logger.warning(f"Error decoding face encoding for user {user.email}: {e}")
                    continue

            os.remove(image_path)  # Cleanup after processing

            if recognized and best_match_user:
                return Response({
                    'message': 'Face recognized successfully',
                    'user_id': best_match_user.id,
                    'username': best_match_user.username,
                    'email': best_match_user.email,
                    'name': f"{best_match_user.first_name} {best_match_user.last_name}".strip(),
                    'confidence': 1 - best_distance,
                }, status=status.HTTP_200_OK)

            return Response({"error": "Face does not match any registered profiles"}, 
                            status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            logger.error(f"General error in face recognition: {e}")
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
