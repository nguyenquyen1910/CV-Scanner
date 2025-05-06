import requests
import os
from typing import List, Dict

class CVWorkflowTest:
    def __init__(self, base_url: str = "http://localhost:8000"):
        self.base_url = base_url
        try:
            print("Step 1: Upload CV...")
            upload_result = self.upload_cv(cv_file_path)
            if not upload_result:
                return False
            
            print("Step 2: Save CV to database...")
            save_resulf = self.save_cv_data(upload_result['data'])
            if not save_result:
                return False
            
            
        except Exception as e:
            print(f"Error: {e}")
            return False
        
    def upload_cv(self, cv_file_path: str) -> Dict:
        try:
            upload_url = f"{self.base_url}/upload/cv"
            with open(cv_file_path, 'rb') as f:
                files = {'file': (cv_file_path, f, 'application/pdf')}
                response = requests.post(upload_url, files=files)
                response.raise_for_status()
                return response.json()
            
        except Exception as e:
            print(f"Error uploading CV: {e}")
            return None
        
    def save_cv_data(self, cv_data: Dict) -> Dict:
        try:
            save_url = f"{self.base_url}/cv-storage/save-cv"
            response = requests.post(save_url, json=cv_data)
            response.raise_for_status()
            return response.json()
        except Exception as e:
            print(f"Save failed: {str(e)}")
            return None
