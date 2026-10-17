# Online Medication & Prescription Tracker

This project helps patients, doctors, pharmacists, and admins manage medicines and prescriptions online in a simple way.

What it does (simple):
- Patients: view prescriptions, see medicine history, and check reminders.
- Doctors: create and send prescriptions, view patient history.
- Pharmacists: manage medicine stock and fulfill prescriptions.
- Admins: manage users and see basic reports.

Main features:
- User login and role-based access (Patient, Doctor, Pharmacist, Admin).
- Create, store, and view prescriptions.
- Track medicine inventory and low-stock alerts.
- Simple analytics and charts for usage and stock.
- Sample data is included for easy testing.

Quick start (very simple):
1. Install Java 17+, Maven, Node.js (LTS), and MySQL.
2. Create the database and run the SQL in `database/schema.sql`.
3. Update database credentials in `backend/src/main/resources/application.properties` if needed.
4. Run the backend:
   - Open a terminal, go to `backend`, then run `mvn spring-boot:run`.
5. Run the frontend:
   - Open a terminal, go to `frontend`, then run `npm install` and `npm start`.
6. Open the frontend at `http://localhost:3000` and the backend runs at `http://localhost:8080`.

More details and full project description are in `Online Medication & Prescription Tracker.docx` in this repository.

If you want, I can further shorten this or add screenshots and commands step-by-step.