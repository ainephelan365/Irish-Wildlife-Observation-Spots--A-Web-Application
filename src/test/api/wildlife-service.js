import axios from "axios";
import { maggie, serviceUrl } from "../fixtures.js";

export const wildlifeService = {
  wildlifeUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.wildlifeUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.wildlifeUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    try {
      const res = await axios.get(`${this.wildlifeUrl}/api/users`);
      return res.data;
    } catch (e) {
      return null;
    }
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.wildlifeUrl}/api/users`);
    return res.data;
  },

  async createspot(spot) {
    const res = await axios.post(`${this.wildlifeUrl}/api/spots`, spot);
    return res.data;
  },

  async deleteAllSpots() {
    const response = await axios.delete(`${this.wildlifeUrl}/api/spots`);
    return response.data;
  },

  async deletespot(id) {
    const response = await axios.delete(`${this.wildlifeUrl}/api/spots/${id}`);
    return response;
  },

  async getallSpots() {
    const res = await axios.get(`${this.wildlifeUrl}/api/spots`);
    return res.data;
  },

  async getspot(id) {
    const res = await axios.get(`${this.wildlifeUrl}/api/spots/${id}`);
    return res.data;
  },

  async getAllTracks() {
    const res = await axios.get(`${this.wildlifeUrl}/api/tracks`);
    return res.data;
  },

  async createTrack(id, track) {
    const res = await axios.post(`${this.wildlifeUrl}/api/spots/${id}/tracks`, track);
    return res.data;
  },

  async deleteAllTracks() {
    const res = await axios.delete(`${this.wildlifeUrl}/api/tracks`);
    return res.data;
  },

  async getTrack(id) {
    const res = await axios.get(`${this.wildlifeUrl}/api/tracks/${id}`);
    return res.data;
  },

  async deleteTrack(id) {
    const res = await axios.delete(`${this.wildlifeUrl}/api/tracks/${id}`);
    return res.data;
  },

  async authenticate(user) {
    const response = await axios.post(`${this.wildlifeUrl}/api/users/authenticate`, user);
    axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
    return response.data;
  },

  async clearAuth() {
    axios.defaults.headers.common["Authorization"] = "";
  },
};
