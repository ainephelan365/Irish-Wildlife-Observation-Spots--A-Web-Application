import axios from "axios";
import { maggie, serviceUrl } from "../fixtures.js";

export const wildlifeService = {
  playtimeUrl: serviceUrl,

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

  async deleteAllspots() {
    const response = await axios.delete(`${this.wildlifeUrl}/api/spots`);
    return response.data;
  },

  async deletespot(id) {
    const response = await axios.delete(`${this.wildlifeUrl}/api/spots/${id}`);
    return response;
  },

  async getAllspots() {
    const res = await axios.get(`${this.wildlifeUrl}/api/spots`);
    return res.data;
  },

  async getspot(id) {
    const res = await axios.get(`${this.wildlifeUrl}/api/spots/${id}`);
    return res.data;
  },

  async getAllsightings() {
    const res = await axios.get(`${this.wildlifeUrl}/api/sightings`);
    return res.data;
  },

  async createsighting(id, sighting) {
    const res = await axios.post(`${this.wildlifeUrl}/api/spots/${id}/sightings`, sighting);
    return res.data;
  },

  async deleteAllsightings() {
    const res = await axios.delete(`${this.wildlifeUrl}/api/sightings`);
    return res.data;
  },

  async getsighting(id) {
    const res = await axios.get(`${this.wildlifeUrl}/api/sightings/${id}`);
    return res.data;
  },

  async deletesighting(id) {
    const res = await axios.delete(`${this.wildlifeUrl}/api/sightings/${id}`);
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
