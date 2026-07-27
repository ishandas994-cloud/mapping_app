const API = "http://localhost:5000/api";

const roomList = document.getElementById("roomList");
const edgeList = document.getElementById("edgeList");

const fromRoom = document.getElementById("fromRoom");
const toRoom = document.getElementById("toRoom");

const map = document.getElementById("map");

const addRoomBtn = document.getElementById("addRoomBtn");
const connectBtn = document.getElementById("connectBtn");

let rooms = [];
let edges = [];