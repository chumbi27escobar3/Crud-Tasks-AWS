import { Note } from "../../interfaces/Interfaces";
import makeRequest from "../Service";

const URL = "https://rxz1xntvzf.execute-api.us-east-1.amazonaws.com/items";

const GetAll = () => {
  return makeRequest(URL, 'GET');
}

const GetById = (id: string) => {
  return makeRequest(`${URL}/${id}`, 'GET');
}

const Post = (note: Note) => {
  return makeRequest(URL, 'PUT', note);
}

const Put = (note: Note) => {
  return makeRequest(URL, 'PUT', note);
}

const Delete = (id: string) => {
  return makeRequest(`${URL}/${id}`, 'DELETE');
}

export { GetAll, GetById, Post, Put, Delete };