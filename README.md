GAS - Guardian Authentication System
Description
The Guardian Authentication System (GAS) is a comprehensive security solution designed to enhance the safety of students during critical times of pick-up and drop-off. Developed using React for the frontend and Django for the backend, GAS leverages advanced face recognition technology to verify guardians' identities. This system not only ensures that students are handed over to the correct guardians but also maintains a detailed log of each pick-up and drop-off event, including information on the guardian and the staff member involved. Additionally, GAS features a robust student and guardian registration module alongside an attendance system, providing a holistic approach to student safety and tracking.

Installation
Before installation, ensure you have npm and Python installed on your machine. Follow these steps to set up the project environment:

Backend Setup
bash
Copy code
# Clone the repository
git clone https://github.com/henas12/GAS.git
cd GAS/backend

# Create a virtual environment
python -m venv venv
# Activate the virtual environment
# On Windows
venv\Scripts\activate
# On Unix or MacOS
source venv/bin/activate

# Install the dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Start the Django server
python manage.py runserver
Frontend Setup
bash
Copy code
# Navigate to the frontend directory from the project root
cd frontend

# Install dependencies
npm install

# Start the React application
npm start
Usage
After installation, the system is ready for use. Guardians can be registered into the system along with their corresponding students. At the time of pick-up or drop-off, the guardian's face is verified through the system to ensure they are authorized to pick up the student. The system logs the details of each transaction for future reference.

Features
Guardian Verification: Securely verify the identity of guardians during student pick-up and drop-off using face recognition technology.
Log Management: Maintain detailed logs of pick-up and drop-off events, including the guardian and staff details.
Student and Guardian Registration: Register students and their guardians in the system to manage permissions and keep track of all operational activities.
Attendance System: Monitor and record student attendance, integrating seamlessly with the guardian verification system for a comprehensive security solution.
Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks again!

Fork the Project
Create your Feature Branch (git checkout -b feature/AmazingFeature)
Commit your Changes (git commit -m 'Add some AmazingFeature')
Push to the Branch (git push origin feature/AmazingFeature)
Open a Pull Request
License
Distributed under the MIT License. See LICENSE for more information.



Project Link: https://github.com/henas12/GAS

