const KEY = "hr_app_db_v1";

function seed() {
  const initial = {
    jobs: [
      { id: "J101", title: "Frontend Developer", dept: "IT", location: "Chennai", owner: "manager1" },
      { id: "J102", title: "QA Engineer", dept: "IT", location: "Chennai", owner: "manager1" }
    ],
    applications: []
  };
  localStorage.setItem(KEY, JSON.stringify(initial));
  return initial;
}

export function getDB() {
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : seed();
}

export function saveDB(db) {
  localStorage.setItem(KEY, JSON.stringify(db));
}

export function addJob(job) {
  const db = getDB();
  db.jobs.unshift(job);
  saveDB(db);
  return job;
}

export function listJobs() {
  return getDB().jobs;
}

export function applyToJob(application) {
  const db = getDB();
  db.applications.unshift(application);
  saveDB(db);
  return application;
}

export function listApplications() {
  return getDB().applications;
}

export function updateApplicationStatus(appId, status) {
  const db = getDB();
  const app = db.applications.find(a => a.id === appId);
  if (app) app.status = status;
  saveDB(db);
  return app;
}