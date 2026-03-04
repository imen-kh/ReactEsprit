import axios from "axios";

const BASE_URL = "http://localhost:3001/events";

// GET - récupérer tous les événements
export const getAllEvents = () => axios.get(BASE_URL);

// GET - récupérer un événement par id
export const getEventById = (id) => axios.get(`${BASE_URL}/${id}`);

// POST - ajouter un nouvel événement
export const createEvent = (event) => axios.post(BASE_URL, event);

// PUT - mettre à jour un événement
export const updateEvent = (id, event) => axios.put(`${BASE_URL}/${id}`, event);

// DELETE - supprimer un événement
export const deleteEvent = (id) => axios.delete(`${BASE_URL}/${id}`);
